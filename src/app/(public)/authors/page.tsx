import {
  AuthorRoot,
  AuthorImage,
  AuthorContent,
  AuthorTitle,
} from "@/components/widgets/author/ui/widget";
import { AuthorsGrid } from "@/components/widgets/author/ui/grid";
import { AuthorLoader } from "@/components/widgets/author/ui/loader";
import { getTopAuthorsUseCase } from "@/composition";
import type { AuthorUser, User } from "@/core/domain/entities/user";
import { Suspense, use } from "react";
import { match } from "ts-pattern";
import type { Result } from "neverthrow";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Top Authors",
  description:
    "Discover the most recommended authors. See which writers are mentioned most by influential people across interviews, tweets, and content.",
};

export default function AuthorsPage() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <Suspense fallback={<AuthorLoader count={10} />}>
          <Authors promise={getTopAuthorsUseCase.execute(20)} />
        </Suspense>
      </div>
    </section>
  );
}

function Authors({
  promise,
}: {
  promise: Promise<Result<(User & AuthorUser)[], string>>;
}) {
  const result = use(promise);
  if (result.isErr()) return "Error...";

  const authors = result.value;

  return (
    <>
      {match(authors)
        .with([], () => (
          <p className="text-neutral-400">No authors available.</p>
        ))
        .otherwise(() => (
          <AuthorsGrid>
            {authors.map((author) => (
              <AuthorRoot key={author.id}>
                <AuthorImage
                  className="aspect-square object-cover"
                  src={author.image}
                  alt={author.name}
                />
                <AuthorContent>
                  <AuthorTitle className="text-[#2b659b] font-medium text-[22px] mb-3">
                    {author.name}
                  </AuthorTitle>
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
            ))}
          </AuthorsGrid>
        ))}
    </>
  );
}
