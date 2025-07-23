"use client";

import { GetSalesDto } from "@/app/_data-acess/sale/get-sales";
import { formatCurrency } from "@/app/_helpers/currency";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontalIcon } from "lucide-react";

export const SaleTablesColumns: ColumnDef<GetSalesDto>[] = [
  {
    accessorKey: "productNames",
    header: "Produto",
  },
  {
    accessorKey: "totalProducts",
    header: "Quantidade de Produtos",
  },
  {
    header: "Valor Total",
    cell: ({
      row: {
        original: { totalAmount },
      },
    }) => formatCurrency(totalAmount),
  },
  {
    header: "Data",
    cell: ({
      row: {
        original: { date },
      },
    }) => new Date(date).toLocaleDateString("pt-BR"),
  },
  {
    header: "Ações",
    cell: () => (
      <Button>
        <MoreHorizontalIcon size={16} />
      </Button>
    ),
  },
];
