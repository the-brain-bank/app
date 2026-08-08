"use server";

import { categoryRepository } from "@/composition";

type Opts = {
  pagination: {
    page: number;
    perPage: number;
  };
};

export async function query(opts: Opts) {
  return await categoryRepository.findAll(
    opts.pagination.perPage,
    opts.pagination.page * opts.pagination.perPage,
  );
}
