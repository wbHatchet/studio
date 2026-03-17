
"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Target, 
  Video, 
  BarChart3, 
  Settings, 
  Radio,
  Layers,
  Search,
  CheckCircle2,
  TrendingUp,
  Zap,
  MessageSquare,
  Mic2,
  Share2,
  Network,
  Cpu,
  Flame,
  CreditCard,
  Play,
  Calculator,
  CalendarDays,
  Terminal,
  Server
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

const studioNav = [
  { title: "Dashboard", icon: LayoutDashboard, url: "/dashboard" },
];

const workspaceNav = [
  { title: "Job Queue", icon: Layers, url: "/projects", badge: "2" },
  { title: "Live Pipeline", icon: Zap, url: "/review" },
  { title: "AI Strategy Chat", icon: MessageSquare, url: "/chat" },
];

const growthNav = [
  { title: "Growth Agents", icon: Cpu, url: "/growth/lab" },
  { title: "Director Logic", icon: Terminal, url: "/growth/logic" },
  { title: "Niche Intel", icon: TrendingUp, url: "/strategy" },
  { title: "Revenue Calc", icon: Calculator, url: "/strategy/calculator" },
  { title: "Analytics", icon: BarChart3, url: "/analytics" },
];

const configNav = [
  { title: "API Keys", icon: Target, url: "/settings" },
  { title: "Tech Stack", icon: Server, url: "/settings/stack" },
  { title: "Billing", icon: CreditCard, url: "/settings" },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar variant="sidebar" collapsible="icon" className="bg-sidebar border-r border-border/50">
      <SidebarHeader className="p-4 border-b border-border/50">
        <div className="flex items-center gap-3 px-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-lg shadow-primary/20">
            <svg width="16" height="16" viewBox="0 0 18 18" fill="none" className="text-background"><path d="M9 2L3 7v9h12V7L9 2z" fill="currentColor" stroke="currentColor" strokeWidth="0.5"/><path d="M6 16v-6h6v6" fill="currentColor" opacity="0.4"/><circle cx="9" cy="7" r="1.5" fill="currentColor"/></svg>
          </div>
          <div className="flex flex-col group-data-[collapsible=icon]:hidden">
            <span className="font-headline font-bold text-sm leading-tight uppercase tracking-tight">
              AI Empire
            </span>
            <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">
              Full automation stack
            </span>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="px-2 pt-4">
        <div className="px-4 mb-4">
          <button className="w-full bg-primary text-primary-foreground font-bold uppercase text-[10px] py-2.5 rounded-lg flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-lg shadow-primary/10">
            <Play className="w-3 h-3 fill-current" /> New Project
          </button>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground font-bold text-[9px] tracking-widest uppercase px-4 py-2">Workspace</SidebarGroupLabel>
          <SidebarMenu>
            {studioNav.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild isActive={pathname === item.url} tooltip={item.title} className="h-9 rounded-lg">
                  <Link href={item.url}>
                    <item.icon className="h-4 w-4" />
                    <span className="font-medium text-[11px]">{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
            {workspaceNav.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild isActive={pathname === item.url} tooltip={item.title} className="h-9 rounded-lg relative">
                  <Link href={item.url}>
                    <item.icon className="h-4 w-4" />
                    <span className="font-medium text-[11px]">{item.title}</span>
                    {item.badge && (
                      <span className="absolute right-2 top-1/2 -translate-y-1/2 min-w-[15px] h-3.5 bg-red-500 text-white rounded-full text-[8px] font-bold flex items-center justify-center px-1">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground font-bold text-[9px] tracking-widest uppercase px-4 py-2">Growth</SidebarGroupLabel>
          <SidebarMenu>
            {growthNav.map((item) => (
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
          <SidebarGroupLabel className="text-muted-foreground font-bold text-[9px] tracking-widest uppercase px-4 py-2">Config</SidebarGroupLabel>
          <SidebarMenu>
            {configNav.map((item) => (
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
            <div className="h-1 w-full bg-border/50 rounded-full mt-1 overflow-hidden">
              <div className="h-full bg-primary w-[68%] rounded-full" />
            </div>
            <p className="text-[8px] text-muted-foreground mt-1 uppercase font-bold tracking-tighter">13.6K / 20K Credits</p>
          </div>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
