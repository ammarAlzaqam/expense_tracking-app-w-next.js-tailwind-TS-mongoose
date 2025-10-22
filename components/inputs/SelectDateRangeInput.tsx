"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export function SelectFromDateInput() {
  const [open, setOpen] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialFromDateString = searchParams.get("fromDate");
  const initialFromDate = initialFromDateString
    ? new Date(initialFromDateString)
    : undefined;
  const [fromDate, setFromDate] = useState<Date | undefined>(initialFromDate);

  const handleClearDate = (e: React.MouseEvent) => {
    e.stopPropagation();
    const params = new URLSearchParams(searchParams);
    params.delete("fromDate");
    setFromDate(undefined);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const handleSelectDate = (date: any) => {
    const params = new URLSearchParams(searchParams);
    if (date) {
      params.set("fromDate", date.toISOString());
      setFromDate(date || undefined);
    } else {
      params.delete("toDate");
      setFromDate(undefined);
    }
    setOpen(false);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild className="!w-full">
          <Button
            variant="outline"
            data-empty={!fromDate}
            className="form-input data-[empty=true]:text-light-3 text-light-1 w-full justify-start text-left font-normal relative"
          >
            <CalendarIcon className="text-light-2 mr-2" />
            {fromDate ? (
              <span className="max-sm:w-[50%] whitespace-break-spaces line-clamp-1">
                {format(fromDate, "PPP")}
              </span>
            ) : (
              <>
                <span className="max-sm:hidden">Select start date</span>
                <span className="sm:hidden">From</span>
              </>
            )}

            {fromDate && (
              <div
                onClick={handleClearDate}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-light-3 hover:text-error cursor-pointer"
              >
                <X size={16} />
              </div>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            className="text-light-2 !bg-dark-2"
            mode="single"
            selected={fromDate}
            onSelect={handleSelectDate}
            modifiers={{
              selectedDay: fromDate, // علشان نحدد اليوم المختار
              today: new Date(), // اليوم الحالي
            }}
            modifiersClassNames={{
              selectedDay:
                "bg-primary-500 text-white rounded-full hover:bg-primary-800 focus:bg-primary-800",
              today: "border border-primary-500 text-primary-500 rounded-full",
            }}
          />
        </PopoverContent>
      </Popover>
    </>
  );
}

export function SelectToDateInput() {
  const [open, setOpen] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialToDateString = searchParams.get("toDate");
  const initialToDate = initialToDateString
    ? new Date(initialToDateString)
    : undefined;
  const [toDate, setToDate] = useState<Date | undefined>(initialToDate);

  const handleClearDate = (e: React.MouseEvent) => {
    e.stopPropagation();
    const params = new URLSearchParams(searchParams);
    params.delete("toDate");
    setToDate(undefined);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const handleSelectDate = (date: Date | undefined) => {
    const params = new URLSearchParams(searchParams);
    if (date) {
      params.set("toDate", date.toISOString());
      setToDate(date);
    } else {
      params.delete("toDate");
      setToDate(undefined);
    }
    setOpen(false);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className="!w-full">
        <Button
          variant="outline"
          data-empty={!toDate}
          className="form-input data-[empty=true]:text-light-3 text-light-1 w-full justify-start text-left font-normal relative"
        >
          <CalendarIcon className="text-light-2 mr-2" />
          {toDate ? (
            <span className="max-sm:w-[50%] whitespace-break-spaces line-clamp-1">
              {format(toDate, "PPP")}
            </span>
          ) : (
            <>
              <span className="max-sm:hidden">Select end date</span>
              <span className="sm:hidden">To</span>
            </>
          )}

          {toDate && (
            <div
              onClick={handleClearDate}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-light-3 hover:text-error cursor-pointer"
            >
              <X size={16} />
            </div>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          className="text-light-2 !bg-dark-2"
          mode="single"
          selected={toDate}
          onSelect={handleSelectDate}
          modifiers={{
            selectedDay: toDate, // علشان نحدد اليوم المختار
            today: new Date(), // اليوم الحالي
          }}
          modifiersClassNames={{
            selectedDay:
              "bg-primary-500 text-white rounded-full hover:bg-primary-800 focus:bg-primary-800",
            today: "border border-primary-500 text-primary-500 rounded-full",
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
