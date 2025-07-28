import { db } from "@/lib/prisma";



export interface MostSoldProductDto {
    productId: string;
    name: string;
    totalSold: number;
    status: "IN_STOCK" | "OUT_OF_STOCK";
    price: number;
  }
  

export const getMostSoldProduct = async (): Promise<MostSoldProductDto[]> =>{

    await new Promise((resolve)=> setTimeout(resolve,3000))
    const mostSolProductsQuery = `SELECT "Product"."name", SUM ("SaleProduct"."quantity") as "totalSold", "Product"."price", "Product"."stock",
    "Product"."id" as "productId"
    FROM "SaleProduct"
    JOIN "Product" ON "SaleProduct"."productId" = "Product"."id"
    GROUP BY "Product"."name", "Product"."price", "Product"."stock", "Product"."id"
    ORDER BY "totalSold" DESC
    LIMIT 5;
    `;
      const mostSoldProducts =
        await db.$queryRawUnsafe<
          {
            productId: string;
            name: string;
            totalSold: number;
            stock: number;
            price: number;
          }[]
        >(mostSolProductsQuery);
    
        return mostSoldProducts.map((product) => ({
            ...product,
            totalSold: Number(product.totalSold),
            price: Number(product.price),
            status: product.stock > 0 ? "IN_STOCK" : "OUT_OF_STOCK",
          }))
}