import Bottombar from "@/components/bars/Bottombar";
import Topbar from "@/components/bars/Topbar";
import ZustandProvider from "@/components/providers/ZustandProvider";
import { fetchAllCategories } from "@/lib/actions/category.action";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await fetchAllCategories();
  const headerStore = await headers();
  return (
    <ZustandProvider categories={JSON.parse(JSON.stringify(categories))}>
      <Topbar />
      <main className="flex flex-col items-center px-3 sm:px-10 pb-32 md:pb-10 pt-28">
        <div className="w-full max-w-4xl">{children}</div>
      </main>
      <Bottombar />
    </ZustandProvider>
  );
}
