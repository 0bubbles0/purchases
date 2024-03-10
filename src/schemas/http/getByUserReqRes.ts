export interface GetByUserRequest {
  Headers: {};

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
