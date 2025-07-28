"use client";

import { formatCurrency } from "@/app/_helpers/currency";
import { Combobox, ComboboxOption } from "@/components/combobax";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Product } from "@/generated/prisma";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon, ShoppingCartIcon } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import TableDropdownMenu from "./upsert-table-dropdown-menu";
import { upsertSale } from "@/app/_actions/sales/upsert-sale";
import { toast } from "sonner";
import { useAction } from "next-safe-action/hooks";
import { flattenValidationErrors } from "next-safe-action";

const formSchema = z.object({
  productId: z.string().uuid({ message: "O produto é obrigátorio" }),
  quantity: z.coerce.number().int().positive(),
});

type FormSchema = z.infer<typeof formSchema>;

interface UpsertSheetContentProps {
  isOpen: boolean;
  saleId?: string;
  products: Product[];
  productOptions: ComboboxOption[];
  setSheetIsOpen: Dispatch<SetStateAction<boolean>>;
  defaultSelectedProducts?: SelectProducts[];
}

interface SelectProducts {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const UpsertSheetContent = ({
  isOpen,
  saleId,
  products,
  productOptions,
  setSheetIsOpen,
  defaultSelectedProducts,
}: UpsertSheetContentProps) => {
  const [selectedProducts, setSelectProducts] = useState<SelectProducts[]>(
    defaultSelectedProducts ?? [],
  );

  const { execute: executeUpsertSale } = useAction(upsertSale, {
    onError: ({ error: { validationErrors } }) => {
      const flattenedErrors = flattenValidationErrors(validationErrors);
      toast.error(flattenedErrors.formErrors[0]);
    },
    onSuccess: () => {
      toast.success("Venda realizada com sucesso");
      setSheetIsOpen(false);
    },
  });
  const form = useForm<FormSchema>({
    shouldUnregister: true,
    resolver: zodResolver(formSchema),
    defaultValues: {
      productId: "",
      quantity: 1,
    },
  });

  useEffect(() =>{
    if(!isOpen){
      form.reset();
      setSelectProducts([]);
    }
  },[form,isOpen])

  useEffect(()=>{
    setSelectProducts(defaultSelectedProducts ?? []);
  },[defaultSelectedProducts])

  const onSubmite = (data: FormSchema) => {
    const selectedProduct = products.find(
      (product) => product.id === data.productId,
    );
    if (!selectedProduct) return;

    setSelectProducts((currentProducts) => {
      const existingProduct = currentProducts.find(
        (product) => product.id === selectedProduct.id,
      );
      if (existingProduct) {
        const productIsOutOfStock =
          existingProduct.quantity + data.quantity > selectedProduct.stock;

        if (productIsOutOfStock) {
          setTimeout(() => {
            form.setError("quantity", {
              message: "Quantidade insuficiente em estoque",
            });
          }, 0);
          return currentProducts;
        }
        setTimeout(() => {
          form.reset();
        }, 0);
        return currentProducts.map((product) => {
          if (product.id === selectedProduct.id) {
            return {
              ...product,
              quantity: product.quantity + data.quantity,
            };
          }
          return product;
        });
      }
      const productIsOutOfStock = data.quantity > selectedProduct.stock;
      if (productIsOutOfStock) {
        setTimeout(() => {
          form.setError("quantity", {
            message: "Quantidade insuficiente em estoque",
          });
        }, 0);
        return currentProducts;
      }
      setTimeout(() => {
        form.reset();
      }, 0);
      return [
        ...currentProducts,
        {
          ...selectedProduct,
          price: Number(selectedProduct.price),
          quantity: data.quantity,
        },
      ];
    });
  };

  const productTotal = useMemo(() => {
    return selectedProducts.reduce((acc, product) => {
      return acc + product.price * product.quantity;
    }, 0);
  }, [selectedProducts]);

  const onDelete = (productId: string) => {
    setSelectProducts((currentProducts) => {
      return currentProducts.filter((product) => product.id !== productId);
    });
  };

  const onSubmiteSale = async () => {
    executeUpsertSale({
      id: saleId,
      products: selectedProducts.map((product) => ({
        id: product.id,
        quantity: product.quantity,
      })),
    });
  };

  return (
    <SheetContent className="!max-w-[650px]">
      <SheetHeader>
        <SheetTitle>Nova Venda</SheetTitle>
        <SheetDescription>
          Insira as informações da venda abaixo
        </SheetDescription>
      </SheetHeader>
      <Form {...form}>
        <form
          className="space-y-6 px-3"
          onSubmit={form.handleSubmit(onSubmite)}
        >
          <FormField
            control={form.control}
            name="productId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Produto</FormLabel>
                <FormControl>
                  <Combobox
                    placeholder="Selecione um produto"
                    options={productOptions}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantidade</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Digite a quantidade produto"
                    type="number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" variant="secondary">
            <PlusIcon />
            Adicionar produto á venda
          </Button>
        </form>
      </Form>
      <Table>
        <TableCaption>Lista de produtos adicionados á venda.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Produto</TableHead>
            <TableHead>Preço Unitário</TableHead>
            <TableHead>Quantidade</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {selectedProducts.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{formatCurrency(product.price)}</TableCell>
              <TableCell>{product.quantity}</TableCell>
              <TableCell>
                {formatCurrency(product.price * product.quantity)}
              </TableCell>
              <TableCell>
                <TableDropdownMenu
                  product={product}
                  onDelete={() => onDelete(product.id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell>{formatCurrency(productTotal)}</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <SheetFooter>
        <Button
          className="w-full gap-2"
          disabled={selectedProducts.length === 0}
          onClick={onSubmiteSale}
        >
          <ShoppingCartIcon />
          Finalizar Venda
        </Button>
      </SheetFooter>
    </SheetContent>
  );
};

export default UpsertSheetContent;
