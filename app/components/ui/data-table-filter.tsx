import { type Column } from "@tanstack/react-table";
import { Button } from "../ui/button";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../ui/command";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import { FilterIcon, Square, SquareCheck } from "lucide-react";
import DataTableSelectFilter from "./data-table-select-filter";
import type { DataTableFilterOptions } from "./data-table";
import DataTableTextFilter from "./data-table-text-filter";
import DataTableRangeFilter from "./data-table-range-filter";
import DataTableDateFilter from "./data-table-date-filter";

interface DataTableFilter<TData, TValue> {
  column?: Column<TData, TValue>;
  title?: string;
  options: DataTableFilterOptions;
}

export function DataTableFilter<TData, TValue>({
  column, //Passed as props
  title,
  options,
}: DataTableFilter<TData, TValue>) {
  return (
    <Popover>
      <PopoverTrigger asChild className="my-2 md:my-0">
        <Button variant="outline" size="sm" className="h-8 border-dashed mx-2 ">
          <FilterIcon className="w-4 h-4 mr-2" />
          {title}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        {(options.type === "select-multiple" || options.type === "select") && (
          <DataTableSelectFilter
            column={column}
            title={title}
            options={options.options}
            type={options.type}
          ></DataTableSelectFilter>
        )}

        {options.type === "text" && (
          <DataTableTextFilter
            column={column}
            title={title}
          ></DataTableTextFilter>
        )}

        {options.type === "range" && (
          <DataTableRangeFilter
            column={column}
            title={title}
            min={options.min}
            max={options.max}
            step={options.step}
          ></DataTableRangeFilter>
        )}

        {options.type === "dates" && (
          <DataTableDateFilter
            column={column}
            title={title}
          ></DataTableDateFilter>
        )}
      </PopoverContent>
    </Popover>
  );
}
