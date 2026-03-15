"use client";

import { useState, useEffect } from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { StatCard } from "@/components/dashboard/stat-card";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { 
  TrendingUp, 
  LineChart, 
  BrainCircuit, 
  Workflow, 
  ArrowRight, 
  Video as VideoIcon, 
  Cpu,
  Target,
  Share2,
  Zap,
  Terminal,
  Layers,
  Server,
  Network,
  Database,
  DollarSign,
  Radio,
  Flame,
  Star
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

  const nicheStack = [
    { name: "AI Tools", status: "Scaling", growth: "+124%", color: "text-blue-400" },
    { name: "Body Facts", status: "Active", growth: "+85%", color: "text-red-400" },
    { name: "Luxury Life", status: "Trending", growth: "+210%", color: "text-amber-400" },
    { name: "Psychology", status: "Stable", growth: "+42%", color: "text-purple-400" },
    { name: "History", status: "Warming", growth: "+12%", color: "text-orange-400" },
    { name: "Food hacks", status: "Viral", growth: "+450%", color: "text-green-400" },
    { name: "Before/After", status: "Scaling", growth: "+92%", color: "text-pink-400" }
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
              <h1 className="font-headline font-bold text-xl tracking-tight flex items-center gap-2 text-primary">
                Cash-Cow Factory <span className="text-foreground text-xs font-mono bg-primary/10 px-2 py-0.5 rounded-full border border-primary/20">v5.5.0 (2026 Strategy)</span>
              </h1>
              <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest text-primary flex items-center gap-2">
                <Flame className="w-3 h-3 text-orange-500" /> Global Network Scale: 7-NICHE STACK ACTIVE
              </span>
            </div>
            <div className="ml-auto flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-secondary/50 border border-border/50">
                <Network className="w-3 h-3 text-green-500 animate-pulse" />
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Compounding: Serialized</span>
              </div>
              <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">Industrial Scale: ENABLED</Badge>
            </div>
          </header>
          
          <main className="flex-1 space-y-6 p-6 md:p-8 max-w-7xl mx-auto w-full">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <StatCard label="Monthly Factory Output" value="1,200" icon={Layers} trend="15%" trendType="positive" />
              <StatCard label="Network Reach (30d)" value="48.2M" icon={TrendingUp} trend="210%" trendType="positive" />
              <StatCard label="Est. Net Revenue" value="$42,850" icon={DollarSign} trend="34%" trendType="positive" />
              <StatCard label="Active Niche Nodes" value="7" icon={Radio} />
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              <Card className="lg:col-span-2 bg-card border-primary/10 overflow-hidden shadow-2xl relative">
                <CardHeader className="bg-primary/5 py-4 border-b border-primary/10">
                  <CardTitle className="text-xs font-bold uppercase text-primary flex items-center gap-2">
                    <Star className="w-3 h-3" /> Fastest Growing Niche Stack (2026)
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {nicheStack.map((niche) => (
                      <div key={niche.name} className="p-4 rounded-2xl bg-secondary/30 border border-border/50 hover:border-primary/30 transition-all text-center space-y-1">
                        <p className={cn("text-xs font-bold uppercase tracking-tighter", niche.color)}>{niche.name}</p>
                        <p className="text-[10px] text-muted-foreground font-mono">{niche.status}</p>
                        <p className="text-[10px] font-bold text-green-500">{niche.growth}</p>
                      </div>
                    ))}
                    <div className="p-4 rounded-2xl border-2 border-dashed border-primary/20 flex flex-col items-center justify-center opacity-60">
                      <p className="text-[10px] font-bold text-primary uppercase">New Node</p>
                      <Zap className="w-3 h-3 text-primary mt-1" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border/50 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-sm font-bold uppercase flex items-center gap-2">
                    <Server className="w-4 h-4 text-primary" /> FFmpeg Grid Cluster
                  </CardTitle>
                  <CardDescription>48 Parallel Niche Workers (K8s Nodes)</CardDescription>
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
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-border/50 flex items-center justify-between text-[10px] uppercase font-bold text-muted-foreground">
                    <span>Niche Capacity: 1,200/mo</span>
                    <span className="text-primary font-mono tracking-tighter animate-pulse">GRID_SYNC_OK</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
              <Card className="lg:col-span-4 bg-card border-border/50 shadow-lg">
                <CardHeader>
                  <CardTitle className="font-headline text-lg flex items-center gap-2 text-primary">
                    <Workflow className="w-5 h-5" />
                    Serialized Compounding Matrix
                  </CardTitle>
                  <CardDescription>Network retention across hybrid niche series</CardDescription>
                </CardHeader>
                <CardContent>
                  <PerformanceChart />
                </CardContent>
              </Card>

              <Card className="lg:col-span-3 bg-card border-border/50 shadow-lg flex flex-col">
                <CardHeader>
                  <CardTitle className="font-headline text-lg flex items-center gap-2">
                    <Terminal className="w-5 h-5 text-primary" />
                    Agent Logic Stream
                  </CardTitle>
                  <CardDescription>Viral Formula: Hook(2s) → Story(8s) → Payoff(15s)</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 overflow-y-auto space-y-3 max-h-[350px] pr-2 custom-scrollbar">
                  {[
                    { node: "NODE-42", status: "Mining 'Rich Habits' Series #4", progress: 88 },
                    { node: "NODE-08", status: "Runway Gen-3: 'Inside Body' Hook", progress: 42 },
                    { node: "NODE-15", status: "ElevenLabs: 'Psychology Tricks' v2", progress: 100 },
                    { node: "NODE-31", status: "Repurpose.io: TikTok/Reels/Shorts Sync", progress: 15 },
                    { node: "NODE-22", status: "Trend Scraper: Viral Food Hacks", progress: 95 }
                  ].map((job, idx) => (
                    <div key={idx} className="group flex items-center justify-between p-3 rounded-xl bg-secondary/30 border border-border/50 hover:border-primary/30 transition-all">
                      <div className="space-y-1">
                        <p className="text-[11px] font-bold uppercase tracking-tight">{job.status}</p>
                        <p className="text-[9px] text-muted-foreground font-mono uppercase">{job.node}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-[11px] font-mono font-bold text-primary">{job.progress}%</span>
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
                <Flame className="w-8 h-8 fill-white/20" />
              </div>
              <div>
                <p className="font-bold text-lg font-headline tracking-tight">2026 Factory Strategy: ACTIVE</p>
                <p className="text-xs opacity-80 italic max-w-lg">"Hybrid '60 Second Knowledge' niche stack identified as primary multiplier. Initiating parallel render batch #09."</p>
              </div>
            </div>
            <button className="px-10 py-4 bg-white text-primary text-sm font-bold rounded-2xl hover:shadow-2xl transition-all hover:scale-105 active:scale-95 border border-primary/20 flex items-center gap-2">
              <Zap className="w-4 h-4" /> Deploy Niche Batch
            </button>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
