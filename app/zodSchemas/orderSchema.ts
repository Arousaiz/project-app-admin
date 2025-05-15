import { Description } from "@radix-ui/react-dialog";
import { z } from "zod";
import { addressSchema } from "./profileSchema";
import type { Address } from "~/api/api.profile";
import type { MenuItem } from "~/components/columns/menuItem/menuItemColumn";
import type { User } from "~/components/columns/user/userColumn";
import type { Restaurant } from "~/components/columns/restaurant/restaurantColumn";

export const OrderSchema = z.object({
  id: z.string({}).optional(),
  text: z.string({}),
  rating: addressSchema.omit({ intent: true }),
  intent: z.string({}),
});

export type Order = {
  id: string;
  price: number;
  discount: number;
  paymentMethod: PaymentMethod;
  orderStatus: OrderStatus;
  orderTime: Date;
  deliveryDetails: DeliveryDetails;
  orderItems: OrderItem[];
  user: User;
  restaurant: Restaurant;
};

export type DeliveryDetails = {
  id: string;
  deliveryStatus: DeliveryStatus;
  deliveryTime: Date;
  address: Address;
  order: Order;
};

export type OrderItem = {
  id: string;
  menuItemId: string;
  price: number;
  count: number;
  order: Order;
  menuItem: MenuItem;
};

export declare enum DeliveryStatus {
  AWAITING_CONFIRMATION = "awaiting confirmation",
  IN_TRANSIT = "in transit",
  DELIVERED = "delivered",
  CANCELLED = "cancelled",
  RETURNED = "returned",
}

export enum PaymentMethod {
  CASH = "cash",
  CARD = "card",
  ONLINE = "online",
}

export declare enum OrderStatus {
  PLACED = "placed",
  ACCEPTED = "accepted",
  CANCELLED = "cancelled",
  COMPLETED = "completed",
  RETURNED = "returned",
}
