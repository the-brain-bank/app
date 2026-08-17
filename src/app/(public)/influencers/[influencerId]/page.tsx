import { influencerRepository, userRepository } from "@/composition";
import type { InfluencerUser, User } from "@/core/domain/entities/user";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { cache } from "react";
import { InfluencerRankedBooksWidget } from "@/components/widgets/influencer/ui/ranked-books";

const getInfluencer = cache((id: User["id"]) => userRepository.findById(id));

type Props = {
  params: Promise<{
    influencerId: User["id"];
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { influencerId } = await params;
  const result = await getInfluencer(influencerId);
  if (result.isErr()) return {};

  const influencer = result.value as User & InfluencerUser;

  const description =
    influencer.bio ||
    `See all the books recommended by ${influencer.name}. Explore their top picks and reading list.`;

  return {
    title: influencer.name,
    description,
    openGraph: {
      title: influencer.name,
      description,
      images: influencer.image
        ? [
            {
              url: influencer.image,
              alt: influencer.name,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: influencer.name,
      description,
      images: influencer.image ? [influencer.image] : undefined,
    },
  };
}

export default async function ({ params }: Props) {
  const { influencerId } = await params;
  const result = await getInfluencer(influencerId);
  if (result.isErr()) redirect("/");

  return (
    <section className="py-24">
      <div className="container mx-auto">
        <InfluencerRankedBooksWidget influencer={result.value as (User & InfluencerUser)} />
      </div>
    </section>
  );
}
