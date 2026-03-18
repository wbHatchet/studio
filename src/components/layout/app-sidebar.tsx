"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Layers, 
  Radio, 
  Cpu, 
  TrendingUp, 
  Calculator, 
  BarChart3, 
  Settings, 
  CreditCard, 
  ShieldCheck, 
  Play, 
  LogOut,
  Zap,
  MessageSquare,
  Key,
  DollarSign,
  Plus,
  Monitor
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useAuth } from "@/firebase";
import { signOut } from "firebase/auth";

const mainNav = [
  { title: "Dashboard", icon: LayoutDashboard, url: "/dashboard" },
  { title: "New Project", icon: Plus, url: "/projects/new" },
  { title: "Job Queue", icon: Layers, url: "/projects" },
  { title: "Live Pipeline", icon: Monitor, url: "/review" },
  { title: "Channels", icon: Radio, url: "/channels" },
];

const analyticsNav = [
  { title: "Analytics", icon: BarChart3, url: "/analytics" },
  { title: "Revenue", icon: DollarSign, url: "/monetization" },
  { title: "Settings", icon: Settings, url: "/settings" },
];

export function AppSidebar() {
  const pathname = usePathname();
  const auth = useAuth();

  return (
    <Sidebar variant="sidebar" collapsible="icon" className="bg-sidebar border-r border-border/50">
      <SidebarHeader className="p-4 border-b border-border/50">
        <div className="flex items-center gap-3 px-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-lg shadow-primary/20">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5"><path d="M8 2v6M5 5l3-3 3 3M4 10a4 4 0 0 0 8 0"/></svg>
          </div>
          <div className="flex flex-col group-data-[collapsible=icon]:hidden">
            <span className="font-headline font-bold text-sm leading-tight uppercase tracking-tight">
              Lofi Factory
            </span>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="px-2 pt-4">
        <div className="px-4 mb-4">
          <Link href="/projects/new">
            <button className="w-full bg-primary text-primary-foreground font-bold uppercase text-[10px] py-2.5 rounded-lg flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-lg shadow-primary/10">
              <Plus className="w-3 h-3" /> New Project
            </button>
          </Link>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground font-bold text-[9px] tracking-widest uppercase px-4 py-2">Main</SidebarGroupLabel>
          <SidebarMenu>
            {mainNav.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild isActive={pathname === item.url} tooltip={item.title} className="h-9 rounded-lg">
                  <Link href={item.url}>
                    <item.icon className="h-4 w-4" />
                    <span className="font-medium text-[11px]">{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground font-bold text-[9px] tracking-widest uppercase px-4 py-2">Analytics</SidebarGroupLabel>
          <SidebarMenu>
            {analyticsNav.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild isActive={pathname === item.url} tooltip={item.title} className="h-9 rounded-lg">
                  <Link href={item.url}>
                    <item.icon className="h-4 w-4" />
                    <span className="font-medium text-[11px]">{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-border/50">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center text-[10px] font-bold text-foreground shrink-0 border border-border/50">U</div>
          <div className="flex-1 min-w-0 group-data-[collapsible=icon]:hidden">
            <p className="text-[10px] font-bold text-foreground truncate uppercase">Your Account</p>
            <p className="text-[8px] text-muted-foreground uppercase font-bold tracking-tighter">Free Plan</p>
          </div>
          <button 
            onClick={() => signOut(auth)}
            className="p-1.5 rounded-lg hover:bg-secondary text-muted-foreground group-data-[collapsible=icon]:hidden"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}