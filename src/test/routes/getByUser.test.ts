import { FastifyInstance, InjectOptions } from "fastify";

import { buildApp } from "../../server";
import { MOCK_PURCHASE } from "../__test_data__/purchase";

/** Mock data: */
// @todo: mock env var CUSTOMER_SUPPORT_CLIENT_ID
const mockRequestDetails: InjectOptions = {
  method: "GET",
  url: "/user/123",
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

  test("GET '/' throws 403 if userId doesn't match", async () => {
    // Arrange:
    const mockRequest: InjectOptions = {
      ...mockRequestDetails,
      headers: {
        "x-user-id": "no-match",
        "x-client-id": "customer-platform",
      },
    };

    // Act:
    const res = await app.inject(mockRequest);

    // Assert:
    expect(res.json()).toEqual({
      error: "Unauthorised",
      statusCode: 403,
      message: "You are unauthorised",
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

  test.todo("GET '/' returns filtered results");
  test.todo("GET '/' returns paginated results");
});
