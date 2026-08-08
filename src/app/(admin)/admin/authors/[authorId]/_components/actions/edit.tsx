"use client";

import type { User } from "@/core/domain/entities/user";
import { EditAuthorSheet } from "@/features/edit-author/ui/sheet";

export function EditAuthor(props: { author: User }) {
  return <EditAuthorSheet author={props.author} />;
}
