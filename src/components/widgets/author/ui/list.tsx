import { User } from "@/core/domain/entities/user";
import {
  AuthorBio,
  AuthorContent,
  AuthorImage,
  AuthorRoot,
  AuthorTitle,
} from "./widget";

interface Props {
  authors: User[];
}

export function AuthorList({ authors }: Props) {
  return (
    <>
      <ul className="grid grid-cols-[repeat(1,max(300px,100vw))] sm:grid-cols-[repeat(2,300px)] xl:grid-cols-[repeat(3,300px)] gap-6">
        {authors.map((author) => (
          <AuthorRoot authorId={author.id} key={author.id}>
            <AuthorImage className='aspect-square object-cover' src={author.image} alt={author.name} />
            <AuthorContent>
              <AuthorTitle className="text-[#2b659b] font-medium text-[22px] mb-3">{author.name}</AuthorTitle>
              <div className="flex flex-wrap gap-2">
                {author.industry ? author.industry.split(',').map((tag) => (
                  <span key={tag} className="bg-[#e9f0f8] text-[#2b659b]/80 text-xs px-2 py-1.5 rounded-sm">
                    {tag.trim().toLowerCase()}
                  </span>
                )) : (
                  <span className="bg-[#e9f0f8] text-[#2b659b]/80 text-xs px-2 py-1.5 rounded-sm">author</span>
                )}
              </div>
            </AuthorContent>
          </AuthorRoot>
        ))}
      </ul>
    </>
  );
}
