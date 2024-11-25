import { AppSidebar } from "@/components/app-sidebar";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
        <Footer />
      </SidebarInset>
    </SidebarProvider>
  );
}
