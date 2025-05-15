import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import type { Route } from "../../+types/root";
import { z } from "zod";
import LoginForm from "~/components/forms/auth/login-form";
import {
  data,
  isRouteErrorResponse,
  redirect,
  useActionData,
  useLoaderData,
  useRouteError,
} from "react-router";
import {
  getSession,
  commitSession,
  redirectFromAuth,
} from "@/services/session.server";
import { instance } from "@/api/api.config";
import { AuthService } from "~/api/api.auth";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { AlertCircle } from "lucide-react";
import ErrorAlert from "~/components/error-alert";
import { toast } from "sonner";
import { useEffect } from "react";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Login" }, { name: "description", content: "Login page" }];
}

export async function loader({ request }: Route.LoaderArgs) {
  return await redirectFromAuth(request);
}

export async function action({ request }: Route.ActionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const data = await request.json();
  let error1 = "Invalid credentials";
  console.log(data);

  const token = await AuthService.login(data).catch((error) => {
    error1 = error?.response?.data?.message;
  });

  if (token === null || token === undefined) {
    session.flash("error", error1);

    return redirect("/login", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }

  session.set("token", token);

  return redirect("/", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

export default function Login() {
  const { error } = useLoaderData<typeof loader>();
  useEffect(() => {
    if (error) {
      toast(error);
    }
  }, [error]);
  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Welcome back!
          </CardTitle>
          <CardDescription>
            Enter your credentials below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm></LoginForm>
        </CardContent>
      </Card>
    </div>
  );
}
