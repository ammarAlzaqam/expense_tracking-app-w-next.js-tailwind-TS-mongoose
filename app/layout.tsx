import ThemeProvider from "@/components/providers/ThemeProvider";
import "./globals.css";
import ToasterProvider from "@/components/providers/ToasterProvider";
import ZustandProvider from "@/components/providers/ZustandProvider";

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
            <ZustandProvider>{children}</ZustandProvider>
          </ToasterProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
