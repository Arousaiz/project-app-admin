import { redirect, type MetaFunction } from "react-router";
import type { Route } from "../+types/root";
import { destroySession, getSession } from "~/services/session.server";

export async function action({ request }: Route.ActionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  return redirect("/login", {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
}
