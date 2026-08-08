"use client";

import { Button } from "@/components/ui/button";
import type { User } from "@/core/domain/entities/user";
import { Trash } from "lucide-react";
import { toast } from "sonner";

export function DeleteAuthor(props: { author: User }) {
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
