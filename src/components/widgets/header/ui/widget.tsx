import { TypographyH2 } from "@/components/ui/typography";
import Link from "next/link";

export function Header() {
    return (
        <header className="sticky top-0 z-50 backdrop-blur-md border-b py-3">
            <div className="container mx-auto flex items-center justify-between px-6">
                <TypographyH2>GoodBooks</TypographyH2>
                <nav className="flex gap-6">
                    <Link href="/books" className="hover:underline">
                        Books
                    </Link>
                    <Link
                        href="/authors"
                        className="hover:underline"
                    >
                        Authors
                    </Link>
                </nav>
            </div>
        </header>
    )
}