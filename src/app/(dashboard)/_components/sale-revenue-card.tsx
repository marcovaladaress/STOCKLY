

import { getTotalSales } from "@/app/_data-acess/dashboard/get-sales-revenue";
import SummaryCard, { SummaryCardIcon, SummaryCardTitle, SummaryCardValue } from "./summary-card";
import { CircleDollarSign } from "lucide-react";

const SaleRevenueCard = async () => {
const saleRevenue = await getTotalSales()

  return (
    <SummaryCard>
      <SummaryCardIcon>
        <CircleDollarSign />
      </SummaryCardIcon>
      <SummaryCardTitle>Vendas Totais</SummaryCardTitle>
      <SummaryCardValue>{saleRevenue}</SummaryCardValue>
    </SummaryCard>
  );
};

export default SaleRevenueCard;
