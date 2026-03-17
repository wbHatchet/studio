"use client";

import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BrainCircuit, Repeat, ArrowUpRight, Zap, Cpu, ShieldCheck, Database, Server, Info, History, Activity, Globe, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function DirectorLogicPage() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-[#0a0a0f]">
        <AppSidebar />
        <SidebarInset className="bg-background">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b border-border/50 px-4 backdrop-blur-md bg-background/80 sticky top-0 z-50">
            <SidebarTrigger className="-ml-1" />
            <div className="h-4 w-px bg-border/50 mx-2" />
            <div className="flex-1">
              <h1 className="font-headline font-bold text-xl tracking-tight uppercase text-primary">Director Logic (SOUL.md)</h1>
              <p className="text-[9px] text-muted-foreground uppercase font-bold tracking-widest">Autonomous Orchestration Framework</p>
            </div>
          </header>

          <main className="p-6 md:p-8 space-y-8 max-w-6xl mx-auto w-full">
            {/* Core Personality */}
            <div className="bg-primary/5 border border-primary/20 p-6 rounded-3xl space-y-4 shadow-[0_0_30px_rgba(var(--primary),0.05)]">
              <div className="flex items-center gap-3">
                <BrainCircuit className="w-8 h-8 text-primary" />
                <div>
                  <h2 className="text-lg font-headline font-bold uppercase tracking-tight">Supreme Orchestrator Personality</h2>
                  <p className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">Objective: Industrial View Maximization</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed max-w-4xl">
                The Director Agent is data-driven, decisive, and focused on virality. Its primary directive is to **never stall**. If an agent fails (e.g., Suno or DALL-E timeout), 
                the Director must attempt an alternative model or move to a "simulation" state rather than breaking the pipeline.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <LogicCard 
                title="Winner Loop (Replication)" 
                logic={`if video.ctr > 8% or video.retention > 60%:\n  director.queue("evolve", count=3)\n  director.memo("maintain aesthetic, update hooks")\n# Triggered: High performance detected.`}
                icon={Repeat}
                desc="Automatically scales winning formats to saturate the niche."
              />
              <LogicCard 
                title="Dying Logic (Niche Pivot)" 
                logic={`if consecutive_fails >= 5 (views < 1000):\n  director.flag_pivot(channel)\n  trend_agent.scan("high_cpm_alt")\n# Triggered: Niche decay detected.`}
                icon={ArrowUpRight}
                desc="Kills dying niches before views drop, preserving network health."
              />
              <LogicCard 
                title="Credit Guard (Resource Mgmt)" 
                logic={`if user.creditsUsed > tier.limit * 0.9:\n  director.set_mode("efficiency")\n  agent.degrade_quality("animated", "static")\n# Triggered: Resource scarcity.`}
                icon={ShieldCheck}
                desc="Ensures pipeline completion by managing industrial costs."
              />
              <LogicCard 
                title="Autonomous Cadence" 
                logic={`for channel in grid:\n  if uploads_today < target:\n    director.dispatch(channel, next_topic)\n# Triggered: Maintaining relentless upload frequency.`}
                icon={Zap}
                desc="Maintains 3 videos/day across the 20-channel grid automatically."
              />
            </div>

            {/* Memory Architecture */}
            <Card className="bg-card border-border/50 shadow-xl overflow-hidden rounded-3xl">
              <CardHeader className="bg-primary/5 border-b border-border/50 py-4">
                <CardTitle className="text-[10px] font-bold uppercase text-primary flex items-center gap-2 tracking-widest">
                  <Database className="w-4 h-4" /> Memory & Context Architecture
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader className="bg-secondary/10">
                    <TableRow className="border-border/50">
                      <TableHead className="text-[9px] font-black uppercase tracking-widest h-10 px-6">Memory Layer</TableHead>
                      <TableHead className="text-[9px] font-black uppercase tracking-widest h-10">Storage</TableHead>
                      <TableHead className="text-[9px] font-black uppercase tracking-widest h-10 px-6">Description</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className="border-border/50 hover:bg-secondary/5 transition-colors">
                      <TableCell className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Activity className="w-3 h-3 text-blue-400" />
                          <span className="font-bold text-xs">Active Memory</span>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-[10px] text-primary">jobs/</TableCell>
                      <TableCell className="px-6 text-[10px] text-muted-foreground leading-relaxed">Real-time status of the 20-agent pipeline.</TableCell>
                    </TableRow>
                    <TableRow className="border-border/50 hover:bg-secondary/5 transition-colors">
                      <TableCell className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <History className="w-3 h-3 text-purple-400" />
                          <span className="font-bold text-xs">Institutional Memory</span>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-[10px] text-primary">channels/</TableCell>
                      <TableCell className="px-6 text-[10px] text-muted-foreground leading-relaxed">Historical performance data used to calculate the "Viral Formula".</TableCell>
                    </TableRow>
                    <TableRow className="border-border/50 hover:bg-secondary/5 transition-colors">
                      <TableCell className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Globe className="w-3 h-3 text-green-400" />
                          <span className="font-bold text-xs">External Intel</span>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-[10px] text-primary">trendSignals/</TableCell>
                      <TableCell className="px-6 text-[10px] text-muted-foreground leading-relaxed">Live "heat map" of viral topics across YouTube, TikTok, and Reddit.</TableCell>
                    </TableRow>
                    <TableRow className="border-none hover:bg-secondary/5 transition-colors">
                      <TableCell className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="w-3 h-3 text-orange-400" />
                          <span className="font-bold text-xs">Correction Ledger</span>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-[10px] text-primary">agentRuns/</TableCell>
                      <TableCell className="px-6 text-[10px] text-muted-foreground leading-relaxed">A log of every agent's "Hallucination" or "Error" to avoid repeating mistakes.</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Industrial Pipeline Flow */}
            <Card className="bg-secondary/10 border-border/50 p-6 rounded-3xl">
              <div className="flex items-center gap-3 mb-6">
                <Server className="w-5 h-5 text-primary" />
                <h3 className="font-headline font-bold uppercase text-sm tracking-tight">17-Step Industrial Pipeline</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                <PipelinePhase num="01-03" label="Intelligence" desc="Input parsing, Trend mining, Competitor scan." />
                <PipelinePhase num="04-06" label="Strategy" desc="Niche definition, Script writing, Hook engineering." />
                <PipelinePhase num="07-10" label="Production" desc="Voice synthesis, Music gen, Scene rendering." />
                <PipelinePhase num="11-14" label="Optimization" desc="Assembly, Subtitles, A/B Thumbnails." />
                <PipelinePhase num="15-17" label="Deployment" desc="QC Check, API Upload, Analytics Sync." />
              </div>
            </Card>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

function LogicCard({ title, logic, icon: Icon, desc }: any) {
  return (
    <Card className="bg-card border-border/50 shadow-lg overflow-hidden flex flex-col rounded-2xl">
      <CardHeader className="pb-3 border-b border-border/50 bg-secondary/10">
        <CardTitle className="text-[10px] font-bold uppercase text-muted-foreground flex items-center gap-2">
          <Icon className="w-3 h-3 text-primary" /> {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 flex-1 flex flex-col">
        <pre className="p-4 font-mono text-[10px] leading-relaxed text-blue-400 bg-black/40 whitespace-pre-wrap flex-1">
          {logic}
        </pre>
        <div className="p-3 border-t border-border/50 bg-background">
          <p className="text-[9px] font-bold text-muted-foreground uppercase leading-relaxed">{desc}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function PipelinePhase({ num, label, desc }: any) {
  return (
    <div className="p-4 rounded-2xl bg-card border border-border/50 space-y-2 group hover:border-primary/30 transition-all">
      <div className="flex justify-between items-center">
        <span className="text-[9px] font-mono font-bold text-primary">{num}</span>
        <div className="w-1.5 h-1.5 rounded-full bg-primary/20 group-hover:bg-primary group-hover:shadow-[0_0_10px_rgba(var(--primary),0.5)] transition-all" />
      </div>
      <p className="text-[10px] font-bold uppercase tracking-tight">{label}</p>
      <p className="text-[9px] text-muted-foreground leading-relaxed">{desc}</p>
    </div>
  );
}
