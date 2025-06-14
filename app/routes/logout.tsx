import { redirect, type MetaFunction } from "react-router";
import type { Route } from "../+types/root";
import { AuthService } from "~/api/api.auth";

export async function clientAction({ request }: Route.ClientActionArgs) {
  await AuthService.logout();
  return redirect("/login");
}
