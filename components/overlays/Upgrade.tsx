import { X } from "lucide-react";
import { useState } from "react";
import { MdAttachMoney } from "react-icons/md";
import UpgradeForm from "../forms/UpgradeForm";

export default function Upgrade() {
  const [open, set] = useState(false);

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
              Upgrade to Premium
            </h2>

            <UpgradeForm set={set} />
          </div>
        </div>
      )}

      <button
        onClick={() => set(true)}
        className="flex items-center gap-2 bg-dark-2 px-2 sm:px-3 py-1 max-sm:inset-shadow-sm max-sm:inset-shadow-primary-800/20 rounded-full border border-gray-1 cursor-pointer hover:bg-gray-1"
      >
        <span className="max-sm:hidden text-small text-shadow-md text-shadow-primary-500/50">
          Upgrade
        </span>
        <MdAttachMoney className="size-5 text-primary-800" />
      </button>
    </>
  );
}
