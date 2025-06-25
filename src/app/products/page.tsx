
import { productTableColumns } from "./_components/table-columns";
import { DataTable } from "../_components/data-table";
import { getProducts } from "../_data-acess/product/get-products";
import AddProductButton from "./_components/add-product-button";

const ProductsPage = async () => {
  const products = await getProducts();
  return (
    <div className="m-8 w-full space-y-8 rounded-lg bg-white p-8">
      <div className="flex w-full items-center justify-between">
        <div className="space-y-1">
          <span className="text-muted-foreground text-xs font-semibold">
            Gestão de produtos
          </span>
          <h1 className="text-2xl font-bold">Produtos</h1>
        </div>
       <AddProductButton/>
      </div>
      <DataTable
        columns={productTableColumns}
        data={JSON.parse(JSON.stringify(products))}
      />
    </div>
  );
};

export default ProductsPage;
