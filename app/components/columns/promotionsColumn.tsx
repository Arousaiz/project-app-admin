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
import type { MenuItem } from "./menuItemColumn";
import PromotionForm from "~/components/forms/promotions/promotionsForm";

export type Promotions = {
  id: string;
  img_url: string;
  title: string;
  description: string;
  promotionType: PromotionType;
  discount: number;
  requiredCount: number;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  menuItem: MenuItem;
};

export enum PromotionType {
  FREE_ITEM = "free item",
  DISCOUNT = "discount",
}

enum Dialogs {
  DialogInfo = "dialog_info",
  DialogEdit = "dialog_edit",
}

export const PromotionsColumns: ColumnDef<Promotions>[] = [
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
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Заголовок" />
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
    accessorKey: "description",
    header: "Описание",
  },
  {
    id: "promotionValue",
    header: "Акция",
    cell: ({ row }) => {
      const promotion = row.original;

      return (
        <div>
          {promotion.promotionType === PromotionType.DISCOUNT ? (
            <span>{promotion.discount}% скидки</span>
          ) : (
            <span>{promotion.requiredCount} + 1 бесплатно </span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "menuItem",
    header: "Акционный товар",
    cell: ({ row }) => {
      const menuItem: MenuItem = row.getValue("menuItem");
      if (!menuItem) return null;
      return <p>{menuItem?.name}</p>;
    },
  },
  {
    accessorKey: "startDate",
    header: "Начало",
    cell: ({ row }) => {
      const date: Date = new Date(row.getValue("startDate"));
      if (isNaN(date.getTime())) return null;
      return (
        <p>
          {date.toLocaleDateString("ru-RU", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      );
    },
  },
  {
    accessorKey: "endDate",
    header: "Конец",
    cell: ({ row }) => {
      const date: Date = new Date(row.getValue("endDate"));
      if (isNaN(date.getTime())) return null;
      return (
        <p>
          {date.toLocaleDateString("ru-RU", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      );
    },
  },
  {
    id: "actions",
    maxSize: 50,
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
                    Скопировать ID
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
                  title={"Информация о акции"}
                  rowData={data}
                ></ViewTableInfoContent>
              ) : (
                <DialogContent className="max-w-screen-md max-h-screen overflow-y-auto p-6 sm:rounded-lg">
                  <PromotionForm promo={data} intent="update"></PromotionForm>
                </DialogContent>
              )}

              <DeleteConfirmation id={data.id}></DeleteConfirmation>
            </Dialog>
          </AlertDialog>
        </div>
      );
    },
    enableResizing: false,
  },
];
