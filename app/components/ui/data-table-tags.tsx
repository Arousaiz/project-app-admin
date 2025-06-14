import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  isNumberArray,
  type ColumnFiltersState,
  type Table,
} from "@tanstack/react-table";
import { XIcon } from "lucide-react";
import type { DataTableFilterOptions } from "./data-table";
import { isNullOrUndefined } from "~/lib/utils";
import { isDateRange, type DateRange } from "react-day-picker";
import { format } from "date-fns/format";
import { ru } from "date-fns/locale";

interface DataTableFilterTagsProps {
  table: Table<any>; // Тип можно уточнить через `Table<TData>`
  filterOptions: DataTableFilterOptions[];
}

export const DataTableFilterTags = ({
  table,
  filterOptions,
}: DataTableFilterTagsProps) => {
  const activeFilters: ColumnFiltersState = table.getState().columnFilters;

  const getFilterTitle = (filterId: string) => {
    return filterOptions.find((f) => f.id === filterId)?.title || filterId;
  };

  const getFilterActiveTitle = (filterId: string, value: any) => {
    const config = filterOptions.find((f) => f.id === filterId);
    if (isDateRange(value)) {
      return value;
    }
    if (Number(value)) {
      return value;
    }
    if (config?.options) {
      const option = config.options.find((opt) => opt.value === value);
      return option?.label || String(value);
    }
    return String(value);
  };

  const getFilterActiveTitles = (filterId: string, value: any) => {
    if (Array.isArray(value)) {
      const array: String[] = [];

      value.forEach((element) => {
        array.push(getFilterActiveTitle(filterId, element));
      });

      if (isNumberArray(array) && array.length >= 1 && array.length <= 2) {
        return `От ${array[0]} ${array[1] !== null && `До ${array[1]}`}`;
      }

      return array.join(", ");
    }

    return getFilterActiveTitle(filterId, value);
  };

  const formatValue = (value: unknown) => {
    if (Array.isArray(value)) return `${value.join(", ")}`;
    if (typeof value === "boolean") return value ? "Да" : "Нет";
    return String(value);
  };

  const handleRemoveFilter = (filterId: string) => {
    table.setColumnFilters(
      activeFilters.filter((filter) => filter.id !== filterId)
    );
  };

  const handleResetAll = () => {
    table.resetColumnFilters();
  };

  return (
    <div className="flex flex-wrap items-center gap-2 mb-4">
      {activeFilters.map((filter) => {
        const filterTitle = getFilterTitle(filter.id);
        const formattedValue = getFilterActiveTitles(filter.id, filter.value);

        return (
          <Badge
            key={filter.id}
            variant="outline"
            className="flex items-center gap-1 py-1"
          >
            <span>
              {filterTitle}:{" "}
              {isDateRange(formattedValue) ? (
                formattedValue?.from ? (
                  formattedValue.to ? (
                    <>
                      {format(formattedValue.from, "LLL dd, y", { locale: ru })}{" "}
                      - {format(formattedValue.to, "LLL dd, y", { locale: ru })}
                    </>
                  ) : (
                    format(formattedValue.from, "LLL dd, y", { locale: ru })
                  )
                ) : (
                  <span>Pick a date range</span>
                )
              ) : (
                formattedValue
              )}
            </span>
            <button
              onClick={() => handleRemoveFilter(filter.id)}
              className="ml-1 rounded-full hover:bg-gray-100"
            >
              <XIcon className="w-3 h-3" />
            </button>
          </Badge>
        );
      })}

      {activeFilters.length > 0 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleResetAll}
          className="h-8 px-2 text-xs"
        >
          Сбросить все
        </Button>
      )}
    </div>
  );
};
