"use client";


import { DayTotalRevenue } from "@/app/_data-acess/dashboard/get-last-14-days-revenue";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart";
import { CartesianGrid, BarChart, XAxis, Bar } from "recharts";

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
    <ChartContainer config={chartConfig} className="min-h-0 min-w-full">
      <BarChart data={data}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="day"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <ChartTooltip />
        <Bar dataKey="totalRevenue" radius={4} />
      </BarChart>
    </ChartContainer>
  );
};

export default RevenueChart;
