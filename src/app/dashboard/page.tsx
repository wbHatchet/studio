
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
  Activity,
  Terminal,
  Layers,
  Server,
  Network,
  Database
} from "lucide-react";
import { PerformanceChart } from "@/components/analytics/performance-chart";

export default function DashboardPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const renderCluster = Array.from({ length: 48 }, (_, i) => ({
    id: i + 1,
    status: Math.random() > 0.1 ? "Running" : "Idle",
    load: Math.floor(Math.random() * 100),
    task: ["FFmpeg", "Runway", "ElevenLabs", "Scraper"][Math.floor(Math.random() * 4)]
  }));

  const activeJobs = [
    { id: 1, name: "Drake R&B Batch #12", status: "FFmpeg Render Grid", progress: 88, type: "Long Form", node: "NODE-42" },
    { id: 2, name: "Viral Hook Variants", status: "Runway Gen-3 Synthesis", progress: 42, type: "Shorts", node: "NODE-08" },
    { id: 3, name: "Network Trend Scan", status: "Vector Search Ingest", progress: 100, type: "Intelligence", node: "NODE-15" },
    { id: 4, name: "Multi-Platform Sync", status: "Repurpose.io API", progress: 15, type: "Distribution", node: "NODE-31" },
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
                Ultra-Scale Factory <span className="text-primary text-xs font-mono bg-primary/10 px-2 py-0.5 rounded-full border border-primary/20">v5.0.0</span>
              </h1>
              <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest text-primary">Global Network Scale: 124 CHANNELS ACTIVE</span>
            </div>
            <div className="ml-auto flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-secondary/50 border border-border/50">
                <Network className="w-3 h-3 text-green-500 animate-pulse" />
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">K8s Cluster Node: Active</span>
              </div>
              <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">Enterprise Grid Enabled</Badge>
            </div>
          </header>
          
          <main className="flex-1 space-y-6 p-6 md:p-8 max-w-7xl mx-auto w-full">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <StatCard label="Daily Factory Output" value="1,240" icon={Layers} trend="12.5%" trendType="positive" />
              <StatCard label="Global Network Views" value="84.2M" icon={TrendingUp} trend="24.2%" trendType="positive" />
              <StatCard label="Monthly Profit (Est)" value="$412.8K" icon={LineChart} trend="18.1%" trendType="positive" />
              <StatCard label="Automation Efficiency" value="99.8%" icon={Cpu} />
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              <Card className="lg:col-span-2 bg-card border-primary/10 overflow-hidden shadow-2xl relative">
                <div className="absolute top-0 right-0 p-4 opacity-5">
                  <Workflow className="w-64 h-64 -rotate-12" />
                </div>
                <CardHeader className="bg-primary/5 py-4 border-b border-primary/10">
                  <CardTitle className="text-xs font-bold uppercase text-primary flex items-center gap-2">
                    <Workflow className="w-3 h-3" /> Autonomous Self-Learning Strategy Loop
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-8 pb-10">
                  <div className="flex flex-wrap items-center justify-between gap-6 px-4 relative">
                    {[
                      { name: "Intelligence", status: "Trend Scan", icon: TrendingUp },
                      { name: "Discovery", status: "Niche Score", icon: Target },
                      { name: "Production", status: "AI Synthesis", icon: VideoIcon },
                      { name: "Grid Render", status: "FFmpeg Grid", icon: Server },
                      { name: "Distribution", status: "Multi-CH Sync", icon: Share2 },
                      { name: "Learning", status: "Vector Update", icon: Database }
                    ].map((step, idx, arr) => (
                      <div key={step.name} className="flex items-center gap-4 relative z-10">
                        <div className="flex flex-col items-center gap-3 transition-all duration-500 hover:scale-105 scale-110">
                          <div className="p-4 rounded-2xl border bg-primary/20 border-primary text-primary shadow-[0_0_30px_rgba(var(--primary),0.2)]">
                            <step.icon className="w-6 h-6" />
                          </div>
                          <div className="text-center">
                            <p className="text-[10px] font-bold uppercase tracking-tight">{step.name}</p>
                            <p className="text-[8px] text-muted-foreground uppercase font-mono">{step.status}</p>
                          </div>
                        </div>
                        {idx < arr.length - 1 && (
                          <ArrowRight className="w-3 h-3 text-primary/30 hidden xl:block" />
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border/50 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-sm font-bold uppercase flex items-center gap-2">
                    <Server className="w-4 h-4 text-primary" /> FFmpeg Distributed Render Cluster
                  </CardTitle>
                  <CardDescription>Live status of 50 parallel nodes (Docker/K8s)</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-6 gap-1">
                    {renderCluster.map((node) => (
                      <div 
                        key={node.id} 
                        className={`aspect-square rounded-sm border flex flex-col items-center justify-center gap-0.5 transition-all ${
                          node.status === "Running" ? "bg-green-500/10 border-green-500/30 text-green-500" : "bg-secondary border-border text-muted-foreground"
                        }`}
                      >
                        <span className="text-[6px] font-bold uppercase">N{node.id}</span>
                        {node.status === "Running" && <span className="text-[5px] uppercase font-mono font-bold">{node.load}%</span>}
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-border/50 flex items-center justify-between text-[10px] uppercase font-bold text-muted-foreground">
                    <span>Active Clusters: 04</span>
                    <span className="text-primary">1,000+ vids/day target</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
              <Card className="lg:col-span-4 bg-card border-border/50 shadow-lg">
                <CardHeader>
                  <CardTitle className="font-headline text-lg flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    Network Velocity Matrix
                  </CardTitle>
                  <CardDescription>Aggregated performance across 124 autonomous channels</CardDescription>
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
                  <CardDescription>K8s Job Queue (Vector DB Integrated)</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 overflow-y-auto space-y-4 max-h-[350px] pr-2 custom-scrollbar">
                  {activeJobs.map((job) => (
                    <div key={job.id} className="group relative flex items-center justify-between p-4 rounded-xl bg-secondary/30 border border-border/50 hover:border-primary/30 transition-all hover:bg-secondary/50">
                      <div className="space-y-1">
                        <p className="text-sm font-bold group-hover:text-primary transition-colors">{job.name}</p>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-[10px] h-4 bg-primary/10 text-primary border-primary/20 px-1.5">{job.type}</Badge>
                          <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">{job.status}</span>
                          <span className="text-[10px] font-mono text-primary font-bold">{job.node}</span>
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
                <p className="font-bold text-lg font-headline tracking-tight">Factory Alert: Grid Capacity Scaled</p>
                <p className="text-xs opacity-80 italic max-w-lg">"50 parallel FFmpeg nodes active. Current throughput: 1,240 videos/day. Cluster health: 99.8%."</p>
              </div>
            </div>
            <button className="px-10 py-4 bg-white text-primary text-sm font-bold rounded-2xl hover:shadow-2xl transition-all hover:scale-105 active:scale-95 border border-primary/20 flex items-center gap-2">
              <Server className="w-4 h-4" /> Manage Grid Clusters
            </button>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
