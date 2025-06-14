import { Description } from "@radix-ui/react-dialog";
import { z } from "zod";
import { addressSchema } from "./profileSchema";
import type { Address } from "~/api/api.profile";
import type { MenuItem } from "~/components/columns/menuItemColumn";
import type { User } from "~/components/columns/userColumn";
import type { Restaurant } from "~/components/columns/restaurantColumn";

export type Order = {
  id: string;
  price: number;
  discount: number;
  comment: string;
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

export enum DeliveryStatus {
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

export enum OrderStatus {
  PLACED = "placed",
  ACCEPTED = "accepted",
  CANCELLED = "cancelled",
  COMPLETED = "completed",
  RETURNED = "returned",
}
