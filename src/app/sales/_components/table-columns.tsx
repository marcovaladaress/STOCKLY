"use client";

import { GetSalesDto } from "@/app/_data-acess/sale/get-sales";
import { formatCurrency } from "@/app/_helpers/currency";
import { ColumnDef } from "@tanstack/react-table";
import SaleTableDropdownMenu from "./table-dropdown-menu";
import { Product } from "@/generated/prisma";
import { ComboboxOption } from "@/components/combobax";

interface SaleTableColumn extends GetSalesDto {
  products: Product[];
  productOptions: ComboboxOption[];
}

export const SaleTablesColumns: ColumnDef<SaleTableColumn>[] = [
  {
    accessorKey: "productNames",
    header: "Produto",
    cell: ({ row }) => (
      <div className="max-w-[90px] truncate font-medium">
        {row.getValue("productNames") as string}
      </div>
    ),
  },
  {
    accessorKey: "totalProducts",
    header: "Qtd Produtos",
    cell: ({ row }) => (
      <div className="text-center">
        {row.getValue("totalProducts") as number}
      </div>
    ),
  },
  {
    header: "Valor Total",
    cell: ({
      row: {
        original: { totalAmount },
      },
    }) => <div className="font-medium">{formatCurrency(totalAmount)}</div>,
  },
  {
    header: "Data",
    cell: ({
      row: {
        original: { date },
      },
    }) => (
      <div className="whitespace-nowrap">
        {new Date(date).toLocaleDateString("pt-BR")}
      </div>
    ),
  },
  {
    header: "Ações",
    cell: ({ row: { original: sale } }) => (
      <div className="flex justify-center">
        <SaleTableDropdownMenu
          sale={sale}
          products={sale.products}
          productOptions={sale.productOptions}
        />
      </div>
    ),
  },
];
