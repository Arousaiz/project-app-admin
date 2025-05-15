import { Description } from "@radix-ui/react-dialog";
import { z } from "zod";
import { addressSchema } from "./profileSchema";
import { CategorySchema } from "./categorySchema";

export const MenuItemSchema = z.object({
  id: z.string({}).optional(),
  name: z.string({}),
  description: z.string({}),
  price: z.coerce.number(),
  category: CategorySchema.omit({ intent: true }).partial(),
  intent: z.string({}),
});
