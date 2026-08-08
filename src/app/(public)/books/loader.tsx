import { BookLoader } from "@/components/widgets/books/ui/loader";

export default function BooksLoader() {
    return (
        <div className="container mx-auto">
            <BookLoader count={10} />
        </div>
    )
}