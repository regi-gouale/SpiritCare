import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import type { Metadata } from "next";
import { Epilogue, Lato } from "next/font/google";
import "./globals.css";

const lato = Lato({
  weight: ["400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-lato",
});
const epilogue = Epilogue({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-epilogue",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal?: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${lato.variable} ${epilogue.variable} antialiased`}>
        {/* <SidebarProvider> */}
        {/* <Header /> */}
        <TooltipProvider>
          {modal}
          {children}
          <Toaster />
        </TooltipProvider>

        {/* <Footer /> */}
        {/* </SidebarProvider> */}
      </body>
    </html>
  );
}
