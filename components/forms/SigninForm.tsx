"use client";

import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SigninValidationSchema } from "@/lib/validation";
import { Button } from "../ui/button";
import { Disc3 } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function SigninForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(SigninValidationSchema),
  });

  const handelSubmit = form.handleSubmit(async (values) => {
    try {
      setLoading(true);

      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (!data.success) {
        toast.error(data.message || "Signin failed");
        return;
      }

      toast.success(data.message || "Signin successfully");
      router.replace("/");
    } catch (error) {
      console.log(error);
      toast.error("Signin failed");
    } finally {
      setLoading(false);
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={handelSubmit} className="form">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="form-label">email</FormLabel>
              <FormControl>
                <Input {...field} className="form-input" />
              </FormControl>
              <FormMessage className="form-msg" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="form-label">password</FormLabel>
              <FormControl>
                <Input type="password" {...field} className="form-input" />
              </FormControl>
              <FormMessage className="form-msg" />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={loading} className="form-btn">
          {loading ? <Disc3 className="animate-spin" /> : "signin"}
        </Button>
      </form>
    </Form>
  );
}
