import { z } from "zod";
import { MenuItemSchema } from "./menuItemSchema";

export const PromotionsSchema = z.object({
  id: z.string().optional(),
  title: z
    .string({
      required_error: "Название акции обязательно",
    })
    .min(2, {
      message: "Название акции должно содержать минимум 2 символа",
    })
    .max(100, {
      message: "Название акции должно содержать не более 100 символов",
    }),
  img_url: z.string().optional(),
  description: z
    .string({
      required_error: "Описание акции обязательно",
    })
    .min(5, {
      message: "Описание акции должно содержать минимум 5 символов",
    })
    .max(500, {
      message: "Описание акции должно содержать не более 500 символов",
    }),
  startDate: z
    .string({
      required_error: "Дата начала обязательна",
    })
    .refine((date) => !isNaN(Date.parse(date)), {
      message: "Неверный формат даты начала",
    }),
  endDate: z
    .string({
      required_error: "Дата окончания обязательна",
    })
    .refine((date) => !isNaN(Date.parse(date)), {
      message: "Неверный формат даты окончания",
    }),
  isActive: z.boolean({
    required_error: "Статус активности обязателен",
  }),
  promotionType: z.enum(["discount", "free item"], {
    errorMap: () => ({
      message: "Тип акции должен быть 'discount' или 'free item'",
    }),
  }),
  menuItem: MenuItemSchema.partial(),
  requiredCount: z.coerce
    .number()
    .int({
      message: "Количество должно быть целым числом",
    })
    .optional(),
  discount: z.coerce
    .number()
    .int({
      message: "Скидка должна быть целым числом",
    })
    .optional(),
});
