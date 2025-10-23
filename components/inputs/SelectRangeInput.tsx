"use client";

import { useState } from "react";
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
import { FiArrowDown, FiTarget, FiArrowUp } from "react-icons/fi";
type Item = {
  name: any;
  value: string;
};
const CLEAR_VALUE = "clear-selection";
const items: Item[] = [
  {
    name: (
      <>
        Less than 100 <FiArrowDown className="inline ml-1 text-primary-500" />
      </>
    ),
    value: "<100",
  },
  {
    name: (
      <>
        Between 100 and 1000{" "}
        <FiTarget className="inline ml-1 text-primary-500" />
      </>
    ),
    value: "100-1000",
  },
  {
    name: (
      <>
        More than 1000 <FiArrowUp className="inline ml-1 text-primary-500" />
      </>
    ),
    value: ">1000",
  },
];
export default function SelectRangeInput() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialRange = searchParams.get("range") || "";
  const [range, setRange] = useState(initialRange);

  const clearOpt: Item = { value: CLEAR_VALUE, name: "Without range" };

  const selectItems = [clearOpt, ...items];

  const handelValueChange = (newValue: string) => {
    const params = new URLSearchParams(searchParams);
    if (newValue === CLEAR_VALUE) {
      params.delete("range");
    } else {
      params.set("range", newValue);
      setRange(newValue);
    }
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <Select value={range} onValueChange={handelValueChange}>
      <SelectTrigger className={`form-input w-full
        ${range && "border border-primary-500"}
        `}>
        <SelectValue placeholder="Without Range" />
      </SelectTrigger>
      <SelectContent className="text-light-2 bg-dark-2 border border-dark-2/50">
        <SelectGroup>
          <SelectLabel className="text-gray-1">Range</SelectLabel>
          {selectItems.map(({ value, name }) => (
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
