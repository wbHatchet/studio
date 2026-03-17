"use client";

import { useState, useEffect, useRef } from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  TrendingUp, 
  Workflow, 
  Zap,
  Terminal,
  Activity,
  Plus,
  ArrowUpRight,
  FileSpreadsheet,
  Upload
} from "lucide-react";
import { PerformanceChart } from "@/components/analytics/performance-chart";
import { useToast } from "@/hooks/use-toast";
import { processExcelUpload } from "@/lib/excel-parser";

export default function DashboardPage() {
  const [isMounted, setIsMounted] = useState(false);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [logs, setLogs] = useState([
    { time: "09:41", node: "INPUT", msg: 'Topic loaded: "ChatGPT secrets"', status: "ok" },
    { time: "09:41", node: "TREND", msg: "Virality score: 91/100", status: "ok" },
    { time: "09:42", node: "SCRIPT", msg: "112 words ready", status: "ag" },
    { time: "09:44", node: "VOICE", msg: "Rachel 47s done", status: "ok" },
    { time: "09:46", node: "MUSIC", msg: "Upbeat background ready", status: "ag" },
    { time: "09:48", node: "IMAGE", msg: "1080×1920 generated", status: "ok" },
    { time: "09:51", node: "VIDEO", msg: "9:16 MP4 composed", status: "ok" },
    { time: "09:52", node: "QC", msg: "6/6 checks passed", status: "ok" },
    { time: "09:52", node: "APPROVAL", msg: "Awaiting user review", status: "warn" },
  ]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleExcelImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const jobs = await processExcelUpload(file);
      toast({
        title: "Bulk Intake Successful",
        description: `Imported ${jobs.length} topics into the 20-agent pipeline.`,
      });
      setLogs(prev => [
        { 
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), 
          node: "EXCEL", 
          msg: `Bulk intake: ${jobs.length} topics queued`, 
          status: "ok" 
        },
        ...prev
      ]);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Import Failed",
        description: error.message,
      });
    }
  };

  if (!isMounted) return null;

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background selection:bg-primary/30">
        <AppSidebar />
        <SidebarInset className="bg-background">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b border-border/50 px-4 backdrop-blur-md bg-background/80 sticky top-0 z-50">
            <SidebarTrigger className="-ml-1" />
            <div className="h-4 w-px bg-border/50 mx-2" />
            <div className="flex-1">
              <h1 className="font-headline font-bold text-xl tracking-tight uppercase text-primary">Dashboard</h1>
              <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Your AI Empire at a glance · 12 growth agents running</p>
            </div>
            <div className="flex items-center gap-2">
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleExcelImport} 
                accept=".xlsx,.xls,.csv" 
                className="hidden" 
              />
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => fileInputRef.current?.click()}
                className="text-[10px] font-bold uppercase tracking-widest h-9 border-border/50"
              >
                <FileSpreadsheet className="w-3 h-3 mr-2" /> Batch Import
              </Button>
              <Button size="sm" className="bg-primary text-primary-foreground font-bold uppercase text-[10px] tracking-widest px-4 h-9 shadow-lg shadow-primary/20">
                <Plus className="w-3 h-3 mr-2" /> New Project
              </Button>
            </div>
          </header>
          
          <main className="flex-1 space-y-6 p-6 md:p-8 max-w-7xl mx-auto w-full">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <MetricCard label="Monthly Views" value="720K" trend="+41% this month" trendUp />
              <MetricCard label="Active Jobs" value="2" trend="Running now" />
              <MetricCard label="Monthly Revenue" value="$21.6K" trend="+$6.3K vs Nov" trendUp />
              <MetricCard label="Credits Left" value="6,400" trend="32% remaining" />
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="bg-card border-border/50 overflow-hidden shadow-xl">
                <CardHeader className="bg-primary/5 py-4 border-b border-border/50">
                  <CardTitle className="text-[10px] font-bold uppercase text-primary flex items-center gap-2 tracking-widest">
                    <Activity className="w-3 h-3" /> Views Growth — 2026
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <PerformanceChart />
                </CardContent>
              </Card>

              <Card className="bg-card border-border/50 shadow-xl overflow-hidden">
                <CardHeader className="bg-primary/5 py-4 border-b border-border/50">
                  <CardTitle className="text-[10px] font-bold uppercase text-primary tracking-widest">Recent Jobs</CardTitle>
                </CardHeader>
                <CardContent className="pt-4 px-0">
                  <div className="divide-y divide-border/50">
                    <JobRow title="AI tools Short — 'ChatGPT secrets'" subtitle="Shorts · AI tools" status="Approval" statusType="warn" />
                    <JobRow title="Halloween Lofi · 2hr" subtitle="Lofi · Halloween" status="Done" statusType="success" />
                    <JobRow title="Finance facts #14" subtitle="Shorts · Finance" status="Running" statusType="active" pulse />
                    <JobRow title="Billionaire habits #7" subtitle="Shorts · Luxury" status="Pending" statusType="muted" />
                  </div>
                  <div className="p-4 pt-2">
                    <Button variant="outline" className="w-full text-[10px] uppercase font-bold h-9 border-border/50">+ New Project</Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              <Card className="lg:col-span-2 bg-card border-border/50 shadow-xl">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Growth Agents — All Active</CardTitle>
                  <Button variant="ghost" size="sm" className="h-7 text-[9px] uppercase font-bold">Manage</Button>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  <AgentMiniCard emoji="📈" title="Trend prediction" sub="Every 2h" status="On" />
                  <AgentMiniCard emoji="🪝" title="Hook optimizer" sub="Per video" status="On" />
                  <AgentMiniCard emoji="💰" title="Revenue agent" sub="Daily" status="On" />
                </CardContent>
              </Card>

              <Card className="bg-card border-border/50 shadow-xl flex flex-col">
                <CardHeader className="bg-primary/5 py-4 border-b border-border/50">
                  <CardTitle className="text-[10px] font-bold uppercase text-primary flex items-center gap-2 tracking-widest">
                    <Terminal className="w-3 h-3" /> Agent Logic Stream
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 overflow-y-auto space-y-1 p-4 max-h-[250px] custom-scrollbar bg-black/20 font-mono text-[10px]">
                  {logs.map((log, idx) => (
                    <div key={idx} className="flex gap-2 group border-b border-border/20 py-1 last:border-0">
                      <span className="text-muted-foreground shrink-0">[{log.time}]</span>
                      <span className={cn(
                        "font-bold shrink-0 w-16",
                        log.status === 'ok' ? "text-green-500" : log.status === 'ag' ? "text-blue-400" : "text-amber-500"
                      )}>{log.node}:</span>
                      <span className="text-muted-foreground truncate">{log.msg}</span>
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

function MetricCard({ label, value, trend, trendUp }: any) {
  return (
    <Card className="bg-secondary/30 border-border/50 shadow-md">
      <CardContent className="p-4">
        <p className="text-[9px] font-bold uppercase text-muted-foreground tracking-widest mb-1">{label}</p>
        <div className="text-2xl font-headline font-bold text-foreground">{value}</div>
        <p className={cn(
          "text-[9px] font-bold mt-1 uppercase",
          trendUp ? "text-green-500" : "text-muted-foreground"
        )}>
          {trend}
        </p>
      </CardContent>
    </Card>
  );
}

function JobRow({ title, subtitle, status, statusType, pulse }: any) {
  const statusColors: any = {
    warn: "bg-amber-500/10 text-amber-500",
    success: "bg-green-500/10 text-green-500",
    active: "bg-blue-500/10 text-blue-400",
    muted: "bg-secondary text-muted-foreground"
  };
  
  const dotColors: any = {
    warn: "bg-amber-500",
    success: "bg-green-500",
    active: "bg-primary",
    muted: "bg-muted-foreground"
  };

  return (
    <div className="flex items-center gap-3 p-3 hover:bg-secondary/20 transition-colors group">
      <div className={cn("w-1.5 h-1.5 rounded-full shrink-0", dotColors[statusType], pulse && "animate-pulse")} />
      <div className="flex-1 min-w-0">
        <p className="text-[11px] font-bold text-foreground truncate group-hover:text-primary transition-colors">{title}</p>
        <p className="text-[9px] text-muted-foreground uppercase font-bold tracking-tighter">{subtitle}</p>
      </div>
      <Badge variant="outline" className={cn("text-[8px] h-5 uppercase font-bold border-0", statusColors[statusType], pulse && "animate-pulse")}>
        {status}
      </Badge>
    </div>
  );
}

function AgentMiniCard({ emoji, title, sub, status }: any) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/30 border border-border/50">
      <span className="text-xl shrink-0">{emoji}</span>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-bold text-foreground truncate">{title}</p>
        <p className="text-[9px] text-muted-foreground font-medium">{sub}</p>
      </div>
      <Badge className="bg-green-500/20 text-green-500 text-[8px] h-4 uppercase">{status}</Badge>
    </div>
  );
}
