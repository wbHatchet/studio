
"use client";

import { useState, useEffect, useRef } from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { 
  Workflow, 
  Plus, 
  ArrowRight, 
  FileSpreadsheet, 
  Activity, 
  Radio, 
  Brain,
  Rocket,
  Sparkles,
  Loader2
} from "lucide-react";
import { PerformanceChart } from "@/components/analytics/performance-chart";
import { useToast } from "@/hooks/use-toast";
import { processExcelUpload } from "@/lib/excel-parser";
import { useUser, useFirestore, addDocumentNonBlocking } from "@/firebase";
import { collection, serverTimestamp } from "firebase/firestore";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function DashboardPage() {
  const [isMounted, setIsMounted] = useState(false);
  const { user } = useUser();
  const db = useFirestore();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLaunching, setIsLaunching] = useState(false);

  // Form State
  const [newTopic, setNewTopic] = useState("");
  const [newNiche, setNewNiche] = useState("AI Tools");

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
        description: `Imported ${jobs.length} topics into the Content Pipeline.`,
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Import Failed",
        description: error.message,
      });
    }
  };

  const launchNewProject = async () => {
    if (!newTopic.trim() || !user || !db) return;
    
    setIsLaunching(true);
    const ideaData = {
      topic: newTopic,
      niche: newNiche,
      status: "pending",
      createdAt: serverTimestamp(),
    };

    try {
      const ideaRef = collection(db, "users", user.uid, "ideas");
      addDocumentNonBlocking(ideaRef, ideaData);
      
      toast({
        title: "Project Initialized",
        description: `"${newTopic}" has been added to the production queue.`,
      });
      
      setNewTopic("");
      setIsDialogOpen(false);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLaunching(false);
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
              <h1 className="font-headline font-bold text-xl tracking-tight uppercase text-primary">Command Center</h1>
              <p className="text-[9px] text-muted-foreground uppercase font-bold tracking-widest italic">Autonomous Media Empire Controller</p>
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
                <FileSpreadsheet className="w-3 h-3 mr-2 text-green-500" /> Bulk Intake
              </Button>

              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" className="bg-primary text-primary-foreground font-bold uppercase text-[10px] tracking-widest px-4 h-9 shadow-lg shadow-primary/20">
                    <Plus className="w-3 h-3 mr-2" /> New Project
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-card border-border shadow-2xl rounded-3xl sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle className="font-headline text-xl uppercase tracking-tighter text-primary flex items-center gap-2">
                      <Rocket className="w-5 h-5" /> Initialize Production
                    </DialogTitle>
                    <DialogDescription className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      Deploy a new concept to the 20-agent pipeline
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-6 py-4">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Video Topic / Concept</Label>
                      <Input 
                        placeholder="e.g. 5 ChatGPT Secrets Nobody Uses" 
                        value={newTopic}
                        onChange={(e) => setNewTopic(e.target.value)}
                        className="bg-secondary/30 border-border/50 h-11 text-sm focus:border-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Target Niche</Label>
                      <select 
                        value={newNiche}
                        onChange={(e) => setNewNiche(e.target.value)}
                        className="w-full bg-secondary/30 border border-border/50 rounded-md h-11 px-3 text-sm focus:border-primary outline-none"
                      >
                        <option>AI Tools</option>
                        <option>Finance</option>
                        <option>Body Facts</option>
                        <option>Luxury</option>
                        <option>History</option>
                      </select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button 
                      onClick={launchNewProject} 
                      disabled={isLaunching || !newTopic.trim()}
                      className="w-full bg-primary text-background font-black uppercase text-[10px] tracking-[0.2em] h-12 shadow-xl shadow-primary/10"
                    >
                      {isLaunching ? <Loader2 className="w-4 h-4 animate-spin" /> : (
                        <><Sparkles className="w-4 h-4 mr-2" /> Launch Industrial Pipeline</>
                      )}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </header>
          
          <main className="flex-1 space-y-6 p-6 md:p-8 max-w-7xl mx-auto w-full">
            {/* GLOBAL CONTENT PIPELINE */}
            <Card className="bg-card border-border/50 shadow-xl overflow-hidden">
              <CardHeader className="bg-primary/5 py-4 border-b border-border/50">
                <CardTitle className="text-[10px] font-bold uppercase text-primary flex items-center gap-2 tracking-widest">
                  <Workflow className="w-3 h-3" /> Global Content Pipeline
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex items-center justify-between gap-2 overflow-x-auto pb-2 custom-scrollbar">
                  <PipelineStep label="Idea" count={120} active />
                  <PipelineArrow />
                  <PipelineStep label="Script" count={18} />
                  <PipelineArrow />
                  <PipelineStep label="Music" count={12} />
                  <PipelineArrow />
                  <PipelineStep label="Visual" count={8} />
                  <PipelineArrow />
                  <PipelineStep label="Assembly" count={5} />
                  <PipelineArrow />
                  <PipelineStep label="QC" count={3} />
                  <PipelineArrow />
                  <PipelineStep label="Uploaded" count={312} success />
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <MetricCard label="Monthly Network Views" value="84.2M" trend="+41% this month" trendUp />
              <MetricCard label="Active Production Jobs" value="12" trend="Running now" />
              <MetricCard label="Industrial AdSense" value="$21.6K" trend="+$6.3K vs Nov" trendUp />
              <MetricCard label="Empire Credits" value="13,600" trend="68% remaining" />
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {/* LIVE ANALYTICS HUB */}
              <Card className="bg-card border-border/50 overflow-hidden shadow-xl">
                <CardHeader className="bg-primary/5 py-4 border-b border-border/50 flex flex-row items-center justify-between">
                  <CardTitle className="text-[10px] font-bold uppercase text-primary flex items-center gap-2 tracking-widest">
                    <Activity className="w-3 h-3" /> Live Analytics Dashboard
                  </CardTitle>
                  <Button variant="ghost" size="sm" className="h-6 text-[8px] uppercase font-black">Full Report</Button>
                </CardHeader>
                <CardContent className="pt-6">
                  <PerformanceChart />
                  <div className="grid grid-cols-3 gap-4 mt-6">
                    <div className="p-3 rounded-xl bg-secondary/30 border border-border/50 text-center">
                      <p className="text-[8px] font-bold text-muted-foreground uppercase mb-1">Avg. CTR</p>
                      <p className="text-sm font-bold text-primary">12.4%</p>
                    </div>
                    <div className="p-3 rounded-xl bg-secondary/30 border border-border/50 text-center">
                      <p className="text-[8px] font-bold text-muted-foreground uppercase mb-1">Watch Time</p>
                      <p className="text-sm font-bold text-blue-400">842K hr</p>
                    </div>
                    <div className="p-3 rounded-xl bg-secondary/30 border border-border/50 text-center">
                      <p className="text-[8px] font-bold text-muted-foreground uppercase mb-1">Network RPM</p>
                      <p className="text-sm font-bold text-green-500">$5.40</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* CHANNEL CONTROL PANEL */}
              <Card className="bg-card border-border/50 shadow-xl overflow-hidden">
                <CardHeader className="bg-primary/5 py-4 border-b border-border/50">
                  <CardTitle className="text-[10px] font-bold uppercase text-primary tracking-widest flex items-center gap-2">
                    <Radio className="w-3 h-3" /> Channel Control Panel
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y divide-border/50">
                    <ChannelRow name="Harbor Moon Radio" niche="LoFi Study" freq="1 video/day" status="Active" views="12.4M" />
                    <ChannelRow name="Midnight Coding" niche="Industrial Beats" freq="3 videos/week" status="Warming" views="2.1M" />
                    <ChannelRow name="Deep Harbor Sleep" niche="LoFi Ambient" freq="1 video/day" status="Active" views="8.5M" />
                  </div>
                  <div className="p-4 bg-secondary/10 flex gap-2">
                    <Button variant="outline" className="flex-1 text-[9px] uppercase font-bold h-8 border-border/50">+ Add Channel</Button>
                    <Button variant="outline" className="flex-1 text-[9px] uppercase font-bold h-8 border-border/50">Clone Node</Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* AI AGENT CONTROL CENTER */}
            <Card className="bg-card border-border/50 shadow-xl overflow-hidden">
              <CardHeader className="bg-primary/5 py-4 border-b border-border/50 flex flex-row items-center justify-between">
                <CardTitle className="text-[10px] font-bold uppercase text-primary flex items-center gap-2 tracking-widest">
                  <Brain className="w-3 h-3" /> AI Agent Control Center
                </CardTitle>
                <Badge variant="outline" className="text-[8px] border-primary/20 text-primary uppercase font-bold">12 Agents Online</Badge>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <AgentControl emoji="📈" title="Trend Hunter" desc="Google Trends + VidIQ" active />
                  <AgentControl emoji="🖼️" title="Thumbnail AI" desc="A/B Testing (Canva)" active />
                  <AgentControl emoji="🚀" title="Shorts Traffic" desc="Cross-platform Distro" active />
                  <AgentControl emoji="💰" title="Revenue Agent" desc="AdSense Optimization" active />
                </div>
              </CardContent>
            </Card>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

function PipelineStep({ label, count, active, success }: any) {
  return (
    <div className={cn(
      "flex flex-col items-center gap-1 min-w-[80px] p-2 rounded-xl transition-all",
      active && "bg-primary/10 border border-primary/20 shadow-[0_0_15px_rgba(var(--primary),0.1)]",
      success && "bg-green-500/5 border border-green-500/10"
    )}>
      <span className={cn(
        "text-[10px] font-black uppercase tracking-widest",
        active ? "text-primary" : success ? "text-green-500" : "text-muted-foreground"
      )}>{label}</span>
      <span className="text-xs font-mono font-bold">{count}</span>
    </div>
  );
}

function PipelineArrow() {
  return <ArrowRight className="w-3 h-3 text-muted-foreground/30 shrink-0" />;
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

function ChannelRow({ name, niche, freq, status, views }: any) {
  return (
    <div className="flex items-center gap-4 p-4 hover:bg-secondary/20 transition-colors group">
      <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center font-headline font-bold text-primary border border-border/50">{name[0]}</div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-bold text-foreground truncate group-hover:text-primary transition-colors">{name}</p>
        <p className="text-[9px] text-muted-foreground font-medium uppercase">{niche} • {freq}</p>
      </div>
      <div className="text-right shrink-0">
        <p className="text-xs font-mono font-bold">{views}</p>
        <Badge variant="outline" className={cn(
          "text-[8px] h-4 uppercase font-black border-0 p-0",
          status === 'Active' ? "text-green-500" : "text-blue-400"
        )}>{status}</Badge>
      </div>
    </div>
  );
}

function AgentControl({ emoji, title, desc, active }: any) {
  return (
    <div className={cn(
      "p-4 rounded-2xl border transition-all flex items-center gap-3",
      active ? "bg-secondary/30 border-primary/20" : "bg-secondary/10 border-border/50 opacity-50"
    )}>
      <span className="text-2xl">{emoji}</span>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-bold text-foreground uppercase tracking-tight">{title}</p>
        <p className="text-[9px] text-muted-foreground leading-none">{desc}</p>
      </div>
      <div className={cn("w-2 h-2 rounded-full", active ? "bg-primary animate-pulse shadow-[0_0_10px_rgba(var(--primary),0.5)]" : "bg-muted")} />
    </div>
  );
}
