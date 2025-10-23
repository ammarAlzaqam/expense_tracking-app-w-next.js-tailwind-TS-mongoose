import TransactionCard from "@/components/cards/TransactionCard";
import { fetchAllCategories } from "@/lib/actions/category.action";
import { fetchTransactions } from "@/lib/actions/transaction.action";
import Category from "@/lib/models/category.model";
import connectDB from "@/lib/mongoose";
import { FaChevronDown, FaSort } from "react-icons/fa";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ClearSelectionsButton from "@/components/shared/ClearSelectionsButton";
import { HiPlus } from "react-icons/hi";
import FilterInputs from "@/components/inputs/filterInputs";
import { PaginationTransactions } from "@/components/shared/Pagination";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{
    search: string;
    range: "" | "<100" | "100-1000" | ">1000" | undefined;
    category: string;
    sortBy: "amount" | "startDate";
    sortOrder: "1" | "-1";
    fromDate: string;
    toDate: string;
    pageNumber: string;
  }>;
}) {
  const {
    search: searchString,
    range,
    category,
    sortBy,
    sortOrder,
    fromDate,
    toDate,
    pageNumber,
  } = await searchParams;
  await connectDB();
  const categoryData = await Category.findOne({ slug: category });

  const { transactions, nofPages } = await fetchTransactions({
    pageNumber: parseInt(pageNumber || "1"),
    searchString,
    limit: 20,
    category: categoryData?._id || "",
    range: range || "",
    sortBy: sortBy || "startDate",
    sortOrder: (parseInt(sortOrder) as 1 | -1) || -1,
    fromDate: fromDate ? new Date(fromDate) : undefined,
    toDate: toDate ? new Date(toDate) : undefined,
  });

  return (
    <section className="space-y-7">
      {/*//! Head Text & Down Button */}
      <div className="flex items-center gap-3 justify-between">
        <h1 className="text-heading1 text-light-1">Transactions</h1>
        {/*//* Down button */}
        <a href="#transaction">
          <Button className="form-btn size-7">
            <FaChevronDown />
          </Button>
        </a>
      </div>

      {/*//! Create transaction float button */}
      <Button
        asChild
        className="rounded-full text-primary-500 bg-primary-500/30 ring-2 ring-primary-500/50 backdrop-blur-lg size-10 shadow-md shadow-primary-500"
      >
        <Link
          href="/dashboard/create-transaction"
          className="z-50 fixed bottom-[84px] md:bottom-5 right-[15px] md:right-5"
        >
          <HiPlus className="size-8" />
        </Link>
      </Button>

      {/*//! Filter Inputs */}
      <FilterInputs />

      {/*//! Divider */}
      <div id="transaction" className="divider" />

      {transactions.length ? (
        <div className="space-y-10">
          {/*//! Transactions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-5">
            {transactions.map((t) => (
              <TransactionCard key={t._id} transaction={t} type="dashboard" />
            ))}
          </div>

          {/*//! Pagination */}
          <PaginationTransactions nofPages={nofPages} />
        </div>
      ) : (
        <p className="text-light-4 text-body font-normal text-center">
          No transactions
        </p>
      )}
    </section>
  );
}
