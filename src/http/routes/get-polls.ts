import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { FastifyInstance } from "fastify";
import { redis } from "../../lib/redis";

export async function getPoll(app: FastifyInstance) {
  app.get("/polls/:pollId", async (request, reply) => {
    const getPollParams = z.object({
      pollId: z.string().uuid(),
    });

    //Verficiar se está no formato certo o request.body e retornar
    const { pollId } = getPollParams.parse(request.params);

    //Buscando um conteúdo especifico
    const poll = await prisma.poll.findUnique({
      where: { id: pollId },
      // include: serve para incluir dados do relacionamentos ao mesmo tempo que trazemos dados de uma entidade especifica
      include: {
        options: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });

    if (!poll) {
      return reply.status(400).send({ messahe: "Poll not found." });
    }

    //Retorna o rank através de uma chave de uma enquete de 0 até -1 (Todas as opções)
    const result = await redis.zrange(pollId, 0, -1, "WITHSCORES");

    const votes = result.reduce((obj, line, index) => {
      if (index % 2 === 0) {
        const score = result[index + 1];

        Object.assign(obj, { [line]: Number(score) });
      }

      return obj;
    }, {} as Record<string, number>);

    console.log(votes);

    return reply.send({
      poll: {
        id: poll.id,
        title: poll.title,
        options: poll.options.map((option) => {
          return {
            id: option.id,
            title: option.title,
            score: option.id in votes ? votes[option.id] : 0,
          };
        }),
      },
    });
  });
}
