import { MOCK_PURCHASE } from "../test/__test_data__/purchase";
import { Purchase } from "../schemas/models/purchase";

interface getAllByUserIdProps {
  userId: string;
}

export const getByUserId = async ({
  userId,
}: getAllByUserIdProps): Promise<Purchase[]> => {
  return await Array(3).fill({ ...MOCK_PURCHASE, userId });
};
