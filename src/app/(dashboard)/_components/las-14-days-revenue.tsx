import { getLast14DaysRevenue } from "@/app/_data-acess/dashboard/get-last-14-days-revenue";
import RevenueChart from "./revenue-chart";

const Last14DaysRevenueChart = async () => {

    const totalLast14DaysRevenue = await getLast14DaysRevenue()
    return ( 
        <div className="flex h-full flex-col overflow-hidden rounded-xl bg-white p-6">
        <p className="text-xl font-semibold text-slate-900">Receita</p>
        <p className="text-sm text-slate-400">Últimos 14 dias</p>
        <RevenueChart data={totalLast14DaysRevenue} />
      </div>

     );
}
 
export default Last14DaysRevenueChart;