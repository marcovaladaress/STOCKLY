"server-only";
import { db } from "@/lib/prisma";


export interface DayTotalRevenue {
  day: string;
  totalRevenue: number;
}
export interface MostSoldProductDto {
  productId: string;
  name: string;
  totalSold: number;
  status: "IN_STOCK" | "OUT_OF_STOCK";
  price: number;
}

interface GetDashboardDto {

  mostSoldProducts: MostSoldProductDto[];
}
export const getDashboard = async (): Promise<GetDashboardDto> => {

  const mostSolProductsQuery = `SELECT "Product"."name", SUM ("SaleProduct"."quantity") as "totalSold", "Product"."price", "Product"."stock",
"Product"."id" as "productId"
FROM "SaleProduct"
JOIN "Product" ON "SaleProduct"."productId" = "Product"."id"
GROUP BY "Product"."name", "Product"."price", "Product"."stock", "Product"."id"
ORDER BY "totalSold" DESC
LIMIT 5;
`;
  const mostSoldProductsPromise =
    await db.$queryRawUnsafe<
      {
        productId: string;
        name: string;
        totalSold: number;
        stock: number;
        price: number;
      }[]
    >(mostSolProductsQuery);

  const [
    mostSoldProducts,
  ] = await Promise.all([
    mostSoldProductsPromise,
  ]);

  return {
  
    mostSoldProducts: mostSoldProducts.map((product) => ({
      ...product,
      totalSold: Number(product.totalSold),
      price: Number(product.price),
      status: product.stock > 0 ? "IN_STOCK" : "OUT_OF_STOCK",
    })),
  };
};
