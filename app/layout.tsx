import ThemeProvider from "@/components/providers/ThemeProvider";
import "./globals.css";
import ToasterProvider from "@/components/providers/ToasterProvider";

export const metadata = {
  title: "expense tracker",
  description: "ابراهيم وبراء",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  return (
    <html lang="en" className="dark bg-dark-1 text-light-1">
      <body>
        <ThemeProvider>
          <ToasterProvider>{children}</ToasterProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
