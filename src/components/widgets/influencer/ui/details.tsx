import type { InfluencerUser, User } from "@/core/domain/entities/user";
import { Bio, Title, Image } from "./widget";
import { BookList } from "../../books/ui/list";

export function Widget({ influencer }: { influencer: User & InfluencerUser }) {
  return (
    <>
      <div className="flex gap-12">
        <div className="max-w-75">
          <Image
            className="max-h-100 w-auto"
            alt={influencer.name}
            src={influencer.image}
          />
        </div>
        <div>
          <Title className="relative">{influencer.name}</Title>
          <Bio>{influencer.bio}</Bio>
        </div>
      </div>
      <BookList books={influencer.recommendedBooks} />
    </>
  );
}
