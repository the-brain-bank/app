import { TypographyH2 } from "@/components/ui/typography";
import { AddRecommendationForm } from "@/features/add-recommendation";
import { ArrowLeft } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export const metadata = {
  title: "Add a new recommendation",
  description: "Add a new recommendation to the library",
};

export default function Page() {
  return (
    <section className="space-y-6">
      <Link
        href="/admin/recommendations"
        className={buttonVariants({ variant: "secondary" })}
      >
        <ArrowLeft className="mr-2 inline-block h-4 w-4" />
        Back to recommendations
      </Link>
      <div className="flex flex-col justify-between items-center w-full">
        <div className="max-w-md w-full">
          <TypographyH2 className="text-center mb-6">
            Add recommendation
          </TypographyH2>
          <AddRecommendationForm />
        </div>
      </div>
    </section>
  );
}
