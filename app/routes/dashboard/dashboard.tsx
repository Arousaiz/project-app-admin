import { requireAuthCookie } from "~/services/session.server";
import type { Route } from "../../+types/root";

export const handle = {
  pageTitle: "Dashboard",
};

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dashboard" },
    { name: "description", content: "Dashboard page" },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const token = await requireAuthCookie(request);

  return null;
}

export default function DashboardPage() {
  return <div></div>;
}
