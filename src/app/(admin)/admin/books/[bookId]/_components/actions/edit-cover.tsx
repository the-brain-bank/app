"use client";

import { Button } from "@/components/ui/button";
import { Book } from "@/core/domain/entities/book";
import {
  UploadBookCover,
  useUploadBookCoverStore,
} from "@/features/upload-book-cover";
import { ImageUp } from "lucide-react";

export function EditCover({ book }: { book: Book }) {
  const store = useUploadBookCoverStore();

  return (
    <>
      <Button
        variant="outline"
        onClick={() => {
          store.open({
            book,
          });
        }}
      >
        <ImageUp />
        Edit cover
      </Button>
      <UploadBookCover />
    </>
  );
}
