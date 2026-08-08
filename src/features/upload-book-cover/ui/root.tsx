"use client";

import { useStore } from "../model/store";
import { Form } from "./form";
import { Modal } from "./modal";

export function Root() {
  const store = useStore();

  return (
    <Modal>{store.isModalOpen && <Form book={store.payload.book} />}</Modal>
  );
}
