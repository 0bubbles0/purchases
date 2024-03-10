import fastify, { FastifyReply, FastifyRequest, RawServerBase } from "fastify";
// import {
//   FastifyReplyType,
//   FastifyRequestType,
// } from "fastify/types/type-provider";

// .env
const PORT = 8080;
// --

const server = fastify();

// db

// routes
interface RouteRequest {
  Headers: {};

  Params: {
    userId?: string;
  };

  Querystring: {
    limit?: number;
  };

  Body: {};
}
interface RouteReply {
  Reply: {
    200: { success?: boolean; data: { price: number } };
  };
}

const handler = async (
  request: FastifyRequest<RouteRequest>,
  response: FastifyReply
) => {
  const { params, query, body, headers } = request;

  console.log("hiiiia handler", { params, query, body, headers });

  return response.code(200).send({ data: { price: 2000 } });
};

server.route<RouteRequest & RouteReply>({
  method: "GET",
  url: "/",
  handler,
});

// server:
const start = async () => {
  try {
    await server.listen({ port: PORT }, (err, address) => {
      if (err) {
        throw err;
      }

      console.log(`Server listening at ${address}`);
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
