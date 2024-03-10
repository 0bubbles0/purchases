import { Purchase } from "../../schemas/models/purchase";

export const MOCK_PURCHASE: Purchase = {
  id: "",
  userId: "",
  status: "Delivered",

  items: [
    {
      id: "123",
      title: "",
      brand: "",
      imgUrl: "cdn.aws.com/img-123",
      pricePerUnitPence: 1000,
      currency: "GBP",
      quantity: 3,
      priceTotalPence: 3000,
    },
  ],

  pricePence: 3000,
  currency: "GBP",
  datePurchased: new Date("2023-12-10"),

  payment: {
    method: "Card",
    lastDigits: "1234",
    receiptUrl: "cdn.aws.com/file-123",
  },

  delivery: {
    method: "Store",
    storeLocation: "London Regent Street",
    dateDelivered: new Date("2023-12-23"),
  },
};
