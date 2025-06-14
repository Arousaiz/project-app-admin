import { Aperture, Bell, Palette, PenTool, User } from "lucide-react";
import { Outlet } from "react-router";
import SidebarNav from "~/components/sidebar/sidebar-nav(rename)";
import { Separator } from "~/components/ui/separator";

export default function SettingsLayout() {
  return (
    <div>
      <div className="space-y-0.5">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          Настройки
        </h1>
        <p className="text-muted-foreground">
          Измените данные вашего аккаунта и предпочтения
        </p>
      </div>
      <Separator className="my-4 lg:my-6" />
      <div className="flex flex-1 flex-col space-y-2 overflow-hidden md:space-y-2 lg:flex-row lg:space-y-0 lg:space-x-12">
        <aside className="top-0 lg:sticky lg:w-1/5">
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <div className="flex w-full overflow-y-hidden sm:p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

const sidebarNavItems = [
  {
    title: "Профиль",
    icon: <User size={18} />,
    href: "/profile-info",
  },
  {
    title: "Адрес",
    icon: <PenTool size={18} />,
    href: "/profile-address",
  },
  {
    title: "Предпочтения",
    icon: <Palette size={18} />,
    href: "/settings/appearance",
  },
  {
    title: "Уведомления",
    icon: <Bell size={18} />,
    href: "/settings/notifications",
  },
  {
    title: "Отображение",
    icon: <Aperture size={18} />,
    href: "/settings/display",
  },
];
