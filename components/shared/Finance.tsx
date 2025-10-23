"use client";
import { formattedAmount } from "@/lib/utils";
import { GiWideArrowDunk } from "react-icons/gi";
import { CiGrid41 } from "react-icons/ci";
import { CiGrid2H } from "react-icons/ci";
import { useState } from "react";
import { GoArrowUpRight } from "react-icons/go";
import { GoArrowDown } from "react-icons/go";
import { MdMonetizationOn } from "react-icons/md";
import { ArrowDownCircle, ArrowUpCircle, Tag } from "lucide-react";

export default function Finance({
  income,
  expenses,
  netBalance,
}: {
  income: number;
  expenses: number;
  netBalance: number;
}) {
  const [grid, setGrid] = useState(true);

  return (
    <>
      <div className="flex items-center justify-between gap-3">
        {/*//! Title */}
        <h1 className="flex gap-3 items-center text-heading1 text-light-1 uppercase">
          <GiWideArrowDunk />
          <span>finance</span>
        </h1>
        {/*//! Grid button */}
        <button
          className="relative size-7"
          onClick={() => setGrid((prev) => !prev)}
        >
          <CiGrid41
            data-state={grid ? "close" : "open"}
            className="cursor-pointer size-7 animate-open_close absolute inset-0"
          />
          <CiGrid2H
            data-state={grid ? "open" : "close"}
            className="cursor-pointer size-7 animate-open_close absolute inset-0"
          />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/*//! Net */}
        <div
          data-state={grid}
          className="z-2 finance-light relative finance-card col-span-2"
        >
          <MdMonetizationOn className="z-1 size-28 text-light-1/5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

          <div
            className={`whitespace-nowrap flex items-center justify-center gap-2 font-extrabold ${
              netBalance < 0 ? "text-red-400" : "text-green-400"
            }`}
          >
            {netBalance < 0 ? (
              <ArrowDownCircle className="size-8" />
            ) : (
              <ArrowUpCircle className="size-8" />
            )}
            <p className="text-heading1">
              {formattedAmount(netBalance)}
            </p>
          </div>
          <h3 className="finance-text">Net Balance</h3>
        </div>

        {/*//! Income */}
        <div
          className={`relative z-2 finance-card finance-sub-bg p-4
          ${!grid && "col-span-2"}
        `}
        >
          <GoArrowUpRight className="-z-1 size-32 text-green-500/10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

          <h3 className="finance-text font-normal text-small sm:text-base">
            Income
          </h3>
          <h2 className="text-heading3 overflow-auto no-scrollbar text-blue">
            {formattedAmount(income)}
          </h2>
        </div>

        {/*//! Expenses */}
        <div
          className={`relative z-2 finance-card finance-sub-bg p-4
          ${!grid && "col-span-2"}
        `}
        >
          <GoArrowDown className="-z-1 size-28 text-red-400/10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

          <h3 className="finance-text font-normal text-small sm:text-base">
            Expenses
          </h3>
          <h2 className="text-heading3 text-secondary-500 overflow-auto no-scrollbar">
            {formattedAmount(expenses)}
          </h2>
        </div>
      </div>
    </>
  );
}
