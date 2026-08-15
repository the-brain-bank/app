import type { InfluencerUser, User } from "@/core/domain/entities/user";
import { Content, Image, Root, Title } from "./widget";
import Link from "next/link";

interface Props {
  influencers: (User & InfluencerUser)[];
}

export function List({ influencers }: Props) {
  return (
    <ul className="grid grid-cols-[repeat(1,max(300px,100vw))] sm:grid-cols-[repeat(2,300px)] xl:grid-cols-[repeat(3,300px)] gap-6">
      {influencers.map((influencer) => (
        <Root className="flex flex-col" key={influencer.id}>
          <Image
            className="h-full w-full"
            width={300}
            height={300}
            src={influencer.image}
            alt={influencer.name}
          />
          <Content>
            <Link href={`/people/${influencer.id}`}>
              <Title className="text-[#2b659b] font-medium text-[22px]">
                {influencer.name}
              </Title>
            </Link>
            <p className="mb-2">{influencer.numberOfRecommendations} recommendations</p>
            <div className="flex flex-wrap gap-2">
              {influencer.industry ? (
                influencer.industry.split(",").map((tag) => (
                  <span
                    key={tag}
                    className="bg-[#e9f0f8] text-[#2b659b]/80 text-xs px-2 py-1.5 rounded-sm"
                  >
                    {tag.trim().toLowerCase()}
                  </span>
                ))
              ) : (
                <span className="bg-[#e9f0f8] text-[#2b659b]/80 text-xs px-2 py-1.5 rounded-sm">
                  influencer
                </span>
              )}
            </div>
          </Content>
        </Root>
      ))}
    </ul>
  );
}
