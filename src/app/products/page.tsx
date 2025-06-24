import { Button } from "@/components/ui/button";

import { db } from "@/lib/prisma";
import { PlusIcon } from "lucide-react";
import { productTableColumns } from "./_components/table-columns";
import { DataTable } from "../_components/data-table";

const ProductsPage = async () => {
  const products = await db.product.findMany({});
  return (
    <div className="m-8 w-full space-y-8 bg-white p-8 rounded-lg">
      <div className="flex w-full items-center justify-between">
        <div className="space-y-1">
          <span className="text-muted-foreground text-xs font-semibold">
            Gestão de produtos
          </span>
          <h1 className="text-2xl font-bold">Produtos</h1>
        </div>
        <Button className="text-primary-foreground hover:bg-primary/70">
          <PlusIcon className="h-4 w-4" />
          Novo produto
        </Button>
      </div>
      <DataTable columns={productTableColumns} data={products} />
    </div>
  );
};

export default ProductsPage;
