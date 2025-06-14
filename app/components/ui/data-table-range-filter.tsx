import type { Column } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "./slider";
import { useState } from "react";

interface DataTableRangeFilter<TData, TValue> {
  column?: Column<TData, TValue>;
  title?: string;
  min?: number;
  max?: number;
  step?: number;
}

export default function DataTableRangeFilter<TData, TValue>({
  title,
  column,
  min = 0,
  max = 100,
  step,
}: DataTableRangeFilter<TData, TValue>) {
  const currentFilterValue = column?.getFilterValue() as number[] | undefined;

  return (
    <div className="p-2 flex flex-col w-[200px]">
      <div className="p-4">
        {currentFilterValue !== undefined ? (
          <div className="flex justify-between mb-2">
            <span>{`От ${currentFilterValue[0]}`}</span>
            <span>{`До ${currentFilterValue[1]}`}</span>
          </div>
        ) : (
          <></>
        )}
        <Slider
          min={min}
          max={max}
          step={step}
          value={currentFilterValue}
          defaultValue={[min, max]}
          onValueChange={(value) => {
            column?.setFilterValue(value);
          }}
          minStepsBetweenThumbs={1}
          className="w-full"
        />
      </div>
      {currentFilterValue && (
        <Button
          onClick={() => {
            column?.setFilterValue(undefined);
          }}
          className="justify-center text-center"
        >
          Сбросить фильтр
        </Button>
      )}
    </div>
  );
}
