import fastify from "fastify";
// import {
//   FastifyReplyType,
//   FastifyRequestType,
// } from "fastify/types/type-provider";

const server = fastify();

// const handler = async (
//   request: FastifyRequestType,
//   response: FastifyReplyType
// ) => {
//   const { params, query, body, headers } = request;
//   console.log("hiiiia handler", { params, query, body, headers });
//   return response.code(200).send({ data: { price: 2000 } });
// };

// server.get("/", handler);

server.get("/", (request, response) => {
  const { params, query, body, headers } = request;
  console.log("hiiii handler", { params, query, body, headers });
  return response.code(200).send({ data: { price: 2000 } });
});

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
