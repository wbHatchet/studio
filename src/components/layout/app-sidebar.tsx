
"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Target, 
  Music, 
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
  Workflow
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
  { title: "Control Center", icon: LayoutDashboard, url: "/dashboard" },
];

const intelligenceNav = [
  { title: "Trend Intelligence", icon: TrendingUp, url: "/growth/signals" },
  { title: "Niche Discovery", icon: Target, url: "/strategy" },
];

const productionNav = [
  { title: "Production Queue", icon: Layers, url: "/projects" },
  { title: "Voice Architect", icon: Mic2, url: "/production/voice" },
  { title: "Music Curator", icon: Music, url: "/production/music" },
  { title: "Visuals Director", icon: Video, url: "/production/visuals" },
  { title: "SEO Optimizer", icon: Search, url: "/seo" },
  { title: "Approval Gate", icon: CheckCircle2, url: "/review" },
];

const growthNav = [
  { title: "Hook & Title Lab", icon: Zap, url: "/growth/lab" },
  { title: "Repurposing Engine", icon: Share2, url: "/growth/repurpose" },
  { title: "Engagement Bot", icon: MessageSquare, url: "/growth/engagement" },
];

const analyticsNav = [
  { title: "Self-Learning Stats", icon: BarChart3, url: "/analytics" },
  { title: "Channel Network", icon: Radio, url: "/channels" },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar variant="sidebar" collapsible="icon" className="bg-sidebar border-r border-sidebar-border">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3 px-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20 border border-primary/30">
            <Workflow className="h-6 w-6" />
          </div>
          <div className="flex flex-col group-data-[collapsible=icon]:hidden">
            <span className="font-headline font-bold text-base leading-tight">
              Studio Factory
            </span>
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
              Autonomous v4.0
            </span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarMenu>
            {studioNav.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.url}
                  tooltip={item.title}
                  className="h-10 rounded-xl"
                >
                  <Link href={item.url}>
                    <item.icon className="h-4 w-4" />
                    <span className="font-medium">{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground font-bold text-[10px] tracking-widest uppercase px-4 py-3">Intelligence</SidebarGroupLabel>
          <SidebarMenu>
            {intelligenceNav.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.url}
                  tooltip={item.title}
                  className="h-10 rounded-xl"
                >
                  <Link href={item.url}>
                    <item.icon className="h-4 w-4" />
                    <span className="font-medium">{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground font-bold text-[10px] tracking-widest uppercase px-4 py-3">Production</SidebarGroupLabel>
          <SidebarMenu>
            {productionNav.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.url}
                  tooltip={item.title}
                  className="h-10 rounded-xl"
                >
                  <Link href={item.url}>
                    <item.icon className="h-4 w-4" />
                    <span className="font-medium">{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground font-bold text-[10px] tracking-widest uppercase px-4 py-3">Growth</SidebarGroupLabel>
          <SidebarMenu>
            {growthNav.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname.startsWith(item.url)}
                  tooltip={item.title}
                  className="h-10 rounded-xl"
                >
                  <Link href={item.url}>
                    <item.icon className="h-4 w-4" />
                    <span className="font-medium">{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground font-bold text-[10px] tracking-widest uppercase px-4 py-3">Analytics</SidebarGroupLabel>
          <SidebarMenu>
            {analyticsNav.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.url}
                  tooltip={item.title}
                  className="h-10 rounded-xl"
                >
                  <Link href={item.url}>
                    <item.icon className="h-4 w-4" />
                    <span className="font-medium">{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Settings" className="h-10 rounded-xl hover:bg-sidebar-accent">
              <Link href="/settings">
                <Settings className="h-4 w-4" />
                <span className="font-medium">Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
