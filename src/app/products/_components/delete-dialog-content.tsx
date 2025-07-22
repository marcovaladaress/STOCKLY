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

const {execute: executeDeleteProduct} = useAction(deleteProduct, {
  onSuccess: ()=> {
    toast.success("Produto Deletado")
  }, 
  onError: () =>{
    toast.error("Erro ao deletar o produto")
  },

})

  const handleDeleteClick = async () =>  executeDeleteProduct({id: productID})

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
