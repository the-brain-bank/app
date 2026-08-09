import { TypographyH2 } from "@/components/ui/typography";
import { AddNewAuthorForm } from "@/features/add-new-author";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Add a new author",
  description: "Add a new author to the library",
};

export default function Page() {
  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-border/40 space-y-1">
        <Link
          href="/admin/authors"
          className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-2 w-fit"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to Authors
        </Link>
        <TypographyH2>Create New Author</TypographyH2>
      </div>

      <AddNewAuthorForm />
    </div>
  );
}