"use client";

import { deleteSale } from "@/app/_actions/sales/delete-sale";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { Product } from "@/generated/prisma";
import {
  MoreHorizontalIcon,
  ClipboardCopy,
  EditIcon,
  TrashIcon,
} from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import UpsertSheetContent from "./upsert-sheet-content";
import { useState } from "react";
import { ComboboxOption } from "@/components/combobax";
import { GetSalesDto } from "@/app/_data-acess/sale/get-sales";

interface SaleTableDropdownMenuProps {
  sale: Pick<GetSalesDto, "id" | "saleProducts">;
  productOptions: ComboboxOption[];
  products: Product[];
}

const SaleTableDropdownMenu = ({
  sale,
  products,
  productOptions,
}: SaleTableDropdownMenuProps) => {
  const [upsertSheetIsOpen, setUpsertSheetIsOpen] = useState(false);

  const { execute } = useAction(deleteSale, {
    onSuccess: () => {
      toast.success("Venda deletada com sucesso");
    },
    onError: () => {
      toast.error("Erro ao deletar a venda");
    },
  });

  const handleCopyToClipboardClick = () => {
    navigator.clipboard.writeText(sale.id);
    toast.success("ID copiado para a área de transferência.");
  };

  const handleConfirmDeleteClick = () => {
    execute({ id: sale.id });
    toast.success("Venda deletada com sucesso");
  };
  return (
    <Sheet open={upsertSheetIsOpen} onOpenChange={setUpsertSheetIsOpen}>
      <AlertDialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">
              <MoreHorizontalIcon size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={handleCopyToClipboardClick}>
              <ClipboardCopy size={16} />
              Copiar Id
            </DropdownMenuItem>
            <SheetTrigger asChild>
              <DropdownMenuItem>
                <EditIcon size={16} />
                Editar
              </DropdownMenuItem>
            </SheetTrigger>
            <AlertDialogTrigger>
              <DropdownMenuItem>
                <TrashIcon size={16} />
                Deletar
              </DropdownMenuItem>
            </AlertDialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Voçe tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              Você esta prestes a excluir esta venda. Esta ação não pode ser
              desfeita. Deseja continuar ?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDeleteClick}>
              Continuar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <UpsertSheetContent
        isOpen={upsertSheetIsOpen}
        saleId={sale.id}
        productOptions={productOptions}
        products={products}
        setSheetIsOpen={setUpsertSheetIsOpen}
        defaultSelectedProducts={sale.saleProducts.map((saleProduct) => ({
          id: saleProduct.productId,
          quantity: saleProduct.quantity,
          name: saleProduct.productName,
          price: saleProduct.unitPrice,
        }))}
      />
    </Sheet>
  );
};

export default SaleTableDropdownMenu;
