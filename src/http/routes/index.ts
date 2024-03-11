import { FastifyInstance, FastifyPluginOptions } from "fastify";

import { buildPurchaseRepository } from "../../db/repositories/purchaseRepository";
import {
  GetByUserResponse,
  GetByUserRequest,
  getByUserJsonSchema,
} from "../../schemas/http/getByUserReqRes";

import { buildGetByUserIdHandler } from "../handlers/getByUserId";

export const buildRouter =
  (purchaseRepository: ReturnType<typeof buildPurchaseRepository>) =>
  async (server: FastifyInstance, options: FastifyPluginOptions) => {
    server.route<GetByUserRequest & GetByUserResponse>({
      method: "GET",
      url: "/user/:userId",
      schema: getByUserJsonSchema,
      handler: buildGetByUserIdHandler(purchaseRepository),
      // @todo: pre validation
    });
  };
