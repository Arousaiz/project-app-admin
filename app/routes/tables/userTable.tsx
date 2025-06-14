import {
  DataTable,
  type DataTableFilterOptions,
} from "~/components/ui/data-table";
import type { Route } from "../../+types/root";
import { userColumns, type User } from "~/components/columns/userColumn";
import { UserService } from "~/api/api.user";
import { useLoaderData, type ClientLoaderFunctionArgs } from "react-router";
import { useState } from "react";
import {
  dehydrate,
  HydrationBoundary,
  keepPreviousData,
  useQuery,
} from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { checkQuery, useTableStates } from "~/lib/query-utils";
import { queryClient } from "~/api/api.config";
import type { ApiData } from "~/api/types";
import { useDebounce } from "@uidotdev/usehooks";

export const handle = {
  pageTitle: "Таблицы пользователей",
};

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Пользователи" },
    { name: "description", content: "Table example page" },
  ];
}

const UserFilterOptions: DataTableFilterOptions[] = [
  {
    id: "role",
    title: "Роли пользователя",
    type: "select",
    options: [
      {
        label: "Администратор",
        value: "admin",
      },
      {
        label: "Администратор ресторана",
        value: "restaurant_admin",
      },
      {
        label: "Пользователь",
        value: "user",
      },
    ],
  },
];

export async function clientLoader({
  request,
  params,
  serverLoader,
}: ClientLoaderFunctionArgs) {
  // const url = new URL(request.url);
  // const queryParams = Object.fromEntries(url.searchParams);
  // let query = new UserQuery(queryParams);

  await checkQuery("users", UserService.fetchUsers, queryClient);

  return { dehydratedState: dehydrate(queryClient) };
}

export default function tableExamplePage() {
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
  const filters = useDebounce(columnFilters, 300);

  const { data, isLoading, isFetching, error } = useQuery<
    ApiData<User>,
    AxiosError
  >({
    queryKey: ["users", pagination, sorting, query, filters],
    queryFn: () => UserService.fetchUsers(pagination, sorting, filters, query),
    placeholderData: keepPreviousData,
  });

  return (
    <HydrationBoundary state={dehydratedState}>
      <div>
        <div className="flex justify-between">
          <p className="text-3xl">Таблица пользователей</p>
        </div>
        <hr className="my-2" />
        <DataTable
          status={{ isLoading, isFetching }}
          filterField="username"
          filterOptions={UserFilterOptions}
          columns={userColumns}
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
