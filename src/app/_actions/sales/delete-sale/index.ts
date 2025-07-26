"use server"

import { actionClient } from "@/lib/safe-action";
import { deleteSaleSchema } from "./schema";
import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const deleteSale = actionClient
  .schema(deleteSaleSchema)
  .action( async ({ parsedInput: { id } }) => {
    const sale = await db.sale.findUnique({
      where:{
        id,
      },
      include:{
        products: true
      }
    });
    if(!sale) return
    await db.sale.delete({
        where:{
            id
        }
    })
    for (const product of sale.products){
      await db.product.update({
        where:{
          id:product.productId,
        },
        data:{
          stock:{
            increment: product.quantity
          }
        }
      })
    }
    revalidatePath("/sales")
    revalidatePath("/products")
    revalidatePath("/")
  });
