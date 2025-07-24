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
import { Sale } from "@/generated/prisma";
import {
  MoreHorizontalIcon,
  ClipboardCopy,
  EditIcon,
  TrashIcon,
} from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";

interface SaleTableDropdownMenuProps {
  sale: Pick<Sale, "id">;
}

const SaleTableDropdownMenu = ({ sale }: SaleTableDropdownMenuProps) => {
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
          <DropdownMenuItem>
            <EditIcon size={16} />
            Editar
          </DropdownMenuItem>
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
  );
};

export default SaleTableDropdownMenu;
