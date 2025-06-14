import { DataTable } from "~/components/ui/data-table";
import type { Route } from "../../+types/root";
import { useActionData, useLoaderData } from "react-router";
import { useEffect } from "react";
import { CategoryService } from "~/api/api.category";
import {
  categoryColumns,
  type Category,
} from "~/components/columns/categoryColumn";
import { toast } from "sonner";
import { isNullOrUndefined } from "~/lib/utils";
import { checkQuery, useTableStates } from "~/lib/query-utils";
import { useDebounce } from "@uidotdev/usehooks";
import {
  dehydrate,
  HydrationBoundary,
  keepPreviousData,
  useQuery,
} from "@tanstack/react-query";
import type { ApiData } from "~/api/types";
import type { AxiosError } from "axios";
import { queryClient } from "~/api/api.config";
import EntityCreateDialog from "~/components/modals/entityCreateDialog";
import CategoryForm from "~/components/forms/category/categoryForm";

export const handle = {
  pageTitle: "Таблица категорий",
};

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Категории" },
    { name: "description", content: "Category table page" },
  ];
}

export async function clientLoader({ request }: Route.ClientLoaderArgs) {
  await checkQuery("category", CategoryService.fetchCategories, queryClient);

  return { dehydratedState: dehydrate(queryClient) };
}

export async function clientAction({ request }: Route.ActionArgs) {
  let response = undefined;
  const data = await request.json();

  try {
    if (data.intent === "create") {
      response = await CategoryService.createCategory(data);
    }

    if (data.intent === "update") {
      response = await CategoryService.updateCategory(data);
    }

    if (data.intent === "delete") {
      response = await CategoryService.deleteCategory(data.id);
    }
  } catch (error) {
    console.log(error);

    return { error };
  }

  if (isNullOrUndefined(response)) {
    toast.error("Something went wrong");
    return { message: "Something went wrong" };
  }

  toast.info(response.message);

  return { response };
}

export default function tableExamplePage({ actionData }: Route.ComponentProps) {
  const { dehydratedState } = useLoaderData<typeof clientLoader>();
  const {
    pagination,
    setPagination,
    sorting,
    setSorting,
    globalFilter,
    setGlobalFilter,
    columnFilters,
    setColumnFilters,
  } = useTableStates<any>();

  const query = useDebounce(globalFilter, 300);

  const { data, isLoading, isFetching, error } = useQuery<
    ApiData<Category>,
    AxiosError
  >({
    queryKey: ["category", pagination, sorting, query],
    queryFn: () => CategoryService.fetchCategories(pagination, sorting, query),
    placeholderData: keepPreviousData,
  });

  return (
    <HydrationBoundary state={dehydratedState}>
      <div>
        <div className="flex justify-between">
          <p className="text-3xl">Таблица категорий</p>
          <EntityCreateDialog>
            <CategoryForm intent={"create"}></CategoryForm>
          </EntityCreateDialog>
        </div>
        <hr className="my-2" />
        <DataTable
          status={{ isLoading, isFetching }}
          filterField="name"
          columns={categoryColumns}
          paginatedTableData={data}
          pagination={pagination}
          setPagination={setPagination}
          sorting={sorting}
          setSorting={setSorting}
          columnFilters={columnFilters}
          setColumnFilters={setColumnFilters}
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
        ></DataTable>
      </div>
    </HydrationBoundary>
  );
}
