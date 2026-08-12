"use client";

import type { AuthorUser, User } from "@/core/domain/entities/user";
import { EditAuthorSheet } from "@/features/edit-author/ui/sheet";

export function EditAuthor(props: { author: User & AuthorUser }) {
  return <EditAuthorSheet author={props.author} />;
}
