import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import type { Route } from "../../+types/root";
import ResetPassForm from "~/components/forms/auth/reset-pass-form";
import { AuthService } from "~/api/api.auth";
import { redirect } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Reset password" },
    { name: "description", content: "Reset password page" },
  ];
}

export async function clientLoader({ request }: Route.ClientLoaderArgs) {
  const res = await AuthService.checkAuth().catch((error) => {});
  if (res !== undefined) {
    return redirect("/");
  }
}

export default function ResetPassPage() {
  return (
    <div>
      <div className="flex flex-col gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Reset your password
            </CardTitle>
            <CardDescription>
              Check your email for a code and fill fields below
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResetPassForm></ResetPassForm>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
