import { sessionAdapter, userRepository } from "@/composition";
import { notFound } from "next/navigation";
import { Widget as AuthorDetailsWidget } from "@/components/widgets/author/ui/author-details";
import Link from "next/dist/api/link";
import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import {
    AuthorActions,
  AuthorBio,
  AuthorImage,
  AuthorTitle,
} from "@/components/widgets/author/ui/widget";
import { AuthorBooks } from "@/features/author-books";
import { UploadBookCover } from "@/features/upload-book-cover";
import { EditCover } from "./_components/actions/edit-cover";
import { DeleteAuthor } from "./_components/actions/delete";
import type { User } from "@/core/domain/entities/user";
import { EditAuthor } from "./_components/actions/edit";
import { UploadAuthorImage } from "@/features/upload-author-image";

export default async function AuthorDetail({
  params,
}: {
  params: Promise<{ authorId: string }>;
}) {
  const { authorId } = await params;
  const result = await userRepository.findById(authorId);

  if (!result) {
    notFound();
  }
  const author = result;

  return (
    <section className="py-12">
      <div className="container mx-auto space-y-6">
        <Link
          href="/admin/books"
          className={buttonVariants({ variant: "secondary" })}
        >
          <ArrowLeft className="mr-2 inline-block h-4 w-4" />
          Back to authors
        </Link>
        <div className="flex gap-12">
          <div className="max-w-75">
            <AuthorImage className="max-h-100 w-auto" src={author.image} />
          </div>
          <div>
            <AuthorTitle className="relative">{author.name}</AuthorTitle>
            <AuthorBio>{author.bio}</AuthorBio>
          </div>
        </div>
        <Actions author={author} />
        <AuthorBooks author={author} books={author.authoredBooks} />
      </div>
    </section>
  );
}

async function Actions({ author }: { author: User }) {
  const session = await sessionAdapter.getSession();
  if (session.isErr()) return null;

  return (
    <AuthorActions>
      {session.value.user.role === "ADMIN" && <DeleteAuthor author={author} />}
      <EditCover author={author} />
      <EditAuthor author={author} />
    </AuthorActions>
  );
}