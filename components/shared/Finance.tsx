"use client";
import { formattedAmount } from "@/lib/utils";
import { GiWideArrowDunk } from "react-icons/gi";
import { CiGrid41 } from "react-icons/ci";
import { CiGrid2H } from "react-icons/ci";
import { useState } from "react";

export default function Finance({
  income,
  expenses,
  netBalance,
}: {
  income: number;
  expenses: number;
  netBalance: number;
}) {
  const [grid, setGrid] = useState(false);

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
        <div data-state={grid} className="finance-light relative finance-card col-span-2">
          <h1 className="text-heading1 text-primary-500">
            {formattedAmount(netBalance)}
          </h1>
          <h3 className="finance-text">Net Balance</h3>
        </div>

        {/*//! Income */}
        <div
          className={`finance-card finance-sub-bg p-4
          ${!grid && "col-span-2"}
        `}
        >
          <h3 className="finance-text font-normal text-small sm:text-base">
            Income
          </h3>
          <h2 className="text-heading3 overflow-auto no-scrollbar text-blue">
            {formattedAmount(income)}
          </h2>
        </div>

        {/*//! Expenses */}
        <div
          className={`finance-card finance-sub-bg p-4
          ${!grid && "col-span-2"}
        `}
        >
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