import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/components/providers/react-query-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ModeToggle } from "@/components/theme-toggle";
import { Github } from "lucide-react";
import { Button } from "@/components/ui/button";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "YouTube Live Views",
  description: "Track YouTube views in real-time",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <QueryProvider>
        <body
          className={
            inter.className + "flex h-screen w-screen overflow-x-hidden"
          }
        >
          <ThemeProvider
            defaultTheme="system"
            attribute="class"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex h-full w-full flex-col items-center">
              <header className="flex h-[100px] w-full flex-shrink-0 items-center justify-between px-8">
                <h1 className="text-2xl font-semibold">YT Live views</h1>
                <div className="flex gap-2">
                  <ModeToggle />
                  <a href="https://github.com/anuraglodhi/yt-live-views">
                    <Button variant="outline" className="aspect-square p-2">
                      <Github className="text-lg" />
                    </Button>
                  </a>
                </div>
              </header>
              {children}
            </div>
          </ThemeProvider>
        </body>
      </QueryProvider>
    </html>
  );
}
