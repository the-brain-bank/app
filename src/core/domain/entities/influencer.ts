import type { InfluencerUser, User } from "./user";

export type Influencer = User & InfluencerUser;

export type InfluencerWithRecommendationCount = Influencer & {
  numberOfRecommendations: number;
}
