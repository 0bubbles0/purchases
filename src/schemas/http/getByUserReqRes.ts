import { Purchase } from "../models/purchase";
import { UserFriendlyError } from "./errors";
/** Instead of Typebox (very verbose), use both TypeScript & JSON for now */

// TypeScript for internal dev work:
export interface GetByUserRequest {
  Headers: {
    "x-user-id": string;
    "x-client-id": string;
  };

  Params: {
    userId: string;
  };

  Querystring: {
    pagination?: number;
    filter?: string;
  };

  Body: {};
}

export interface GetByUserResponse {
  Reply: {
    200: { success?: boolean; data: Purchase[] };
    400: typeof UserFriendlyError;
    401: typeof UserFriendlyError;
    403: typeof UserFriendlyError;
    404: typeof UserFriendlyError;
    500: typeof UserFriendlyError;
  };
}

// For API JSON schema validation:
const headersJsonSchema = {
  type: "object",
  properties: {
    "x-user-id": { type: "string" },
    "x-client-id": { type: "string" },
  },
  required: ["x-user-id", "x-client-id"],
};

const paramsJsonSchema = {
  type: "object",
  properties: { userId: { type: "string" } },
  required: ["userId"],
};

const queryStringJsonSchema = {
  type: "object",
  properties: {
    pagination: { type: "integer" },
    filter: { type: "string" },
  },
};

export const getByUserJsonSchema = {
  querystring: queryStringJsonSchema,
  params: paramsJsonSchema,
  headers: headersJsonSchema,
};
