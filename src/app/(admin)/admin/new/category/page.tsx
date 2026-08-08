import { AddNewCategoryForm } from "@/features/add-new-category";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <div className="flex items-center justify-between pb-4 border-b border-border/40">
        <div className="space-y-1">
          <Link
            href="/admin/categories"
            className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-2 w-fit"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Categories
          </Link>
          <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-2">
            Create a new category
          </h1>
          <p className="text-sm text-muted-foreground">
            Add a new classification category for cataloging books and
            recommendations.
          </p>
        </div>
      </div>
      <div className="rounded-xl border border-border bg-card shadow-sm p-6 sm:p-8">
        <AddNewCategoryForm />
      </div>
    </>
  );
}
