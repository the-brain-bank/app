import { Separator } from "@/components/ui/separator";
import {
  AuthorActions,
  AuthorBio,
  AuthorImage,
  AuthorTitle,
} from "@/components/widgets/author/ui/widget";
import { sessionAdapter, userRepository } from "@/composition";
import { User } from "@/core/domain/entities/user";
import { AuthorBooks } from "@/features/author-books";
import { redirect } from "next/navigation";
import { DeleteAuthor } from "./_components/actions/delete";
import { EditAuthor } from "./_components/actions/edit";
import { EditImage } from "./_components/actions/edit-image";
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
        <AuthorDetails author={author} />
      </div>
    </section>
  );
}

// async function Actions({ author }: { author: User }) {
//   const session = await sessionAdapter.getSession();
//   if (session.isErr()) return null;

//   return (
//     <div className="flex flex-wrap gap-2">
//       {session.value.user.role === "ADMIN" && <DeleteAuthor author={author} />}
//       <EditImage author={author} />
//       <EditAuthor author={author} />
//     </div>
//   );
// }
