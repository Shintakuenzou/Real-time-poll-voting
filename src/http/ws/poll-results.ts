import { FastifyInstance } from "fastify";
import { voting } from "../../utils/voting-pub-sub";
import z from "zod";

export async function pollResults(app: FastifyInstance) {
  // Criando uma rota que usa websoket
  // Uma requisição do tipo websocket é conínua (aberta no servidor)
  // vai obter os resultados de uma enquete especifica em tempo real
  app.get("/polls/:pollId/results", { websocket: true }, (connection, reques) => {
    // inscrever apenas nas mensagem publicadas no canal com o id da enquete

    // Ouvindo as mensagens
    const pollsParams = z.object({ pollId: z.string().uuid() });

    const { pollId } = pollsParams.parse(reques.params);
    voting.subscribe(pollId, (message) => {
      connection.socket.send(JSON.stringify(message));
    });
  });
}
