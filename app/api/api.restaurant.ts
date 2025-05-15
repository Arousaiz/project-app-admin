import { instance } from "./api.config";
import type { Category } from "~/components/columns/category/categoryColumn";
import type { Restaurant } from "~/components/columns/restaurant/restaurantColumn";

export class RestaurantQuery {
  offset: string = "0";
  limit: string = "10";
  constructor(params: { [k: string]: string }) {
    if (params?.offset) this.offset = params.offset;
    if (params?.limit) this.limit = params.limit;
  }
}

export type CreateRestaurant = Required<Omit<Restaurant, "id">>;

export const RestaurantService = {
  fetchRestaurants(query: RestaurantQuery) {
    return instance
      .get(`/restaurants?limit=${query.limit}&offset=${query.offset}`)
      .then((res) => res.data);
  },

  createRestaurant(restaurant: CreateRestaurant, token: string) {
    console.log(restaurant);
    return instance
      .post(`/restaurants/create`, restaurant, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        return res.data;
      });
  },

  updateRestaurant(restaurant: Restaurant, token: string) {
    return instance
      .put(`/restaurants/${restaurant.id}`, restaurant, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => res.data);
  },

  deleteRestaurant(id: string, token: string) {
    console.log(id);
    return instance
      .delete(`/restaurants/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => res.data);
  },
};
