import { TypographyH2 } from "@/components/ui/typography";
import { AuthorList } from "@/components/widgets/author/ui/list";
import { query } from "../api/query";
import { AuthorsGrid } from "@/components/widgets/author/ui/grid";

export async function Root() {
  const data = await query();

  return (
    <section className="py-8">
      <div className="container mx-auto">
        <TypographyH2 className="mb-4">Top Authors</TypographyH2>
        <AuthorsGrid>
          <AuthorList authors={data} />
        </AuthorsGrid>
      </div>
    </section>
  );
}
