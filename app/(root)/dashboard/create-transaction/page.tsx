import CreateTheTransactionForm from "@/components/forms/CreateTransactionForm";
import { fetchAllCategories } from "@/lib/actions/category.action";

export default async function createTransactionPage() {
  const categories = await fetchAllCategories();
  return (
    <section>
      <div className="max-w-lg mx-auto">
        <h1 className="text-heading2 sm:text-heading1 text-light-1">
          Create Transaction
        </h1>
        <div className="mt-10 ">
          <CreateTheTransactionForm
            categories={JSON.parse(JSON.stringify(categories))}
          />
        </div>
      </div>
    </section>
  );
}
