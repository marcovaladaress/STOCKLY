import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Product } from "@/generated/prisma";

import { MoreHorizontalIcon, ClipboardCopy, TrashIcon } from "lucide-react";

interface TableDropdownMenuProps {
  product: Pick<Product, "id">;
  onDelete: (productId: string) => void;
}

const TableDropdownMenu = ({ product, onDelete }: TableDropdownMenuProps) => {
  return (
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
        <DropdownMenuItem onClick={() => onDelete(product.id)}>
          <TrashIcon size={16} />
          Deletar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TableDropdownMenu;
