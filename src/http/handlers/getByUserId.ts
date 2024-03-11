import { FastifyReply, FastifyRequest } from "fastify";

import { buildPurchaseRepository } from "../../db/repositories/purchaseRepository";
import config from "../../config";
import { GetByUserRequest } from "../../schemas/http/getByUserReqRes";
import {
  Error401Unauthorised,
  Error403Forbidden,
  UserFriendlyError,
} from "../../schemas/http/errors";

export const buildGetByUserIdHandler =
  (purchaseRepository: ReturnType<typeof buildPurchaseRepository>) =>
  async (request: FastifyRequest<GetByUserRequest>, response: FastifyReply) => {
    try {
      const { params, query, body, headers } = request;
      console.log("hiiiias handler", { params, query, body, headers });

      // Validate request syntax: -> Json schema validation already took care of it
      const reqUserId = request.params.userId;
      const authedUserId = request.headers["x-user-id"];
      const authedClientId = request.headers["x-client-id"];

      const validClients = [
        config.clientId.customerSupport,
        config.clientId.shop,
      ];
      // @todo: validate filter, pagination syntax if present

      // Authorise request:
      if (!validClients.includes(authedClientId)) {
        throw new Error403Forbidden();
      }

      if (reqUserId !== authedUserId) {
        if (authedClientId !== config.clientId.customerSupport)
          throw new Error401Unauthorised();
      }

      // Business logic & Queries:
      const results = await purchaseRepository.getByUserId({
        userId: reqUserId,
      });

      // Send response:
      return response.code(200).send({ data: results });
    } catch (e) {
      // Handle errors:
      const error = e as UserFriendlyError;
      console.error(error); // @todo: logging
      return response.code(error.statusCode ?? 500).send(error);
    }
  };
