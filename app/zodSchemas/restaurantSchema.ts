import { Description } from "@radix-ui/react-dialog";
import { z } from "zod";
import { addressSchema } from "./profileSchema";

export const RestaurantSchema = z.object({
  id: z.string({}).optional(),
  name: z.string({}),
  cuisine: z.string({}),
  phone: z.string({}),
  operatingHours: z.string({}),
  address: addressSchema.omit({ intent: true }),
  intent: z.string({}),
});
