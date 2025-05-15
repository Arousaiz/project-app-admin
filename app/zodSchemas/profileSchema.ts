import { z } from "zod";

export const profileSchema = z.object({
  id: z.string({}).uuid({ message: "HOW???" }),
  firstName: z.string({}),
  lastName: z.string({}),
  email: z.string({}),
  contactNumber: z.string({}),
  intent: z.string({}),
});

export const addressSchema = z.object({
  city: z.string({}),
  street: z.string({}),
  house: z.coerce.number(),
  intent: z.string({}),
});
