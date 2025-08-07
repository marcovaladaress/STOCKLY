"use client"

import { useState } from "react";
import { LayoutDashboard, Package, ShoppingBasket, Menu, X } from "lucide-react";
import ButtonSideBar from "./button-sidebar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="lg:hidden border-b bg-white px-4 py-3">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">STOCKLY</h1>
        
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[280px] p-0">
            <div className="flex items-center justify-between p-6 border-b">
              <h1 className="text-xl font-bold">STOCKLY</h1>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
              >

              </Button>
            </div>
            <div className="flex flex-col gap-2 p-2">
              <ButtonSideBar href="/" onClick={() => setIsOpen(false)}>
                <LayoutDashboard size={20} />
                Dashboard
              </ButtonSideBar>

              <ButtonSideBar href="/products" onClick={() => setIsOpen(false)}>
                <Package size={20} />
                Products
              </ButtonSideBar>

              <ButtonSideBar href="/sales" onClick={() => setIsOpen(false)}>
                <ShoppingBasket size={20} />
                Vendas
              </ButtonSideBar>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default MobileNav;
