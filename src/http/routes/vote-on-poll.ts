import { z } from "zod";
import { FastifyInstance } from "fastify";
import { randomUUID } from "node:crypto";
import { prisma } from "../../lib/prisma";
import { redis } from "../../lib/redis";
import { voting } from "../../utils/voting-pub-sub";

export async function voteOnPoll(app: FastifyInstance) {
  app.post("/polls/:pollId/votes", async (request, reply) => {
    const voteOnPollBody = z.object({
      pollOptionId: z.string().uuid(),
    });

    const voteOnPollParams = z.object({
      pollId: z.string().uuid(),
    });

    //Verficiar se está no formato certo o request.body e retornar
    const { pollId } = voteOnPollParams.parse(request.params);
    const { pollOptionId } = voteOnPollBody.parse(request.body);

    let { sessionId } = request.cookies;

    //Verifica se o usuário já votou
    if (sessionId) {
      const userpreviousVoteOnPoll = await prisma.vote.findUnique({
        where: {
          sessionId_pollId: { sessionId, pollId },
        },
      });

      // Se tiver votado na enquete atual ea opção que votou antes e diferente do voto de agora
      if (userpreviousVoteOnPoll && userpreviousVoteOnPoll.pollOptionId !== pollId) {
        //Apagar o voto anterior e criar um novo
        await prisma.vote.delete({
          where: {
            id: userpreviousVoteOnPoll.id,
          },
        });

        // reduzindo o voto da opção antiga que votou
        const votes = await redis.zincrby(pollId, -1, userpreviousVoteOnPoll.pollOptionId);

        voting.publish(pollId, {
          pollOptionId: userpreviousVoteOnPoll.pollOptionId,
          votes: Number(votes),
        });
      } else if (userpreviousVoteOnPoll) {
        return reply.status(400).send({ message: "You alredy voted on this poll." });
      }
    }

    if (!sessionId) {
      sessionId = randomUUID();
      reply.setCookie("sessionId", sessionId, {
        path: "/",
        maxAge: 60 * 60 * 24 * 30, // 30 days
        signed: true, // não vai conseguir ser modificado
        httpOnly: true, // deixa acessivel apenas para o backend
      });
    }

    await prisma.vote.create({
      data: {
        sessionId,
        pollId,
        pollOptionId,
      },
    });

    // zincrby(key: id enquete, increment: qunato vai incrementar o voto, option: opção das enquetes)
    // retorna o números de votos
    const votes = await redis.zincrby(pollId, 1, pollOptionId);

    voting.publish(pollId, {
      pollOptionId,
      votes: Number(votes),
    });

    return reply.status(201).send();
  });
}
