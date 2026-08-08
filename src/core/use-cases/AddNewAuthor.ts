import { UserRepository } from "../application/ports/user";
import { User } from "../domain/entities/user";
import { errAsync, Result, ResultAsync } from "neverthrow";
import { SessionPort } from "../application/ports/session";

export class AddNewAuthorUseCase {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly sessionAdapter: SessionPort,
    ) { }

    async execute(
        user: Omit<User, "id" | "createdAt" | "updatedAt">,
    ): Promise<Result<User, string>> {
        const getSessionResult = await this.sessionAdapter.getSession();
        if (getSessionResult.isErr()) return errAsync(getSessionResult.error);
        return ResultAsync.fromThrowable(() =>
            this.userRepository.create(user),
        )().mapErr((error) => {
            if (error instanceof Error) return error.message;
            return "Unknown error when adding a new user!";
        });
    }
}
