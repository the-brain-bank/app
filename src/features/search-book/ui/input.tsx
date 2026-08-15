"use client"

import { Input } from "@/components/ui/input";
import { Book } from "@/core/domain/entities/book";
import { useDebounce } from "@/hooks/use-debounce"
import { useEffect, useState } from "react"
import { query } from "../api/query";

export function SearchBookInput({
    onChange
}: {
    onChange: (value: Book[]) => void
}) {
    const [value, setValue] = useState<string>("");
    const debouncedValue = useDebounce(value, 500);

    async function search() {
        const result = await query(debouncedValue)
        if (result.success) {
            onChange(result.data)
        }
    }

    useEffect(() => {
        search()
    }, [debouncedValue])

    return (
        <Input value={value} onChange={(e) => setValue(e.target.value)} placeholder="Search book" />
    )
}