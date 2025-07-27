"server-only";

import { db } from "@/lib/prisma";


export const getTotalSales = async () =>{
  
    await new Promise((resolve)=> setTimeout(resolve, 3000))
    const totalSales = db.sale.count();

    return totalSales

}