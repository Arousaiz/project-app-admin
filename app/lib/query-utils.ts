import type { QueryClient } from "@tanstack/react-query";
import type {
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";
import { useState } from "react";

async function invalidateQueries(key: string, queryClient: QueryClient) {
  queryClient.invalidateQueries({ queryKey: [key] });
}

async function checkQuery(key: string, queryFn: any, queryClient: QueryClient) {
  if (await queryClient.getQueryData([key])) {
    invalidateQueries(key, queryClient);
  } else {
    queryClient.prefetchQuery({
      queryKey: [key],
      queryFn: () => queryFn,
    });
  }
}

interface UseTableQueryOptions<TData> {
  columns?: any[];
  data?: TData[];
  url?: string;
  manualPagination?: boolean;
  defaultPageSize?: number;
}

function useTableStates<TData>() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const [sorting, setSorting] = useState<SortingState>([]);

  const [globalFilter, setGlobalFilter] = useState<string>("");

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  return {
    pagination,
    setPagination,
    sorting,
    setSorting,
    globalFilter,
    setGlobalFilter,
    columnFilters,
    setColumnFilters,
  };
}

export { invalidateQueries, checkQuery, useTableStates };
