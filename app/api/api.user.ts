import type {
  ColumnFiltersState,
  GlobalFilterTableState,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";
import { instance } from "./api.config";

export class UserQuery {
  offset: string = "0";
  limit: string = "10";
  constructor(params: { [k: string]: string }) {
    if (params?.offset) this.offset = params.offset;
    if (params?.limit) this.limit = params.limit;
  }
}

export const UserService = {
  fetchUsers(
    pagination: PaginationState,
    sorting: SortingState,
    filters: ColumnFiltersState,
    query?: string
  ) {
    let role = "";
    for (const filter of filters) {
      if (filter.id === "role") {
        role = filter.value as string;
      }
    }
    console.log;

    return instance
      .get(
        `/users?limit=${pagination.pageSize}&offset=${
          pagination.pageIndex * pagination.pageSize
        }&${
          sorting.length !== 0
            ? `sortBy=${sorting[0].id}&sortOrder=${
                sorting[0].desc ? "DESC" : "ASC"
              }&`
            : ""
        }${role !== "" ? `role=${role}&` : ""}${
          query !== null && query !== "" ? `search=${query}&` : ""
        }`
      )
      .then((res) => res.data)
      .catch((error) => console.log(error));
  },
};
