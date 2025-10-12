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
import { createTransactionValidationSchema } from "@/lib/validation";
import { Input } from "../ui/input";
import { DateInput } from "../shared/DateInput";
import { Button } from "../ui/button";
import React from "react";
import z from "zod";
import toast from "react-hot-toast";
import { Shell } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { createTransaction } from "@/lib/actions/transaction.action";
import { SelectInput } from "../ui/select";

type Category = {
  _id: string;
  name: string;
};
interface CreateCategoryFormProps {
  categories: Category[];
}
export default function CreateTheTransactionForm({
  categories,
}: CreateCategoryFormProps) {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      name: "",
      amount: "",
      category: "",
      startDate: undefined,
    },
    resolver: zodResolver(createTransactionValidationSchema),
  });

  const onSubmit = async ({
    name,
    amount,
    category,
    startDate,
  }: z.infer<typeof createTransactionValidationSchema>) => {
    try {
      setLoading(true);

      const data = await createTransaction({
        name,
        amount: parseInt(amount),
        startDate,
        category,
        path: "/dashboard",
      });

      if (!data.success) {
        toast.error(data.message);
        return;
      }

      router.push("/dashboard");
      toast.success(data.message);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="form">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="form-label">Name</FormLabel>
              <FormControl>
                <Input type="text" {...field} className="form-input" />
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
                  {...field}
                  className={`form-input no-spinner ${
                    field.value == "0" || field.value === ""
                      ? "!text-light-1"
                      : field.value < "0"
                      ? "text-red-600 dark:text-red-400"
                      : "text-green-700 dark:text-green-400"
                  }`}
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
              <FormLabel className="form-label">Start Date</FormLabel>
              <FormControl>
                <DateInput {...field} />
              </FormControl>
              <FormMessage className="form-msg" />
            </FormItem>
          )}
        />
        <Button disabled={loading} type="submit" className="form-btn">
          {loading ? (
            <Shell className="animate-spin text-light-1" />
          ) : (
            "Create Transaction"
          )}
        </Button>
      </form>
    </Form>
  );
}
