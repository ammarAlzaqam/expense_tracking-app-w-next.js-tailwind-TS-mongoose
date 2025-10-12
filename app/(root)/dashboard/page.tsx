import DashboardSidebar from "@/components/bars/DashboardSidebar";
import TransactionCard from "@/components/cards/TransactionCard";
import SearchInput from "@/components/shared/SearchInput";
import { fetchAllCategories } from "@/lib/actions/category.action";
import { fetchTransactions } from "@/lib/actions/transaction.action";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ search: string }>;
}) {
  const { search: searchString } = await searchParams;
  const transactionPromise = fetchTransactions({
    pageNumber: 1,
    searchString,
    limit: 20,
    category: "",
    range: "",
    sortBy: "startDate",
    sortOrder: -1,
  });

  const categoriesPromise = fetchAllCategories();

  const [{ transactions, nofPages }, categories] = await Promise.all([
    transactionPromise,
    categoriesPromise,
  ]);

  return (
    <section className="space-y-7">
      <h1 className="text-heading1 text-light-1">Transactions</h1>

      <SearchInput />

      <div className="flex flex-wrap justify-between gap-x-2 gap-y-5">
        {transactions.map((t) => (
          <TransactionCard
            key={t._id}
            transaction={t}
            categories={categories || []}
            type="dashboard"
          />
        ))}
      </div>
    </section>
  );
}
