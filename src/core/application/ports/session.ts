import { Session } from "@/core/domain/entities/session";
import { Result } from "neverthrow";

export interface SessionPort {
  getSession(): Promise<Result<Session, string>>;
}
