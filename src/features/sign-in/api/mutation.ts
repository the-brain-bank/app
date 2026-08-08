"use server";

import { signInUseCase } from "@/composition";

export async function mutate({ email, password }: { email: string, password: string }) {
    const result = await signInUseCase.execute({ email, password })
    if(result.isErr()) {
        return {
            success: false,
            error: result.error
        }
    }
    return {
        success: true,
        data: result.value
    }
}