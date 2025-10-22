import CreateTheTransactionForm from "@/components/forms/CreateTransactionForm";
import { fetchAllCategories } from "@/lib/actions/category.action";
import Link from "next/link";
import { MdClose } from "react-icons/md";

export default async function createTransactionPage() {
  const categories = await fetchAllCategories();
  return (
    <section>
      <Link href="/dashboard" className="fixed top-18 right-2">
        <MdClose className="size-7 text-logout-btn" />
      </Link>
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
