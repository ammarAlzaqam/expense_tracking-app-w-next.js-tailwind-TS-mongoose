import { Input } from "../ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { upgradeToPremiumValidationSchema } from "@/lib/validation";
import { Button } from "../ui/button";
import { BsRocketTakeoffFill } from "react-icons/bs";
import z from "zod";
import { useState } from "react";
import { UpgradeUserToPremium } from "@/lib/actions/user.action";
import toast from "react-hot-toast";
import { BiLoaderCircle } from "react-icons/bi";
import { useUserStore } from "@/lib/zustand/userStore";

export default function UpgradeForm({
  set,
}: {
  set: (value: boolean) => void;
}) {
  const [loading, setLoading] = useState(false);
  const setUser = useUserStore((state) => state.setUser)
  const form = useForm({
    defaultValues: {
      code: "",
    },
    resolver: zodResolver(upgradeToPremiumValidationSchema),
  });

  const handelUpgrade = async (
    values: z.infer<typeof upgradeToPremiumValidationSchema>
  ) => {
    try {
      setLoading(true);

      const data = await UpgradeUserToPremium(values.code);
      if (!data.success) {
        toast.error(data.message);
        return;
      }

      setUser(data.user);
      set(false);
      toast.success(data.message);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handelUpgrade)}
        className="flex max-sm:flex-col sm:items-end gap-5"
      >
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel className="form-label">Enter your code</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="PREM-XXXX-XXXX-XXXX"
                  className="form-input"
                />
              </FormControl>
              <FormMessage className="form-msg" />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={loading} className="form-btn">
          {loading ? (
            <BiLoaderCircle className="animate-spin" />
          ) : (
            <>
              Upgrade <BsRocketTakeoffFill className="size-5" />
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
