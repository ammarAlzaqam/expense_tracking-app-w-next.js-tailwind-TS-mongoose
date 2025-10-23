import Sidebar from "@/components/bars/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      {children}
      <Sidebar />
    </section>
  );
}
