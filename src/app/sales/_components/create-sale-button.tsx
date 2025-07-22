'use client'

import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { PlusIcon } from "lucide-react";
import UpsertSheetContent from "./upsert-sheet-content";
import { Product } from "@/generated/prisma";
import { ComboboxOption } from "@/components/combobax";
import { useState } from "react";

interface CreateSaleButtonProps {
    products: Product[];
    productOptions: ComboboxOption[];
  }

const CreateSaleButton = (props: CreateSaleButtonProps) => {
  const [sheetIsOpen, setSheetIsOpen] = useState (false);

  return (
    <Sheet open ={sheetIsOpen} onOpenChange={setSheetIsOpen}>
      <SheetTrigger asChild>
        <Button>
          <PlusIcon />
          Nova Venda
        </Button>
      </SheetTrigger>
      <UpsertSheetContent
       {...props}
       setSheetIsOpen={() => setSheetIsOpen (false)}
      />
    </Sheet>
  );
};

export default CreateSaleButton;
