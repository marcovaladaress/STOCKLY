"use client";

import {
  AlertDialog,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Product } from "@/generated/prisma";
import { ColumnDef } from "@tanstack/react-table";
import {
  CircleIcon,
  ClipboardCopy,
  EditIcon,
  MoreHorizontalIcon,
  TrashIcon,
} from "lucide-react";
import DeleteProductDialogContent from "./delete-dialog-content";

export const productTableColumns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Produto",
  },
  {
    accessorKey: "price",
    header: "Valor unitário",
  },
  {
    accessorKey: "stock",
    header: "Estoque",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const product = row.original;
      return (
        <Badge
          variant={product.stock > 0 ? "default" : "destructive"}
          className="items-center gap-1.5"
        >
          <CircleIcon
            size={12}
            className={`${product.stock > 0 ? "fill-primary-foreground" : "fill-primary-foreground"}`}
          />
          {product.stock > 0 ? "Em estoque" : "Fora de estoque"}
        </Badge>
      );
    },
  },

  {
    accessorKey: "actions",
    header: "Ações",
    cell: ({ row }) => {
      const product = row.original;
      return (
        <AlertDialog>
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
        <DeleteProductDialogContent productID={product.id}/>
        </AlertDialog>
      );
    },
  },
];
