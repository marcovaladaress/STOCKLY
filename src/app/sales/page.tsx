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
    <div className="m-8 w-full space-y-8 overflow-auto rounded-lg bg-white p-8">
      <Header className="flex justify-between">
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

      <DataTable
        columns={SaleTablesColumns}
        data={JSON.parse(JSON.stringify(tableData))}
      />
    </div>
  );
};

export default Sales;
