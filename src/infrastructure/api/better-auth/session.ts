import type { SessionPort } from "@/core/application/ports/session";
import type { UserRepository } from "@/core/application/ports/user";
import type { Session } from "@/core/domain/entities/session";
import type { User } from "@/core/domain/entities/user";
import { auth } from "@/lib/auth";
import { err, ok, type Result } from "neverthrow";
import { headers } from "next/headers";

export class BetterAuthSessionAdapter implements SessionPort {
  constructor(private readonly userRepository: UserRepository<User>) {}

  async getSession(): Promise<Result<Session, string>> {
    const betterAuthSession = await auth.api.getSession({
      headers: await headers(),
    });
    if (!betterAuthSession) return err("Couldn't find an active session!");

    const result = await this.userRepository.findById(
      betterAuthSession.session.userId,
    );
    if (result.isErr()) return err(result.error);

    return ok({
      ...betterAuthSession.session,
      user: {
        ...result.value,
      },
    });
  }
}
