"use client";

import { Button } from "@/components/ui/button";
import type { User } from "@/core/domain/entities/user";
import { useUploadAuthorImageStore } from "@/features/upload-author-image";
import {
  UploadAuthorImage,
} from "@/features/upload-author-image";
import { ImageUp } from "lucide-react";

export function EditCover({ author }: { author: User }) {
  const store = useUploadAuthorImageStore();

  return (
    <>
      <Button
        variant="outline"
        onClick={() => {
          store.open({
            author,
          });
        }}
      >
        <ImageUp />
        Edit cover
      </Button>
      <UploadAuthorImage />
    </>
  );
}
