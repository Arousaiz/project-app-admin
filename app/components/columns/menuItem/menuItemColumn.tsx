"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { type ColumnDef, type PaginationState } from "@tanstack/react-table";
import { ArrowUpDown, Ellipsis, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/ui/data-table-column";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ViewTableInfo from "@/components/modals/viewTableInfo";
import ViewTableInfoContent from "@/components/modals/viewTableInfoContent";
import type { User } from "../user/userColumn";
import DeleteConfirmation from "~/components/alerts/deleteConfirmation";
import { AlertDialog, AlertDialogTrigger } from "~/components/ui/alert-dialog";
import CategoryDialogContext from "~/components/modals/category/categoryDialogContent";
import type { Address } from "~/api/api.profile";
import RestaurantDialogContext from "~/components/modals/restaurant/restaurantDialogContext";
import type { Category } from "../category/categoryColumn";
import { Link, useLoaderData } from "react-router";
import MenuItemDialogContext from "~/components/modals/menuItem/menuItemDialogContext";

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
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
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
    header: "Description",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      const category: Category = row.getValue("category");
      return <p>{category?.name}</p>;
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
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="flex flex-col">
                  <DropdownMenuItem
                    onClick={() => navigator.clipboard.writeText(data.id)}
                  >
                    Copy category ID
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DialogTrigger onClick={() => setDialog(Dialogs.DialogInfo)}>
                    <DropdownMenuItem>View category info</DropdownMenuItem>
                  </DialogTrigger>
                  <DropdownMenuSeparator />
                  <DialogTrigger onClick={() => setDialog(Dialogs.DialogEdit)}>
                    <DropdownMenuItem>Edit item</DropdownMenuItem>
                  </DialogTrigger>
                  <AlertDialogTrigger>
                    <DropdownMenuItem>Delete item</DropdownMenuItem>
                  </AlertDialogTrigger>
                </DropdownMenuContent>
              </DropdownMenu>
              {dialog === Dialogs.DialogInfo ? (
                <ViewTableInfoContent
                  title={"Category info"}
                  object={data}
                ></ViewTableInfoContent>
              ) : (
                <MenuItemDialogContext
                  menuItem={data}
                  intent="update"
                ></MenuItemDialogContext>
              )}

              <DeleteConfirmation id={data.id}></DeleteConfirmation>
            </Dialog>
          </AlertDialog>
        </div>
      );
    },
  },
];
