"use client";

import { Button } from "@/components/ui/button";
import { User } from "@/core/domain/entities/user";
import { Pen } from "lucide-react";
import { toast } from "sonner";

export function EditAuthor(props: { author: User }) {
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
