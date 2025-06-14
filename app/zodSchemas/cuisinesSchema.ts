import { z } from "zod";

export const CuisinesSchema = z.object({
  id: z.string().optional(),
  name: z
    .string({
      required_error: "Название кухни обязательно",
    })
    .min(2, {
      message: "Название кухни должно содержать не менее 2 символов",
    })
    .max(50, {
      message: "Название кухни должно содержать не более 50 символов",
    }),
  description: z
    .string({
      required_error: "Описание кухни обязательно",
    })
    .min(5, {
      message: "Описание кухни должно содержать не менее 5 символов",
    })
    .max(255, {
      message: "Описание кухни должно содержать не более 255 символов",
    }),
});

export const CuisinesSchemaWithId = z.object({
  id: z.string({
    required_error: "ID обязательно",
  }),
  name: z
    .string({
      required_error: "Название кухни обязательно",
    })
    .min(2, {
      message: "Название кухни должно содержать не менее 2 символов",
    })
    .max(50, {
      message: "Название кухни должно содержать не более 50 символов",
    }),
  description: z
    .string({
      required_error: "Описание кухни обязательно",
    })
    .min(5, {
      message: "Описание кухни должно содержать не менее 5 символов",
    })
    .max(255, {
      message: "Описание кухни должно содержать не более 255 символов",
    }),
});
