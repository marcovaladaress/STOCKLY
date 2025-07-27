"server-only";

import { db } from "@/lib/prisma";


export const getTotalSales = async () =>{
  

    const totalSales = db.sale.count();

    return totalSales

}