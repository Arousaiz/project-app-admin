import { type ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { MoreHorizontal, Star } from "lucide-react";
import type { Review } from "~/zodSchemas/reviewSchema";
import ViewTableInfoContent from "../modals/viewTableInfoContent";

export const reviewColumns: ColumnDef<Review>[] = [
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
    accessorKey: "user.username",
    header: "Пользователь",
    cell: ({ row }) => {
      const review = row.original;
      return <span>{review.user.username}</span>;
    },
  },
  {
    id: "subject",
    header: "Объект отзыва",
    cell: ({ row }) => {
      const review = row.original;
      if (review.menuItem) {
        return (
          <span className="italic text-muted-foreground">
            Блюдо: {review.menuItem.name}
          </span>
        );
      } else if (review.restaurant) {
        return <span className="italic text-muted-foreground">Ресторан</span>;
      } else {
        return <span className="text-gray-400">—</span>;
      }
    },
  },
  {
    accessorKey: "rating",
    header: "Оценка",
    cell: ({ row }) => {
      const rating: number = row.getValue("rating");
      return (
        <span className="flex items-center gap-1">
          {rating} <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
        </span>
      );
    },
  },
  {
    accessorKey: "text",
    header: "Комментарий",
    cell: ({ row }) => {
      const text: string = row.getValue("text");
      return <p className="line-clamp-2 max-w-sm">{text}</p>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Дата",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      return date.toLocaleDateString("ru-RU", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const review = row.original;

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
                onClick={() => navigator.clipboard.writeText(review.id)}
              >
                Копировать ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DialogTrigger>
                <DropdownMenuItem>Просмотреть полностью</DropdownMenuItem>
              </DialogTrigger>
              <DropdownMenuItem>Связаться с пользователем</DropdownMenuItem>
              <DropdownMenuItem>Удалить отзыв</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <ViewTableInfoContent title={"Детали отзыва"} rowData={review} />
        </Dialog>
      );
    },
    maxSize: 50,
    enableResizing: false,
  },
];
