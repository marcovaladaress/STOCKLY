"use client";

import { Badge } from "@/components/ui/badge";
import { Product } from "@/generated/prisma";
import { ColumnDef } from "@tanstack/react-table";
import { CircleIcon } from "lucide-react";
import ProductTableDropdownMenu from "./dropdown-menu";

const formatCurrency = (value: number) => {
  return `R$ ${value.toFixed(2).replace(".", ",")}`;
};

export const productTableColumns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Produto",
  },
  {
    accessorKey: "price",
    header: "Valor unitário",
    cell: ({ row }) => {
      const product = row.original;
      return formatCurrency(Number(product.price));
    },
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
    cell: ({ row }) => <ProductTableDropdownMenu product={row.original} />,
  },
];
