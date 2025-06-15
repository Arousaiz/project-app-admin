import {
  DataTable,
  type DataTableFilterOptions,
} from "~/components/ui/data-table";
import type { Route } from "../../+types/root";
import { useActionData, useLoaderData, useParams } from "react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { isNullOrUndefined } from "~/lib/utils";
import { RestaurantService } from "~/api/api.restaurant";
import {
  RestaurantColumns,
  type Restaurant,
} from "~/components/columns/restaurantColumn";
import {
  dehydrate,
  HydrationBoundary,
  keepPreviousData,
  useQuery,
} from "@tanstack/react-query";
import type { AxiosError } from "axios";
import EntityCreateDialog from "~/components/modals/entityCreateDialog";
import RestaurantForm from "~/components/forms/restaurant/restaurantForm";
import { useDebounce } from "@uidotdev/usehooks";
import { queryClient } from "~/api/api.config";
import { checkQuery, useTableStates } from "~/lib/query-utils";
import type { ApiData } from "~/api/types";
import { CuisinesService } from "~/api/api.cuisines";
import type { Order } from "~/zodSchemas/orderSchema";
import { orderColumns } from "~/components/columns/orderColumn";

export const handle = {
  pageTitle: "Таблица заказов в ресторане",
};

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Таблица заказов в ресторане" },
    { name: "description", content: "Restaurant table page" },
  ];
}

export async function clientLoader({ request }: Route.ClientLoaderArgs) {
  await checkQuery(
    "orders",
    RestaurantService.fetchRestaurantOrders,
    queryClient
  );

  const cuisines = await CuisinesService.fetchAllCategories();

  return { dehydratedState: dehydrate(queryClient), cuisines };
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  let response = undefined;
  const data = await request.json();

  try {
    if (data.intent === "create") {
      response = await RestaurantService.createRestaurant(data);
    }

    if (data.intent === "update") {
      response = await RestaurantService.updateRestaurant(data);
    }

    if (data.intent === "delete") {
      response = await RestaurantService.deleteRestaurant(data.id);
    }
  } catch (error) {
    console.log(error);

    return { error };
  }

  if (isNullOrUndefined(response)) {
    toast.error("Произошла ошибка");
    return { message: "Something went wrong" };
  }

  toast.info("Действие успешно");

  return response;
}

export default function tableExamplePage() {
  const { id } = useParams();
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
  const filters = useDebounce(columnFilters, 300);

  const { data, isLoading, isFetching, error } = useQuery<
    ApiData<Order>,
    AxiosError
  >({
    queryKey: ["orders", pagination, sorting, query],
    queryFn: () =>
      RestaurantService.fetchRestaurantOrders(id!, pagination, sorting, query),
    placeholderData: keepPreviousData,
  });

  console.log(data);

  useEffect(() => {
    if (result?.message) {
      toast(result.message);
    }
  }, [result]);

  return (
    <HydrationBoundary state={dehydratedState}>
      <div>
        <div className="flex justify-between">
          <p className="text-3xl">Заказы</p>
        </div>
        <hr className="my-2" />
        <DataTable
          status={{ isLoading, isFetching }}
          filterField="name"
          columns={orderColumns}
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
