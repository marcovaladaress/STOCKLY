import ProductStatusBadge from "@/app/_components/product-status-badge";
import { MostSoldProductDto } from "@/app/_data-acess/dashboard/get-most-sold-produc";

import { formatCurrency } from "@/app/_helpers/currency";

interface MostSoldProductProps {
  product: MostSoldProductDto;
}

const MostSoldProductsItem = ({ product }: MostSoldProductProps) => {
  return (
    <div className="flex items-center justify-between space-y-5">
      <div className="space-y-1">
        <ProductStatusBadge status={product.status} />
        <p className="font-semibold">{product.name}</p>
        <p className="font-medium text-slate-500">
          {formatCurrency(Number(product.price))}
        </p>
      </div>

      <div className="text-sm font-semibold">{product.totalSold} vendidos</div>
    </div>
  );
};

export const MostSoldProductItemSkeleton = () => {
  return (
    <div className="flex items-center justify-between pt-5">
      <div className="space-y-2">
        <div className="h-[22px] w-[91.23px] rounded-md bg-gray-200" />
        <div className="h-6 w-[91.23px] rounded-md bg-gray-200" />
        <div className="h-6 w-[105.23px] rounded-md bg-gray-200" />
      </div>

      <div>
        <div className="h-5 w-[105px] rounded-md bg-gray-200" />
      </div>
    </div>
  );
};

export default MostSoldProductsItem;
