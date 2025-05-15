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
  useLoaderData,
  useSearchParams,
  type ShouldRevalidateFunction,
  type ShouldRevalidateFunctionArgs,
} from "react-router";
import { useState } from "react";
import type { PaginationState } from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import { Button } from "~/components/ui/button";
import { Plus } from "lucide-react";

export const handle = {
  pageTitle: "TableExample",
};

export function meta({}: Route.MetaArgs) {
  return [
    { title: "TableExample" },
    { name: "description", content: "Table example page" },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const token = await requireAuthCookie(request);
  const url = new URL(request.url);
  const params = Object.fromEntries(url.searchParams);
  let query = new UserQuery(params);

  const users = await UserService.fetchUsers(query, token);
  return users;
}

export default function tableExamplePage() {
  let users = useLoaderData<typeof loader>();

  return (
    <div>
      <div className="flex justify-between">
        <p className="text-3xl">Users</p>
        <Button>
          <Plus></Plus>Add new
        </Button>
      </div>
      <hr className="my-2" />
      <DataTable
        filterField="username"
        columns={userColumns}
        data={users.data}
        paginated={users.paginated}
      ></DataTable>
    </div>
  );
}
