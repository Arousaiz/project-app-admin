import type { Route } from "../../+types/root";
import { ProfileService } from "~/api/api.profile";
import { Await, useActionData, useLoaderData } from "react-router";
import { useEffect } from "react";
import { toast } from "sonner";
import React from "react";
import Spinner from "~/components/ui/loading-spinner";
import InfoForm from "~/components/forms/profile/infoForm";
import ContentSection from "~/components/userProfile/contentSection";

export const handle = {
  pageTitle: "Profile",
};

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Profile" },
    { name: "description", content: "Profile page" },
  ];
}

export async function clientLoader({
  request,
  params,
}: Route.ClientLoaderArgs) {
  const profile = await ProfileService.fetchProfile();
  return {
    profile,
  };
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const data = await request.json();
  let errorMsg = "Something went wrong";

  try {
    if (data.intent === "update-info") {
      const response = await ProfileService.editInfo(data).catch((error) => {
        errorMsg = error?.response?.data?.message;
      });

      if (response === null || response === undefined) {
        return { message: errorMsg.toString() };
      }

      toast.info("Успешно обновлено");

      return response;
    } else if (data.intent === "update-address") {
      const response = await ProfileService.editAddress(data).catch((error) => {
        errorMsg = error?.response?.data?.message;
      });

      if (response === null || response === undefined) {
        return { message: errorMsg.toString() };
      }

      toast.info("Успешно обновлено");

      return response;
    }
  } catch (error) {
    toast.error("Произошла ошибка");
    console.log(error);
  }

  return { message: errorMsg.toString() };
}

export default function ProfilePage({ loaderData }: Route.ComponentProps) {
  let { profile } = useLoaderData<typeof clientLoader>();
  let data = useActionData<typeof clientAction>();
  useEffect(() => {
    if (data?.message) {
      toast(data.message);
    }
  }, [data]);
  return (
    <React.Suspense>
      <Await resolve={profile}>
        {(person) => (
          <ContentSection
            title="Профиль"
            desc="На этой странице вы можете поменять основные данные своего аккаунта"
          >
            <InfoForm person={person} intent="update-info"></InfoForm>
          </ContentSection>
        )}
      </Await>
    </React.Suspense>
  );
}
