import { create } from "zustand";
import { Payload } from "./types";

export type Store = {
  open(payload: Payload): void;
  close(): void;
} & (
  | {
      isModalOpen: false;
      payload: null;
    }
  | {
      isModalOpen: true;
      payload: Payload;
    }
);

export const useStore = create<Store>((set) => ({
  isModalOpen: false,
  payload: null,
  open(payload) {
    set(() => ({
      isModalOpen: true,
      payload,
    }));
  },
  close() {
    set(() => ({
      isModalOpen: false,
      payload: null,
    }));
  },
}));
