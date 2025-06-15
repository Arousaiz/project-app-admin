import {
  DataTable,
  type DataTableFilterOptions,
} from "~/components/ui/data-table";
import type { Route } from "../../+types/root";
import { useActionData, useLoaderData, useParams } from "react-router";
import { useEffect } from "react";
import { toast } from "sonner";
import { isNullOrUndefined } from "~/lib/utils";
import { MenuItemService } from "~/api/api.menu-item";
import EntityCreateDialog from "~/components/modals/entityCreateDialog";
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
import { PromotionsService } from "~/api/api.promotions";
import {
  PromotionsColumns,
  type Promotions,
} from "~/components/columns/promotionsColumn";
import PromotionForm from "~/components/forms/promotions/promotionsForm";

export const handle = {
  pageTitle: "Таблица акций ресторана",
};

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Таблица акций ресторана" },
    { name: "description", content: "Menu Item table page" },
  ];
}

export async function clientLoader({
  request,
  params,
}: Route.ClientLoaderArgs) {
  // const url = new URL(request.url);
  if (!params.id) {
    throw new Response(null, {
      status: 404,
      statusText: "Not Found",
    });
  }

  await checkQuery(
    "promotions",
    PromotionsService.fetchPromotions,
    queryClient
  );

  // if (error.data.statusCode === 404) {
  //   throw new Response(null, {
  //     status: 404,
  //     statusText: "Not Found",
  //   });

  const categories = await MenuItemService.fetchMenuItems(params.id);
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
  console.log(params);

  try {
    if (data.intent === "create") {
      response = await PromotionsService.createPromotion(params.id, data);
    }

    if (data.intent === "update") {
      response = await PromotionsService.updatePromotion(data);
    }

    if (data.intent === "delete") {
      response = await PromotionsService.deletePromotion(data.id);
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
    id: "startDate",
    title: "Фильтр по дате",
    type: "dates",
  },
  {
    id: "promotionValue",
    title: "Тип акции",
    type: "select",
    options: [
      {
        label: "Скидка",
        value: "discount",
      },
      {
        label: "Бесплатный предмет от Х шт",
        value: "free item",
      },
    ],
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
    ApiData<Promotions>,
    AxiosError
  >({
    queryKey: ["promotions", pagination, sorting, query],
    queryFn: () =>
      PromotionsService.fetchPromotions(
        id!,
        pagination,
        sorting,
        filters,
        query
      ),
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
          <p className="text-3xl">Акции</p>
          <EntityCreateDialog>
            <PromotionForm intent={"create"}></PromotionForm>
          </EntityCreateDialog>
        </div>
        <hr className="my-2" />
        <DataTable
          status={{ isLoading, isFetching }}
          filterField="name"
          filterOptions={PromotionsFilterOptions}
          columns={PromotionsColumns}
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
