import { AuthRepository } from "@/core/application/ports/auth";

export class SignInUseCase {
    constructor(private readonly authRepository: AuthRepository) { }
    async execute({ email, password }: { email: string, password: string }) {
        return await this.authRepository.logIn({ email, password })
    }
}