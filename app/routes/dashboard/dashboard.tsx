import { SectionCards } from "~/components/dashboard/dashbooard-cards";
import type { Route } from "../../+types/root";
import { ProfileService } from "~/api/api.profile";
import { ChartAreaInteractive } from "~/components/dashboard/chart";

export const handle = {
  pageTitle: "Dashboard",
};

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dashboard" },
    { name: "description", content: "Dashboard page" },
  ];
}

export async function clientLoader({ request }: Route.ClientLoaderArgs) {
  //const user = ProfileService.fetchProfile();

  return null;
}

export default function DashboardPage() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <SectionCards />
          <div className="px-4 lg:px-6">
            <ChartAreaInteractive />
          </div>
        </div>
      </div>
    </div>
  );
}
