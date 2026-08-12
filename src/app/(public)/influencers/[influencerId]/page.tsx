import { influencerRepository } from "@/composition";
import type { User } from "@/core/domain/entities/user";
import { redirect } from "next/navigation";
import { Widget } from "@/components/widgets/influencer/ui/details";

export default async function ({
  params,
}: {
  params: Promise<{
    influencerId: User["id"];
  }>;
}) {
  const { influencerId } = await params;
  const result = await influencerRepository.findById(influencerId);
  if (result.isErr()) redirect("/");

  return (
    <section className="py-24">
      <div className="container mx-auto">
        <Widget influencer={result.value} />
      </div>
    </section>
  );
}
