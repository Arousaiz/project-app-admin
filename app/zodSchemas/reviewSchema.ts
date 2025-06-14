import { Description } from "@radix-ui/react-dialog";
import { z } from "zod";
import { addressSchema } from "./profileSchema";
import type { MenuItem } from "~/components/columns/menuItemColumn";
import type { User } from "~/components/columns/userColumn";
import type { Restaurant } from "~/components/columns/restaurantColumn";

export const ReviewSchema = z.object({
  id: z.string().optional(),
  text: z
    .string({
      required_error: "Текст отзыва обязателен",
    })
    .min(1, {
      message: "Текст отзыва не может быть пустым",
    }),
  rating: z
    .number({
      required_error: "Рейтинг обязателен",
      invalid_type_error: "Рейтинг должен быть числом",
    })
    .min(1, {
      message: "Рейтинг должен быть не меньше 1",
    })
    .max(5, {
      message: "Рейтинг должен быть не больше 5",
    }),
  intent: z.string({
    required_error: "Intent обязателен",
  }),
});

export type Review = {
  id: string;
  text: string;
  rating: number;
  menuItem: MenuItem;
  restaurant: Restaurant;
  user: User;
  createdAt: Date;
};
