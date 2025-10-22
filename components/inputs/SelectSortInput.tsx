"use client";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import { MdCalendarMonth } from "react-icons/md";
import { FaMoneyBillWave } from "react-icons/fa";

type SortByValue = "startDate" | "amount";
interface SortByItem {
  name: any;
  value: SortByValue;
}
const sortByItems: SortByItem[] = [
  {
    name: (
      <>
        <MdCalendarMonth className="inline mr-1 text-primary-500" /> Date
      </>
    ),
    value: "startDate",
  },
  {
    name: (
      <>
        <FaMoneyBillWave className="inline mr-1 text-primary-500" />
        $<span className="max-sm:hidden">Amount</span>{" "}
      </>
    ),
    value: "amount",
  },
];
export function SelectSortByInput() {
  const router = useRouter();

  const searchParams = useSearchParams();

  const initialSort =
    (searchParams.get("sortBy") as SortByValue) || "startDate";
  const [sort, setSort] = useState<SortByValue>(initialSort);

  const handelValueChange = (newValue: SortByValue) => {
    const params = new URLSearchParams(searchParams);
    params.set("sortBy", newValue);
    router.push(`?${params.toString()}`, { scroll: false });
    setSort(newValue);
  };

  return (
    <Select value={sort} onValueChange={handelValueChange}>
      <SelectTrigger className="form-input w-full">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="text-light-2 bg-dark-2 border border-dark-2/50">
        <SelectGroup>
          <SelectLabel className="text-gray-1">SortBy</SelectLabel>
          {sortByItems.map(({ value, name }) => (
            <SelectItem
              className="duration-100 hover:bg-primary-500/50"
              key={value}
              value={value}
            >
              {name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

//!------ sort-order ------
type SortOrderValue = "1" | "-1";
interface SortOrderItem {
  name: any;
  value: SortOrderValue;
}
export function SelectSortOrderInput() {
  const router = useRouter();

  const searchParams = useSearchParams();

  const sortBy = searchParams.get("sortBy") || "startDate";

  const sortOrderItems: SortOrderItem[] = [
    {
      name:
        sortBy === "startDate" ? (
          <span className="flex items-center gap-2">
            <AiOutlineArrowDown className="text-lg" />
            Newest<span className="max-sm:hidden"> to Oldest</span>
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <AiOutlineArrowDown className="text-lg" />
            Highest<span className="max-sm:hidden"> to Lowest</span>
          </span>
        ),
      value: "-1",
    },
    {
      name:
        sortBy === "startDate" ? (
          <span className="flex items-center gap-2">
            <AiOutlineArrowUp className="text-lg" />
            Oldest<span className="max-sm:hidden"> to Newest</span>
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <AiOutlineArrowUp className="text-lg" />
            Lowest<span className="max-sm:hidden"> to Highest</span>
          </span>
        ),
      value: "1",
    },
  ];

  const initialSort = (searchParams.get("sortOrder") as SortOrderValue) || "-1";
  const [sort, setSort] = useState<SortOrderValue>(initialSort);

  const handelValueChange = (newValue: SortOrderValue) => {
    const params = new URLSearchParams(searchParams);
    params.set("sortOrder", newValue);
    router.push(`?${params.toString()}`, { scroll: false });
    setSort(newValue);
  };

  return (
    <Select value={sort} onValueChange={handelValueChange}>
      <SelectTrigger className="form-input w-full">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="text-light-2 bg-dark-2 border border-dark-2/50">
        <SelectGroup>
          <SelectLabel className="text-gray-1">SortOrder</SelectLabel>
          {sortOrderItems.map(({ value, name }) => (
            <SelectItem
              className="duration-100 hover:bg-primary-500/50"
              key={value}
              value={value}
            >
              {name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
