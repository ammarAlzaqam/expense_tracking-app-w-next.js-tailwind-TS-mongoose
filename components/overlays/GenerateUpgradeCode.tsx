import { createPremiumCode } from "@/lib/actions/user.action";
import { useUserStore } from "@/lib/zustand/userStore";
import { useState } from "react";
import toast from "react-hot-toast";
import { RiAiGenerateText } from "react-icons/ri";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

export default function GenerateUpgradeCode() {
  const [open, set] = useState(false);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const user = useUserStore((state) => state.user);

  const generateHandler = async () => {
    try {
      setLoading(true);
      if (!user?.admin) {
        toast.error("Forbidden");
        return;
      }

      const data = await createPremiumCode();
      if (!data.success) {
        toast.error(data.message);
        return;
      }

      setCode(data.code);
      toast.success(data.message);
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
      set(true);
    }
  };

  return (
    <>
      {open && (
        <div
          onClick={() => set(false)}
          className="z-[100] fixed inset-0 backdrop-blur-md bg-dark-1/60 flex items-center justify-center px-3 sm:px-10 py-5"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-xl space-y-8 p-5 bg-dark-3 rounded-md"
          >
            <h2 className="text-heading3 sm:text-heading1 text-light-1">
              Generated Code
            </h2>
            <p>{code}</p>
          </div>
        </div>
      )}

      <Button
        disabled={loading}
        onClick={generateHandler}
        className="flex items-center gap-2 bg-dark-2 px-2 sm:px-3 py-1 max-sm:inset-shadow-sm max-sm:inset-shadow-primary-800/20 rounded-full border border-gray-1 cursor-pointer hover:bg-gray-1"
      >
        <RiAiGenerateText
          className={cn(
            "size-5 text-primary-500 cursor-pointer",
            loading && "animate-caret-blink"
          )}
        />
      </Button>
    </>
  );
}
