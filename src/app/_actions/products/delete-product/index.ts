"use server";

import { db } from "@/lib/prisma";
import { deleteProductSchema } from "./schema";
import { revalidatePath } from "next/cache";
import { actionClient } from "@/lib/safe-action";

export const deleteProduct = actionClient
  .schema(deleteProductSchema)
  .action(async ({ parsedInput: {id} }) => {
    await db.product.delete({
      where: {
        id,
      },
    });
    revalidatePath("/products");
  });


