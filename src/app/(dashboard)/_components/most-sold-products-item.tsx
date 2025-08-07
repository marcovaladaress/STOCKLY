import ProductStatusBadge from "@/app/_components/product-status-badge";
import { MostSoldProductDto } from "@/app/_data-acess/dashboard/get-most-sold-produc";

import { formatCurrency } from "@/app/_helpers/currency";

interface MostSoldProductProps {
  product: MostSoldProductDto;
}

const MostSoldProductsItem = ({ product }: MostSoldProductProps) => {
  return (
    <div className="flex items-center justify-between space-y-3 md:space-y-5 py-2">
      <div className="space-y-1 flex-1 min-w-0">
        <ProductStatusBadge status={product.status} />
        <p className="font-semibold text-sm md:text-base truncate">{product.name}</p>
        <p className="font-medium text-slate-500 text-xs md:text-sm">
          {formatCurrency(Number(product.price))}
        </p>
      </div>

      <div className="text-xs md:text-sm font-semibold ml-2 flex-shrink-0">{product.totalSold} vendidos</div>
    </div>
  );
};

export const MostSoldProductItemSkeleton = () => {
  return (
    <div className="flex items-center justify-between pt-3 md:pt-5 py-2">
      <div className="space-y-2 flex-1">
        <div className="h-[22px] w-[91.23px] rounded-md bg-gray-200" />
        <div className="h-5 md:h-6 w-[91.23px] rounded-md bg-gray-200" />
        <div className="h-5 md:h-6 w-[105.23px] rounded-md bg-gray-200" />
      </div>

      <div className="ml-2">
        <div className="h-4 md:h-5 w-[105px] rounded-md bg-gray-200" />
      </div>
    </div>
  );
};

export default MostSoldProductsItem;
