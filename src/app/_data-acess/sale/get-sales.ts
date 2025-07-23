import { db } from "@/lib/prisma";

export interface GetSalesDto {
  id: string;
  productNames: string;
  totalProducts: number;
  totalAmount: number;
  date: Date;
}

export const getSales = async (): Promise<GetSalesDto[]> => {
  const sales = await db.sale.findMany({
    include: {
      products: {
        include: {
          product: true,
        },
      },
    },
  });

  return sales.map((sale) => ({
    id: sale.id,
    date: sale.date,
    productNames: sale.products
      .map((saleProduct) => saleProduct.product.name)
      .join(" • "),
    totalAmount: sale.products.reduce(
      (acc, saleProduct) =>
        acc + saleProduct.quantity * Number(saleProduct.unitPrice),
      0,
    ),
    totalProducts: sale.products.reduce(
      (acc, saleProduct) => acc + saleProduct.quantity,
      0,
    ),
  }));
};
