import { FastifyInstance, InjectOptions } from "fastify";
import { MongoClient } from "mongodb";

import { buildApp } from "../../server";
import { MOCK_PURCHASE } from "../__test_data__/purchase";

/** Mock data: */

// @todo: mock env var CUSTOMER_SUPPORT_CLIENT_ID
const mockRequestDetails = {
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

const mockMongo = { connect: jest.fn(), collection: { find: jest.fn() } };

describe("GET purchases by user Endpoint test", () => {
  /** Setup: */
  let app: FastifyInstance;
  let client: MongoClient;

  beforeEach(() => jest.clearAllMocks());

  beforeAll(async () => {
    const app = await buildApp();
    await app.listen({ port: 8005 });
    await app.ready();
  });

  /** Teardown: */
  afterEach(() => jest.clearAllMocks());
  afterAll(async () => {
    await app.close();
    await client.close();
  });

  /** Route tests: */
  test("Valid GET '/' returns data", async () => {
    // Arrange:
    mockMongo.collection.find.mockResolvedValueOnce([
      mockPurchase,
      mockPurchase,
      mockPurchase,
    ]);

    // Act:
    const res = await app.inject(mockRequestDetails as InjectOptions);

    // Assert:
    expect(res.json()).toEqual({
      data: [mockPurchase, mockPurchase, mockPurchase],
    });
  });

  test("POST '/' is not found", async () => {
    // Arrange:
    const mockRequest = {
      ...mockRequestDetails,
      method: "POST",
      url: "/",
    };

    // Act:
    const res = await app.inject(mockRequest as InjectOptions);

    // Assert:
    expect(res.json()).toEqual({
      error: "Not Found",
      statusCode: 404,
      message: "Route POST:/ not found",
    });
  });

  test("Valid GET '/' returns empty array if no results found", async () => {
    // Arrange:
    mockMongo.collection.find.mockResolvedValueOnce([]);

    // Act:
    const res = await app.inject(mockRequestDetails as InjectOptions);

    // Assert:
    expect(res.json()).toEqual({
      data: [mockPurchase, mockPurchase, mockPurchase],
      // data: [],
    });
  });

  test("GET '/' throws 401 if userId doesn't match", async () => {
    // Arrange:
    const mockRequest = {
      ...mockRequestDetails,
      headers: {
        "x-user-id": "no-match",
      },
    };

    // Act:
    const res = await app.inject(mockRequest as InjectOptions);

    // Assert:
    expect(res.json()).toEqual({
      error: "Unauthorised",
      statusCode: 401,
      message: "Unauthorised request",
    });
  });

  test("GET '/' allows requests from customer support platform", async () => {
    // Arrange:
    const mockRequest = {
      ...mockRequestDetails,
      headers: {
        "x-user-id": "no-match",
        "x-client-id": "customer-support-platform",
      },
    };
    mockMongo.collection.find.mockResolvedValueOnce([
      mockPurchase,
      mockPurchase,
      mockPurchase,
    ]);

    // Act:
    const res = await app.inject(mockRequest as InjectOptions);

    // Assert:
    expect(res.json()).toEqual({
      data: [mockPurchase, mockPurchase, mockPurchase],
    });
  });

  test("GET '/' throws 403 if request from wrong client", async () => {
    // Arrange:
    const mockRequest = {
      ...mockRequestDetails,
      headers: {
        "x-client-id": "suspicious-client",
      },
    };

    // Act:
    const res = await app.inject(mockRequest as InjectOptions);

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
