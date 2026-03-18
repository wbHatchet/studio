"use client";

import { useState, useEffect } from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, CheckCircle2, Clock, AlertTriangle, Monitor, TrendingUp, Radio, Layers, Video } from "lucide-react";
import { PerformanceChart } from "@/components/analytics/performance-chart";
import Link from "next/link";

export default function DashboardPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        <SidebarInset className="bg-background">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b border-border/50 px-4">
            <SidebarTrigger className="-ml-1" />
            <div className="h-4 w-px bg-border/50 mx-2" />
            <div className="flex-1">
              <h1 className="font-headline font-bold text-xl tracking-tight text-primary">Dashboard</h1>
              <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest italic">Lofi factory overview</p>
            </div>
          </header>
          
          <main className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto w-full">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <MetricCard label="Channels" value="3" trend="+1 this week" trendUp />
              <MetricCard label="Videos Uploaded" value="24" trend="+8 this month" trendUp />
              <MetricCard label="Total Views" value="142K" trend="+28K vs last month" trendUp />
              <MetricCard label="Active Jobs" value="1" trend="Right now" />
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-6">
                <Card className="bg-card border-border/50 shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Views this week</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <PerformanceChart />
                  </CardContent>
                </Card>

                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold text-amber-500">Halloween Lofi — ready for review</p>
                    <p className="text-[10px] text-muted-foreground">All 13 agents complete. Approve to publish to YouTube.</p>
                  </div>
                  <Link href="/review">
                    <Button size="sm" className="bg-primary text-primary-foreground font-bold uppercase text-[10px]">Review Now</Button>
                  </Link>
                </div>
              </div>

              <Card className="bg-card border-border/50 shadow-sm overflow-hidden h-fit">
                <CardHeader className="pb-4">
                  <CardTitle className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Recent Jobs</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y divide-border/50">
                    <RecentJobRow title="Tokyo Night Lofi · 1hr" status="Done" statusType="success" time="Uploaded 2 days ago" />
                    <RecentJobRow title="Halloween Lofi · 2hr" status="Approval" statusType="warning" time="Awaiting approval" />
                    <RecentJobRow title="Ghibli Forest Lofi · 1hr" status="Running" statusType="primary" time="Running now" pulse />
                    <RecentJobRow title="Winter Cozy Lofi · 3hr" status="Pending" statusType="muted" time="Queued" />
                  </div>
                  <div className="p-4 bg-secondary/10">
                    <Link href="/projects/new">
                      <Button variant="outline" className="w-full text-[10px] uppercase font-bold h-9 border-border/50">
                        <Plus className="w-3 h-3 mr-2" /> New Project
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

function MetricCard({ label, value, trend, trendUp }: any) {
  return (
    <Card className="bg-secondary/30 border-border/50 p-4">
      <p className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest mb-1">{label}</p>
      <div className="text-2xl font-bold">{value}</div>
      <p className={cn("text-[9px] font-bold mt-1 uppercase", trendUp ? "text-green-500" : "text-muted-foreground")}>
        {trend}
      </p>
    </Card>
  );
}

function RecentJobRow({ title, status, statusType, time, pulse }: any) {
  const statusColors = {
    success: "bg-green-500",
    warning: "bg-amber-500",
    primary: "bg-primary",
    muted: "bg-muted-foreground",
  } as any;

  const badgeColors = {
    success: "bg-green-500/10 text-green-500 border-green-500/20",
    warning: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    primary: "bg-primary/10 text-primary border-primary/20",
    muted: "bg-secondary text-muted-foreground",
  } as any;

  return (
    <div className="flex items-center gap-3 p-4 hover:bg-secondary/20 transition-colors">
      <div className={cn("w-1.5 h-1.5 rounded-full shrink-0", statusColors[statusType], pulse && "animate-pulse")} />
      <div className="flex-1 min-w-0">
        <p className="text-xs font-bold truncate">{title}</p>
        <p className="text-[9px] text-muted-foreground uppercase">{time}</p>
      </div>
      <Badge variant="outline" className={cn("text-[8px] uppercase font-bold", badgeColors[statusType])}>
        {status}
      </Badge>
    </div>
  );
}