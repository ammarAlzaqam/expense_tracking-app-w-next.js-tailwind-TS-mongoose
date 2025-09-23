import Navbar from "@/components/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <Navbar />
      <main className="flex flex-col items-center px-6 sm:px-10 pb-32 md:pb-10 pt-28">
        <div className="w-full max-w-4xl">{children}</div>
      </main>
    </section>
  );
}
