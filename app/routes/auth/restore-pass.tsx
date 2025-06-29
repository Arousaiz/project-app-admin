import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import type { Route } from "../../+types/root";
import RestorePassForm from "~/components/forms/auth/restore-pass-form";
import { AuthService } from "~/api/api.auth";
import { redirect } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Restore password" },
    { name: "description", content: "Restore password page" },
  ];
}

export async function clientLoader({ request }: Route.ClientLoaderArgs) {
  const res = await AuthService.checkAuth().catch((error) => {});
  if (res !== undefined) {
    return redirect("/");
  }
}

export default function RestorePassPage() {
  return (
    <div>
      <div className="flex flex-col gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Forgot password?
            </CardTitle>
            <CardDescription>
              Enter your email and follow next instructions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RestorePassForm></RestorePassForm>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
