"use client";

import { Button } from "@/components/ui/button";
import { User } from "@/core/domain/entities/user";
import {
  UploadAuthorImage,
  useUploadAuthorImageStore,
} from "@/features/upload-author-image";
import { ImageUp } from "lucide-react";

export function EditImage({ author }: { author: User }) {
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
        Edit image
      </Button>
      <UploadAuthorImage />
    </>
  );
}
