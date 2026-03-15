
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
  Repeat
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

const mainNav = [
  { title: "Dashboard", icon: LayoutDashboard, url: "/dashboard" },
  { title: "Niche Strategy", icon: Target, url: "/strategy" },
  { title: "Production Queue", icon: Layers, url: "/projects" },
];

const productionNav = [
  { title: "Music Curator", icon: Music, url: "/production/music" },
  { title: "Visuals Director", icon: Video, url: "/production/visuals" },
  { title: "SEO Optimizer", icon: Search, url: "/seo" },
  { title: "Review & Approval", icon: CheckCircle2, url: "/review" },
];

const growthNav = [
  { title: "Viral Signals", icon: TrendingUp, url: "/growth/signals" },
  { title: "Hook & Title Lab", icon: Zap, url: "/growth/lab" },
  { title: "Engagement Bot", icon: MessageSquare, url: "/growth/engagement" },
];

const analyticsNav = [
  { title: "Performance", icon: BarChart3, url: "/analytics" },
  { title: "Channels", icon: Radio, url: "/channels" },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar variant="sidebar" collapsible="icon" className="bg-sidebar border-r border-sidebar-border">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2 px-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Radio className="h-5 w-5" />
          </div>
          <span className="font-headline font-bold text-lg group-data-[collapsible=icon]:hidden">
            Lo-Fi Factory
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground font-semibold">MAIN</SidebarGroupLabel>
          <SidebarMenu>
            {mainNav.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.url}
                  tooltip={item.title}
                  className="hover:bg-sidebar-accent"
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
          <SidebarGroupLabel className="text-muted-foreground font-semibold">PRODUCTION</SidebarGroupLabel>
          <SidebarMenu>
            {productionNav.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.url}
                  tooltip={item.title}
                  className="hover:bg-sidebar-accent"
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
          <SidebarGroupLabel className="text-muted-foreground font-semibold">GROWTH AGENTS</SidebarGroupLabel>
          <SidebarMenu>
            {growthNav.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname.startsWith(item.url)}
                  tooltip={item.title}
                  className="hover:bg-sidebar-accent"
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
          <SidebarGroupLabel className="text-muted-foreground font-semibold">ANALYTICS</SidebarGroupLabel>
          <SidebarMenu>
            {analyticsNav.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.url}
                  tooltip={item.title}
                  className="hover:bg-sidebar-accent"
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
            <SidebarMenuButton asChild tooltip="Settings" className="hover:bg-sidebar-accent">
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
