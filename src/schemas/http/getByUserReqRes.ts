export interface GetByUserRequest {
  Headers: { "x-user-id": string };

  Params: {
    userId?: string;
  };

  Querystring: {
    limit?: number;
  };

  Body: {};
}

export interface GetByUserResponse {
  Reply: {
    200: { success?: boolean; data: { price: number } };
  };
}
