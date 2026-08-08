import { buttonVariants } from "@/components/ui/button";
import { TypographyH2 } from "@/components/ui/typography";
import { CategoriesTable } from "@/features/categories-table";
import { DeleteCategory } from "@/features/delete-category";
import { EditCategory } from "@/features/edit-category";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

export default async function Page() {
  return (
    <section className="space-y-8">
      <div className="flex items-center justify-between w-full">
        <TypographyH2>Categories</TypographyH2>
        <Link
          href="/admin/new/category"
          className={buttonVariants({ variant: "outline" })}
        >
          <PlusCircle />
          Add a new category
        </Link>
      </div>
      <CategoriesTable />
      <EditCategory />
      <DeleteCategory />
    </section>
  );
}
