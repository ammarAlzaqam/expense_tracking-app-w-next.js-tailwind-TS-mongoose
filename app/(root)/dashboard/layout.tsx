import DashboardSidebar from "@/components/bars/DashboardSidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <DashboardSidebar />

      <div className="mt-7">{children}</div>
    </section>
  );
}
