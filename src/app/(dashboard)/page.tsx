import Header, {
  HeaderLeft,
  HeaderSubTitle,
  HeaderTitle,
} from "../_components/header";
import { SummaryCardSkeleton } from "./_components/summary-card";
import { getDashboard } from "../_data-acess/dashboard/get-dashboard";
import MostSoldProductsItem from "./_components/most-sold-products-item";
import TotalRevenueCard from "./_components/total-revenue-card";
import { Suspense } from "react";
import TodayTotalRevenue from "./_components/today-revenue-card";
import SaleRevenueCard from "./_components/sale-revenue-card";
import TotalRevenueStock from "./_components/stock-revenue-card";
import TotalRevenueProduct from "./_components/produc-revenue-card";
import Last14DaysRevenueChart from "./_components/las-14-days-revenue";
import { Skeleton } from "@/components/ui/skeleton";

const Home = async () => {
  const { mostSoldProducts } = await getDashboard();

  return (
    <div className="m-8 flex w-full flex-col space-y-8 overflow-auto rounded-lg">
      <Header>
        <HeaderLeft>
          <HeaderSubTitle>Visão geral dos dados </HeaderSubTitle>
          <HeaderTitle>Dashboard</HeaderTitle>
        </HeaderLeft>
      </Header>

      <div className="grid grid-cols-2 gap-6">
        <Suspense fallback={<SummaryCardSkeleton />}>
          <TotalRevenueCard />
        </Suspense>
        <Suspense fallback={<SummaryCardSkeleton />}>
          <TodayTotalRevenue />
        </Suspense>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <Suspense fallback={<SummaryCardSkeleton />}>
          <SaleRevenueCard />
        </Suspense>

        <Suspense fallback={<SummaryCardSkeleton />}>
          <TotalRevenueStock />
        </Suspense>

        <Suspense fallback={<SummaryCardSkeleton />}>
          <TotalRevenueProduct />
        </Suspense>
      </div>
      <div className="grid min-h-0 grid-cols-[1.97fr_1fr] gap-6">
        <Suspense
          fallback={
            <Skeleton className="bg-white p-6">
              <div className="space-y-2">
                <div className="h-5 w-48 rounded-md bg-gray-200" />
                <div className="h-4 w-[86.26px] rounded-md bg-gray-200" />
              </div>
            </Skeleton>
          }
        >
          <Last14DaysRevenueChart />
        </Suspense>
        <div className="flex h-full flex-col space-y-4 overflow-hidden rounded-xl bg-white">
          <p className="p-6 text-xl font-semibold text-slate-900">
            Produtos mais Vendidos
          </p>

          <div className="overflow-y-auto px-6 pb-6">
            {mostSoldProducts.map((product) => (
              <MostSoldProductsItem key={product.productId} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
