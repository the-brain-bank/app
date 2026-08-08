import type { User } from "@/core/domain/entities/user";
import { AuthorBooks } from "@/features/author-books";
import {
    AuthorImage,
    AuthorTitle,
    AuthorBio
} from "@/components/widgets/author/ui/widget";

export function Widget({
    author
}: {
    author: User
}) {
    return (
        <>
            <div className="flex gap-12">
                <div className="max-w-75">
                    <AuthorImage className="max-h-100 w-auto" src={author.image} />
                </div>
                <div>
                    <AuthorTitle className="relative">{author.name}</AuthorTitle>
                    <AuthorBio>{author.bio}</AuthorBio>
                </div>
            </div>
            <AuthorBooks author={author} books={author.authoredBooks} />

        </>
    )
}