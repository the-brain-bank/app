"use client";

import { Book } from "@/core/domain/entities/book";
import { EditBookSheet } from "@/features/edit-book";

export function EditBook(props: { book: Book }) {
  return <EditBookSheet book={props.book} />;
}
