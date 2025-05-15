import { instance } from "./api.config";
import type { Category } from "~/components/columns/category/categoryColumn";
import type { MenuItem } from "~/components/columns/menuItem/menuItemColumn";
import type { Restaurant } from "~/components/columns/restaurant/restaurantColumn";

export class MenuItemQuery {
  offset: string = "0";
  limit: string = "10";
  constructor(params: { [k: string]: string }) {
    if (params?.offset) this.offset = params.offset;
    if (params?.limit) this.limit = params.limit;
  }
}

export type CreateMenuItem = Required<Omit<MenuItem, "id">>;

export const MenuItemService = {
  fetchMenuItems(id: string, query: MenuItemQuery) {
    return instance
      .get(
        `/restaurants/${id}/menu?limit=${query.limit}&offset=${query.offset}`
      )
      .then((res) => res.data);
  },

  createMenuItem(id: string, menuItem: CreateMenuItem, token: string) {
    return instance
      .post(
        `/restaurants/${id}/menu`,
        {
          name: menuItem.name,
          description: menuItem.description,
          price: menuItem.price,
          categoryId: menuItem.category.id,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        return res.data;
      });
  },

  updateMenuItem(menuItem: MenuItem, token: string) {
    return instance
      .put(
        `/restaurants/menu/${menuItem.id}`,
        {
          name: menuItem.name,
          description: menuItem.description,
          price: menuItem.price,
          categoryId: menuItem.category.id,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => res.data);
  },

  deleteMenuItem(id: string, token: string) {
    console.log(id);
    return instance
      .delete(`/restaurants/menu/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => res.data);
  },
};
