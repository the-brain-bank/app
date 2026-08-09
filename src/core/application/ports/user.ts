import type { User } from "../../domain/entities/user";
import type { TypedPromiseResponse } from "../types/typed-response";

export interface UserRepository {
  findById(id: string): Promise<User | null>;
  findBySlug(slug: string): Promise<User | null>;
  findAll(limit?: number, offset?: number, search?: string): Promise<User[]>;
  findByRole<TUser>(payload: {
    role: User["role"] | [];
    limit?: number;
    offset?: number;
    search?: string;
  }): Promise<(User & TUser)[]>;
  create(person: Omit<User, "id" | "createdAt" | "updatedAt">): Promise<User>;
  updateById(
    id: string,
    user: Partial<Omit<User, "id" | "createdAt" | "updatedAt">>,
  ): Promise<User>;
  searchByName(
    name: string,
    limit?: number,
  ): Promise<TypedPromiseResponse<User[], string>>;
}
