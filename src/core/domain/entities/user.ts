import type { Book } from "./book";

export const USER_ROLES = [
  "ADMIN",
  "EDITOR",
  "AUTHOR",
  "USER",
  "INFLUENCER",
] as const;
export type UserRole = (typeof USER_ROLES)[number][];

export type User = {
  id: string;
  name: string;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
} & (AdminUser | EditorUser | AuthorUser | InfluencerUser | BaseUser);

export type BaseUser = {
  role: ["USER"];
};

export type AdminUser = {
  role: ["ADMIN", "EDITOR"];
};

export type EditorUser = {
  role: ["EDITOR"];
};

export type AuthorUser = {
  role: ["AUTHOR"];
  authoredBooks: Book[];
  industry: string;
  image: string;
  bio: string;
};

export type InfluencerUser = {
  role: ["INFLUENCER"];
  recommendedBooks: Book[];
  industry: string;
  image: string;
  bio: string;
};

/** Readable label for each role */
export const ROLE_LABELS: Record<string, string> = {
  ADMIN: "Admin",
  EDITOR: "Editor",
  AUTHOR: "Author",
  USER: "User",
  INFLUENCER: "Influencer",
};

export function isAdminUser(
  user: User | AuthorUser | AdminUser | InfluencerUser | EditorUser | BaseUser,
): user is AdminUser {
  if ((user as AdminUser).role.includes("ADMIN")) return true;
  return false;
}
