import { Square, SquareCheck } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../ui/command";
import type { Column } from "@tanstack/react-table";

interface DataTableSelectFilter<TData, TValue> {
  column?: Column<TData, TValue>;
  title?: string;
  options?: {
    label: string;
    value: string;
  }[];
  type?: "select" | "select-multiple";
}

export default function DataTableSelectFilter<TData, TValue>({
  title,
  options,
  column,
  type,
}: DataTableSelectFilter<TData, TValue>) {
  const facets = column?.getFacetedUniqueValues();
  const selectedValues = new Set(column?.getFilterValue() as string[] | string);

  return (
    <Command>
      <CommandInput placeholder={title} />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {type === "select-multiple" &&
            options?.map((option) => {
              return (
                <ChooseMultipleMenu
                  option={option}
                  column={column}
                  facets={facets}
                  selectedValues={selectedValues}
                ></ChooseMultipleMenu>
              );
            })}

          {type === "select" &&
            options?.map((option) => {
              return (
                <ChooseOneMenu option={option} column={column}></ChooseOneMenu>
              );
            })}
        </CommandGroup>
        {selectedValues.size > 0 && (
          <>
            <CommandSeparator />
            <CommandGroup>
              <CommandItem
                onSelect={() => column?.setFilterValue(undefined)}
                className="justify-center text-center"
              >
                Сбросить фильтр
              </CommandItem>
            </CommandGroup>
          </>
        )}
      </CommandList>
    </Command>
  );
}

function ChooseOneMenu<TData, TValue>({
  option,
  column,
}: {
  option: {
    label: string;
    value: string;
  };
  column?: Column<TData, TValue>;
}) {
  return (
    <CommandItem
      key={option.value}
      onSelect={() => {
        column?.setFilterValue(
          option.value === column?.getFilterValue() ? undefined : option.value
        );
      }}
    >
      <div className="mr-6 text-lg">
        {option.value === column?.getFilterValue() ? (
          <SquareCheck />
        ) : (
          <Square />
        )}
      </div>
      <span>{option.label}</span>
    </CommandItem>
  );
}

function ChooseMultipleMenu<TData, TValue>({
  option,
  column,
  facets,
  selectedValues,
}: {
  option: {
    label: string;
    value: string;
  };
  selectedValues: Set<string>;
  column?: Column<TData, TValue>;
  facets?: Map<string, number>;
}) {
  const isSelected = selectedValues.has(option.value);
  return (
    <CommandItem
      key={option.value}
      onSelect={() => {
        if (isSelected) {
          selectedValues.delete(option.value);
        } else {
          selectedValues.add(option.value);
        }
        const filterValues = Array.from(selectedValues);
        column?.setFilterValue(filterValues.length ? filterValues : undefined);
      }}
    >
      <div className="mr-6 text-lg">
        {isSelected ? <SquareCheck /> : <Square />}
      </div>

      <span>{option.label}</span>
      {/* This part adds a number at the end of dropdown row */}
      {facets?.get(option.value) && (
        <span className="flex items-center justify-center w-4 h-4 ml-auto font-mono text-xs">
          {facets.get(option.value)}
        </span>
      )}
    </CommandItem>
  );
}
