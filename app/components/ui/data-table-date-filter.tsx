import { Square, SquareCheck } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "./command";
import type { Column } from "@tanstack/react-table";
import { Calendar } from "./calendar";
import type { DateRange } from "react-day-picker";
import { useState } from "react";
import { Button } from "./button";

interface DataTableDateFilter<TData, TValue> {
  column?: Column<TData, TValue>;
  title?: string;
}

export default function DataTableDateFilter<TData, TValue>({
  title,
  column,
}: DataTableDateFilter<TData, TValue>) {
  const currentFilterValue = column?.getFilterValue() as DateRange | undefined;

  return (
    <div className="flex w-auto p-0">
      <Calendar
        mode="range"
        selected={currentFilterValue}
        onSelect={(range) => {
          column?.setFilterValue(range);
        }}
        numberOfMonths={2}
      />
    </div>
  );
}
