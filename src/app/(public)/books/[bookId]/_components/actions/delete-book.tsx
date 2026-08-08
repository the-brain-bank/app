"use client";

import { Button } from "@/components/ui/button";
import { Book } from "@/core/domain/entities/book";
import { Trash } from "lucide-react";
import { toast } from "sonner";

export function DeleteBook(props: { book: Book }) {
  return (
    <>
      <Button
        onClick={() => {
          toast.warning("This feature is not implemented yet!");
        }}
        variant="destructive"
      >
        <Trash />
        Delete
      </Button>
    </>
  );
}
