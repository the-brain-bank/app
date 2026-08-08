"use client";

import { useEditCategoryStore } from "../model/store";
import { Form } from "./form";
import { Modal } from "./modal";

export function Root() {
  const store = useEditCategoryStore();

  return (
    <Modal>
      {store.isModalOpen && <Form category={store.payload.category} />}
    </Modal>
  );
}
