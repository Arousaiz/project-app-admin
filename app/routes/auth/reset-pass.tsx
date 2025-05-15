import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import type { Route } from "../../+types/root";
import ResetPassForm from "~/components/forms/auth/reset-pass-form";
import { redirectFromAuth } from "~/services/session.server";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Reset password" },
    { name: "description", content: "Reset password page" },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  return await redirectFromAuth(request);
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
