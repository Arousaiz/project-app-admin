import { instance } from "./api.config";
import type { Category } from "~/components/columns/category/categoryColumn";

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
  fetchCategories(query: CategoryQuery) {
    return instance
      .get(`/category?limit=${query.limit}&offset=${query.offset}`)
      .then((res) => res.data);
  },

  fetchAllCategories() {
    return instance.get(`/category/all`).then((res) => res.data);
  },

  createCategory(category: CreateCategory, token: string) {
    return instance
      .post(`/category/`, category, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        return res.data;
      });
  },

  updateCategory(category: Category, token: string) {
    return instance
      .put(`/category/${category.id}`, category, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => res.data);
  },

  deleteCategory(id: string, token: string) {
    console.log(id);
    return instance
      .delete(`/category/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => res.data);
  },
};
