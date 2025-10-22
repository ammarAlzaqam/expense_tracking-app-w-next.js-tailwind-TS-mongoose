"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { VscClearAll } from "react-icons/vsc";

export default function ClearSelectionsButton() {
  const router = useRouter();

  const handleClear = () => {
    router.replace("/dashboard", { scroll: false }); 
  };

  return (
    <Button
      className="form-btn flex items-center gap-2"
      onClick={handleClear}
    >
      Clear <VscClearAll size={18} />
    </Button>
  );
}
