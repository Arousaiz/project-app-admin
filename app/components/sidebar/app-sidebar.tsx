import * as React from "react";
import {
  BookOpen,
  Database,
  LayoutDashboardIcon,
  Settings2,
  ShieldUser,
} from "lucide-react";

import { NavMain } from "~/components/sidebar/nav-main";
import { NavUser } from "~/components/sidebar/nav-user";
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
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: LayoutDashboardIcon,
      isActive: true,
      items: [
        {
          title: "Main dashboard",
          url: "/",
        },
      ],
    },
    {
      title: "Таблицы",
      url: "#",
      icon: Database,
      items: [
        {
          title: "Пользователи",
          url: "/user-table",
        },
        {
          title: "Заказы",
          url: "#",
        },
        {
          title: "Рестораны",
          url: "/restaurant-table",
        },
        {
          title: "Категории",
          url: "/category-table",
        },
        {
          title: "Категории ресторанов",
          url: "/cuisine-table",
        },
      ],
    },
    {
      title: "Документация",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Введение",
          url: "#",
        },
        {
          title: "Начало работы",
          url: "#",
        },
        {
          title: "FAQ",
          url: "#",
        },
      ],
    },
    {
      title: "Настройки",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "Основные",
          url: "/profile-info",
        },
        {
          title: "Профиль",
          url: "/profile-info",
        },
      ],
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
