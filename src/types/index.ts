export interface RouteRequest {
  Headers: {};

  Params: {
    userId?: string;
  };

  Querystring: {
    limit?: number;
  };

  Body: {};
}

export interface RouteReply {
  Reply: {
    200: { success?: boolean; data: { price: number } };
  };
}

export interface Model {
  price: number;
}
