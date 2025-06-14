import type { Route } from "../../+types/root";
import { ProfileService } from "~/api/api.profile";
import { Await, useActionData, useLoaderData } from "react-router";
import { useEffect } from "react";
import { toast } from "sonner";
import React from "react";
import Spinner from "~/components/ui/loading-spinner";
import AddressForm from "~/components/forms/profile/addressForm";
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

  if (data.intent === "update-info") {
    const response = await ProfileService.editInfo(data).catch((error) => {
      errorMsg = error?.response?.data?.message;
    });

    if (response === null || response === undefined) {
      return { message: errorMsg.toString() };
    }

    return response;
  } else if (data.intent === "update-address") {
    const response = await ProfileService.editAddress(data).catch((error) => {
      errorMsg = error?.response?.data?.message;
    });

    if (response === null || response === undefined) {
      return { message: errorMsg.toString() };
    }

    return response;
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
        <ContentSection
          title="Адрес"
          desc="На этой странице вы можете поменять свой адрес"
        >
          <AddressForm
            address={profile.address}
            intent="update-address"
          ></AddressForm>
        </ContentSection>
      </Await>
    </React.Suspense>
  );
}
