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
import { AuthService } from "~/api/api.auth";
import { redirect, useActionData, useLoaderData } from "react-router";
import { toast } from "sonner";
import { useEffect } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Register" },
    { name: "description", content: "Register page" },
  ];
}

export async function clientLoader({ request }: Route.ClientLoaderArgs) {
  const res = await AuthService.checkAuth().catch((error) => {});
  if (res !== undefined) {
    return redirect("/");
  }
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const data = await request.json();

  const res = await AuthService.register(data);

  if (res !== undefined) {
    return redirect("/login");
  }

  return null;
}

export default function Register() {
  return (
    <div>
      <div className="flex flex-col gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Добро пожаловать!
            </CardTitle>
            <CardDescription>
              Введите имя пользователя и пароль для того, чтобы создать новый
              аккаунт.
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
