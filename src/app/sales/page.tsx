import { getProducts } from "../_data-acess/product/get-products";
import { ComboboxOption } from "@/components/combobax";
import UpsertSaleButton from "./_components/create-sale-button";
import { DataTable } from "../_components/data-table";
import { SaleTablesColumns } from "./_components/table-columns";
import { getSales } from "../_data-acess/sale/get-sales";
import Header, {
  HeaderLeft,
  HeaderRight,
  HeaderSubTitle,
  HeaderTitle,
} from "../_components/header";

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
    <div className="flex w-full flex-col space-y-6 overflow-auto  md:space-y-8 md:p-6 lg:p-8">
      <div className="rounded-lg bg-white p-4 md:p-6 lg:p-8">
        <Header className="flex gap-4 sm:flex-row justify-between items-center">
          <HeaderLeft>
            <HeaderSubTitle>Vendas</HeaderSubTitle>
            <HeaderTitle>Vendas</HeaderTitle>
          </HeaderLeft>
          <HeaderRight>
            <UpsertSaleButton
              products={JSON.parse(JSON.stringify(product))}
              productOptions={productOptions}
            />
          </HeaderRight>
        </Header>

        <div className="mt-4 md:mt-6">
          <DataTable
            columns={SaleTablesColumns}
            data={JSON.parse(JSON.stringify(tableData))}
          />
        </div>
      </div>
    </div>
  );
};

export default Sales;
