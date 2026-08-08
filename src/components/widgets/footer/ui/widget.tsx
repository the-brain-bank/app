export function Footer() {
    return (
        <footer className="py-12 border-t border-neutral-900 bg-neutral-950 mt-20">
            <div className="container mx-auto px-4 text-center text-neutral-500 text-sm">
                <p>
                    © {new Date().getFullYear()} GoodBooks Clone. A clean architecture
                    & FSD demo.
                </p>
            </div>
        </footer>
    )
}