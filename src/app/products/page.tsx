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
    <div className="m-8 w-full space-y-8 overflow-auto rounded-lg bg-white p-8">
      <Header>
        <HeaderLeft>
          <HeaderRight>Gestão de Produtos</HeaderRight>
          <HeaderTitle>Produtos</HeaderTitle>
        </HeaderLeft>
        <HeaderRight>
          <AddProductButton />
        </HeaderRight>
      </Header>
      <DataTable
        columns={productTableColumns}
        data={JSON.parse(JSON.stringify(products))}
      />
    </div>
  );
};

export default ProductsPage;
