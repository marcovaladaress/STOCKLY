"use client";

import { Badge } from "@/components/ui/badge";
import { Product } from "@/generated/prisma";
import { ColumnDef } from "@tanstack/react-table";
import { CircleIcon } from "lucide-react";

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
        <Badge variant={product.stock > 0 ? "default" : "destructive"} className="gap-1.5 items-center">
          <CircleIcon
            size={12}
            className={`${product.stock > 0 ? "fill-primary-foreground" : "fill-primary-foreground"}`}
          />
          {product.stock > 0 ? "Em estoque" : "Fora de estoque"}
        </Badge>
      );
    },
  },
];
