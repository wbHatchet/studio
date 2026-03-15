
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
  Flame,
  Star,
  Activity,
  Cpu,
  Sparkles,
  Repeat,
  Youtube,
  Music,
  ImageIcon,
  Video,
  BarChart3,
  Search,
  MessageSquare,
  Share2,
  DollarSign,
  Target
} from "lucide-react";
import { PerformanceChart } from "@/components/analytics/performance-chart";
import { useToast } from "@/hooks/use-toast";

export default function DashboardPage() {
  const [isMounted, setIsMounted] = useState(false);
  const { toast } = useToast();
  const [renderCluster, setRenderCluster] = useState<{id: number, status: string, load: number}[]>([]);
  
  const [logs, setLogs] = useState([
    { node: "KEYWORD-INTEL", status: "Scanning VidIQ for 'ADHD Coding' gaps...", progress: 100 },
    { node: "TREND-PREDICT", status: "Emerging: 'Dark Academia Study' rising 42%", progress: 85 },
    { node: "SHORTS-TRAFFIC", status: "Extracting viral clips from Render #42", progress: 42 },
    { node: "THUMBNAIL-AI", status: "Canva API: Rotating Variant B for CTR boost", progress: 100 },
    { node: "RETENTION-AGENT", status: "Analyzing drop-off at 0:12 in Lofi #8", progress: 100 },
    { node: "SCALING-NODE", status: "Cloning winning 'Rainy Cafe' to 5 channels", progress: 15 },
  ]);

  useEffect(() => {
    setIsMounted(true);
    setRenderCluster(Array.from({ length: 48 }, (_, i) => ({
      id: i + 1,
      status: Math.random() > 0.1 ? "Running" : "Idle",
      load: Math.floor(Math.random() * 100),
    })));

    const interval = setInterval(() => {
      const agents = ["KEYWORD-INTEL", "SHORTS-TRAFFIC", "ENGAGEMENT-BOT", "MONETIZATION-AGENT", "SCALING-NODE", "RETENTION-AGENT"];
      const statuses = [
        "Mining Keyword Gaps...",
        "Syncing Shorts to TikTok...",
        "Replying to Top Fans...",
        "Optimizing Affiliate Stack...",
        "Cloning Asset Node...",
        "Analyzing Watch Time..."
      ];
      const randomIdx = Math.floor(Math.random() * agents.length);
      
      setLogs(prev => [
        { node: agents[randomIdx], status: statuses[randomIdx], progress: Math.floor(Math.random() * 100) },
        ...prev.slice(0, 6)
      ]);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const growthAgents = [
    { name: "Keyword Intel", icon: Search, status: "Active", color: "text-blue-400" },
    { name: "Shorts Traffic", icon: Share2, status: "Active", color: "text-purple-400" },
    { name: "Thumbnail AI", icon: ImageIcon, status: "Active", color: "text-amber-400" },
    { name: "Retention", icon: Activity, status: "Active", color: "text-red-400" },
    { name: "Engagement", icon: MessageSquare, status: "Active", color: "text-green-400" },
    { name: "Scaling", icon: Network, status: "Active", color: "text-cyan-400" }
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
              <h1 className="font-headline font-bold text-xl tracking-tight flex items-center gap-2 text-primary uppercase">
                12-Agent Growth Engine <span className="text-foreground text-xs font-mono bg-primary/10 px-2 py-0.5 rounded-full border border-primary/20">v1.1M</span>
              </h1>
              <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest text-primary flex items-center gap-2">
                <Flame className="w-3 h-3 text-orange-500" /> CAPACITY: 1,800 VIDEOS/MO | 20 CHANNELS
              </span>
            </div>
          </header>
          
          <main className="flex-1 space-y-6 p-6 md:p-8 max-w-7xl mx-auto w-full">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <StatCard label="Monthly Network Reach" value="100M+" icon={TrendingUp} trend="420%" trendType="positive" />
              <StatCard label="Daily Production Node" value="60" icon={Layers} />
              <StatCard label="Scaling Grid Assets" value="20 CH" icon={Network} />
              <StatCard label="Revenue Velocity" value="$80K/mo" icon={DollarSign} />
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              <Card className="lg:col-span-2 bg-card border-primary/10 overflow-hidden shadow-2xl relative">
                <CardHeader className="bg-primary/5 py-4 border-b border-primary/10">
                  <CardTitle className="text-xs font-bold uppercase text-primary flex items-center gap-2">
                    <Star className="w-3 h-3" /> Autonomous Growth Agents (12 Nodes Active)
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {growthAgents.map((agent) => (
                      <div key={agent.name} className="p-4 rounded-2xl bg-secondary/30 border border-border/50 hover:border-primary/30 transition-all text-center space-y-2">
                        <agent.icon className={cn("w-6 h-6 mx-auto", agent.color)} />
                        <p className={cn("text-[10px] font-bold uppercase tracking-tighter", agent.color)}>{agent.name}</p>
                        <p className="text-[8px] text-muted-foreground font-mono">SYNCED</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border/50 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-sm font-bold uppercase flex items-center gap-2">
                    <Server className="w-4 h-4 text-primary" /> FFmpeg Cluster Load
                  </CardTitle>
                  <CardDescription>Industrial-Scale 1,800/mo Throughput</CardDescription>
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
                        <span className="text-[6px] font-bold">N{node.id}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
              <Card className="lg:col-span-4 bg-card border-border/50 shadow-lg">
                <CardHeader>
                  <CardTitle className="font-headline text-lg flex items-center gap-2 text-primary">
                    <Workflow className="w-5 h-5" />
                    Growth Sequence (Trend &rarr; Scale)
                  </CardTitle>
                  <CardDescription>12-Agent autonomous network control</CardDescription>
                </CardHeader>
                <CardContent>
                  <PerformanceChart />
                </CardContent>
              </Card>

              <Card className="lg:col-span-3 bg-card border-border/50 shadow-lg flex flex-col">
                <CardHeader>
                  <CardTitle className="font-headline text-lg flex items-center gap-2">
                    <Terminal className="w-5 h-5 text-primary" />
                    Agent Logic Stream (Firebase)
                  </CardTitle>
                  <CardDescription>12-Agent Cluster Execution Logs</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 overflow-y-auto space-y-3 max-h-[350px] pr-2 custom-scrollbar">
                  {logs.map((job, idx) => (
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
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
