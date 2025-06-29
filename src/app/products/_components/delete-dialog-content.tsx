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
import { toast } from "sonner";

interface DeleteProductDialogContentProps {
  productID: string;
}

const DeleteProductDialogContent = ({
  productID,
}: DeleteProductDialogContentProps) => {
  const handleDeleteClick = async () => {
    try {
      await deleteProduct({ id: productID });
      toast.success("Produto excluído com sucesso.")
    } catch (error) {
      console.error(error);
      toast.error("Ocorreu um erro ao excluir o produto")
    }
  };

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Voçe tem certeza?</AlertDialogTitle>
        <AlertDialogDescription>
          Você esta prestes a excluir este produto. Esta ação não pode ser
          desfeita. Deseja continuar ?
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancelar</AlertDialogCancel>
        <AlertDialogAction onClick={handleDeleteClick}>Continuar</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

export default DeleteProductDialogContent;
