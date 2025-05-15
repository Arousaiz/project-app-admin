import LoginForm from "~/components/forms/auth/login-form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import type { Route } from "../../+types/root";
import RegisterForm from "~/components/forms/auth/register-form";
import {
  commitSession,
  getSession,
  redirectFromAuth,
} from "~/services/session.server";
import { AuthService } from "~/api/api.auth";
import { redirect, useLoaderData } from "react-router";
import ErrorAlert from "~/components/error-alert";
import { toast } from "sonner";
import { useEffect } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Register" },
    { name: "description", content: "Register page" },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  return await redirectFromAuth(request);
}

export async function action({ request }: Route.ActionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  let error = "Something went wrong. Try again later.";
  const data = await request.json();

  const message = await AuthService.register(data).catch((error) => {
    console.log(error);
    error = error?.response?.data?.message;
  });

  if (!message) {
    session.flash("error", error);

    return redirect("/register", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }

  return redirect("/login");
}

export default function Register() {
  const { error } = useLoaderData<typeof loader>();
  useEffect(() => {
    if (error) {
      toast(error);
    }
  }, [error]);
  return (
    <div>
      <div className="flex flex-col gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Welcome!
            </CardTitle>
            <CardDescription>
              Enter username and password below to sign up for a new account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RegisterForm></RegisterForm>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
