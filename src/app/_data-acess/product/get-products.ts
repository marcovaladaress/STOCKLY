import "server-only";

import { Product } from "@/generated/prisma";
import { db } from "@/lib/prisma";

export const getProducts = async (): Promise<Product[]> => {
  return db.product.findMany({});
};
