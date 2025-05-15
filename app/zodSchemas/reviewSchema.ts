import { Description } from "@radix-ui/react-dialog";
import { z } from "zod";
import { addressSchema } from "./profileSchema";
import type { MenuItem } from "~/components/columns/menuItem/menuItemColumn";
import type { User } from "~/components/columns/user/userColumn";

export const ReviewSchema = z.object({
  id: z.string({}).optional(),
  text: z.string({}),
  rating: addressSchema.omit({ intent: true }),
  intent: z.string({}),
});

export type Review = {
  id: string;
  text: string;
  rating: number;
  menuItem: MenuItem;
  user: User;
  createdAt: Date;
};
