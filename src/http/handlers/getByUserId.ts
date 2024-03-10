import { FastifyReply, FastifyRequest } from "fastify";

import repository from "../../repository";
import { GetByUserRequest } from "../../schemas/http/getByUserReqRes";

export const getByUserId = async (
  request: FastifyRequest<GetByUserRequest>,
  response: FastifyReply
) => {
  // @todo: try catch
  try {
    // @todo: validate request schema
    const { params, query, body, headers } = request;
    console.log("hiiiias handler", { params, query, body, headers });

    const reqUserId = params.userId;
    const authedUserId = headers["x-user-id"];

    if (!reqUserId || !authedUserId || reqUserId !== authedUserId) {
      throw new Error("403 Unauthorised");
    }

    // if (!query.limit) {
    //   return response.code(401).send({ data: "nooo" });
    // }

    // @todo: authorise request

    // @todo: service business logic & await db-queries
    const results = await repository.getByUserId({ userId: reqUserId });

    // @todo: send response
    return response.code(200).send({ data: results });
  } catch (e) {
    // @todo: handle errors
    console.error(e);
  }
};
