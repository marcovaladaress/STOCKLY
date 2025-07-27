import ProductStatusBadge from "@/app/_components/product-status-badge";
import { MostSoldProductDto } from "@/app/_data-acess/dashboard/get-dashboard";
import { formatCurrency } from "@/app/_helpers/currency";

interface MostSoldProductProps {
  product: MostSoldProductDto;
}

const MostSoldProductsItem = ({ product }: MostSoldProductProps) => {
  return (
    <div className="flex items-center justify-between  space-y-5">
      <div className="space-y-1">
        <ProductStatusBadge status={product.status}/>
        <p className="font-semibold">{product.name}</p>
        <p className="text-slate-500 font-medium">{formatCurrency(Number(product.price))}</p>
      </div>

      <div className="font-semibold text-sm">
        {product.totalSold} vendidos
      </div>
    </div>
  );
};

export default MostSoldProductsItem;
