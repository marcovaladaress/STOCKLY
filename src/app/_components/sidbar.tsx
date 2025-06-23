import { Button } from "@/components/ui/button";
import { LayoutDashboard, Package, ShoppingBasket } from "lucide-react";
import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="text-primary w-[272px] bg-white">
      <div className="px-8 py-6">
        <h1 className="text-2xl font-bold">STOCKLY</h1>
      </div>
      <div className="flex flex-col gap-2">
        <Button variant="ghost" className="w-full justify-start px-8 py-4 ">
          <Link href="/" className="flex items-center gap-1.5">
            <LayoutDashboard size={20} />
            Dashboard
          </Link>
        </Button>
        <Button variant="ghost" className=" w-full justify-start px-8 py-4">
          <Link href="/products" className="flex items-center gap-1.5">
            <Package size={20} />
            Products
          </Link>
        </Button>
        <Button variant="ghost" className="w-full justify-start px-8 py-4">
          <Link href="/sales" className="flex items-center gap-1.5">
            <ShoppingBasket size={20} />
            Vendas
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
