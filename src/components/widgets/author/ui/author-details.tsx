import type { AuthorUser, User } from "@/core/domain/entities/user";
import { AuthorBooks } from "@/features/author-books";
import {
  AuthorImage,
  AuthorTitle,
  AuthorBio,
} from "@/components/widgets/author/ui/widget";

export function Widget({ author }: { author: User & AuthorUser }) {
  return (
    <>
      <div className="flex gap-12">
        <AuthorImage
          alt={author.name}
          className="w-125"
          src={author.image}
        />
        <div>
          <AuthorTitle className="relative">{author.name}</AuthorTitle>
          <AuthorBio>{author.bio}</AuthorBio>
        </div>
      </div>
      <AuthorBooks author={author} books={author.authoredBooks} />
    </>
  );
}
