import { buttonVariants } from "@/components/ui/button";
import { TypographyH2 } from "@/components/ui/typography";
import { AddNewBook } from "@/features/add-new-book";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <section className="space-y-6">
        <Link
          href="/admin/books"
          className={buttonVariants({ variant: "secondary" })}
        >
          <ArrowLeft className="mr-2 inline-block h-4 w-4" />
          Back to books
        </Link>
        <div className="flex flex-col justify-between items-center w-full">
          <div className="max-w-md w-full">
            <TypographyH2 className="text-center">Add a new book</TypographyH2>
            <AddNewBook />
          </div>
        </div>
      </section>
    </>
  );
}
