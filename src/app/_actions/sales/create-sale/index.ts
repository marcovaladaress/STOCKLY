"use server";

import { db } from "@/lib/prisma";
import { createSaleSchema } from "./schema";
import { revalidatePath } from "next/cache";
import { actionClient } from "@/lib/safe-action";
import { returnValidationErrors } from "next-safe-action";

export const createSale = actionClient
  .schema(createSaleSchema)
  .action(async ({ parsedInput: { products } }) => {
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
       returnValidationErrors(createSaleSchema, {
        _errors: ["Product not Found"],
       });
      }
      const productIsOutOfStock = product.quantity > ProductFromDb.stock;
      if (productIsOutOfStock) {
        returnValidationErrors(createSaleSchema, {
            _errors: ["Product out of stock"],
        })
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
  });
