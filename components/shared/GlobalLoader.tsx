import { FerrisWheel, LucideFerrisWheel, LucideShipWheel } from "lucide-react";

export default function GlobalLoader() {
  return (
    <section className="fixed top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%]">
      <LucideShipWheel className="animate-spin text-light-1 size-20" />
    </section>
  );
}
