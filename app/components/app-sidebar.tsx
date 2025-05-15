import * as React from "react";
import {
  AmpersandIcon,
  AudioWaveform,
  BookOpen,
  Bot,
  ChevronsUpDown,
  Command,
  Database,
  DatabaseIcon,
  Frame,
  GalleryVerticalEnd,
  LayoutDashboard,
  LayoutDashboardIcon,
  Map,
  PieChart,
  Settings2,
  ShieldUser,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "~/components/nav-main";
import { NavProjects } from "~/components/nav-projects";
import { NavUser } from "~/components/nav-user";
import { TeamSwitcher } from "~/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarRail,
} from "~/components/ui/sidebar";
import { useSidebar } from "@/components/ui/sidebar";

// This is sample data.
const data = {
  user: {
    name: "maxxx",
    email: "cvmaksim@gmail.com",
    avatar:
      "https://drevlandia.ru/wp-content/uploads/2018/03/Reznoj-Grib-s-litsom-1.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: LayoutDashboardIcon,
      isActive: true,
      items: [
        {
          title: "Main dashboard",
          url: "#",
        },
      ],
    },
    {
      title: "Tables",
      url: "#",
      icon: Database,
      items: [
        {
          title: "Users",
          url: "/user-table",
        },
        {
          title: "Orders",
          url: "#",
        },
        {
          title: "Restaurants",
          url: "/restaurant-table",
        },
        {
          title: "Categories",
          url: "/category-table",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "FAQ",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Profile",
          url: "/profile",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { toggleSidebar, open } = useSidebar();
  return (
    <Sidebar
      collapsible="icon"
      {...props}
      onClick={() => (open ? "" : toggleSidebar())}
    >
      <SidebarHeader>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
            <ShieldUser className="size-6" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight items-center">
            <span className="truncate text-2xl font-semibold text-primary">
              Admin panel
            </span>
          </div>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
