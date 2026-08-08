import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ReactNode } from "react";
import { useStore } from "../model/store";

type Props = {
  children: ReactNode;
};

export function Modal({ children }: Props) {
  const store = useStore();

  return (
    <Dialog
      open={store.isModalOpen}
      onOpenChange={(value) => {
        if (!value) store.close();
      }}
    >
      <DialogContent className="w-full max-w-lg">
        <DialogHeader>
          <DialogTitle>Upload a cover image</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
