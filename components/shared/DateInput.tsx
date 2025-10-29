"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function DateInput({
  value,
  onChange,
  disabled,
}: {
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
  disabled?: boolean;
}) {
  const [open, setOpen] = React.useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className="w-full">
        <Button
          variant="outline"
          data-empty={!value}
          disabled={disabled}
          className="form-input data-[empty=true]:text-light-3 text-light-1 w-full justify-start text-left font-normal"
        >
          <CalendarIcon className="text-light-2" />
          {value ? format(value, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 z-[1000]">
        <Calendar
          className="text-light-2 !bg-dark-2"
          mode="single"
          selected={value}
          onSelect={(date) => {
            onChange(date || undefined);
            setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
