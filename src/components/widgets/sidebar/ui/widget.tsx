import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { UserRole } from "@/core/domain/entities/user";
import {
  Archive,
  Book,
  BriefcaseBusiness,
  MessageSquareQuote,
  Users,
} from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "../../theme-toggle/ui/widget";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Assets",
      url: "#",
      items: [
        {
          title: "Books",
          url: "/admin/books",
          userRoles: ["ADMIN", "EDITOR"] as UserRole,
          icon: Book,
        },
        {
          title: "Authors",
          url: "/admin/authors",
          userRoles: ["ADMIN", "EDITOR"] as UserRole,
          icon: BriefcaseBusiness,
        },
        {
          title: "Recommendations",
          url: "/admin/recommendations",
          userRoles: ["ADMIN", "EDITOR"] as UserRole,
          icon: MessageSquareQuote,
        },
        {
          title: "Categories",
          url: "/admin/categories",
          userRoles: ["ADMIN", "EDITOR"] as UserRole,
          icon: Archive,
        },
      ],
    },
    {
      title: "Administration",
      url: "#",
      items: [
        {
          title: "Users",
          url: "/admin/users",
          userRoles: ["ADMIN"] as UserRole,
          icon: Users,
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader></SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <Link
                      // @ts-ignore TODO: FIX
                      href={item.url}
                      className="peer/menu-button group/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm ring-sidebar-ring outline-hidden transition-[width,height,padding] group-has-data-[sidebar=menu-action]/menu-item:pr-8 group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-open:hover:bg-sidebar-accent data-open:hover:text-sidebar-accent-foreground data-active:bg-sidebar-accent data-active:font-medium data-active:text-sidebar-accent-foreground [&_svg]:size-4 [&_svg]:shrink-0 [&>span:last-child]:truncate bg-background shadow-[0_0_0_1px_var(--sidebar-border)] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_var(--sidebar-accent)]"
                    >
                      <item.icon />
                      {item.title}
                    </Link>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
      <SidebarFooter>
        <ModeToggle />
      </SidebarFooter>
    </Sidebar>
  );
}
