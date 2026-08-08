"use client";

import { useDeleteCategoryStore } from "../model/store";
import { Form } from "./form";
import { Modal } from "./modal";

export function Root() {
  const store = useDeleteCategoryStore();

  return (
    <Modal>
      {store.isModalOpen && <Form category={store.payload.category} />}
    </Modal>
  );
}
