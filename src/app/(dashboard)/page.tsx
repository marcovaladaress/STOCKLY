import Header, {
  HeaderLeft,
  HeaderSubTitle,
  HeaderTitle,
} from "../_components/header";
import { SummaryCardSkeleton } from "./_components/summary-card";
import TotalRevenueCard from "./_components/total-revenue-card";
import { Suspense } from "react";
import TodayTotalRevenue from "./_components/today-revenue-card";
import SaleRevenueCard from "./_components/sale-revenue-card";
import TotalRevenueStock from "./_components/stock-revenue-card";
import TotalRevenueProduct from "./_components/produc-revenue-card";
import Last14DaysRevenueChart from "./_components/las-14-days-revenue";
import { Skeleton } from "@/components/ui/skeleton";
import MostSoldProduct from "./_components/most-sold-product";
import { MostSoldProductItemSkeleton } from "./_components/most-sold-products-item";

const Home = async () => {
  return (
    <div className="flex w-full flex-col space-y-6 overflow-auto p-4 md:space-y-8 md:p-6 lg:p-8">
      <Header>
        <HeaderLeft>
          <HeaderSubTitle>Visão geral dos dados </HeaderSubTitle>
          <HeaderTitle>Dashboard</HeaderTitle>
        </HeaderLeft>
      </Header>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
        <Suspense fallback={<SummaryCardSkeleton />}>
          <TotalRevenueCard />
        </Suspense>
        <Suspense fallback={<SummaryCardSkeleton />}>
          <TodayTotalRevenue />
        </Suspense>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
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
      <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-[1.97fr_1fr]">
        <Suspense
          fallback={
            <Skeleton className="bg-white p-4 md:p-6">
              <div className="space-y-2">
                <div className="h-5 w-48 rounded-md bg-gray-200" />
                <div className="h-4 w-[86.26px] rounded-md bg-gray-200" />
              </div>
            </Skeleton>
          }
        >
          <Last14DaysRevenueChart />
        </Suspense>
        <Suspense
          fallback={
            <Skeleton className="bg-white p-4 md:p-6">
              <div className="space-y-2">
                <div className="h-5 w-48 rounded-md bg-gray-200" />
                <div className="h-4 w-[86.26px] rounded-md bg-gray-200" />
              </div>
              <MostSoldProductItemSkeleton />
              <MostSoldProductItemSkeleton />
              <MostSoldProductItemSkeleton />
            </Skeleton>
          }
        >
          <MostSoldProduct />
        </Suspense>
      </div>
    </div>
  );
};

export default Home;
