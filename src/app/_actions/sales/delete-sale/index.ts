"use server"

import { actionClient } from "@/lib/safe-action";
import { deleteSaleSchema } from "./schema";
import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const deleteSale = actionClient
  .schema(deleteSaleSchema)
  .action( async ({ parsedInput: { id } }) => {
    await db.sale.delete({
        where:{
            id
        }
    })
    revalidatePath("/sales")
  });
