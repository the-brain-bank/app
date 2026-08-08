import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ReactNode } from "react";
import { useDeleteCategoryStore } from "../model/store";

type Props = {
  children: ReactNode;
};

export function Modal({ children }: Props) {
  const store = useDeleteCategoryStore();

  return (
    <AlertDialog
      open={store.isModalOpen}
      onOpenChange={(value) => {
        if (!value) store.close();
      }}
    >
      <AlertDialogContent className="sm:max-w-sm">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete the category?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This change can't be reverted!
          </AlertDialogDescription>
        </AlertDialogHeader>
        {children}
      </AlertDialogContent>
    </AlertDialog>
  );
}
