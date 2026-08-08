"use client";

import { ImageUploadWidget } from "@/components/widgets/image-upload";
import { Book } from "@/core/domain/entities/book";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { mutate } from "../api/mutation";
import { useStore } from "../model/store";

type Props = {
  book: Pick<Book, "id" | "title">;
};

export function Form(props: Props) {
  const store = useStore();
  const router = useRouter();
  const mutation = useMutation({
    mutationKey: ["upload-book-cover", props.book.id],
    mutationFn: async ({ file }: { file: File }) => {
      const loader = toast.loading("Uploading...");
      const result = await mutate({
        bookId: props.book.id,
        file,
      });
      if (result.success === false) {
        return toast.error(result.error);
      }
      toast.success("Successfully updated!");
      store.close();
      router.refresh();
      toast.dismiss(loader);
    },
  });

  return (
    <ImageUploadWidget
      onImageCropped={(image) => {
        const file = new File(
          [image],
          `${props.book.title.toLowerCase()}-cover`,
          {
            type: image.type,
            lastModified: new Date().getTime(),
          },
        );
        mutation.mutate({
          file,
        });
      }}
    />
  );
}
