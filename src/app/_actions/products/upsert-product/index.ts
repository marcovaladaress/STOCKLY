"use server";

import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { upsertProductSchema } from "./schema";
import { actionClient } from "@/lib/safe-action";

export const upsertProduct = actionClient
  .schema(upsertProductSchema)
  .action(async ({ parsedInput: {id, ...data}}) => {
    upsertProductSchema.parse(data)
    await db.product.upsert({
      where: { id: id ?? "" },
      update: data,
      create: data,
    });
 
    revalidatePath("/products");
    revalidatePath("/")
  });
