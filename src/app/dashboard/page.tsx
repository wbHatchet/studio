
"use client";

import { useState, useEffect } from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { StatCard } from "@/components/dashboard/stat-card";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  LineChart, 
  BrainCircuit, 
  Radio, 
  Workflow, 
  Sparkles, 
  ArrowRight, 
  Video as VideoIcon, 
  CheckCircle2, 
  AlertCircle,
  Zap,
  Layers,
  Cpu,
  Rocket
} from "lucide-react";
import { PerformanceChart } from "@/components/analytics/performance-chart";

export default function DashboardPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const activeJobs = [
    { id: 1, name: "Drake R&B Batch #12", status: "FFmpeg Rendering", progress: 88, type: "Long Form" },
    { id: 2, name: "Viral Hook Variants", status: "Runway Gen-3", progress: 42, type: "Shorts" },
    { id: 3, name: "Clip Mining: TikTok", status: "Scraping Signals", progress: 100, type: "Research" },
  ];

  if (!isMounted) return null;

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <SidebarInset className="bg-background">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b border-border/50 px-4">
            <SidebarTrigger className="-ml-1" />
            <div className="h-4 w-px bg-border/50 mx-2" />
            <h1 className="font-headline font-bold text-xl">Factory Control Center v3.0</h1>
            <div className="ml-auto flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Agents Active (24)</span>
              </div>
              <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">Hidden Stack Enabled</Badge>
            </div>
          </header>
          
          <main className="flex-1 space-y-6 p-6 md:p-8">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <StatCard label="Factory Output" value="1,240" icon={Layers} trend="12.5%" trendType="positive" />
              <StatCard label="Monthly Profit" value="$14.2K" icon={LineChart} trend="8.4%" trendType="positive" />
              <StatCard label="Automation Rate" value="98.2%" icon={Cpu} />
              <StatCard label="Hook Retention" value="84%" icon={Zap} trend="4%" trendType="positive" />
            </div>

            <Card className="bg-card border-primary/10 overflow-hidden">
              <CardHeader className="bg-primary/5 py-3">
                <CardTitle className="text-xs font-bold uppercase text-primary flex items-center gap-2">
                  <Workflow className="w-3 h-3" /> Autonomous Production Pipeline
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 pb-8">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  {[
                    { name: "Mine", status: "Active", icon: Sparkles, active: true },
                    { name: "Script", status: "Active", icon: BrainCircuit, active: true },
                    { name: "Voice", status: "Active", icon: Radio, active: true },
                    { name: "Visuals", status: "Active", icon: VideoIcon, active: true },
                    { name: "Assemble", status: "Active", icon: Cpu, active: true },
                    { name: "Publish", status: "Ready", icon: CheckCircle2, active: false }
                  ].map((step, idx, arr) => (
                    <div key={step.name} className="flex items-center gap-4">
                      <div className={`flex flex-col items-center gap-2 group transition-all ${step.active ? 'scale-110' : 'opacity-50'}`}>
                        <div className={`p-3 rounded-2xl border ${step.active ? 'bg-primary/20 border-primary text-primary shadow-[0_0_15px_rgba(var(--primary),0.3)]' : 'bg-secondary/50 border-border text-muted-foreground'}`}>
                          <step.icon className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-bold uppercase">{step.name}</span>
                      </div>
                      {idx < arr.length - 1 && (
                        <ArrowRight className="w-4 h-4 text-border" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
              <Card className="lg:col-span-4 bg-card">
                <CardHeader>
                  <CardTitle className="font-headline">Algorithm Performance</CardTitle>
                  <CardDescription>Network-wide engagement trends across 30 channels</CardDescription>
                </CardHeader>
                <CardContent>
                  <PerformanceChart />
                </CardContent>
              </Card>

              <Card className="lg:col-span-3 bg-card">
                <CardHeader>
                  <CardTitle className="font-headline">Live Job Queue</CardTitle>
                  <CardDescription>Server activity (FFmpeg & AI Video)</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {activeJobs.map((job) => (
                      <div key={job.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 border border-border/50">
                        <div className="space-y-1">
                          <p className="text-sm font-semibold">{job.name}</p>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-[10px] h-4 bg-primary/10 text-primary border-primary/20">{job.type}</Badge>
                            <span className="text-xs text-muted-foreground">{job.status}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-bold text-primary">{job.progress}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
          
          <div className="sticky bottom-4 mx-6 p-4 bg-primary text-primary-foreground rounded-2xl shadow-xl flex items-center justify-between animate-in slide-in-from-bottom-8 duration-500">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-full">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-sm">Action Needed: 42 Videos Pending Approval</p>
                <p className="text-xs opacity-90">Daily production batch is ready for final quality check.</p>
              </div>
            </div>
            <button className="px-6 py-2 bg-white text-primary text-sm font-bold rounded-lg hover:bg-opacity-90 transition-all">
              Launch Bulk Approver
            </button>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
