import { FastifyInstance, InjectOptions } from "fastify";
import { MongoClient } from "mongodb";

import { buildApp } from "../../server";
import { MOCK_PURCHASE } from "../__test_data__/purchase";

/** Mock data: */
// @todo: mock env var CUSTOMER_SUPPORT_CLIENT_ID
const mockRequestDetails: InjectOptions = {
  method: "GET",
  url: "/user/123",
  query: {},
  payload: {},
  headers: {
    "x-user-id": "friend",
    "x-client-id": "shop",
  },
  cookies: {},
};

const mockPurchase = MOCK_PURCHASE;

describe("Basic route test", () => {
  /** Setup: */
  let app: FastifyInstance;
  beforeEach(() => jest.clearAllMocks());

  beforeAll(async () => {
    const dbClient = new MongoClient("");
    app = await buildApp(dbClient);
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

    // Act:
    const res = await app.inject(mockRequestDetails);

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

  test("Valid GET '/' returns empty array if no results found", async () => {
    // Arrange:
    // mock database.returns([])

    // Act:
    const res = await app.inject(mockRequestDetails);

    // Assert:
    expect(res.json()).toEqual({
      data: [mockPurchase, mockPurchase, mockPurchase],
      // data: [],
    });
  });

  test("GET '/' throws 401 if userId doesn't match", async () => {
    // Arrange:
    const mockRequest: InjectOptions = {
      ...mockRequestDetails,
      headers: {
        "x-user-id": "no-match",
      },
    };

    // Act:
    const res = await app.inject(mockRequest);

    // Assert:
    expect(res.json()).toEqual({
      error: "Unauthorised",
      statusCode: 401,
      message: "Unauthorised request",
    });
  });

  test("GET '/' allows requests from customer support platform", async () => {
    // Arrange:
    const mockRequest: InjectOptions = {
      ...mockRequestDetails,
      headers: {
        "x-user-id": "no-match",
        "x-client-id": "customer-support-platform",
      },
    };

    // Act:
    const res = await app.inject(mockRequest);

    // Assert:
    expect(res.json()).toEqual({
      data: [mockPurchase, mockPurchase, mockPurchase],
    });
  });

  test("GET '/' throws 403 if request from wrong client", async () => {
    // Arrange:
    const mockRequest: InjectOptions = {
      ...mockRequestDetails,
      headers: {
        "x-client-id": "suspicious-client",
      },
    };

    // Act:
    const res = await app.inject(mockRequest);

    // Assert:
    expect(res.json()).toEqual({
      error: "Forbidden",
      statusCode: 403,
      message: "Access denied",
    });
  });

  test.todo("GET '/' returns filtered results");
  test.todo("GET '/' returns paginated results");
});
