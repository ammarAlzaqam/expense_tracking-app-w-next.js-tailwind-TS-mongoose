import ThemeProvider from "@/components/providers/ThemeProvider";
import "./globals.css";
import ToasterProvider from "@/components/providers/ToasterProvider";

export const metadata = {
  title: "expense tracker",
  description: "expense tracking app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-dark-1 text-light-1">
      <body>
        <ThemeProvider>
          <ToasterProvider>
            {children}
          </ToasterProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
