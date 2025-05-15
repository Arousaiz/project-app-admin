import { getSession, requireAuthCookie } from "~/services/session.server";
import type { Route } from "../+types/root";
import { Welcome } from "../welcome/welcome";
import { redirect } from "react-router";
import { instance } from "~/api/api.config";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const token = await requireAuthCookie(request);
}

export default function Home() {
  return <Welcome />;
}
