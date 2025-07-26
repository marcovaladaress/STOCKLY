import { getProducts } from "../_data-acess/product/get-products";
import { ComboboxOption } from "@/components/combobax";
import UpsertSaleButton from "./_components/create-sale-button";
import { DataTable } from "../_components/data-table";
import { SaleTablesColumns } from "./_components/table-columns";
import { getSales } from "../_data-acess/sale/get-sales";

const Sales = async () => {
  const sale = await getSales();
  const product = await getProducts();
  const productOptions: ComboboxOption[] = product.map((product) => ({
    label: product.name,
    value: product.id,
  }));

  const tableData = sale.map((sale) => ({
    ...sale,
    products: product, 
    productOptions,
  }));

  return (
    <div className="m-8 w-full space-y-8 overflow-auto rounded-lg bg-white p-8">
      <div className="flex w-full items-center justify-between">
        <div className="space-y-1">
          <span className="text-muted-foreground text-xs font-semibold">
            Vendas
          </span>
          <h1 className="text-2xl font-bold">Vendas</h1>
        </div>
        <UpsertSaleButton
          products={JSON.parse(JSON.stringify(product))}
          productOptions={productOptions}
        />
      </div>
      <DataTable
        columns={SaleTablesColumns}
        data={JSON.parse(JSON.stringify(tableData))}
      />
    </div>
  );
};

export default Sales;
