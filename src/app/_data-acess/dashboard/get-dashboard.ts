"server-only";
import { db } from "@/lib/prisma";
import dayjs from "dayjs";


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
  totalLast14DaysRevenue: DayTotalRevenue[];
  mostSoldProducts: MostSoldProductDto[];
}
export const getDashboard = async (): Promise<GetDashboardDto> => {
  const today = dayjs().endOf("day").toDate();
  const last14Days = [13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0].map(
    (day) => {
      return dayjs(today).subtract(day, "day");
    },
  );
  const totalLast14DaysRevenue: DayTotalRevenue[] = [];
  for (const day of last14Days) {
    const dayRevenue = await db.$queryRawUnsafe<{ totalRevenue: number }[]>(
      `SELECT SUM("SaleProduct"."unitPrice" * "SaleProduct"."quantity") as "totalRevenue" FROM "SaleProduct"
       JOIN "Sale" ON "SaleProduct"."saleId" = "Sale"."id" WHERE "Sale"."date" >= $1 AND "Sale"."date" <= $2`,
      day.startOf("day").toDate(),
      day.endOf("day").toDate(),
    );
    totalLast14DaysRevenue.push({
      day: day.format("DD/MM"),
      totalRevenue: Number(dayRevenue[0]?.totalRevenue) || 0,
    });
  }


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
    totalLast14DaysRevenue,
    mostSoldProducts: mostSoldProducts.map((product) => ({
      ...product,
      totalSold: Number(product.totalSold),
      price: Number(product.price),
      status: product.stock > 0 ? "IN_STOCK" : "OUT_OF_STOCK",
    })),
  };
};
