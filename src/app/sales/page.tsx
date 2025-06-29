import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { PlusIcon } from "lucide-react";
import UpsertSheetContent from "./_components/upsert-sheet-content";
import { getProducts } from "../_data-acess/product/get-products";
import { ComboboxOption } from "@/components/combobax";

const Sales = async () => {
  const product = await getProducts();
  const productOptions: ComboboxOption[] = product.map(product => ({
    label:product.name,
    value:product.id,
  }))
  return (
    <div className="m-8 w-full space-y-8 overflow-auto rounded-lg bg-white p-8">
      <div className="flex w-full items-center justify-between">
        <div className="space-y-1">
          <span className="text-muted-foreground text-xs font-semibold">
            Vendas
          </span>
          <h1 className="text-2xl font-bold">Vendas</h1>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button>
              <PlusIcon />
              Nova Venda
            </Button>
          </SheetTrigger>
          <UpsertSheetContent productOptions={productOptions}  products={JSON.parse(JSON.stringify(product))}/>
        </Sheet>
      </div>
    </div>
  );
};

export default Sales;
