
import {userRepository } from "@/composition";
import type { AuthorUser, User } from "@/core/domain/entities/user";
import { redirect } from "next/navigation";
import { Widget as AuthorDetails } from "@/components/widgets/author/ui/author-details";

export default async function ({
  params,
}: {
  params: Promise<{
    authorId: User["id"];
  }>;
}) {
  const { authorId } = await params;
  const author = await userRepository.findById(authorId);
  if (!author) redirect("/");

  return (
    <section className="py-24">
      <div className="container mx-auto">
        <AuthorDetails author={author as (User & AuthorUser)} />
      </div>
    </section>
  );
}
