import type {
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";
import { instance } from "./api.config";
import type { MenuItem } from "~/components/columns/menuItemColumn";

// export class MenuItemQuery {
//   offset: string = "0";
//   limit: string = "10";
//   constructor(params: { [k: string]: string }) {
//     if (params?.offset) this.offset = params.offset;
//     if (params?.limit) this.limit = params.limit;
//   }
// }

export type CreateMenuItem = Required<Omit<MenuItem, "id">>;

export const MenuItemService = {
  fetchMenuItems(
    id: string,
    pagination: PaginationState = {
      pageIndex: 0,
      pageSize: 10,
    },
    sorting?: SortingState,
    filters?: ColumnFiltersState,
    query?: string
  ) {
    return instance
      .get(
        `/restaurants/${id}/menu?limit=${pagination.pageSize}&offset=${
          pagination.pageIndex * pagination.pageSize
        }&`
      )
      .then((res) => res.data);
  },

  createMenuItem(id: string, menuItem: CreateMenuItem) {
    return instance
      .post(`/restaurants/${id}/menu`, {
        name: menuItem.name,
        description: menuItem.description,
        price: menuItem.price,
        img_url: menuItem.img_url,
        categoryId: menuItem.category.id,
      })
      .then((res) => {
        return res.data;
      });
  },

  updateMenuItem(menuItem: MenuItem) {
    return instance
      .put(`/restaurants/menu/${menuItem.id}`, {
        name: menuItem.name,
        description: menuItem.description,
        price: menuItem.price,
        img_url: menuItem.img_url,
        categoryId: menuItem.category.id,
      })
      .then((res) => res.data);
  },

  deleteMenuItem(id: string) {
    console.log(id);
    return instance.delete(`/restaurants/menu/${id}`).then((res) => res.data);
  },
};
