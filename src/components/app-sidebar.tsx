"use client";

import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  UsersIcon,
} from "lucide-react";
import * as React from "react";

import { ChurchSwitcher } from "@/components/church-switcher";
import { NavDepartments } from "@/components/nav-departments";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { SessionProvider } from "next-auth/react";

// This is sample data.
const data = {
  teams: [
    {
      name: "ICC Lyon",
      logo: Command,
      plan: "Campus",
    },
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Eglise de maison",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Famille connectée",
    },
  ],
  navMain: [
    {
      title: "Membres",
      url: "#",
      icon: UsersIcon,
      isActive: true,
      items: [
        {
          title: "Tous",
          url: "#",
        },
        {
          title: "STAR",
          url: "#",
        },
        {
          title: "Réglages",
          url: "#",
        },
      ],
    },
    {
      title: "Mes Suivis",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Nouveau Rapport de Suivi",
          url: "#",
        },
        {
          title: "Mes Rapports",
          url: "#",
        },
        {
          title: "Tous",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Réglages",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SessionProvider>
        <SidebarHeader>
          <ChurchSwitcher />
        </SidebarHeader>
        <SidebarContent>
          <NavMain items={data.navMain} />
          <NavDepartments departments={data.projects} />
        </SidebarContent>
        <SidebarFooter>
          <NavUser />
        </SidebarFooter>
      </SessionProvider>
      <SidebarRail />
    </Sidebar>
  );
}
