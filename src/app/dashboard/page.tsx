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
  Flame,
  Star,
  Activity,
  Cpu,
  Sparkles,
  Repeat,
  TriangleAlert,
  Youtube,
  Music,
  ImageIcon,
  Video,
  BarChart3
} from "lucide-react";
import { PerformanceChart } from "@/components/analytics/performance-chart";
import { useToast } from "@/hooks/use-toast";

export default function DashboardPage() {
  const [isMounted, setIsMounted] = useState(false);
  const { toast } = useToast();
  const [renderCluster, setRenderCluster] = useState<{id: number, status: string, load: number}[]>([]);
  
  const [logs, setLogs] = useState([
    { node: "UPLOAD-AGENT", status: "YouTube Data API: Scheduling Scheduled Post", progress: 15 },
    { node: "FFMPEG-AGENT", status: "Looping 2min Suno track to 3 hours...", progress: 42 },
    { node: "IMAGE-AGENT", status: "Midjourney: Upscaling rainy cafe scene", progress: 85 },
    { node: "MUSIC-AGENT", status: "Suno AI: Synthesis Complete (Deep Focus)", progress: 100 },
    { node: "METADATA-AI", status: "Claude: Generating SEO Metadata Block", progress: 100 },
    { node: "IDEA-SCRAPER", status: "VidIQ: Extracting content gaps", progress: 100 },
  ]);

  useEffect(() => {
    setIsMounted(true);
    setRenderCluster(Array.from({ length: 48 }, (_, i) => ({
      id: i + 1,
      status: Math.random() > 0.1 ? "Running" : "Idle",
      load: Math.floor(Math.random() * 100),
    })));

    const interval = setInterval(() => {
      const agents = ["IDEA-SCRAPER", "MUSIC-AGENT", "IMAGE-AGENT", "FFMPEG-AGENT", "METADATA-AI", "UPLOAD-AGENT"];
      const statuses = [
        "Mining YouTube Gaps...",
        "Calling Suno API...",
        "Generating Midjourney Scene...",
        "Merging 3h Lo-Fi Loop...",
        "Optimizing Titles/Tags...",
        "Syncing to YouTube API..."
      ];
      const randomIdx = Math.floor(Math.random() * agents.length);
      
      setLogs(prev => [
        { node: agents[randomIdx], status: statuses[randomIdx], progress: Math.floor(Math.random() * 100) },
        ...prev.slice(0, 6)
      ]);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const toolStack = [
    { name: "Suno AI", icon: Music, status: "Active", color: "text-blue-400" },
    { name: "Midjourney", icon: ImageIcon, status: "Active", color: "text-purple-400" },
    { name: "FFmpeg", icon: Video, status: "Active", color: "text-amber-400" },
    { name: "YouTube API", icon: Youtube, status: "Active", color: "text-red-400" },
    { name: "Claude AI", icon: Sparkles, status: "Active", color: "text-green-400" },
    { name: "VidIQ", icon: BarChart3, status: "Active", color: "text-cyan-400" }
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
                AI Lo-Fi Automation Factory <span className="text-foreground text-xs font-mono bg-primary/10 px-2 py-0.5 rounded-full border border-primary/20">v12.0</span>
              </h1>
              <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest text-primary flex items-center gap-2">
                <Flame className="w-3 h-3 text-orange-500" /> PRODUCTION SCALE: 450 VIDEOS/MO | 5 CHANNELS
              </span>
            </div>
          </header>
          
          <main className="flex-1 space-y-6 p-6 md:p-8 max-w-7xl mx-auto w-full">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <StatCard label="Videos Produced (30d)" value="450" icon={Layers} trend="15%" trendType="positive" />
              <StatCard label="Total Views (30d)" value="42.8M" icon={TrendingUp} trend="420%" trendType="positive" />
              <StatCard label="Active Production Channels" value="5" icon={Network} />
              <StatCard label="Parallel FFmpeg Nodes" value="50" icon={Cpu} />
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              <Card className="lg:col-span-2 bg-card border-primary/10 overflow-hidden shadow-2xl relative">
                <CardHeader className="bg-primary/5 py-4 border-b border-primary/10">
                  <CardTitle className="text-xs font-bold uppercase text-primary flex items-center gap-2">
                    <Star className="w-3 h-3" /> Hidden YouTube Automation Stack (7 Tools)
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {toolStack.map((tool) => (
                      <div key={tool.name} className="p-4 rounded-2xl bg-secondary/30 border border-border/50 hover:border-primary/30 transition-all text-center space-y-2">
                        <tool.icon className={cn("w-6 h-6 mx-auto", tool.color)} />
                        <p className={cn("text-[10px] font-bold uppercase tracking-tighter", tool.color)}>{tool.name}</p>
                        <p className="text-[8px] text-muted-foreground font-mono">{tool.status}</p>
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
                  <CardDescription>Merging Image + 3h Music Loop</CardDescription>
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
                    Production Sequence (Idea &rarr; Upload)
                  </CardTitle>
                  <CardDescription>Autonomous content queue tracking</CardDescription>
                </CardHeader>
                <CardContent>
                  <PerformanceChart />
                </CardContent>
              </Card>

              <Card className="lg:col-span-3 bg-card border-border/50 shadow-lg flex flex-col">
                <CardHeader>
                  <CardTitle className="font-headline text-lg flex items-center gap-2">
                    <Terminal className="w-5 h-5 text-primary" />
                    Automation Logs (Firebase Logic)
                  </CardTitle>
                  <CardDescription>Cloud Functions triggering now</CardDescription>
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