import { LayoutDashboard, Package, ShoppingBasket } from "lucide-react";
import ButtonSideBar from "./button-sidebar";

const Sidebar = () => {
  return (
    <div className="text-secondary-foreground w-[272px] bg-white">
      <div className="px-8 py-6">
        <h1 className="text-2xl font-bold">STOCKLY</h1>
      </div>
      <div className="flex flex-col gap-2 p-2">
        <ButtonSideBar href="/">
          <LayoutDashboard size={20} />
          Dashboard
        </ButtonSideBar>

        <ButtonSideBar href="/products">
          <Package size={20} />
          Products
        </ButtonSideBar>

        <ButtonSideBar href="/sales">
          <ShoppingBasket size={20} />
          Vendas
        </ButtonSideBar>
      </div>
    </div>
  );
};

export default Sidebar;
