import { deleteProduct } from "@/app/_actions/products/delete-product";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";

interface DeleteProductDialogContentProps {
  productID: string;
}

const DeleteProductDialogContent = ({
  productID,
}: DeleteProductDialogContentProps) => {
  const { execute: executeDeleteProduct } = useAction(deleteProduct, {
    onSuccess: () => {
      toast.success("Produto Deletado");
    },
    onError: () => {
      toast.error("Erro ao deletar o produto");
    },
  });

  const handleDeleteClick = async () => executeDeleteProduct({ id: productID });

  return (
    <AlertDialogContent className="sm:max-w-md">
      <AlertDialogHeader>
        <AlertDialogTitle className="text-lg">
          Voçe tem certeza?
        </AlertDialogTitle>
        <AlertDialogDescription className="text-sm">
          Você esta prestes a excluir este produto. Esta ação não pode ser
          desfeita. Deseja continuar ?
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter className="flex flex-col gap-2 sm:flex-row sm:gap-0">
        <AlertDialogCancel className="w-full sm:w-auto">
          Cancelar
        </AlertDialogCancel>
        <AlertDialogAction
          onClick={handleDeleteClick}
          className="w-full sm:w-auto"
        >
          Continuar
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

export default DeleteProductDialogContent;
