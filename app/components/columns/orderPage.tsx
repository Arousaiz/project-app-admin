import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import {
  OrderStatus,
  type DeliveryStatus,
  type Order,
  type PaymentMethod,
} from "~/zodSchemas/orderSchema";
import { orderStatusNames } from "./orderColumn";

interface OrderPageProps {
  order: Order;
}

const paymentMethodLabel = (method: PaymentMethod) => {
  switch (method) {
    case "cash":
      return "Наличными";
    case "card":
      return "Картой";
    case "online":
      return "Онлайн";
    default:
      return method;
  }
};

const orderStatusColor = (status: OrderStatus) => {
  switch (status) {
    case "placed":
      return "gray";
    case "accepted":
      return "blue";
    case "cancelled":
      return "red";
    case "completed":
      return "green";
    case "returned":
      return "orange";
    default:
      return "gray";
  }
};

const deliveryStatusColor = (status: DeliveryStatus) => {
  switch (status) {
    case "awaiting confirmation":
      return "gray";
    case "in transit":
      return "blue";
    case "delivered":
      return "green";
    case "cancelled":
      return "red";
    case "returned":
      return "orange";
    default:
      return "gray";
  }
};

export default function OrderPage({ order }: OrderPageProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Заказ #{order.id}</CardTitle>
        <div className="flex space-x-2 mt-1">
          <Badge
            variant="outline"
            className={`border-${orderStatusColor(
              order.orderStatus
            )} text-${orderStatusColor(order.orderStatus)}`}
          >
            Статус заказа: {orderStatusNames[order.orderStatus]}
          </Badge>
          <Badge
            variant="outline"
            className={`border-${deliveryStatusColor(
              order.deliveryDetails.deliveryStatus
            )} text-${deliveryStatusColor(
              order.deliveryDetails.deliveryStatus
            )}`}
          >
            Статус доставки: {order.deliveryDetails.deliveryStatus}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p>
          <b>Время заказа:</b>{" "}
          {format(new Date(order.orderTime), "dd.MM.yyyy HH:mm")}
        </p>
        <p>
          <b>Оплата:</b> {paymentMethodLabel(order.paymentMethod)}
        </p>
        <p>
          <b>Комментарий к заказу:</b> {order.comment || "нет"}
        </p>

        <div className="mt-4">
          <h3 className="font-semibold mb-2">Доставка</h3>
          <p>
            <b>Адрес:</b>{" "}
            {[
              order.deliveryDetails.address?.city,
              order.deliveryDetails.address?.street,
              order.deliveryDetails.address?.house,
            ].join(", ") || "не указан"}
          </p>
          <p>
            <b>Статус доставки:</b> {order.deliveryDetails.deliveryStatus}
          </p>
          <p>
            <b>Ожидаемое время:</b>{" "}
            {format(
              new Date(order.deliveryDetails.deliveryTime),
              "dd.MM.yyyy HH:mm"
            )}
          </p>
        </div>

        <div className="mt-6">
          <h3 className="font-semibold mb-2">Элементы заказа</h3>
          <ul className="divide-y divide-gray-200">
            {order.orderItems.map((item) => (
              <li key={item.id} className="py-2 flex items-center space-x-4">
                {/* <img
                    src={item.menuItem.img_url}
                    alt={item.menuItem.name}
                    className="w-16 h-16 object-cover rounded"
                  /> */}
                <div className="flex-1">
                  <p className="font-medium">{item.menuItem.name}</p>
                  <p className="text-sm text-gray-600">
                    Цена: {item.price} Руб × {item.count}
                  </p>
                </div>
                <div className="font-semibold">
                  {item.price * item.count} Руб
                </div>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div>
          <p className="font-bold text-lg">
            Итог: {(order.price - order.discount).toFixed(2)} Руб
          </p>
          {order.discount > 0 && (
            <p className="text-sm text-green-600">Скидка: {order.discount} ₽</p>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
