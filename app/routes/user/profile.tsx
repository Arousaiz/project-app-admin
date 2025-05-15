import UserMetaCard from "~/components/userProfile/userMetaCard";
import type { Route } from "../../+types/root";
import UserInfo from "~/components/userProfile/userInfo";
import UserAddress from "~/components/userProfile/user-Address";
import { requireAuthCookie } from "~/services/session.server";
import { ProfileService, type UserProfile } from "~/api/api.profile";
import { useActionData, useLoaderData } from "react-router";
import { useEffect } from "react";
import { toast } from "sonner";

export const handle = {
  pageTitle: "Profile",
};

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Profile" },
    { name: "description", content: "Profile page" },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const token = await requireAuthCookie(request);

  const profile = await ProfileService.fetchProfile(token);
  return {
    profile,
  };
}

export async function action({ request }: Route.ActionArgs) {
  const token = await requireAuthCookie(request);
  const data = await request.json();
  let errorMsg = "Something went wrong";

  if (data.intent === "update-info") {
    const response = await ProfileService.editInfo(data, token).catch(
      (error) => {
        errorMsg = error?.response?.data?.message;
      }
    );

    if (response === null || response === undefined) {
      return { message: errorMsg.toString() };
    }

    return response;
  } else if (data.intent === "update-address") {
    const response = await ProfileService.editAddress(data, token).catch(
      (error) => {
        console.log(error.response);
        errorMsg = error?.response?.data?.message;
      }
    );

    if (response === null || response === undefined) {
      return { message: errorMsg.toString() };
    }

    return response;
  }

  return { message: errorMsg.toString() };
}

export default function ProfilePage() {
  let { profile } = useLoaderData<typeof loader>();
  let data = useActionData<typeof action>();
  useEffect(() => {
    if (data?.message) {
      toast(data.message);
    }
  }, [data]);
  return (
    <div className="flex flex-col">
      <div className="space-y-6">
        <UserInfo person={profile}></UserInfo>
        <UserAddress address={profile.address}></UserAddress>
      </div>
    </div>
  );
}
