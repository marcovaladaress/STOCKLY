"use server";

import { db } from "@/lib/prisma";
import { upsertSaleSchema } from "./schema";
import { revalidatePath } from "next/cache";
import { actionClient } from "@/lib/safe-action";
import { returnValidationErrors } from "next-safe-action";

export const upsertSale = actionClient
  .schema(upsertSaleSchema)
  .action(async ({ parsedInput: { products, id } }) => {
    const isUpdate = Boolean(id);
    if (isUpdate) {
      const existingSale = await db.sale.findUnique({
        where: { id },
        include: { saleProducts : true },
      });
      if (!existingSale) return;
      await db.sale.delete({
        where: { id },
      });
          for (const product of existingSale.saleProducts) {
        await db.product.update({
          where: { id: product.productId },
          data: {
            stock: {
              increment: product.quantity,
            },
          },
        });
      }
    }

    const sale = await db.sale.create({
      data: {
        date: new Date(),
      },
    });

    for (const product of products) {
      const ProductFromDb = await db.product.findUnique({
        where: {
          id: product.id,
        },
      });
      if (!ProductFromDb) {
        returnValidationErrors(upsertSaleSchema, {
          _errors: ["Product not Found"],
        });
      }
      const productIsOutOfStock = product.quantity > ProductFromDb.stock;
      if (productIsOutOfStock) {
        returnValidationErrors(upsertSaleSchema, {
          _errors: ["Product out of stock"],
        });
      }

      await db.saleProduct.create({
        data: {
          saleId: sale.id,
          productId: product.id,
          quantity: product.quantity,
          unitPrice: ProductFromDb.price,
        },
      });
      await db.product.update({
        where: {
          id: product.id,
        },
        data: {
          stock: {
            decrement: product.quantity,
          },
        },
      });
    }

    revalidatePath("/products");
    revalidatePath("/sales")
    revalidatePath("/")
  });
