"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateTransactionValidationSchema } from "@/lib/validation";
import z from "zod";
import toast from "react-hot-toast";
import { useState } from "react";
import { Input } from "../ui/input";
import { SelectInput } from "../ui/select";
import { DateInput } from "../shared/DateInput";
import { Button } from "../ui/button";
import { Shell } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { updateTransaction } from "@/lib/actions/transaction.action";

type Category = {
  _id: string;
  name: string;
};
interface UpdateTransactionProps {
  transactionId: string;
  name: string;
  amount: number;
  category: string;
  startDate: Date;
  categories: Category[];
  setShowUpdateModal: (value: boolean) => void;
}
export default function UpdateTransactionForm({
  transactionId,
  name,
  amount,
  category,
  startDate,
  categories,
  setShowUpdateModal,
}: UpdateTransactionProps) {
  const [loading, setLoading] = useState(false);
  const path = usePathname();
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      name,
      amount: amount.toString(),
      category,
      startDate,
    },

    resolver: zodResolver(updateTransactionValidationSchema),
  });

  const onSubmit = async ({
    name: new_name,
    amount: new_amount,
    category: new_category,
    startDate: new_startDate,
  }: z.infer<typeof updateTransactionValidationSchema>) => {
    try {
      setLoading(true);
      if (
        new_name === name &&
        new_amount === amount.toString() &&
        new_category === category &&
        new Date(new_startDate).getTime() === new Date(startDate).getTime()
      ) {
        toast.error("Field to update transaction: No changes");
        return;
      }

      const data = await updateTransaction({
        transactionId,
        name: new_name,
        amount: parseInt(new_amount),
        category: new_category || "",
        startDate: new_startDate,
        path,
      });
      if (!data.success) {
        toast.error(data.message);
        return;
      }

      setShowUpdateModal(false);
      toast.success(data.message);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong: Please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form className="form" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="form-label">Name</FormLabel>
              <FormControl>
                <Input className="form-input" {...field} />
              </FormControl>
              <FormMessage className="form-msg" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="form-label">Amount</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  className={`form-input no-spinner ${
                    field.value === "0" || field.value === ""
                      ? "!text-light-1"
                      : field.value < "0"
                      ? "text-red-600 dark:text-red-400"
                      : "text-green-700 dark:text-green-400"
                  }`}
                  {...field}
                />
              </FormControl>
              <FormMessage className="form-msg" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="form-label">Category</FormLabel>
              <FormControl>
                <SelectInput
                  value={field.value || ""}
                  onChange={field.onChange}
                  label={"categories"}
                  items={categories}
                />
              </FormControl>
              <FormMessage className="form-msg" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="form-label">StartDate</FormLabel>
              <FormControl>
                <DateInput value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage className="form-msg" />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={loading} className="form-btn">
          {loading ? <Shell className="animate-spin" /> : "Update"}
        </Button>
      </form>
    </Form>
  );
}
