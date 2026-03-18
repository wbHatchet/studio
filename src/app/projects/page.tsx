"use client";

import { useState } from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, MoreVertical, Layers, Search, Monitor } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { cn } from "@/lib/utils";

const JOBS = [
  { id: '1', title: 'Halloween Lofi · 2hr', niche: 'Halloween', status: 'Approval', progress: 92, time: 'jb_8f3k2x' },
  { id: '2', title: 'Ghibli Forest · 1hr', niche: 'Ghibli', status: 'Running', progress: 54, time: 'jb_9s2l1p', pulse: true },
  { id: '3', title: 'Tokyo Night · 1hr', niche: 'Tokyo', status: 'Done', progress: 100, time: 'jb_4m0q7z' },
  { id: '4', title: 'Winter Cozy · 3hr', niche: 'Winter', status: 'Pending', progress: 0, time: 'jb_1v5x2y' },
];

export default function ProjectsPage() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        <SidebarInset className="bg-background">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b border-border/50 px-4">
            <SidebarTrigger className="-ml-1" />
            <div className="h-4 w-px bg-border/50 mx-2" />
            <div className="flex-1">
              <h1 className="font-headline font-bold text-xl tracking-tight text-primary">Job Queue</h1>
              <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest italic">4 total jobs</p>
            </div>
            <Link href="/projects/new">
              <Button size="sm" className="bg-primary text-primary-foreground font-bold uppercase text-[10px] px-4">
                <Plus className="w-3 h-3 mr-2" /> New Project
              </Button>
            </Link>
          </header>

          <main className="p-6 md:p-8 space-y-6 max-w-6xl mx-auto w-full">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 px-4 py-1 uppercase text-[10px]">All (4)</Badge>
              <Badge variant="outline" className="px-4 py-1 uppercase text-[10px] border-border/50 text-muted-foreground">Running (1)</Badge>
              <Badge variant="outline" className="px-4 py-1 uppercase text-[10px] border-border/50 text-muted-foreground">Approval (1)</Badge>
              <Badge variant="outline" className="px-4 py-1 uppercase text-[10px] border-border/50 text-muted-foreground">Done (1)</Badge>
            </div>

            <Card className="bg-card border-border/50 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-secondary/30 border-b border-border/50 text-[10px] uppercase font-bold text-muted-foreground tracking-widest">
                      <th className="px-6 py-4 text-left font-bold">Title</th>
                      <th className="px-6 py-4 text-left font-bold">Niche</th>
                      <th className="px-6 py-4 text-left font-bold">Status</th>
                      <th className="px-6 py-4 text-left font-bold">Progress</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    {JOBS.map((job) => (
                      <tr key={job.id} className="group hover:bg-secondary/10 transition-colors cursor-pointer" onClick={() => window.location.href = '/review'}>
                        <td className="px-6 py-4 font-bold">{job.title}</td>
                        <td className="px-6 py-4 text-muted-foreground">{job.niche}</td>
                        <td className="px-6 py-4">
                          <StatusBadge status={job.status} pulse={job.pulse} />
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <Progress value={job.progress} className="h-1 w-20 bg-secondary" />
                            <span className="text-[10px] font-bold font-mono">{job.progress}%</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

function StatusBadge({ status, pulse }: any) {
  const variants = {
    Approval: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    Running: "bg-primary/10 text-primary border-primary/20",
    Done: "bg-green-500/10 text-green-500 border-green-500/20",
    Pending: "bg-secondary text-muted-foreground",
  } as any;

  return (
    <div className={cn(
      "inline-flex items-center px-2 py-0.5 rounded-full border text-[9px] font-bold uppercase",
      variants[status] || variants.Pending,
      pulse && "animate-pulse"
    )}>
      {status}
    </div>
  );
}