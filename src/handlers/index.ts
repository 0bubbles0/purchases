import { FastifyReply, FastifyRequest } from "fastify";

import { Model, RouteRequest } from "../types";

const handler = async (
  request: FastifyRequest<RouteRequest>,
  response: FastifyReply
) => {
  // @todo: try catch

  // @todo: validate request schema
  const { params, query, body, headers } = request;
  console.log("hiiiias handler", { params, query, body, headers });

  // if (!query.limit) {
  //   return response.code(401).send({ data: "nooo" });
  // }

  // @todo: authorise request

  // @todo: service business logic & await db-queries

  // @todo: format result
  const data: Model[] = [{ price: 3000 }];

  // @todo: send response
  return response.code(200).send({ data });

  // @todo: handle errors
};

export default handler;
