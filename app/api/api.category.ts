import type {
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";
import { instance } from "./api.config";
import type { Category } from "~/components/columns/categoryColumn";

export class CategoryQuery {
  offset: string = "0";
  limit: string = "10";
  constructor(params: { [k: string]: string }) {
    if (params?.offset) this.offset = params.offset;
    if (params?.limit) this.limit = params.limit;
  }
}

export type CreateCategory = Required<Omit<Category, "id">>;

export const CategoryService = {
  fetchCategories(
    pagination: PaginationState,
    sorting: SortingState,
    query?: string
  ) {
    return instance
      .get(
        `/category?limit=${pagination.pageSize}&offset=${
          pagination.pageIndex * pagination.pageSize
        }&${
          sorting.length !== 0
            ? `sortBy=${sorting[0].id}&sortOrder=${
                sorting[0].desc ? "DESC" : "ASC"
              }&`
            : ""
        }${query !== null && query !== "" ? `search=${query}&` : ""}`
      )
      .then((res) => res.data);
  },

  fetchAllCategories() {
    return instance.get(`/category/all`).then((res) => res.data);
  },

  createCategory(category: CreateCategory) {
    return instance.post(`/category/`, category).then((res) => {
      return res.data;
    });
  },

  updateCategory(category: Category) {
    return instance
      .put(`/category/${category.id}`, category)
      .then((res) => res.data);
  },

  deleteCategory(id: string) {
    console.log(id);
    return instance.delete(`/category/${id}`).then((res) => res.data);
  },
};
