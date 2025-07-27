import { getProductRevenue } from "@/app/_data-acess/dashboard/get-stock-revenue";
import SummaryCard, {
  SummaryCardIcon,
  SummaryCardTitle,
  SummaryCardValue,
} from "./summary-card";
import { PackageIcon } from "lucide-react";

const TotalRevenueStock = async () => {
  const totalStock = await getProductRevenue();
  return (
    <SummaryCard>
    <SummaryCardIcon>
      <PackageIcon />
    </SummaryCardIcon>
    <SummaryCardTitle>Total em Estoque</SummaryCardTitle>
    <SummaryCardValue>{totalStock}</SummaryCardValue>
  </SummaryCard>
  );
};

export default TotalRevenueStock;
