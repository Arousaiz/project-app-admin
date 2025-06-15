import type { PaginationState, SortingState } from "@tanstack/react-table";
import { instance } from "./api.config";
import type { Restaurant } from "~/components/columns/restaurantColumn";
import type { OrderStatus } from "~/zodSchemas/orderSchema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

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
  fetchRestaurants(
    pagination: PaginationState = {
      pageIndex: 0,
      pageSize: 10,
    },
    sorting?: SortingState,
    query?: any
  ) {
    return instance
      .get(
        `/restaurants?limit=${pagination.pageSize}&offset=${
          pagination.pageIndex * pagination.pageSize
        }&`
      )
      .then((res) => res?.data);
  },

  fetchRestaurantOrders(
    id: string,
    pagination: PaginationState = {
      pageIndex: 0,
      pageSize: 10,
    },
    sorting?: SortingState,
    query?: any
  ) {
    return instance
      .get(
        `restaurants/${id}/orders?limit=${pagination.pageSize}&offset=${
          pagination.pageIndex * pagination.pageSize
        }&`
      )
      .then((res) => res?.data.data)
      .catch((error) => {
        console.log(error);
      });
  },

  fetchRestaurantReviews(
    id: string,
    pagination: PaginationState = {
      pageIndex: 0,
      pageSize: 10,
    },
    sorting?: SortingState,
    query?: any
  ) {
    return instance
      .get(
        `/restaurant/${id}/reviews/admin?limit=${pagination.pageSize}&offset=${
          pagination.pageIndex * pagination.pageSize
        }&`
      )
      .then((res) => res?.data)
      .catch((error) => {
        console.log(error);
      });
  },

  createRestaurant(restaurant: CreateRestaurant) {
    const cuisineIds: string[] = restaurant.cuisines.map((el) => el.id);
    console.log(cuisineIds);
    return instance
      .post(`/restaurants/create`, {
        name: restaurant.name,
        cuisineIds: cuisineIds,
        img_url: restaurant.img_url,
        phone: restaurant.phone,
        openTime: restaurant.openTime,
        closeTime: restaurant.closeTime,
        address: restaurant.address,
      })
      .then((res) => res?.data);
  },

  updateRestaurant(restaurant: Restaurant) {
    const cuisineIds: string[] = restaurant.cuisines.map((el) => el.id);
    console.log(restaurant);
    return instance
      .put(`/restaurants/${restaurant.id}`, {
        name: restaurant.name,
        cuisineIds: cuisineIds,
        img_url: restaurant.img_url,
        phone: restaurant.phone,
        openTime: restaurant.openTime,
        closeTime: restaurant.closeTime,
        address: restaurant.address,
      })
      .then((res) => res.data);
  },

  deleteRestaurant(id: string) {
    console.log(id);
    return instance.delete(`/restaurants/${id}`).then((res) => res?.data);
  },

  updateOrderStatus(orderId: string, orderStatus: OrderStatus) {
    return instance
      .put(`/orders/${orderId}`, { orderStatus })
      .then((res) => res.data);
  },

  useUpdateOrderStatus() {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({
        orderId,
        status,
      }: {
        orderId: string;
        status: OrderStatus;
      }) => this.updateOrderStatus(orderId, status),

      onSuccess: (_data, variables) => {
        queryClient.invalidateQueries({
          queryKey: ["order", variables.orderId],
        });

        queryClient.invalidateQueries({
          queryKey: ["orders"],
        });
      },

      onError: () => {
        toast.error("Не удалось обновить статус заказа");
      },
    });
  },
};
