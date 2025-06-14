import type { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Command, MoreHorizontal } from "lucide-react";
import {
  OrderStatus,
  PaymentMethod,
  type Order,
} from "~/zodSchemas/orderSchema";
import ViewTableInfoContent from "../modals/viewTableInfoContent";
import { RestaurantService } from "~/api/api.restaurant";
import OrderPage from "./orderPage";

export const paymentMethodNames: Record<PaymentMethod, string> = {
  [PaymentMethod.CASH]: "Наличные",
  [PaymentMethod.CARD]: "Карта",
  [PaymentMethod.ONLINE]: "Онлайн",
};

export const orderStatusNames: Record<OrderStatus, string> = {
  [OrderStatus.PLACED]: "Размещён",
  [OrderStatus.ACCEPTED]: "Принят",
  [OrderStatus.CANCELLED]: "Отменён",
  [OrderStatus.COMPLETED]: "Выполнен",
  [OrderStatus.RETURNED]: "Возвращён",
};

const statuses: OrderStatus[] = [
  OrderStatus.PLACED,
  OrderStatus.ACCEPTED,
  OrderStatus.COMPLETED,
  OrderStatus.CANCELLED,
  OrderStatus.RETURNED,
];

export const orderColumns: ColumnDef<Order>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    maxSize: 50,
    enableSorting: false,
    enableHiding: false,
    enableResizing: false,
  },
  {
    accessorKey: "id",
    header: "ID заказа",
  },
  {
    accessorKey: "user.username",
    header: "Пользователь",
    cell: ({ row }) => {
      const order = row.original;
      return <span>{order.user.username}</span>;
    },
  },
  {
    accessorKey: "restaurant.name",
    header: "Ресторан",
    cell: ({ row }) => {
      const order = row.original;
      return <span>{order.restaurant.name}</span>;
    },
  },
  {
    accessorKey: "price",
    header: "Стоимость",
    cell: ({ row }) => `${row.getValue("price")} ₽`,
  },
  {
    accessorKey: "discount",
    header: "Скидка",
    cell: ({ row }) => `${row.getValue("discount")} %`,
  },
  {
    accessorKey: "paymentMethod",
    header: "Оплата",
    cell: ({ row }) => {
      const method: PaymentMethod = row.getValue("paymentMethod");
      return <Badge>{paymentMethodNames[method]}</Badge>;
    },
  },
  {
    accessorKey: "orderStatus",
    header: "Статус",
    cell: ({ row }) => {
      const status: OrderStatus = row.getValue("orderStatus");
      let color = "bg-gray-400";

      switch (status) {
        case OrderStatus.ACCEPTED:
          color = "bg-yellow-400";
          break;
        case OrderStatus.COMPLETED:
          color = "bg-green-500";
          break;
        case OrderStatus.CANCELLED:
          color = "bg-red-500";
          break;
      }

      return <Badge className={color}>{orderStatusNames[status]}</Badge>;
    },
  },
  {
    accessorKey: "orderTime",
    header: "Дата заказа",
    cell: ({ row }) => {
      const date = new Date(row.getValue("orderTime"));
      return date.toLocaleString("ru-RU");
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const order = row.original;

      const { mutate: updateStatus, isPending } =
        RestaurantService.useUpdateOrderStatus();

      return (
        <Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Открыть меню</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(order.id)}
              >
                Копировать ID
              </DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Изменить статус</DropdownMenuSubTrigger>

                <DropdownMenuSubContent className="w-48 p-0">
                  {statuses.map((status) => (
                    <DropdownMenuItem
                      key={status}
                      onClick={() =>
                        updateStatus({ orderId: order.id, status })
                      }
                    >
                      {orderStatusNames[status]}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuSeparator />
              <DialogTrigger>
                <DropdownMenuItem>Просмотреть детали</DropdownMenuItem>
              </DialogTrigger>
              <DropdownMenuItem>Повторить заказ</DropdownMenuItem>
              <DropdownMenuItem>Отменить заказ</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <ViewTableInfoContent title={"Информация о заказе"} rowData={order}>
            <OrderPage order={order}></OrderPage>
          </ViewTableInfoContent>
        </Dialog>
      );
    },
    maxSize: 50,
    enableResizing: false,
  },
];
