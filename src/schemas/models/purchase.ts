export interface Item {
  id: string;
  title: string;
  brand: string;
  imgUrl: string;
  pricePerUnitPence: number;
  currency: string;
  quantity: number;
  priceTotalPence: number;
}

export interface Purchase {
  id: string;
  userId: string;
  status: string;

  items: Item[];

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
