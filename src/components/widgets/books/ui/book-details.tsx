import { Book } from "@/core/domain/entities/book";
import { BookCover } from "./book";
import { TypographyH2 } from "@/components/ui/typography";
import Link from "next/link";

const StoreBadges = () => (
    <div className="flex flex-row items-center gap-2 mt-8 flex-wrap">
        <div className="bg-black text-white rounded flex items-center justify-center py-1.5 px-3 gap-2 cursor-pointer hover:bg-neutral-800 transition-colors">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2Zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8Z" /></svg>
            <div className="flex flex-col items-start leading-[1.1]"><span className="text-[9px] opacity-80 uppercase tracking-wider font-semibold">Get it on</span><span className="text-sm font-bold">Amazon.com</span></div>
        </div>
        <div className="bg-black text-white rounded flex items-center justify-center py-1.5 px-3 gap-2 cursor-pointer hover:bg-neutral-800 transition-colors">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M16.365 20.301c-1.393.98-2.61 1.053-3.955.05-1.298-.96-2.583-.96-3.83 0-1.52.92-2.738.77-3.96-.28-3.5-3.03-5.22-7.85-3.32-11.45 1.06-2.02 2.87-3.23 4.98-3.33 1.48-.07 2.82.88 3.65.88.82 0 2.45-1.12 4.19-.94 1.76.17 3.32.96 4.28 2.38-3.56 2.05-3.04 6.74.6 8.23-.74 1.87-1.74 3.55-2.64 4.46zM11.965 5.56c-.24-1.92 1.34-3.54 3.19-3.77.34 2.14-1.42 3.86-3.19 3.77z" /></svg>
            <div className="flex flex-col items-start leading-[1.1]"><span className="text-[9px] opacity-80 uppercase tracking-wider font-semibold">Get it on</span><span className="text-sm font-bold">Apple Books</span></div>
        </div>
        <div className="bg-black text-white rounded flex items-center justify-center py-1.5 px-3 gap-2 cursor-pointer hover:bg-neutral-800 transition-colors">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><rect width="18" height="18" x="3" y="3" rx="2" /><path d="M7 7h10v10H7z" /></svg>
            <div className="flex flex-col items-start leading-[1.1]"><span className="text-[9px] opacity-80 uppercase tracking-wider font-semibold">Get it on</span><span className="text-sm font-bold">Bookshop</span></div>
        </div>
    </div>
);

export function Widget({
    book
}: {
    book: Book
}) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#2b659b]/20">
            {/* Left Column */}
            <div className="flex flex-col items-center justify-center">
                <BookCover className="shadow-2xl w-[300px]" src={book.coverImage} alt={book.title} />
                <StoreBadges />
            </div>

            {/* Right Column */}
            <div className="flex flex-col justify-center p-12">
                <div className="flex items-start justify-between gap-4 mb-4">
                    <TypographyH2>{book.title}</TypographyH2>
                </div>
                <Link className="text-xl text-[#2b659b]/80 mb-10 hover:underline inline-block" href={`/authors/${book.author.id}`}>
                    by {book.author.name}
                </Link>

                <p className="max-h-[40vh] overflow-y-auto">
                    {book.description}
                </p>

                <div className="mt-8 flex flex-wrap gap-2">
                    {book.categories?.map((cat) => (
                        <span key={cat.id} className="bg-[#e9f0f8] text-[#2b659b]/80 text-xs px-2.5 py-1.5 rounded-sm">
                            {cat.name.toLowerCase()}
                        </span>
                    ))}
                    {(!book.categories || book.categories.length === 0) && (
                        <span className="bg-[#e9f0f8] text-[#2b659b]/80 text-xs px-2.5 py-1.5 rounded-sm">
                            fiction
                        </span>
                    )}
                </div>

                <div className="mt-12 flex flex-col md:flex-row md:items-end justify-between border-t border-[#2b659b]/20 pt-8 gap-4">
                    <div>
                        <p className="text-sm mb-4">Share this book</p>
                        <div className="flex items-center gap-3 text-[#2b659b]/80">
                            <div className="w-8 h-8 flex items-center justify-center border border-[#2b659b]/30 bg-white rounded cursor-pointer hover:bg-[#2b659b]/5 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>
                            </div>
                            <div className="w-8 h-8 flex items-center justify-center border border-[#2b659b]/30 bg-white rounded cursor-pointer hover:bg-[#2b659b]/5 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
                            </div>
                            <div className="w-8 h-8 flex items-center justify-center border border-[#2b659b]/30 bg-white rounded cursor-pointer hover:bg-[#2b659b]/5 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg>
                            </div>
                            <div className="w-8 h-8 flex items-center justify-center border border-[#2b659b]/30 bg-white rounded cursor-pointer hover:bg-[#2b659b]/5 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}