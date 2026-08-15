import { cn } from "@/lib/utils"
import type { HTMLAttributes } from "react"

export function TypographyH1({
    className,
    ...props
}: HTMLAttributes<HTMLHeadingElement>) {
    return (
        <h1
            className={cn(
                "scroll-m-20 text-4xl font-extrabold tracking-tight text-balance",
                className
            )}
            {...props}
        />
    )
}

export function TypographyH2({
    className,
    ...props
}: HTMLAttributes<HTMLHeadingElement>) {
    return (
        <h2
            className={cn(
                "text-3xl font-semibold tracking-tight",
                className
            )}
            {...props}
        />
    )
}

export function TypographyH3({
    className,
    ...props
}: HTMLAttributes<HTMLHeadingElement>) {
    return (
        <h3
            className={cn(
                "text-2xl font-semibold tracking-tight",
                className
            )}
            {...props}
        />
    )
}


