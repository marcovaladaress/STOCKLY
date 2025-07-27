"server-only";

import { db } from "@/lib/prisma";

export const getProductRevenue = async (): Promise<number> => {
  await new Promise((resolve)=> setTimeout(resolve, 3000))
  const totalStock = await db.product.aggregate({
    _sum: {
      stock: true,
    },
  });

  return Number(totalStock._sum.stock);
};
