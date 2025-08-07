"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { PlusIcon } from "lucide-react";
import UpsertSheetContent from "./upsert-sheet-content";
import { Product } from "@/generated/prisma";
import { ComboboxOption } from "@/components/combobax";
import { useState } from "react";

interface UpsertSaleButtonProps {
  products: Product[];
  productOptions: ComboboxOption[];
}

const UpsertSaleButton = (props: UpsertSaleButtonProps) => {
  const [sheetIsOpen, setSheetIsOpen] = useState(false);

  return (
    <Sheet open={sheetIsOpen} onOpenChange={setSheetIsOpen}>
      <SheetTrigger asChild>
        <Button className="w-full sm:w-auto">
          <PlusIcon className="h-4 w-4" />
          <span className="ml-2">Nova Venda</span>
        </Button>
      </SheetTrigger>
      <UpsertSheetContent
        {...props}
        setSheetIsOpen={() => setSheetIsOpen(false)}
        isOpen={sheetIsOpen}
      />
    </Sheet>
  );
};

export default UpsertSaleButton;
