import { FastifyInstance } from "fastify";

import { buildApp } from "../index";

describe("Basic route test", () => {
  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.clearAllMocks());
  let app: FastifyInstance;

  beforeAll(async () => {
    app = await buildApp();
    await app.listen({ port: 8005 });
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  test("Valid GET '/' returns data", async () => {
    const res = await app.inject({
      method: "GET",
      url: "/",
      query: {},
      payload: {},
      headers: {},
      cookies: {},
    });

    expect(res.json()).toEqual({ data: [{ price: 3000 }] });
  });

  test("POST '/' is not found", async () => {
    const res = await app.inject({
      method: "POST",
      url: "/",
    });

    expect(res.json()).toEqual({
      error: "Not Found",
      statusCode: 404,
      message: "Route POST:/ not found",
    });
  });
});
