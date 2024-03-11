import { ObjectId } from "mongodb";

export interface ItemV2 {
  id: string;
  title: string;
  brand: string;
  imgUrl: string;
  pricePerUnitPence: number;
  currency: string;
  quantity: number;
  priceTotalPence: number;
}

// @todo: update to Mongo schema

export interface PurchaseV2 {
  id: string;
  userId: string;
  status: string;

  items: ItemV2[];

  pricePence: number;
  currency: string;
  datePurchased: Date;

  payment: {
    method: string;
    lastDigits?: string;
    receiptUrl: string;
  };

  delivery: {
    method: string;
    storeLocation?: string;
    dateDelivered: Date | null;
  };
}

interface Item {
  name: string;
  price: number;
  quantity: number;
  tags: string[];
}

export interface Purchase {
  _id: ObjectId;
  saleDate: Date;
  storeLocation: string;
  customer: {
    gender: string;
    age: number;
    email: string;
    satisfaction: number;
  };
  items: Item[];
  couponUsed: boolean;
  purchaseMethod: string;
}
