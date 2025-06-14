import type { Column } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface DataTableTextFilter<TData, TValue> {
  column?: Column<TData, TValue>;
  title?: string;
}

export default function DataTableTextFilter<TData, TValue>({
  title,
  column,
}: DataTableTextFilter<TData, TValue>) {
  const currentFilterValue = column?.getFilterValue() as string | undefined;

  return (
    <div className="p-2 flex flex-col items-center">
      <Input
        placeholder={`Поиск по полю ${title}...`}
        value={currentFilterValue || ""}
        onChange={(e) => {
          column?.setFilterValue(e.target.value);
        }}
        className="w-full"
      />
      {currentFilterValue && (
        <Button
          onClick={() => column?.setFilterValue(undefined)}
          className="justify-center my-2"
        >
          Сбросить фильтр
        </Button>
      )}
    </div>
  );
}
