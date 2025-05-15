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

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

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
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "username",
    header: "Username",
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
    header: "First Name",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
  },
  {
    accessorKey: "contactNumber",
    header: "Phone Number",
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
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(user.id)}
              >
                Copy user ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DialogTrigger>
                <DropdownMenuItem>View user info</DropdownMenuItem>
              </DialogTrigger>

              <DropdownMenuItem>View user reviews</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <ViewTableInfoContent
            title={"User info"}
            object={user}
          ></ViewTableInfoContent>
        </Dialog>
      );
    },
  },
];

const data1: Payment[] = [
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m1414@example.com",
  },
  {
    id: "728e352f",
    amount: 300,
    status: "pending",
    email: "m4141@example.com",
  },
  {
    id: "728edbn2f",
    amount: 200,
    status: "pending",
    email: "m4313@example.com",
  },
  {
    id: "72sed52f",
    amount: 400,
    status: "pending",
    email: "m123@example.com",
  },
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m1414@example.com",
  },
  {
    id: "728e352f",
    amount: 300,
    status: "pending",
    email: "m4141@example.com",
  },
  {
    id: "728edbn2f",
    amount: 200,
    status: "pending",
    email: "m4313@example.com",
  },
  {
    id: "72sed52f",
    amount: 400,
    status: "pending",
    email: "m123@example.com",
  },
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m1414@example.com",
  },
  {
    id: "728e352f",
    amount: 300,
    status: "pending",
    email: "m4141@example.com",
  },
  {
    id: "728edbn2f",
    amount: 200,
    status: "pending",
    email: "m4313@example.com",
  },
  {
    id: "72sed52f",
    amount: 400,
    status: "pending",
    email: "m123@example.com",
  },
];

export const columns: ColumnDef<Payment>[] = [
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
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
