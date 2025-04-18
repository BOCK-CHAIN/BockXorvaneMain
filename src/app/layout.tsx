import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { DM_Sans } from "next/font/google";
import {
  QueryClientProvider,
} from '@tanstack/react-query'
import queryclient from "@/lib/queryClient";
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import ConfigureAmplifyClientSide from "../utils/amplify-cognito-config";
import { Toaster } from "@/components/ui/sonner"

const font = DM_Sans({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Xorvane",
  description: "",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en suppressHydrationWarning">
      <body className={font.className}>
        <>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <QueryClientProvider client={queryclient}>
              <ConfigureAmplifyClientSide />
              {children}
              <Toaster richColors />
              {/* <ReactQueryDevtools initialIsOpen={false} /> */}
            </QueryClientProvider>
          </ThemeProvider>
        </>
      </body>
    </html>
  );
}
