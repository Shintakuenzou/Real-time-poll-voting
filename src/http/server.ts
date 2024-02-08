import fastify from "fastify";
import cookie from "@fastify/cookie";
import { createPoll } from "./routes/create-polls";
import { getPoll } from "./routes/get-polls";
import { voteOnPoll } from "./routes/vote-on-poll";
import fastifyWebsocket from "@fastify/websocket";
import { pollResults } from "./ws/poll-results";

const app = fastify();

app.register(cookie, {
  secret: "polls-app",
  hook: "onRequest", // antes da requisição entra em ação e faça os parse dos cookies e coloca no objeto para facil acesso na rota
});

app.register(fastifyWebsocket);

//Registrar a rota no app
app.register(createPoll);
app.register(getPoll);
app.register(voteOnPoll);
app.register(pollResults);

app.listen({ port: 3333 }).then(() => {
  console.log("Http server running!");
});
