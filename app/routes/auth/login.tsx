import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import type { Route } from "../../+types/root";
import LoginForm from "~/components/forms/auth/login-form";
import { redirect, useActionData } from "react-router";
import { AuthService } from "~/api/api.auth";
import { toast } from "sonner";
import { useEffect } from "react";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Login" }, { name: "description", content: "Login page" }];
}

export async function clientLoader({ request }: Route.ClientLoaderArgs) {
  const res = await AuthService.checkAuth().catch((error) => {});
  if (res !== undefined) {
    return redirect("/");
  }
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const data = await request.json();

  const res = await AuthService.login(data);

  if (res !== undefined) {
    return redirect("/");
  }

  return null;
}

export default function Login() {
  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Добро пожаловать!
          </CardTitle>
          <CardDescription>Введите ваши данные для входа ниже.</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm></LoginForm>
        </CardContent>
      </Card>
    </div>
  );
}
