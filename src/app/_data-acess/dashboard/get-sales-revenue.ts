"server-only";

import { db } from "@/lib/prisma";


export const getTotalSales = async () =>{
  
    await new Promise((resolve)=> setTimeout(resolve, 1000))
    const totalSales = db.sale.count();

    return totalSales

}