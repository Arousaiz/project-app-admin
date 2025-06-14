import type {
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";
import { instance } from "./api.config";
import type { Cuisines } from "~/components/columns/cuisinesColumn";

export type CreateCuisine = Required<Omit<Cuisines, "id">>;

export const CuisinesService = {
  fetchCategories(
    pagination: PaginationState,
    sorting: SortingState,
    query?: string
  ) {
    return instance
      .get(
        `/cuisine?limit=${pagination.pageSize}&offset=${
          pagination.pageIndex * pagination.pageSize
        }&${
          sorting.length !== 0
            ? `sortBy=${sorting[0].id}&sortOrder=${
                sorting[0].desc ? "DESC" : "ASC"
              }&`
            : ""
        }${query !== null && query !== "" ? `search=${query}&` : ""}`
      )
      .then((res) => res?.data);
  },

  fetchAllCategories() {
    return instance.get(`/cuisine/all`).then((res) => res?.data.data);
  },

  createCategory(cuisine: CreateCuisine) {
    return instance.post(`/cuisine/`, cuisine).then((res) => {
      return res?.data;
    });
  },

  updateCategory(cuisine: Cuisines) {
    return instance
      .put(`/cuisine/${cuisine.id}`, cuisine)
      .then((res) => res?.data);
  },

  deleteCategory(id: string) {
    console.log(id);
    return instance.delete(`/cuisine/${id}`).then((res) => res?.data);
  },
};
