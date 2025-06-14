import { z } from "zod";
import { addressSchema } from "./profileSchema";
import { CuisinesSchemaWithId } from "./cuisinesSchema";

export const RestaurantSchema = z.object({
  id: z.string().optional(),
  name: z
    .string({
      required_error: "Название ресторана обязательно",
    })
    .min(2, {
      message: "Название ресторана должно содержать минимум 2 символа",
    })
    .max(100, {
      message: "Название ресторана должно содержать не более 100 символов",
    }),
  img_url: z.string().optional(),
  cuisines: z
    .array(CuisinesSchemaWithId, {
      required_error: "Укажите хотя бы одну кухню",
    })
    .min(1, {
      message: "Должна быть указана хотя бы одна кухня",
    }),
  phone: z
    .string({
      required_error: "Телефон обязателен",
    })
    .min(7, {
      message: "Телефон должен содержать минимум 7 символов",
    })
    .max(20, {
      message: "Телефон должен содержать не более 20 символов",
    }),
  openTime: z
    .string({
      required_error: "Время открытия обязательно",
    })
    .refine((val) => /^([01]\d|2[0-3]):([0-5]\d)$/.test(val), {
      message: "Время открытия должно быть в формате HH:mm",
    }),
  closeTime: z
    .string({
      required_error: "Время закрытия обязательно",
    })
    .refine((val) => /^([01]\d|2[0-3]):([0-5]\d)$/.test(val), {
      message: "Время закрытия должно быть в формате HH:mm",
    }),
  address: addressSchema,
});
