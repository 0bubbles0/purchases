import { ObjectId } from "mongodb";
import { Purchase, PurchaseV2 } from "../../schemas/models/purchase";

export const MOCK_PURCHASE_V2: PurchaseV2 = {
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

export const MOCK_PURCHASE: Purchase = {
  _id: new ObjectId("5bd761dcae323e45a93cd014"),
  saleDate: new Date("2015-06-04T14:24:26.136Z"),

  items: [
    {
      name: "laptop",
      tags: ["electronics", "school", "office"],
      price: 881,
      quantity: 1,
    },
    {
      name: "pens",
      tags: ["writing", "office", "school", "stationary"],
      price: 12.34,
      quantity: 3,
    },
    {
      name: "notepad",
      tags: ["office", "writing", "school"],
      price: 15.07,
      quantity: 5,
    },
  ],
  storeLocation: "New York",
  customer: {
    gender: "F",
    age: 52,
    email: "citga@fo.pg",
    satisfaction: 5,
  },
  couponUsed: false,
  purchaseMethod: "In store",
};
