import { MongoClient, ObjectId } from "mongodb";

import { Purchase } from "../../schemas/models/purchase";
import { Error404NotFound } from "../../schemas/http/errors";
import { MOCK_PURCHASE } from "../../test/__test_data__/purchase";

interface getAllByUserIdProps {
  userId: string;
}

export const buildPurchaseRepository = (dbClient: MongoClient) => {
  const collectionPurchase = dbClient.db("sample_supplies").collection("sales");

  const getByUserId = async ({ userId }: getAllByUserIdProps) => {
    try {
      const filter = { _id: new ObjectId(userId) };

      const purchases = await collectionPurchase.find(filter);

      return purchases.toArray();
    } catch (e) {
      throw new Error404NotFound();
    }
  };

  return { getByUserId };
};
