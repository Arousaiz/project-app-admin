import {
  DataTable,
  type DataTableFilterOptions,
} from "~/components/ui/data-table";
import type { Route } from "../../+types/root";
import { useActionData, useLoaderData } from "react-router";
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

export const handle = {
  pageTitle: "Таблица ресторанов",
};

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Таблица ресторанов" },
    { name: "description", content: "Restaurant table page" },
  ];
}

export async function clientLoader({ request }: Route.ClientLoaderArgs) {
  await checkQuery(
    "restaurants",
    RestaurantService.fetchRestaurants,
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

const RestaurantFilterOptions: DataTableFilterOptions[] = [
  {
    id: "name",
    title: "Кухни",
    type: "select-multiple",
    options: [
      {
        label: "Китайская",
        value: "chinese",
      },
      {
        label: "Русская",
        value: "russian",
      },
      {
        label: "Японская",
        value: "japanese",
      },
    ],
  },
  {
    id: "city",
    title: "Город",
    type: "select",
    options: [
      {
        label: "Гродно",
        value: "Гродно",
      },
      {
        label: "Минск",
        value: "Минск",
      },
      {
        label: "Витебск",
        value: "Витебск",
      },
    ],
  },
  // {
  //   id: "cuisine",
  //   title: "Категория",
  //   type: "select",
  //   options: [
  //     {
  //       label: "Китайская",
  //       value: "chinese",
  //     },
  //     {
  //       label: "Русская",
  //       value: "russian",
  //     },
  //     {
  //       label: "Японская",
  //       value: "japanese",
  //     },
  //   ],
  // },
  // {
  //   id: "phone",
  //   title: "Телефон",
  //   type: "text",
  // },
  // {
  //   id: "operatingHours",
  //   title: "Цена",
  //   type: "range",
  // },
  // {
  //   id: "name",
  //   title: "Фильтр по дате",
  //   type: "dates",
  // },
];

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
  const filters = useDebounce(columnFilters, 300);

  const { data, isLoading, isFetching, error } = useQuery<
    ApiData<Restaurant>,
    AxiosError
  >({
    queryKey: ["restaurants", pagination, sorting, query],
    queryFn: () =>
      RestaurantService.fetchRestaurants(pagination, sorting, query),
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
          <p className="text-3xl">Рестораны</p>
          <EntityCreateDialog>
            <RestaurantForm intent={"create"}></RestaurantForm>
          </EntityCreateDialog>
        </div>
        <hr className="my-2" />
        <DataTable
          status={{ isLoading, isFetching }}
          filterField="name"
          columns={RestaurantColumns}
          paginatedTableData={data}
          filterOptions={RestaurantFilterOptions}
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
