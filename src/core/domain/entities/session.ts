import type { User } from "./user";

export interface Session {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  expiresAt: Date;
  token: string;
  user: Pick<User, "id" | "role" | "name">;
}
