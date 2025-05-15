import { z } from "zod";

export const authSchema = z.object({
  username: z
    .string({
      required_error: "Username is required",
    })
    .min(6, {
      message: "Username should be at least 6 characters.",
    })
    .max(30, {
      message: "Username should contain at most 30 characters.",
    }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(8, {
      message: "Password should be at least 8 characters",
    })
    .max(32, {
      message: "Password should containt at most 32 characters.",
    })
    .regex(
      /^(?=.*?[0-9])(?=.*?[A-Za-z])(?=.*?[\^_=\!#\$%&\(\)\*\+\-\.:'/\?@]).{8,32}$/,
      {
        message: "Password should contain at least 1 symbol, number and letter",
      }
    ),
  confirmPassword: z
    .string({
      required_error: "Password is required",
    })
    .min(8, {
      message: "Password should be at least 8 characters",
    })
    .max(32, {
      message: "Password should containt at most 32 characters.",
    })
    .regex(
      /^(?=.*?[0-9])(?=.*?[A-Za-z])(?=.*?[\^_=\!#\$%&\(\)\*\+\-\.:'/\?@]).{8,32}$/,
      {
        message: "Password should contain at least 1 symbol, number and letter",
      }
    ),
  otpCode: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({ message: "Invalid email address" }),
});
