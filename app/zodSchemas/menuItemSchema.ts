import { z } from "zod";
import { CategorySchema } from "./categorySchema";

export const MenuItemSchema = z.object({
  id: z.string().optional(),
  name: z
    .string({
      required_error: "Название блюда обязательно",
    })
    .min(2, {
      message: "Название блюда должно содержать не менее 2 символов",
    })
    .max(100, {
      message: "Название блюда должно содержать не более 100 символов",
    }),
  description: z
    .string({
      required_error: "Описание блюда обязательно",
    })
    .min(5, {
      message: "Описание блюда должно содержать не менее 5 символов",
    })
    .max(500, {
      message: "Описание блюда должно содержать не более 500 символов",
    }),
  price: z.coerce
    .number({
      invalid_type_error: "Цена должна быть числом",
      required_error: "Цена обязательна",
    })
    .min(0, {
      message: "Цена не может быть отрицательной",
    }),
  category: CategorySchema.partial(),
});
