import { DataTable } from "~/components/ui/data-table";
import type { Route } from "../../../+types/root";
import {
  columns,
  userColumns,
  type Payment,
  type User,
} from "~/components/columns/user/userColumn";
import { requireAuthCookie } from "~/services/session.server";
import { UserQuery, UserService } from "~/api/api.user";
import {
  useActionData,
  useLoaderData,
  useSearchParams,
  type ShouldRevalidateFunction,
  type ShouldRevalidateFunctionArgs,
} from "react-router";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { PaginationState } from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import { Button } from "~/components/ui/button";
import { Pencil, Plus } from "lucide-react";
import { CategoryQuery, CategoryService } from "~/api/api.category";
import { categoryColumns } from "~/components/columns/category/categoryColumn";
import CategoryForm from "~/components/forms/category/categoryForm";
import { toast } from "sonner";
import CloseSaveButtons from "~/components/modals/closeSaveButtons";
import AddButton from "~/components/buttons/addButton";
import { errorMessage, isNullOrUndefined } from "~/lib/utils";
import CategoryDialog from "~/components/modals/category/categoryDialog";
import { RestaurantQuery, RestaurantService } from "~/api/api.restaurant";
import RestaurantDialog from "~/components/modals/restaurant/restaurantDialog";
import { RestaurantColumns } from "~/components/columns/restaurant/restaurantColumn";

export const handle = {
  pageTitle: "Restaurant Table",
};

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Restaurant table" },
    { name: "description", content: "Restaurant table page" },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const token = await requireAuthCookie(request);
  const url = new URL(request.url);
  const params = Object.fromEntries(url.searchParams);
  let query = new RestaurantQuery(params);

  const restaurants = await RestaurantService.fetchRestaurants(query);
  return restaurants;
}

export async function action({ request }: Route.ActionArgs) {
  const token = await requireAuthCookie(request);
  const data = await request.json();
  let errorMsg = "Something went wrong";

  if (data.intent === "create") {
    const response = await RestaurantService.createRestaurant(
      data,
      token
    ).catch((error) => {
      errorMsg = error?.response?.data?.message;
    });

    if (isNullOrUndefined(response)) {
      return errorMessage(errorMsg);
    }

    return response;
  }

  if (data.intent === "update") {
    const response = await RestaurantService.updateRestaurant(
      data,
      token
    ).catch((error) => {
      errorMsg = error?.response?.data?.message;
    });

    if (isNullOrUndefined(response)) {
      return errorMessage(errorMsg);
    }

    return response;
  }

  if (data.intent === "delete") {
    const response = await RestaurantService.deleteRestaurant(
      data.id,
      token
    ).catch((error) => {
      errorMsg = error?.response?.data?.message;
    });

    if (isNullOrUndefined(response)) {
      return errorMessage(errorMsg);
    }

    return response;
  }

  return { message: errorMsg.toString() };
}

export default function tableExamplePage() {
  let restaurants = useLoaderData<typeof loader>();
  let data = useActionData<typeof action>();
  useEffect(() => {
    if (data?.message) {
      toast(data.message);
    }
  }, [data]);

  return (
    <div>
      <div className="flex justify-between">
        <p className="text-3xl">Restaurants</p>
        <RestaurantDialog intent={"create"} />
      </div>
      <hr className="my-2" />
      <DataTable
        filterField="name"
        columns={RestaurantColumns}
        data={restaurants.data}
        paginated={restaurants.paginated}
      ></DataTable>
    </div>
  );
}
