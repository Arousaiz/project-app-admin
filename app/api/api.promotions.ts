import type {
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";
import { instance } from "./api.config";
import type { Promotions } from "~/components/columns/promotionsColumn";

export type CreatePromotion = Required<Omit<Promotions, "id">>;

export const PromotionsService = {
  fetchPromotions(
    id: string,
    pagination: PaginationState,
    sorting: SortingState,
    filters: ColumnFiltersState,
    query?: string
  ) {
    return instance
      .get(
        `/restaurants/${id}/promotions?limit=${pagination.pageSize}&offset=${
          pagination.pageIndex * pagination.pageSize
        }&`
      )
      .then((res) => res.data);
  },

  createPromotion(id: string, promo: CreatePromotion) {
    return instance
      .post(`/restaurants/${id}/promotions`, {
        ...promo,
        menuItemId: promo.menuItem.id,
      })
      .then((res) => {
        return res.data;
      });
  },

  updatePromotion(promo: Promotions) {
    return instance
      .put(`/restaurants/promotions/${promo.id}`, promo)
      .then((res) => res.data);
  },

  deletePromotion(id: string) {
    console.log(id);
    return instance
      .delete(`/restaurants/promotions/${id}`)
      .then((res) => res.data);
  },
};
