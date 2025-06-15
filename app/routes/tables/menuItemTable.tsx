import {
  DataTable,
  type DataTableFilterOptions,
} from "~/components/ui/data-table";
import type { Route } from "../../+types/root";
import { useActionData, useLoaderData, useParams } from "react-router";
import { useEffect } from "react";
import { CategoryService } from "~/api/api.category";
import { toast } from "sonner";
import { isNullOrUndefined } from "~/lib/utils";
import { MenuItemService } from "~/api/api.menu-item";
import {
  MenuItemColumns,
  type MenuItem,
} from "~/components/columns/menuItemColumn";
import EntityCreateDialog from "~/components/modals/entityCreateDialog";
import MenuItemForm from "~/components/forms/menuItem/menuItemForm";
import { checkQuery, useTableStates } from "~/lib/query-utils";
import { useDebounce } from "@uidotdev/usehooks";
import { queryClient } from "~/api/api.config";
import {
  dehydrate,
  HydrationBoundary,
  keepPreviousData,
  useQuery,
} from "@tanstack/react-query";
import type { ApiData } from "~/api/types";
import type { AxiosError } from "axios";

export const handle = {
  pageTitle: "Таблица меню ресторана",
};

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Таблица меню ресторана" },
    { name: "description", content: "Menu Item table page" },
  ];
}

export async function clientLoader({
  request,
  params,
}: Route.ClientLoaderArgs) {
  // const url = new URL(request.url);
  // if (!params.id) {
  //   throw new Response(null, {
  //     status: 404,
  //     statusText: "Not Found",
  //   });
  // }

  await checkQuery("menu-items", MenuItemService.fetchMenuItems, queryClient);

  // if (error.data.statusCode === 404) {
  //   throw new Response(null, {
  //     status: 404,
  //     statusText: "Not Found",
  //   });

  const categories = await CategoryService.fetchAllCategories();
  return { dehydratedState: dehydrate(queryClient), categories };
}

export async function clientAction({
  request,
  params,
}: Route.ClientActionArgs) {
  let response = undefined;
  const data = await request.json();
  if (!params.id) {
    throw new Response(null, {
      status: 404,
      statusText: "Not Found",
    });
  }

  try {
    if (data.intent === "create") {
      response = await MenuItemService.createMenuItem(params.id, data);
    }

    if (data.intent === "update") {
      response = await MenuItemService.updateMenuItem(data);
    }

    if (data.intent === "delete") {
      response = await MenuItemService.deleteMenuItem(data.id);
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

const PromotionsFilterOptions: DataTableFilterOptions[] = [
  {
    id: "price",
    title: "Цена",
    type: "range",
  },
  {
    id: "name",
    title: "Рейтинг",
    type: "range",
    min: 1,
    max: 5,
  },
  {
    id: "category",
    title: "Категория",
    type: "select",
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
    id: "rating",
    title: "Рейтинг",
    type: "range",
    min: 1,
    max: 5,
  },
];

export default function tableExamplePage() {
  const { id } = useParams();
  let { dehydratedState } = useLoaderData<typeof clientLoader>();
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
    ApiData<MenuItem>,
    AxiosError
  >({
    queryKey: ["menu-items", pagination, sorting, query],
    queryFn: () =>
      MenuItemService.fetchMenuItems(id!, pagination, sorting, filters, query),
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
          <p className="text-3xl">Предметы меню ресторана</p>
          <EntityCreateDialog>
            <MenuItemForm intent={"create"}></MenuItemForm>
          </EntityCreateDialog>
        </div>
        <hr className="my-2" />
        <DataTable
          status={{ isLoading, isFetching }}
          filterField="name"
          filterOptions={PromotionsFilterOptions}
          columns={MenuItemColumns}
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
