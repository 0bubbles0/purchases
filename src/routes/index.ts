import { FastifyInstance, FastifyPluginOptions } from "fastify";
import fastifyPlugin from "fastify-plugin";

import { RouteReply, RouteRequest } from "../types";
import handler from "../handlers";

const routes = async (
  server: FastifyInstance,
  options: FastifyPluginOptions
) => {
  server.route<RouteRequest & RouteReply>({
    method: "GET",
    url: "/",
    handler,
    // @todo: schema/pre validation
  });
};

export default fastifyPlugin(routes);
