import type { Result } from "neverthrow";

export interface AuthRepository {
  logIn: ({ email, password }: { email: string, password: string }) => Promise<Result<string, Error>>;
  logOut: () => Promise<Result<void, Error>>;
  signUp: ({ name, email, password }: { name: string, email: string, password: string }) => Promise<Result<string, Error>>;
}
