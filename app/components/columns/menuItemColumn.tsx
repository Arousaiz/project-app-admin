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
import type { Category } from "./categoryColumn";
import { Link } from "react-router";
import MenuItemForm from "~/components/forms/menuItem/menuItemForm";

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
};

enum Dialogs {
  DialogInfo = "dialog_info",
  DialogEdit = "dialog_edit",
}

export const MenuItemColumns: ColumnDef<MenuItem>[] = [
  {
    id: "select",
    maxSize: 50,
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
    enableResizing: false,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Название" />
    ),
    cell: ({ row }) => {
      const name: string = row.getValue("name");
      const id: string = row.original.id;

      return (
        <Link to={`menu-item/reviews/${id}`}>
          <p>{name}</p>
        </Link>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Описание",
  },
  {
    accessorKey: "price",
    header: "Цена",
  },
  {
    accessorKey: "rating",
    header: "Рейтинг",
  },
  {
    accessorKey: "category",
    header: "Категория",
    cell: ({ row }) => {
      const category: Category = row.getValue("category");
      return <p>{category?.name}</p>;
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
                  title={"Информация о предмете меню"}
                  rowData={data}
                ></ViewTableInfoContent>
              ) : (
                <DialogContent className="max-w-screen-md max-h-screen overflow-y-auto p-6 sm:rounded-lg">
                  <MenuItemForm menuItem={data} intent="update"></MenuItemForm>
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
