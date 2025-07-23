import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Product } from "@/generated/prisma";
import {
  MoreHorizontalIcon,
  ClipboardCopy,
  EditIcon,
  TrashIcon,
} from "lucide-react";
import { useState } from "react";
import DeleteProductDialogContent from "./delete-dialog-content";
import UpsertProductDialogContent from "./upsert-dialog-content";

interface ProductTableDropdownMenuProps {
  product: Product;
}

const ProductTableDropdownMenu = ({
  product,
}: ProductTableDropdownMenuProps) => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  return (
    <AlertDialog>
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">
              <MoreHorizontalIcon size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(product.id)}
            >
              <ClipboardCopy size={16} />
              Copiar Id
            </DropdownMenuItem>
            <DialogTrigger asChild>
              <DropdownMenuItem>
                <EditIcon size={16} />
                Editar
              </DropdownMenuItem>
            </DialogTrigger>
            <AlertDialogTrigger>
              <DropdownMenuItem>
                <TrashIcon size={16} />
                Deletar
              </DropdownMenuItem>
            </AlertDialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>
        <UpsertProductDialogContent
          defaultValues={{
            id: product.id,
            name: product.name,
            price: Number(product.price),
            stock: product.stock,
          }}
          setDialogIsOpen ={setEditDialogOpen}
        />
        <DeleteProductDialogContent productID={product.id} />
      </Dialog>
    </AlertDialog>
  );
};

export default ProductTableDropdownMenu;
