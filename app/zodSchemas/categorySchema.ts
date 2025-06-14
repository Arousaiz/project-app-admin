import { z } from "zod";

export const CategorySchema = z.object({
  id: z.string().optional(),
  name: z
    .string({
      required_error: "Название обязательно",
    })
    .min(2, {
      message: "Название должно содержать не менее 2 символов",
    })
    .max(50, {
      message: "Название должно содержать не более 50 символов",
    }),
  description: z
    .string({
      required_error: "Описание обязательно",
    })
    .min(5, {
      message: "Описание должно содержать не менее 5 символов",
    })
    .max(255, {
      message: "Описание должно содержать не более 255 символов",
    }),
});
