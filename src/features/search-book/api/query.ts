"use server"

import { bookRepository } from "@/composition";

export async function query(query: string) {
    if (!query) return {
        success: false as const,
        error: 'Query is required' as const,
    };

    const result = await bookRepository.getAll({
        limit: 100,
        offset: 0,
        search: query
    });

    if (result.isErr()) {
        return {
            success: false as const,
            error: result.error
        }
    }

    return {
        success: true as const,
        data: result.value.data
    }
}