import { getMostSoldProduct } from "@/app/_data-acess/dashboard/get-most-sold-produc";
import MostSoldProductsItem from "./most-sold-products-item";

const MostSoldProduct = async () => {
  const mostSoldProducts = await getMostSoldProduct();
  return (
    <div className="flex h-full flex-col space-y-3 md:space-y-4 overflow-hidden rounded-xl bg-white">
    <p className="p-4 md:p-6 text-lg md:text-xl font-semibold text-slate-900">
      Produtos mais Vendidos
    </p>

    <div className="overflow-y-auto px-4 md:px-6 pb-4 md:pb-6">
      {mostSoldProducts.map((product) => (
        <MostSoldProductsItem key={product.productId} product={product} />
      ))}
    </div>
  </div>
  );
}

export default MostSoldProduct;
