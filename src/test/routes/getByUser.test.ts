import { FastifyInstance, InjectOptions } from "fastify";

import { buildApp } from "../../server";
import { MOCK_PURCHASE } from "../__test_data__/purchase";

/** Mock data: */
const mockRequestDetails: InjectOptions = {
  method: "GET",
  url: "/",
  query: {},
  payload: {},
  headers: {},
  cookies: {},
};

const mockPurchase = MOCK_PURCHASE;

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
    expect(res.json()).toEqual({
      data: [mockPurchase, mockPurchase, mockPurchase],
    });
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
