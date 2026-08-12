import type { Result } from "neverthrow";
import type { User } from "../../domain/entities/user";
import type { PaginatedResponse } from "../types/paginatinated-response";

export interface GetAllPayload {
  limit: number;
  offset: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "ASC" | "DESC";
}

export interface FindByRolePayload {
  role: User["role"];
  limit?: number;
  offset?: number;
  search?: string;
}

export type CreatePayload = Omit<User, "id" | "createdAt" | "updatedAt">;
export type CreateAuthorPayload = CreatePayload & {
  industry: string;
};
export interface UpdateByIdPayload {
  id: User["id"];
  update: Partial<Omit<User, "id" | "createdAt" | "updatedAt">>;
}

export interface SearchByNamePayload {
  name: string;
  limit?: number;
  offset?: number;
}

export interface UserRepository<TUser> {
  findById(id: string): Promise<Result<User & TUser, string>>;
  findAll(
    payload: GetAllPayload,
  ): Promise<Result<PaginatedResponse<User & TUser>, string>>;
  findByRole(
    payload: FindByRolePayload,
  ): Promise<Result<(User & TUser)[], string>>;
  create(person: CreatePayload): Promise<Result<User & TUser, string>>;
  updateById(payload: UpdateByIdPayload): Promise<Result<User & TUser, string>>;
  searchByName(
    payload: SearchByNamePayload,
  ): Promise<Result<(User & TUser)[], string>>;
}
