"use server";

import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { UpsertProductSchema, upsertProductSchema } from "./schema";


export const upsertProduct = async (data: UpsertProductSchema) => {
  upsertProductSchema.parse(data);
  await db.product.upsert({
    where: { id: data?.id ?? "" },
    update: data,
    create: data,
    
  });

  revalidatePath("/products");
};
