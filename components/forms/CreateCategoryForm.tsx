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
import { createCategoryValidationSchema } from "@/lib/validation";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Shell } from "lucide-react";
import { useState } from "react";
import z from "zod";
import toast from "react-hot-toast";
import slugify from "slugify";
import { createCategory } from "@/lib/actions/category.action";

export default function CreateCategoryForm() {
  const [loading, setLoading] = useState(false);
  const form = useForm({
    defaultValues: {
      name: "",
    },
    resolver: zodResolver(createCategoryValidationSchema),
  });

  const onSubmit = async ({
    name,
  }: z.infer<typeof createCategoryValidationSchema>) => {
    try {
      setLoading(true);

      const slug = slugify(name, {
        lower: true,
        strict: true,
      });

      const data = await createCategory({ name, slug, path: "/dashboard" });
      if (!data.success) {
        toast.error(data.message);
        return;
      }

      form.reset();
      toast.success(data.message);
    } catch (error) {
      console.error(error);
      toast.error("Failed to add category: Something went wrong");
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
        <Button className="form-btn" disabled={loading}>
          {loading ? (
            <Shell className="animate-spin text-light-1" />
          ) : (
            "Create Category"
          )}
        </Button>
      </form>
    </Form>
  );
}
