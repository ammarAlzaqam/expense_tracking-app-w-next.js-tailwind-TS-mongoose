"use client";

import { EllipsisVertical, Pencil, Trash2, View } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useState } from "react";
import ShowTransactionDetails from "../overlays/ShowTransactionDetails";
import UpdateTransaction from "../overlays/UpdateTransaction";
import ConfirmDelete, {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import toast from "react-hot-toast";
import { usePathname } from "next/navigation";
import { deleteTransaction } from "@/lib/actions/transaction.action";
import { Button } from "../ui/button";

type Category = {
  _id: string;
  name: string;
};
interface TransactionCommandsProps {
  _id: string;
  name: string;
  amount: number;
  category: Category;
  startDate: Date;
  categories: Category[];
}
export default function TransactionCommands({
  _id,
  name,
  amount,
  category,
  startDate,
  categories,
}: TransactionCommandsProps) {
  const [loading, setLoading] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const path = usePathname();

  const handelDeleteTransaction = async () => {
    try {
      setLoading(true);
      const data = await deleteTransaction(_id, path);
      if (!data.success) {
        toast.error(data.message);
        return;
      }

      toast.success(data.message);
    } catch (error) {
      console.error("Delete Transaction Error", error);
      toast.error("Something went wrong: Please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/*//! Modals */}
      <div>
        {/*//* Transaction Details Modal */}
        {showDetails && (
          <ShowTransactionDetails
            _id={_id}
            name={name}
            amount={amount}
            category={category?.name}
            startDate={startDate}
            setShowDetails={setShowDetails}
          />
        )}

        {/*//* Transaction Update Modal */}
        {showUpdateModal && (
          <UpdateTransaction
            transactionId={_id}
            name={name}
            amount={amount}
            category={category?._id?.toString() || ""}
            startDate={startDate}
            categories={categories}
            setShowUpdateModal={setShowUpdateModal}
          />
        )}

        {/*//* Transaction Delete Modal */}
        <ConfirmDelete
          onConfirm={handelDeleteTransaction}
          open={openDeleteModal}
          setOpen={setOpenDeleteModal}
        />
      </div>

      {/*//! Commands */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="text-light-1 cursor-pointer">
          <div className="rounded-full">
            <EllipsisVertical
              className={`${loading && "animate-caret-blink"} size-4`}
            />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="bg-dark-2 text-light-2 border-dark-4"
          align="center"
        >
          {/*//! View command */}
          <DropdownMenuItem
            onClick={() => setShowDetails(true)}
            className="hover:bg-dark-4 focus:bg-dark-4"
          >
            <View className="mr-2 size-4 text-primary-800 dark:text-primary-500" />{" "}
            <span>view</span>
          </DropdownMenuItem>

          {/*//! Update command */}
          <DropdownMenuItem
            onClick={() => setShowUpdateModal(true)}
            className="hover:bg-dark-4 focus:bg-dark-4"
          >
            <Pencil className="mr-2 size-4 text-blue-600 dark:text-blue-400" />{" "}
            <span>update</span>
          </DropdownMenuItem>

          {/*//! Delete command */}
          <DropdownMenuItem
            onClick={() => setOpenDeleteModal(true)}
            className="text-red-500 hover:bg-dark-4 focus:bg-dark-4"
          >
            <Trash2 className="mr-2 size-4" /> <span>delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
