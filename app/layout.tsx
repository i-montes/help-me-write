// This is the root layout component for your Next.js app.
// Learn more: https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#root-layout-required
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";
import { Button } from "@/components/ui/button";

const fontHeading = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
});

const fontBody = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn("antialiased", fontHeading.variable, fontBody.variable)}
      >
        <div className="min-h-screen bg-black text-white p-4">
          <header className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-2">
              <img src="/logo.png" alt="AiHub.sh" className="w-8 h-8" />
              <span className="text-2xl font-bold">Aihub.sh</span>
            </div>
            <nav className="flex space-x-4">
              <Button className="bg-[#009E5B] hover:bg-[] text-white">Login</Button>
            </nav>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
