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
  Rocket,
  Search,
  MessageSquare,
  Repeat
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
            <h1 className="font-headline font-bold text-xl">Autonomous AI Studio v4.0</h1>
            <div className="ml-auto flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Self-Learning Loop: ACTIVE</span>
              </div>
              <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">Studio Network Enabled</Badge>
            </div>
          </header>
          
          <main className="flex-1 space-y-6 p-6 md:p-8">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <StatCard label="Network Views" value="10.2M" icon={TrendingUp} trend="15.2%" trendType="positive" />
              <StatCard label="Monthly Profit" value="$84.5K" icon={LineChart} trend="12.4%" trendType="positive" />
              <StatCard label="Niches Scanned" value="1,240" icon={Search} />
              <StatCard label="Automation Rate" value="99.4%" icon={Cpu} />
            </div>

            <Card className="bg-card border-primary/10 overflow-hidden shadow-xl">
              <CardHeader className="bg-primary/5 py-3 border-b border-primary/10">
                <CardTitle className="text-xs font-bold uppercase text-primary flex items-center gap-2">
                  <Workflow className="w-3 h-3" /> Autonomous Strategy-to-Revenue Loop
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-8 pb-10">
                <div className="flex flex-wrap items-center justify-between gap-6 px-4">
                  {[
                    { name: "Intelligence", status: "Trend Scan", icon: TrendingUp, active: true },
                    { name: "Discovery", status: "Niche Score", icon: Target, active: true },
                    { name: "Production", status: "Voice/Music/Visuals", icon: VideoIcon, active: true },
                    { name: "Assembly", status: "FFmpeg/Capcut", icon: Cpu, active: true },
                    { name: "Distribution", status: "Multi-Platform", icon: Share2, active: true },
                    { name: "Learning", status: "Analytics Loop", icon: BrainCircuit, active: true }
                  ].map((step, idx, arr) => (
                    <div key={step.name} className="flex items-center gap-4">
                      <div className={`flex flex-col items-center gap-3 transition-all ${step.active ? 'scale-110' : 'opacity-50'}`}>
                        <div className={`p-4 rounded-2xl border ${step.active ? 'bg-primary/20 border-primary text-primary shadow-[0_0_20px_rgba(var(--primary),0.3)]' : 'bg-secondary/50 border-border text-muted-foreground'}`}>
                          <step.icon className="w-6 h-6" />
                        </div>
                        <div className="text-center">
                          <p className="text-[10px] font-bold uppercase tracking-tight">{step.name}</p>
                          <p className="text-[8px] text-muted-foreground uppercase">{step.status}</p>
                        </div>
                      </div>
                      {idx < arr.length - 1 && (
                        <div className="h-px w-8 bg-border/50 relative">
                          <ArrowRight className="w-3 h-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary/30" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
              <Card className="lg:col-span-4 bg-card">
                <CardHeader>
                  <CardTitle className="font-headline">Network View Velocity</CardTitle>
                  <CardDescription>Viral signals across 50 autonomous channels</CardDescription>
                </CardHeader>
                <CardContent>
                  <PerformanceChart />
                </CardContent>
              </Card>

              <Card className="lg:col-span-3 bg-card">
                <CardHeader>
                  <CardTitle className="font-headline">Studio Agent Activity</CardTitle>
                  <CardDescription>Live execution status (FFmpeg & AI Synthesis)</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {activeJobs.map((job) => (
                      <div key={job.id} className="flex items-center justify-between p-4 rounded-xl bg-secondary/50 border border-border/50 hover:border-primary/20 transition-colors">
                        <div className="space-y-1">
                          <p className="text-sm font-bold">{job.name}</p>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-[10px] h-4 bg-primary/10 text-primary border-primary/20">{job.type}</Badge>
                            <span className="text-[10px] uppercase font-bold text-muted-foreground">{job.status}</span>
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
          
          <div className="sticky bottom-6 mx-8 p-5 bg-primary text-primary-foreground rounded-3xl shadow-2xl flex items-center justify-between animate-in slide-in-from-bottom-8 duration-700">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-2xl">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold text-base">Self-Learning Update: New Niche Discovered</p>
                <p className="text-xs opacity-90 italic">"Japanese Countryside Lo-Fi" view velocity increased by 42%. Auto-enqueuing 5 topic scripts.</p>
              </div>
            </div>
            <button className="px-8 py-3 bg-white text-primary text-sm font-bold rounded-xl hover:shadow-lg transition-all hover:scale-105">
              Review Growth Plan
            </button>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
