import { z } from "zod";

export const profileSchema = z.object({
  id: z.string().uuid({
    message: "Некорректный формат ID",
  }),
  firstName: z
    .string({
      required_error: "Имя обязательно",
    })
    .min(2, {
      message: "Имя должно содержать минимум 2 символа",
    })
    .max(50, {
      message: "Имя должно содержать не более 50 символов",
    }),
  lastName: z
    .string({
      required_error: "Фамилия обязательна",
    })
    .min(2, {
      message: "Фамилия должна содержать минимум 2 символа",
    })
    .max(50, {
      message: "Фамилия должна содержать не более 50 символов",
    }),
  email: z
    .string({
      required_error: "Email обязателен",
    })
    .email({
      message: "Неверный формат email-адреса",
    }),
  contactNumber: z
    .string({
      required_error: "Контактный номер обязателен",
    })
    .min(7, {
      message: "Номер телефона должен содержать минимум 7 символов",
    })
    .max(20, {
      message: "Номер телефона должен содержать не более 20 символов",
    }),
});

export const addressSchema = z.object({
  city: z
    .string({
      required_error: "Город обязателен",
    })
    .min(2, {
      message: "Название города должно содержать минимум 2 символа",
    }),
  street: z
    .string({
      required_error: "Улица обязательна",
    })
    .min(2, {
      message: "Название улицы должно содержать минимум 2 символа",
    }),
  house: z.coerce
    .number({
      invalid_type_error: "Номер дома должен быть числом",
      required_error: "Номер дома обязателен",
    })
    .int({
      message: "Номер дома должен быть целым числом",
    })
    .positive({
      message: "Номер дома должен быть положительным числом",
    }),
});
