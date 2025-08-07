"use client";


import { DayTotalRevenue } from "@/app/_data-acess/dashboard/get-last-14-days-revenue";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart";
import { CartesianGrid, BarChart, XAxis, Bar, ResponsiveContainer } from "recharts";

const chartConfig = {
  totalRevenue: {
    label: "Receita",
  },
} satisfies ChartConfig;

interface RevenueChartProps {
  data: DayTotalRevenue[];
}

const RevenueChart = ({ data }: RevenueChartProps) => {
  return (
    <div className="h-[300px] md:h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="day"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            fontSize={12}
          />
          <ChartTooltip />
          <Bar dataKey="totalRevenue" radius={4} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;
