"use client";

import SearchInput from "@/components/inputs/SearchInput";
import SelectCategoryInput from "@/components/inputs/SelectCategoryInput";
import {
  SelectFromDateInput,
  SelectToDateInput,
} from "@/components/inputs/SelectDateRangeInput";
import SelectRangeInput from "@/components/inputs/SelectRangeInput";
import {
  SelectSortByInput,
  SelectSortOrderInput,
} from "@/components/inputs/SelectSortInput";

import { MdDateRange } from "react-icons/md";
import { VscListSelection } from "react-icons/vsc";
import { FaSort } from "react-icons/fa";
import { useSearchParams } from "next/navigation";
import ClearSelectionsButton from "../shared/ClearSelectionsButton";
import { Button } from "../ui/button";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";
import { IoFilterSharp } from "react-icons/io5";

export default function FilterInputs() {
  const searchParams = useSearchParams();
  const [open, set] = useState(false);

  return (
    <div key={searchParams.toString()} className="space-y-7">
      {/*//! Search Input */}
      <SearchInput />

      <Button className={`form-btn duration-500 ${!open && "m-0"}`} onClick={() => set((prev) => !prev)}>
        <IoFilterSharp className={`${open && "hidden"}`} />{" "}
        <IoMdClose className={`${!open && "hidden"}`} /> Filters
      </Button>

      {/*//! Select Inputs */}
      <div
        className={`space-y-7 transition-all duration-500 overflow-hidden
        ${
          open
            ? "max-h-[1000px] opacity-100 translate-y-0 scale-100"
            : "max-h-0 opacity-0 -translate-y-10 scale-95"
        }`}
      >
        {/*//* Sort Inputs */}
        <div className="flex items-center gap-3">
          <p className="flex items-center">
            <FaSort className="text-primary-500" />
            <span className="text-heading4 text-light-2 max-sm:hidden">
              sort:
            </span>
          </p>

          <div className="flex-1">
            {/*// Select sortBy Input */}
            <SelectSortByInput />
          </div>

          <div className="flex-1">
            {/*// Select sortOrder Input */}
            <SelectSortOrderInput />
          </div>
        </div>

        {/*//* Select DateRange Input */}
        <div className="w-full flex items-center gap-3">
          <p className="flex items-center">
            <MdDateRange className="text-primary-500" />
            <span className="text-heading4 text-light-2 max-sm:hidden">
              Date:
            </span>
          </p>

          <div className="flex-1">
            <SelectFromDateInput />
          </div>

          <div className="flex-1">
            <SelectToDateInput />
          </div>
        </div>

        {/*//* Select Range & Category Input */}
        <div className="w-full flex sm:items-center max-sm:flex-col gap-3">
          <p className="flex items-center">
            <VscListSelection className="text-primary-500" />
            <span className="text-heading4 text-light-2">Select:</span>
          </p>

          {/*// Select Category Input */}
          <div className="flex-1">
            <SelectCategoryInput
            />
          </div>

          {/*// Select Range Input */}
          <div className="flex-1">
            <SelectRangeInput />
          </div>
        </div>

        {/*//* Clear all selection */}
        <ClearSelectionsButton />
      </div>
    </div>
  );
}
