import { User } from "@/core/domain/entities/user";

export type Payload = {
  author: Pick<User, "id" | "name">;
};
