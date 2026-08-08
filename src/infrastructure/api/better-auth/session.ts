import { SessionPort } from "@/core/application/ports/session";
import { UserRepository } from "@/core/application/ports/user";
import { Session } from "@/core/domain/entities/session";
import { auth } from "@/lib/auth";
import { err, ok, Result } from "neverthrow";
import { headers } from "next/headers";

export class BetterAuthSessionAdapter implements SessionPort {
  constructor(private readonly userRepository: UserRepository) {}

  async getSession(): Promise<Result<Session, string>> {
    const betterAuthSession = await auth.api.getSession({
      headers: await headers(),
    });
    if (!betterAuthSession) return err("Couldn't find an active session!");

    const sessionUser = await this.userRepository.findById(
      betterAuthSession.session.userId,
    );
    if (!sessionUser)
      return err("Couldn't find the user of the active session!");

    return ok({
      ...betterAuthSession.session,
      user: {
        ...sessionUser,
      },
    });
  }
}
