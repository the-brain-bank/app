import type { AuthorUser, User } from "@/core/domain/entities/user";
import { AuthorContent, AuthorImage, AuthorRoot, AuthorTitle } from "./widget";
import Link from "next/link";

interface Props {
  authors: (User & AuthorUser)[];
}

export function AuthorList({ authors }: Props) {
  return authors.map((author) => (
    <AuthorRoot className="" key={author.id}>
      <AuthorImage
        className="aspect-square object-cover"
        src={author.image}
        alt={author.name}
      />
      <AuthorContent>
        <Link href="/authors/[authorId]" as={`/authors/${author.id}`}>
          <AuthorTitle className="text-[#2b659b] font-medium text-[22px]">
            {author.name}
          </AuthorTitle>
        </Link>
        <div className="flex flex-wrap gap-2">
          {author.industry ? (
            author.industry.split(",").map((tag) => (
              <span
                key={tag}
                className="bg-[#e9f0f8] text-[#2b659b]/80 text-xs px-2 py-1.5 rounded-sm"
              >
                {tag.trim().toLowerCase()}
              </span>
            ))
          ) : (
            <span className="bg-[#e9f0f8] text-[#2b659b]/80 text-xs px-2 py-1.5 rounded-sm">
              author
            </span>
          )}
        </div>
      </AuthorContent>
    </AuthorRoot>
  ));
}
