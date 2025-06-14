"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { type ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/ui/data-table-column";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import ViewTableInfo from "@/components/modals/viewTableInfo";
import ViewTableInfoContent from "@/components/modals/viewTableInfoContent";
import { Badge } from "~/components/ui/badge";

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  contactNumber: string;
  email: string;
};

export const userColumns: ColumnDef<User>[] = [
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
    accessorKey: "username",
    header: "Имя пользователя",
    cell: ({ row }) => {
      const username: string = row.getValue("username");

      return (
        <ViewTableInfo title={"User information"} object={row.original}>
          <p>{username}</p>
        </ViewTableInfo>
      );
    },
  },
  {
    accessorKey: "firstName",
    header: "Имя",
  },
  {
    accessorKey: "lastName",
    header: "Фамилия",
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Почта" />
    ),
  },
  {
    accessorKey: "phone",
    header: "Номер телефона",
  },
  {
    accessorKey: "role",
    header: "Роль",
    cell: ({ row }) => {
      const role: string = row.getValue("role");

      switch (role) {
        case "admin":
          return <Badge className="bg-red-400">Администратор</Badge>;
        case "restaurant_admin":
          return <Badge className="bg-blue-400">Администратор ресторана</Badge>;
        case "user":
          return <Badge className="bg-gray-600">Пользователь</Badge>;
      }

      return null;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;

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
                onClick={() => navigator.clipboard.writeText(user.id)}
              >
                Копировать ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DialogTrigger>
                <DropdownMenuItem>
                  Просмотреть подробную информацию
                </DropdownMenuItem>
              </DialogTrigger>
              <DropdownMenuItem>Просмотреть отзывы</DropdownMenuItem>
              <DropdownMenuItem>Просмотреть заказы</DropdownMenuItem>
              <DropdownMenuItem>Изменить роль</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <ViewTableInfoContent
            title={"User info"}
            rowData={user}
          ></ViewTableInfoContent>
        </Dialog>
      );
    },
    maxSize: 50,
    enableResizing: false,
  },
];
