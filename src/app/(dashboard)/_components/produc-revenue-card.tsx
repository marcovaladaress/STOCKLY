import { ShoppingBasket } from "lucide-react";
import SummaryCard, { SummaryCardIcon, SummaryCardTitle, SummaryCardValue } from "./summary-card";
import { getProductRevenue } from "@/app/_data-acess/dashboard/get-products-revenue";

const TotalRevenueProduct = async () => {

    const totalProduct = await getProductRevenue()
    return (  
        <SummaryCard>
        <SummaryCardIcon>
          <ShoppingBasket />
        </SummaryCardIcon>
        <SummaryCardTitle>Produtos</SummaryCardTitle>
        <SummaryCardValue>{totalProduct}</SummaryCardValue>
      </SummaryCard>
    );
}
 
export default TotalRevenueProduct;
