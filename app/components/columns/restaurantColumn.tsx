"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { type ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/ui/data-table-column";
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import ViewTableInfoContent from "@/components/modals/viewTableInfoContent";
import DeleteConfirmation from "~/components/alerts/deleteConfirmation";
import { AlertDialog, AlertDialogTrigger } from "~/components/ui/alert-dialog";
import type { Address } from "~/api/api.profile";
import { Link } from "react-router";
import RestaurantForm from "~/components/forms/restaurant/restaurantForm";
import type { Cuisines } from "./cuisinesColumn";
import { Badge } from "~/components/ui/badge";

export type Restaurant = {
  id: string;
  name: string;
  img_url: string;
  cuisines: Cuisines[];
  phone: string;
  openTime: Date;
  closeTime: Date;
  address: Address;
};

enum Dialogs {
  DialogInfo = "dialog_info",
  DialogEdit = "dialog_edit",
}

export const RestaurantColumns: ColumnDef<Restaurant>[] = [
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
    enableResizing: false,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Название" />
    ),
  },
  {
    accessorKey: "img_url",
    header: "Изображение",
    cell: ({ row }) => {
      const img_url: string | undefined = row.getValue("img_url");

      const fullUrl = img_url
        ? `https://pub-96480823ba5d4f44bb4d8cd67febd2f1.r2.dev/${img_url}`
        : null;

      return (
        <div className="flex items-center justify-center mt-2">
          {fullUrl ? (
            <img
              src={fullUrl}
              alt="Uploaded"
              className="w-20 h-20 object-cover rounded border"
            />
          ) : (
            <div className="w-20 h-20 flex items-center justify-center text-gray-400 text-sm border rounded bg-gray-100">
              Нет фото
            </div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "cuisines",
    header: "Категории",
    cell: ({ row }) => {
      const cuisines: Cuisines[] = row.getValue("cuisines");

      return cuisines?.map((el) => <Badge className="mx-2">{el.name}</Badge>);
    },
  },
  {
    accessorKey: "phone",
    header: "Номер телефона",
  },
  {
    accessorKey: "operatingHours",
    header: "Часы работы",
    cell: ({ row }) => {
      const open = row.original.openTime; // e.g., "08:00:00"
      const close = row.original.closeTime; // e.g., "18:00:00"

      if (!open || !close) return null;

      const openTime = open.toString().slice(0, 5); // "08:00"
      const closeTime = close.toString().slice(0, 5); // "18:00"

      return (
        <p>
          {openTime} - {closeTime}
        </p>
      );
    },
  },
  {
    accessorKey: "address",
    header: "Адрес",
    cell: ({ row }) => {
      const address: Address = row.getValue("address");
      let fullAddress = "";
      if (address?.city && address?.house && address?.house) {
        fullAddress = [address.city, address.street, address.house].join(", ");
      }
      return <p>{fullAddress}</p>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const data = row.original;
      const [dialog, setDialog] = useState<Dialogs>();

      return (
        <div>
          <AlertDialog>
            <Dialog>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Открыть меню</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="flex flex-col">
                  <DropdownMenuItem
                    onClick={() => navigator.clipboard.writeText(data.id)}
                  >
                    Копировать ID
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to={`/restaurant/${data.id}/promotions`}>
                      Просмотреть акции
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to={`/restaurant/${data.id}/menu-items`}>
                      Просмотреть меню
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to={`/restaurant/${data.id}/orders`}>
                      Просмотреть заказы
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to={`/restaurant/${data.id}/reviews`}>
                      Просмотреть отзывы
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DialogTrigger onClick={() => setDialog(Dialogs.DialogInfo)}>
                    <DropdownMenuItem>
                      Просмотреть подробную информацию
                    </DropdownMenuItem>
                  </DialogTrigger>
                  <DropdownMenuSeparator />
                  <DialogTrigger onClick={() => setDialog(Dialogs.DialogEdit)}>
                    <DropdownMenuItem>Изменить</DropdownMenuItem>
                  </DialogTrigger>
                  <AlertDialogTrigger>
                    <DropdownMenuItem>Удалить</DropdownMenuItem>
                  </AlertDialogTrigger>
                </DropdownMenuContent>
              </DropdownMenu>
              {dialog === Dialogs.DialogInfo ? (
                <ViewTableInfoContent
                  title={"Информация о ресторане"}
                  rowData={data}
                ></ViewTableInfoContent>
              ) : (
                <DialogContent className="max-w-screen-md max-h-screen overflow-y-auto p-6 sm:rounded-lg">
                  <RestaurantForm
                    restaurant={data}
                    intent="update"
                  ></RestaurantForm>
                </DialogContent>
              )}

              <DeleteConfirmation id={data.id}></DeleteConfirmation>
            </Dialog>
          </AlertDialog>
        </div>
      );
    },
    enableResizing: false,
    maxSize: 50,
  },
];
