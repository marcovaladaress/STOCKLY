"server-only";

import { db } from "@/lib/prisma";

export const getProductRevenue = async (): Promise<number> => {

  const totalProducts = db.product.count();

  return totalProducts;
};
