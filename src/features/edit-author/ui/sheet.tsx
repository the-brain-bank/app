"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Pen } from "lucide-react";
import { useState } from "react";
import { Form } from "./form";
import type { AuthorUser, User } from "@/core/domain/entities/user";

export function EditAuthorSheet(props: { author: User & AuthorUser }) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="success">
          <Pen />
          Edit
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto sm:max-w-md md:max-w-xl w-full">
        <SheetHeader>
          <SheetTitle>Edit author</SheetTitle>
          <SheetDescription>
            Make changes to the author details. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="px-6 pb-6">
          <Form author={props.author} onSuccess={() => setOpen(false)} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
