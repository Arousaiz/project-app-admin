import { Description } from "@radix-ui/react-dialog";
import { z } from "zod";

export const CategorySchema = z.object({
  id: z.string({}).optional(),
  name: z.string({}),
  description: z.string({}),
  intent: z.string({}),
});
