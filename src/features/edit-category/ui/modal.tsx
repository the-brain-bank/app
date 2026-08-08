import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ReactNode } from "react";
import { useEditCategoryStore } from "../model/store";

type Props = {
  children: ReactNode;
};

export function Modal({ children }: Props) {
  const store = useEditCategoryStore();

  return (
    <Dialog
      open={store.isModalOpen}
      onOpenChange={(value) => {
        if (!value) store.close();
      }}
    >
      <DialogContent className="w-full max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit category</DialogTitle>
          <DialogDescription>
            Make changes to the category here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
