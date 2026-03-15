
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
  Workflow, 
  Zap,
  Terminal,
  Layers,
  Server,
  Network,
  DollarSign,
  Radio,
  Flame,
  Star,
  Activity,
  Cpu,
  ShieldCheck,
  Sparkles,
  Repeat,
  AlertTriangle,
  Play
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
    task: ["FFmpeg", "Suno", "n8n", "Scraper"][Math.floor(Math.random() * 4)]
  }));

  const nicheStack = [
    { name: "Knowledge Hub", status: "15 Channels", growth: "+450%", color: "text-blue-400" },
    { name: "Story Series", status: "12 Channels", growth: "+310%", color: "text-purple-400" },
    { name: "Visual Dopamine", status: "20 Channels", growth: "+210%", color: "text-green-400" },
    { name: "Luxury Life", status: "8 Channels", growth: "+124%", color: "text-amber-400" },
    { name: "Psychology", status: "10 Channels", growth: "+92%", color: "text-pink-400" }
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
                Network Grid Control <span className="text-foreground text-xs font-mono bg-primary/10 px-2 py-0.5 rounded-full border border-primary/20">v100+ (Enterprise)</span>
              </h1>
              <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest text-primary flex items-center gap-2">
                <Flame className="w-3 h-3 text-orange-500" /> ACTIVE CHANNELS: 104 | VIRAL UPLOADS TODAY: 312
              </span>
            </div>
            <div className="ml-auto flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-red-500/10 border border-red-500/20">
                <AlertTriangle className="w-3 h-3 text-red-500 animate-pulse" />
                <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest">VIRAL ALERT: NODE-KNOWLEDGE-12</span>
              </div>
              <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">GRID STATUS: OPTIMIZED</Badge>
            </div>
          </header>
          
          <main className="flex-1 space-y-6 p-6 md:p-8 max-w-7xl mx-auto w-full">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <StatCard label="Monthly Factory Output" value="9,450" icon={Layers} trend="12%" trendType="positive" />
              <StatCard label="Network Reach (30d)" value="214.8M" icon={TrendingUp} trend="420%" trendType="positive" />
              <StatCard label="Est. Net Revenue" value="$84,250" icon={DollarSign} trend="15%" trendType="positive" />
              <StatCard label="Active Nodes" value="50" icon={Cpu} />
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              <Card className="lg:col-span-2 bg-card border-primary/10 overflow-hidden shadow-2xl relative">
                <CardHeader className="bg-primary/5 py-4 border-b border-primary/10">
                  <CardTitle className="text-xs font-bold uppercase text-primary flex items-center gap-2">
                    <Star className="w-3 h-3" /> Mass-Scale Channel Network Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {nicheStack.map((niche) => (
                      <div key={niche.name} className="p-4 rounded-2xl bg-secondary/30 border border-border/50 hover:border-primary/30 transition-all text-center space-y-1">
                        <p className={cn("text-xs font-bold uppercase tracking-tighter", niche.color)}>{niche.name}</p>
                        <p className="text-[10px] text-muted-foreground font-mono">{niche.status}</p>
                        <p className="text-[10px] font-bold text-green-500">{niche.growth}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border/50 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-sm font-bold uppercase flex items-center gap-2">
                    <Server className="w-4 h-4 text-primary" /> FFmpeg Cluster (50 Nodes)
                  </CardTitle>
                  <CardDescription>Rendering Capacity: 300 videos/day</CardDescription>
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
                    <span>Cluster Load: {Math.floor(Math.random() * 40 + 40)}%</span>
                    <span className="text-primary font-mono tracking-tighter animate-pulse flex items-center gap-1">
                      <Activity className="w-3 h-3" /> GRID_SYNC_OK
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
              <Card className="lg:col-span-4 bg-card border-border/50 shadow-lg">
                <CardHeader>
                  <CardTitle className="font-headline text-lg flex items-center gap-2 text-primary">
                    <Workflow className="w-5 h-5" />
                    Network Analytics (Network-Wide)
                  </CardTitle>
                  <CardDescription>Views compounding across 104 active channels</CardDescription>
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
                  <CardDescription>Director: [Apify] &rarr; [OpenAI] &rarr; [11Labs] &rarr; [FFmpeg]</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 overflow-y-auto space-y-3 max-h-[350px] pr-2 custom-scrollbar">
                  {[
                    { node: "NODE-VIRAL-CLONE", status: "Trigger: 1M Views &rarr; Cloning 10 Variants", progress: 100 },
                    { node: "NODE-APIFY-SCAN", status: "Trend Scraper: Mining 100 Viral Topics", progress: 85 },
                    { node: "NODE-OPENAI-GEN", status: "GPT-4o: Writing 50 Viral Scripts", progress: 42 },
                    { node: "NODE-11LABS-VOICE", status: "ElevenLabs: Batch Synthesis (50 Voiceovers)", progress: 100 },
                    { node: "NODE-YT-PUSH", status: "YouTube API: Distributed Bulk Upload", progress: 15 },
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
                <Repeat className="w-8 h-8 fill-white/20" />
              </div>
              <div>
                <p className="font-bold text-lg font-headline tracking-tight">Viral Replication Engine: READY</p>
                <p className="text-xs opacity-80 italic max-w-lg">"1M View detected on 'Knowledge Engine #42'. Triggering 10 similar variants for autonomous serialized compounding."</p>
              </div>
            </div>
            <button className="px-10 py-4 bg-white text-primary text-sm font-bold rounded-2xl hover:shadow-2xl transition-all hover:scale-105 active:scale-95 border border-primary/20 flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> Deploy Viral Variants
            </button>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
