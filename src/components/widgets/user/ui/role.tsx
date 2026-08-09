import { Badge, type BadgeProps } from "@/components/ui/badge";
import type { UserRole } from "@/core/domain/entities/user";

const badgeVariants: Record<UserRole[number], BadgeProps["variant"]> = {
  ADMIN: "destructive",
  USER: "default",
  EDITOR: "secondary",
  AUTHOR: "outline",
  INFLUENCER: "default",
};

export function RoleBadge({ role }: { role: UserRole[number] }) {
  return <Badge variant={badgeVariants[role]}>{role}</Badge>;
}
