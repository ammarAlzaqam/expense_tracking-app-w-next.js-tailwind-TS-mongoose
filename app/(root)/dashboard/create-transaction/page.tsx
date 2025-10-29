import CreateTheTransactionForm from "@/components/forms/CreateTransactionForm";
import { Button } from "@/components/ui/button";
import { BadgeDollarSign } from "lucide-react";
import Link from "next/link";

export default async function createTransactionPage() {
  return (
    <section>
      <div className="max-w-lg mx-auto">
        <h1 className="text-heading2 sm:text-heading1 text-light-1">
          Create Transaction
        </h1>

        {/*//! Show transactions float button */}
        <Button
          asChild
          className="rounded-full text-primary-500 bg-primary-500/30 ring-2 ring-primary-500/50 backdrop-blur-lg size-10 shadow-md shadow-primary-500"
        >
          <Link
            href="/dashboard"
            className="z-50 fixed bottom-28 md:bottom-5 right-[15px] md:right-5"
          >
            <BadgeDollarSign className="size-8" />
          </Link>
        </Button>

        <div className="mt-10 ">
          <CreateTheTransactionForm />
        </div>
      </div>
    </section>
  );
}
