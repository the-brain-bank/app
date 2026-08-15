import { influencerRepository, userRepository } from "@/composition";
import type { InfluencerUser, User } from "@/core/domain/entities/user";
import { redirect } from "next/navigation";
import { InfluencerRankedBooksWidget } from "@/components/widgets/influencer/ui/ranked-books";

export default async function ({
  params,
}: {
  params: Promise<{
    influencerId: User["id"];
  }>;
}) {
  const { influencerId } = await params;
  const result = await userRepository.findById(influencerId);
  if (result.isErr()) redirect("/");

  return (
    <section className="py-24">
      <div className="container mx-auto">
        <InfluencerRankedBooksWidget influencer={result.value as (User & InfluencerUser)} />
      </div>
    </section>
  );
}
