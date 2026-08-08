"use client";

import { Button } from "@/components/ui/button";
import { Book } from "@/core/domain/entities/book";
import { Pen } from "lucide-react";
import { toast } from "sonner";

export function EditBook(props: { book: Book }) {
  return (
    <>
      <Button
        variant="success"
        onClick={() => {
          toast.warning("This feature is not implemented yet!");
        }}
      >
        <Pen />
        Edit
      </Button>
    </>
  );
}
