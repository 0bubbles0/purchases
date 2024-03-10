import { FastifyInstance, InjectOptions } from "fastify";

import { buildApp } from "../server";

/** Mock data: */
const mockRequestDetails: InjectOptions = {
  method: "GET",
  url: "/",
  query: {},
  payload: {},
  headers: {},
  cookies: {},
};

describe("Basic route test", () => {
  /** Setup: */
  let app: FastifyInstance;
  beforeEach(() => jest.clearAllMocks());

  beforeAll(async () => {
    app = await buildApp();
    await app.listen({ port: 8005 });
    await app.ready();
  });

  /** Teardown: */
  afterEach(() => jest.clearAllMocks());
  afterAll(async () => {
    await app.close();
  });

  /** Route tests: */
  test("Valid GET '/' returns data", async () => {
    // Arrange:
    const mockRequest: InjectOptions = {
      ...mockRequestDetails,
      method: "GET",
      url: "/",
    };

    // Act:
    const res = await app.inject(mockRequest);

    // Assert:
    expect(res.json()).toEqual({ data: [{ price: 3000 }] });
  });

  test("POST '/' is not found", async () => {
    // Arrange:
    const mockRequest: InjectOptions = {
      ...mockRequestDetails,
      method: "POST",
      url: "/",
    };

    // Act:
    const res = await app.inject(mockRequest);

    // Assert:
    expect(res.json()).toEqual({
      error: "Not Found",
      statusCode: 404,
      message: "Route POST:/ not found",
    });
  });
});
