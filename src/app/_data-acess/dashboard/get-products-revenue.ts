"server-only";

import { db } from "@/lib/prisma";

export const getProductRevenue = async (): Promise<number> => {
  await new Promise((resolve)=> setTimeout(resolve, 1000))
  const totalProducts = db.product.count();

  return totalProducts;
};
