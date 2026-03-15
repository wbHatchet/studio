
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
  Workflow, 
  ArrowRight, 
  Video as VideoIcon, 
  Cpu,
  Search,
  Target,
  Share2,
  Zap,
  Layers,
  Activity,
  Terminal
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
    { id: 3, name: "Niche Discovery Scan", status: "Scoring Trends", progress: 100, type: "Intelligence" },
    { id: 4, name: "Caption Synthesis", status: "Descript AI", progress: 15, type: "Assembly" },
  ];

  if (!isMounted) return null;

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <SidebarInset className="bg-background text-foreground">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b border-border/50 px-4 backdrop-blur-md bg-background/80 sticky top-0 z-50">
            <SidebarTrigger className="-ml-1" />
            <div className="h-4 w-px bg-border/50 mx-2" />
            <div className="flex flex-col">
              <h1 className="font-headline font-bold text-xl tracking-tight flex items-center gap-2">
                Autonomous Studio <span className="text-primary text-xs font-mono bg-primary/10 px-2 py-0.5 rounded-full border border-primary/20">v4.0.2</span>
              </h1>
              <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Revenue Scaling Loop: ACTIVE</span>
            </div>
            <div className="ml-auto flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-secondary/50 border border-border/50">
                <Activity className="w-3 h-3 text-green-500 animate-pulse" />
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Self-Learning: 92% Efficiency</span>
              </div>
              <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">Studio Network Enabled</Badge>
            </div>
          </header>
          
          <main className="flex-1 space-y-6 p-6 md:p-8 max-w-7xl mx-auto w-full">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <StatCard label="Network Views" value="12.8M" icon={TrendingUp} trend="24.2%" trendType="positive" />
              <StatCard label="Monthly Profit" value="$92.4K" icon={LineChart} trend="18.1%" trendType="positive" />
              <StatCard label="Niches Scanned" value="1,450" icon={Search} />
              <StatCard label="Automation Rate" value="99.6%" icon={Cpu} />
            </div>

            <Card className="bg-card border-primary/10 overflow-hidden shadow-2xl relative">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <Workflow className="w-64 h-64 -rotate-12" />
              </div>
              <CardHeader className="bg-primary/5 py-4 border-b border-primary/10">
                <CardTitle className="text-xs font-bold uppercase text-primary flex items-center gap-2">
                  <Workflow className="w-3 h-3" /> Autonomous Strategy-to-Revenue Loop
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-8 pb-10">
                <div className="flex flex-wrap items-center justify-between gap-8 px-4 relative">
                  <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent -translate-y-1/2 z-0 hidden lg:block" />
                  {[
                    { name: "Intelligence", status: "Trend Scan", icon: TrendingUp, active: true },
                    { name: "Discovery", status: "Niche Score", icon: Target, active: true },
                    { name: "Production", status: "AI Synthesis", icon: VideoIcon, active: true },
                    { name: "Assembly", status: "FFmpeg/Capcut", icon: Cpu, active: true },
                    { name: "Distribution", status: "Multi-Platform", icon: Share2, active: true },
                    { name: "Learning", status: "Analytics Loop", icon: BrainCircuit, active: true }
                  ].map((step, idx, arr) => (
                    <div key={step.name} className="flex items-center gap-4 relative z-10">
                      <div className={`flex flex-col items-center gap-3 transition-all duration-500 hover:scale-105 ${step.active ? 'scale-110' : 'opacity-50'}`}>
                        <div className={`p-5 rounded-2xl border transition-all ${step.active ? 'bg-primary/20 border-primary text-primary shadow-[0_0_30px_rgba(var(--primary),0.2)]' : 'bg-secondary/50 border-border text-muted-foreground'}`}>
                          <step.icon className="w-7 h-7" />
                        </div>
                        <div className="text-center">
                          <p className="text-[10px] font-bold uppercase tracking-tight">{step.name}</p>
                          <p className="text-[8px] text-muted-foreground uppercase font-mono">{step.status}</p>
                        </div>
                      </div>
                      {idx < arr.length - 1 && (
                        <div className="h-px w-6 bg-border/50 relative hidden xl:block">
                          <ArrowRight className="w-3 h-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary/30" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
              <Card className="lg:col-span-4 bg-card border-border/50 shadow-lg">
                <CardHeader>
                  <CardTitle className="font-headline text-lg flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    Network View Velocity
                  </CardTitle>
                  <CardDescription>Viral signals across 50 autonomous channels (Aggregated)</CardDescription>
                </CardHeader>
                <CardContent>
                  <PerformanceChart />
                </CardContent>
              </Card>

              <Card className="lg:col-span-3 bg-card border-border/50 shadow-lg flex flex-col">
                <CardHeader>
                  <CardTitle className="font-headline text-lg flex items-center gap-2">
                    <Terminal className="w-5 h-5 text-primary" />
                    Agent Orchestration
                  </CardTitle>
                  <CardDescription>Live execution status (Parallel AI Workers)</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 overflow-y-auto space-y-4 max-h-[350px] pr-2 custom-scrollbar">
                  {activeJobs.map((job) => (
                    <div key={job.id} className="group relative flex items-center justify-between p-4 rounded-xl bg-secondary/30 border border-border/50 hover:border-primary/30 transition-all hover:bg-secondary/50">
                      <div className="space-y-1">
                        <p className="text-sm font-bold group-hover:text-primary transition-colors">{job.name}</p>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-[10px] h-4 bg-primary/10 text-primary border-primary/20 px-1.5">{job.type}</Badge>
                          <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">{job.status}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-mono font-bold text-primary">{job.progress}%</span>
                        <div className="w-16 h-1 bg-secondary rounded-full mt-1 overflow-hidden">
                          <div className="h-full bg-primary transition-all duration-1000" style={{ width: `${job.progress}%` }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </main>
          
          <div className="sticky bottom-6 mx-6 md:mx-12 p-6 bg-primary text-primary-foreground rounded-3xl shadow-3xl flex flex-col md:flex-row items-center justify-between animate-in slide-in-from-bottom-12 duration-1000 border border-white/20 backdrop-blur-lg">
            <div className="flex items-center gap-5 mb-4 md:mb-0">
              <div className="p-4 bg-white/10 rounded-2xl border border-white/20 shadow-inner">
                <Zap className="w-8 h-8 fill-white/20" />
              </div>
              <div>
                <p className="font-bold text-lg font-headline tracking-tight">Intelligence Loop Update: Niche Exploding</p>
                <p className="text-xs opacity-80 italic max-w-lg">"Vintage Japanese Countryside Lo-Fi" view velocity increased by 142%. Auto-enqueuing 12 production batches for the Midnight Rain Mix channel.</p>
              </div>
            </div>
            <button className="px-10 py-4 bg-white text-primary text-sm font-bold rounded-2xl hover:shadow-2xl transition-all hover:scale-105 active:scale-95 border border-primary/20 flex items-center gap-2">
              <BrainCircuit className="w-4 h-4" /> Review Growth Plan
            </button>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

