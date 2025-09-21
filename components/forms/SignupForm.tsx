"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SignUpValidationSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { useState } from "react";
import toast from "react-hot-toast";
import { Disc3 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SignupForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(SignUpValidationSchema),
  });

  const handelSubmit = form.handleSubmit(async (values) => {
    try {
      setLoading(true);

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (!data.success) {
        toast.error(data.message || "Signup failed");
        return;
      }

      toast.success(data.message || "Signup successfully");
      router.replace("/")
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  });

  return (
    <Form {...form}>
      <form className="form" onSubmit={handelSubmit}>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="form-label">Username</FormLabel>
              <FormControl>
                <Input {...field} className="form-input" />
              </FormControl>
              <FormMessage className="form-msg" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="form-label">Email</FormLabel>
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
              <FormLabel className="form-label">Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} className="form-input" />
              </FormControl>
              <FormMessage className="form-msg" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="form-label">ConfirmPassword</FormLabel>
              <FormControl>
                <Input type="password" {...field} className="form-input" />
              </FormControl>
              <FormMessage className="form-msg" />
            </FormItem>
          )}
        />

        <Button disabled={loading} type="submit" className="form-btn">
          {loading ? <Disc3 className="animate-spin" /> : "signup"}
        </Button>
      </form>
    </Form>
  );
}
