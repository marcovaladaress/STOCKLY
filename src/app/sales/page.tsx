import { getProducts } from "../_data-acess/product/get-products";
import { ComboboxOption } from "@/components/combobax";
import CreateSaleButton from "./_components/create-sale-button";

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
       <CreateSaleButton products={JSON.parse(JSON.stringify(product))} productOptions={productOptions} />
      </div>
    </div>
  );
};

export default Sales;
