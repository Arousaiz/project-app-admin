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
  data,
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

export const handle = {
  pageTitle: "Category Table",
};

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Category table" },
    { name: "description", content: "Category table page" },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const token = await requireAuthCookie(request);
  const url = new URL(request.url);
  const params = Object.fromEntries(url.searchParams);
  let query = new CategoryQuery(params);

  const categories = await CategoryService.fetchCategories(query);
  return categories;
}

export async function action({ request }: Route.ActionArgs) {
  const token = await requireAuthCookie(request);
  const data = await request.json();
  console.log(data);
  let errorMsg = "Something went wrong";

  if (data.intent === "create") {
    const response = await CategoryService.createCategory(data, token).catch(
      (error) => {
        errorMsg = error?.response?.data?.message;
      }
    );

    if (isNullOrUndefined(response)) {
      return errorMessage(errorMsg);
    }

    return response;
  }

  if (data.intent === "update") {
    const response = await CategoryService.updateCategory(data, token).catch(
      (error) => {
        errorMsg = error?.response?.data?.message;
      }
    );

    if (isNullOrUndefined(response)) {
      return errorMessage(errorMsg);
    }

    return response;
  }

  if (data.intent === "delete") {
    const response = await CategoryService.deleteCategory(data.id, token).catch(
      (error) => {
        errorMsg = error?.response?.data?.message;
      }
    );

    if (isNullOrUndefined(response)) {
      return errorMessage(errorMsg);
    }

    return response;
  }

  return { message: errorMsg.toString() };
}

export default function tableExamplePage() {
  let categories = useLoaderData<typeof loader>();
  let data = useActionData<typeof action>();
  useEffect(() => {
    if (data?.message) {
      toast(data.message);
    }
  }, [data]);

  return (
    <div>
      <div className="flex justify-between">
        <p className="text-3xl">Category</p>
        <CategoryDialog intent={"create"} />
      </div>
      <hr className="my-2" />
      <DataTable
        filterField="name"
        columns={categoryColumns}
        data={categories.data}
        paginated={categories.paginated}
      ></DataTable>
    </div>
  );
}
