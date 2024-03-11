import { FastifyInstance, FastifyPluginOptions } from "fastify";
import fastifyPlugin from "fastify-plugin";

import handlers from "../handlers";
import {
  GetByUserResponse,
  GetByUserRequest,
  getByUserJsonSchema,
} from "../../schemas/http/getByUserReqRes";

const routes = async (
  server: FastifyInstance,
  options: FastifyPluginOptions
) => {
  server.route<GetByUserRequest & GetByUserResponse>({
    method: "GET",
    url: "/user/:userId",
    schema: getByUserJsonSchema,
    handler: handlers.getByUserId,
    // @todo: pre validation
  });
};

export default fastifyPlugin(routes);
