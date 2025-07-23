"use client";


import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import UpsertProductDialogContent from "./upsert-dialog-content";





const AddProductButton = () => {

    const [dialogIsOpen, setDialogIsOpen] = useState(false)

  return (
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen} >
      <DialogTrigger asChild>
        <Button className="text-primary-foreground hover:bg-primary/70">
          <PlusIcon className="h-4 w-4" />
          Novo produto
        </Button>
      </DialogTrigger>
      <UpsertProductDialogContent setDialogIsOpen={setDialogIsOpen}/>
    </Dialog>
  );
};

export default AddProductButton;
