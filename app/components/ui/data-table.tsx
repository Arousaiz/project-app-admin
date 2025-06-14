"use client";

import {
  type ColumnDef,
  type ColumnFiltersState,
  type ColumnSizingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type GlobalFilterTableState,
  type PaginationState,
  type SortingState,
  useReactTable,
  type VisibilityState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import React, {
  useEffect,
  useMemo,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTablePagination } from "./data-table-pagination";
import { DataTableViewOptions } from "./data-table-view-options";
import { useSearchParams } from "react-router";
import { ColumnResizer } from "./data-table-column-resizer";
import { DataTableFilter } from "./data-table-filter";
import { DataTableFilterTags } from "./data-table-tags";
import { Skeleton } from "@/components/ui/skeleton";

export interface DataTableFilterOptions {
  id: string;
  title: string;
  type: "select" | "select-multiple" | "text" | "range" | "dates";
  options?: {
    label: string;
    value: string;
  }[];
  min?: number;
  max?: number;
  step?: number;
}

interface DataTableProps<TData, TValue> {
  status?: { isLoading: boolean; isFetching: boolean };
  columns: ColumnDef<TData, TValue>[];
  paginatedTableData?: {
    data?: TData[];
    paginated: {
      total_records: number;
      limit: number;
      offset: number;
    };
  };
  filterOptions?: DataTableFilterOptions[];
  filterField: string;
  pagination?: PaginationState;
  setPagination?: Dispatch<SetStateAction<PaginationState>>;
  sorting?: SortingState;
  setSorting?: Dispatch<SetStateAction<SortingState>>;
  columnFilters?: ColumnFiltersState;
  setColumnFilters?: Dispatch<SetStateAction<ColumnFiltersState>>;
  globalFilter: string;
  setGlobalFilter: Dispatch<string>;
}

export function DataTable<TData, TValue>({
  status = { isFetching: false, isLoading: false },
  columns,
  paginatedTableData,
  filterOptions,
  filterField,
  pagination,
  setPagination,
  sorting,
  setSorting,
  columnFilters,
  setColumnFilters,
  globalFilter,
  setGlobalFilter,
}: DataTableProps<TData, TValue>) {
  const isInitialLoad = status.isLoading && !paginatedTableData;
  const isRefreshing = status.isFetching && !!paginatedTableData;
  // const [searchParams, setSearchParams] = useSearchParams();
  const [columnSizing, setColumnSizing] = useState<ColumnSizingState>({});

  // const offset = parseInt(searchParams.get("offset") || "0");
  // const limit = parseInt(searchParams.get("limit") || "10");

  // const [pagination, setPagination] = useState<PaginationState>({
  //   pageIndex: Math.floor(offset / limit), //initial page index
  //   pageSize: limit, //default page size
  // });
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const tableData = React.useMemo(
    () =>
      status.isLoading
        ? Array(pagination?.pageSize).fill({})
        : paginatedTableData?.data,
    [status.isLoading, paginatedTableData]
  );
  const columnsMemo = useMemo(
    () =>
      status.isLoading
        ? columns.map((column) => {
            if (column.id === "select") {
              return column;
            }
            if (column.id === "actions") {
              return {
                ...column,
                cell: () => <></>,
              };
            }
            return {
              ...column,
              cell: () => <Skeleton className="h-6 w-full animate-fade-out" />,
            };
          })
        : columns,
    [status.isLoading, columns]
  );

  console.log(paginatedTableData);

  const table = useReactTable({
    data: tableData || [],
    columns: columnsMemo,
    getCoreRowModel: getCoreRowModel(),

    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    manualPagination: true,
    sortDescFirst: true,

    rowCount: paginatedTableData?.paginated.total_records || 0,
    pageCount: Math.ceil(
      (paginatedTableData?.paginated?.total_records || 0) /
        (paginatedTableData?.paginated?.limit || 1)
    ),

    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    manualSorting: true,

    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    manualFiltering: true,

    globalFilterFn: "includesString",
    onGlobalFilterChange: setGlobalFilter,

    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,

    enableColumnResizing: true,
    columnResizeMode: "onChange",
    onColumnSizingChange: setColumnSizing,

    state: {
      globalFilter,
      columnSizing,
      sorting,
      pagination,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  useEffect(() => {
    table.setPageIndex(0);
  }, [columnFilters, sorting, globalFilter]);

  return (
    <div>
      <div className="flex flex-col md:items-center py-2 md:flex-row">
        <Input
          placeholder={`Поиск...`}
          value={
            typeof table.getState().globalFilter === "string"
              ? table.getState().globalFilter
              : ""
          }
          onChange={(e) => table.setGlobalFilter(String(e.target.value))}
          className="max-w-sm"
        />
        <div className="flex flex-row flex-wrap">
          {filterOptions?.length !== 0 && filterOptions
            ? filterOptions.map(
                (filter) =>
                  table.getColumn(filter.id) && (
                    <DataTableFilter
                      column={table.getColumn(filter.id)}
                      title={filter.title}
                      options={filter}
                    />
                  )
              )
            : null}
        </div>
        <DataTableViewOptions table={table} />
      </div>
      {filterOptions?.length !== 0 && filterOptions ? (
        <DataTableFilterTags table={table} filterOptions={filterOptions} />
      ) : null}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="relative"
                      style={{
                        width: header.getSize(),
                      }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      <ColumnResizer header={header} />
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="animate-fade-in"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      style={{
                        width: cell.column.getSize(),
                        minWidth: cell.column.columnDef.minSize,
                      }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Результатов не найдено
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
