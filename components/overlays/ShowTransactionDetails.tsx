import { ArrowDownCircle, ArrowUpCircle, Tag } from "lucide-react";
import { format } from "date-fns";
import { formattedAmount } from "@/lib/utils";

interface TransactionCommandsProps {
  _id: string;
  name: string;
  amount: number;
  category: string;
  startDate: Date;
  setShowDetails: (value: boolean) => void;
}
export default function ShowTransactionDetails({
  _id,
  name,
  amount,
  category,
  startDate,
  setShowDetails,
}: TransactionCommandsProps) {
  const isExpense = amount < 0;

  const defaultCategoryName = "Un categorized 🌐";

  return (
    <div
      onClick={() => setShowDetails(false)}
      className="z-50 fixed inset-0 bg-dark-1/80 flex items-center justify-center px-3 sm:px-10"
    >
      <div onClick={(e) => e.stopPropagation()} className="max-w-2xl p-5 relative flex w-[100%] flex-col gap-3 px-3 py-5 sm:p-5 rounded-xl bg-dark-3 border border-dark-2/40 shadow-lg shadow-primary-800/20 hover:shadow-xl">
        {/*//! name, amount */}
        <div className="flex justify-between items-start gap-2">
          <h3 className="text-subtle sm:text-base text-light-1 max-w-[70%]">
            {name}
          </h3>
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
        </div>

        {/*//! Category, Date */}
        <div className="flex justify-between items-center text-base">
          <div className="flex items-center gap-1.5 bg-dark-4 px-2.5 py-1 rounded-full">
            <Tag className="w-4 h-4 text-primary-800 dark:text-primary-500" />
            <p className="text-light-3/80">{category ?? defaultCategoryName}</p>
          </div>
          <time className="text-gray-1">
            {format(startDate, "dd MMM yyyy")}
          </time>
        </div>
      </div>
    </div>
  );
}
