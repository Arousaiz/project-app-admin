import { DataTable } from "~/components/ui/data-table";
import type { Route } from "../../+types/root";
import { useActionData, useLoaderData } from "react-router";
import { useEffect } from "react";
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
import CuisinesForm from "~/components/forms/cuisines/cuisinesForm";
import { CuisinesService } from "~/api/api.cuisines";

export const handle = {
  pageTitle: "Таблица типов кухонь",
};

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Типы кухонь" },
    { name: "description", content: "Category table page" },
  ];
}

export async function clientLoader({ request }: Route.ClientLoaderArgs) {
  await checkQuery("cuisine", CuisinesService.fetchCategories, queryClient);

  return { dehydratedState: dehydrate(queryClient) };
}

export async function clientAction({ request }: Route.ActionArgs) {
  let response = undefined;
  const data = await request.json();

  try {
    if (data.intent === "create") {
      response = await CuisinesService.createCategory(data);
    }

    if (data.intent === "update") {
      response = await CuisinesService.updateCategory(data);
    }

    if (data.intent === "delete") {
      response = await CuisinesService.deleteCategory(data.id);
    }
  } catch (error) {
    console.log(error);

    return { error };
  }

  if (isNullOrUndefined(response)) {
    return { message: "Something went wrong" };
  }

  return response;
}

export default function tableExamplePage() {
  const { dehydratedState } = useLoaderData<typeof clientLoader>();
  let result = useActionData<typeof clientAction>();
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
    queryKey: ["cuisine", pagination, sorting, query],
    queryFn: () => CuisinesService.fetchCategories(pagination, sorting, query),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (result?.message) {
      toast(result.message);
    }
  }, [result]);

  return (
    <HydrationBoundary state={dehydratedState}>
      <div>
        <div className="flex justify-between">
          <p className="text-3xl">Таблица типов кухонь</p>
          <EntityCreateDialog>
            <CuisinesForm intent={"create"}></CuisinesForm>
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
