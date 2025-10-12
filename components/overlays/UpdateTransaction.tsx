import UpdateTransactionForm from "../forms/UpdateTransactionForm";

type Category = {
  _id: string;
  name: string;
}
interface UpdateTransactionProps {
  transactionId: string;
  name: string;
  amount: number;
  category: string;
  startDate: Date;
  categories: Category[];
  setShowUpdateModal: (value: boolean) => void;
}
export default function UpdateTransaction({
  transactionId,
  name,
  amount,
  category,
  startDate,
  categories,
  setShowUpdateModal,
}: UpdateTransactionProps) {
  return (
    <div
      onClick={() => setShowUpdateModal(false)}
      className="z-50 fixed inset-0 backdrop-blur-md bg-dark-1/60 flex items-center justify-center px-3 sm:px-10 py-5"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl space-y-8 p-5 bg-dark-3 rounded-md"
      >
        <h2 className="text-heading1 text-light-1">Update transaction</h2>

        <UpdateTransactionForm
          transactionId={transactionId}
          name={name}
          amount={amount}
          category={category}
          startDate={startDate}
          categories={categories}
          setShowUpdateModal={setShowUpdateModal}
        />
      </div>
    </div>
  );
}
