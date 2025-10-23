import { ArrowDownCircle, ArrowUpCircle, Tag } from "lucide-react";
import { format } from "date-fns";
import TransactionCommands from "../shared/TransactionCommands";
import { formattedAmount } from "@/lib/utils";

type Category = {
  _id: string;
  name: string;
};
interface TransactionCardProps {
  transaction: {
    _id: string;
    name: string;
    amount: number;
    category: Category;
    startDate: Date;
  };
  type?: string;
}

export default function TransactionCard({
  transaction: { name, amount, category, startDate, _id },
  type = "",
}: TransactionCardProps) {
  const isExpense = amount < 0;

  const defaultCategoryName = "Un categorized 🌐";

  return (
    <article className="relative flex flex-col gap-3 px-3 py-5 sm:p-5 rounded-xl bg-dark-3 border border-dark-2 shadow-lg shadow-primary-800/20 hover:shadow-xl">
      {/*//! name, amount, Commands button */}
      <div className="flex justify-between items-start gap-2">
        {/*//* left-side */}
        <h3
          className={`text-subtle sm:text-base text-light-1 max-w-[70%] ${
            type === "dashboard" && "truncate"
          }`}
        >
          {name}
        </h3>

        {/*//* right-side */}
        <div className="flex items-center gap-3">
          <div
            className={`whitespace-nowrap flex items-center gap-1 font-extrabold ${
              isExpense ? "text-red-400" : "text-green-400"
            }`}
          >
            {isExpense ? (
              <ArrowDownCircle className="w-5 h-5" />
            ) : (
              <ArrowUpCircle className="w-5 h-5" />
            )}
            <p className="text-subtle sm:text-base">
              {formattedAmount(amount)}
            </p>
          </div>
          {/*//* Commands button */}
          {type === "dashboard" && (
            <TransactionCommands
              _id={_id.toString()}
              name={name}
              amount={amount}
              category={category ? JSON.parse(JSON.stringify(category)) : {}}
              startDate={startDate}
            />
          )}
        </div>
      </div>

      {/*//! Category, Date */}
      <div className="flex justify-between items-center text-base gap-5">
        <div className="flex items-center gap-1.5 bg-dark-2 px-2.5 py-1 rounded-full">
          <Tag className="shrink-0 w-4 h-4 text-primary-800 dark:text-primary-500" />
          <p className="text-light-3/80 line-clamp-1">
            {category?.name ?? defaultCategoryName}
          </p>
        </div>
        <time className="text-gray-1 shrink-0">{format(startDate, "dd MMM yyyy")}</time>
      </div>
    </article>
  );
}
