import { productTableColumns } from "./_components/table-columns";
import { DataTable } from "../_components/data-table";
import { getProducts } from "../_data-acess/product/get-products";
import AddProductButton from "./_components/add-product-button";
import Header, {
  HeaderLeft,
  HeaderRight,
  HeaderTitle,
} from "../_components/header";

const ProductsPage = async () => {
  const products = await getProducts();
  return (
    <div className="w-full space-y-6 overflow-auto p-0 mt-3   md:space-y-8 md:p-6 lg:p-8">
      <div className="rounded-lg bg-white p-4 md:p-6 lg:p-8">
        <Header className="items-center gap-4 sm:flex-row sm:justify-between">
          <HeaderLeft>
            <HeaderRight>Gestão de Produtos</HeaderRight>
            <HeaderTitle>Produtos</HeaderTitle>
          </HeaderLeft>
          <HeaderRight>
            <AddProductButton />
          </HeaderRight>
        </Header>
        <div className="mt-6">
          <DataTable
            columns={productTableColumns}
            data={JSON.parse(JSON.stringify(products))}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
