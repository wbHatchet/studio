
"use client";

import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BrainCircuit, Repeat, ArrowUpRight, Zap, Cpu, ShieldCheck, Database, Server, Info, History, Activity, Globe, AlertTriangle, Workflow, Trash2, CheckCircle2, XCircle } from "lucide-react";
import { useUser, useFirestore, useMemoFirebase, useCollection } from "@/firebase";
import { collection, query, orderBy, limit } from "firebase/firestore";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

export default function DirectorLogicPage() {
  const { user } = useUser();
  const db = useFirestore();

  const ledgerQuery = useMemoFirebase(() => {
    if (!db || !user) return null;
    return query(
      collection(db, "users", user.uid, "agentRuns"),
      orderBy("timestamp", "desc"),
      limit(10)
    );
  }, [db, user]);

  const { data: recentRuns, isLoading } = useCollection(ledgerQuery);

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

            {/* LIVE CORRECTION LEDGER */}
            <Card className="bg-card border-border/50 shadow-xl overflow-hidden rounded-3xl">
              <CardHeader className="bg-orange-500/5 border-b border-border/50 py-4 flex flex-row items-center justify-between">
                <CardTitle className="text-[10px] font-bold uppercase text-orange-400 flex items-center gap-2 tracking-widest">
                  <AlertTriangle className="w-4 h-4" /> Live Correction Ledger (Firestore)
                </CardTitle>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[8px] font-black uppercase text-muted-foreground">Streaming logs</span>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader className="bg-secondary/10">
                    <TableRow className="border-border/50">
                      <TableHead className="text-[9px] font-black uppercase tracking-widest h-10 px-6">Timestamp</TableHead>
                      <TableHead className="text-[9px] font-black uppercase tracking-widest h-10">Agent Node</TableHead>
                      <TableHead className="text-[9px] font-black uppercase tracking-widest h-10">Status</TableHead>
                      <TableHead className="text-[9px] font-black uppercase tracking-widest h-10 px-6">System Message</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoading && (
                      <TableRow><TableCell colSpan={4} className="text-center py-8 text-[10px] uppercase font-bold text-muted-foreground animate-pulse">Initializing Ledger Stream...</TableCell></TableRow>
                    )}
                    {recentRuns?.map((run: any) => (
                      <TableRow key={run.id} className="border-border/50 hover:bg-secondary/5 transition-colors">
                        <TableCell className="px-6 py-3 font-mono text-[9px] text-muted-foreground">
                          {run.timestamp?.toDate ? format(run.timestamp.toDate(), "HH:mm:ss") : "Pending..."}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-[8px] font-black uppercase border-border/50">{run.agentId}</Badge>
                        </TableCell>
                        <TableCell>
                          {run.success ? (
                            <div className="flex items-center gap-1 text-green-500 font-bold text-[9px] uppercase"><CheckCircle2 className="w-3 h-3" /> OK</div>
                          ) : (
                            <div className="flex items-center gap-1 text-destructive font-bold text-[9px] uppercase"><XCircle className="w-3 h-3" /> ERR</div>
                          )}
                        </TableCell>
                        <TableCell className="px-6 text-[10px] text-muted-foreground leading-relaxed italic">
                          "{run.message || "System trace nominal."}"
                        </TableCell>
                      </TableRow>
                    ))}
                    {!isLoading && (!recentRuns || recentRuns.length === 0) && (
                      <TableRow><TableCell colSpan={4} className="text-center py-8 text-[10px] uppercase font-bold text-muted-foreground">No ledger entries detected.</TableCell></TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
                title="Purge Protocol (Storage)" 
                logic={`if video.status == "uploaded":\n  worker.purge("temp_media")\n  director.log("Storage recovered")\n# Triggered: Post-upload cleanup.`}
                icon={Trash2}
                desc="Ensures VPS disk never reaches 100% capacity during renders."
              />
              <LogicCard 
                title="Autonomous Cadence" 
                logic={`for channel in grid:\n  if uploads_today < target:\n    director.dispatch(channel, next_topic)\n# Triggered: Maintaining Relentless frequency.`}
                icon={Zap}
                desc="Maintains 3 videos/day across the grid automatically."
              />
            </div>

            {/* Lobster Workflow Section */}
            <Card className="bg-card border-border/50 shadow-xl overflow-hidden rounded-3xl">
              <CardHeader className="bg-blue-500/5 border-b border-border/50 py-4">
                <CardTitle className="text-[10px] font-bold uppercase text-blue-400 flex items-center gap-2 tracking-widest">
                  <Workflow className="w-4 h-4" /> Lobster Workflow Engine (workflow.lobster.yaml)
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid gap-6 lg:grid-cols-3">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.5)]" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">Parallel Execution</span>
                    </div>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">
                      `Media_Production` stage runs Suno, DALL-E, and ElevenLabs simultaneously, reducing total production time by 60%.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.5)]" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">Self-Healing Retries</span>
                    </div>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">
                      Deterministic retry logic: If Suno fails, the system automatically swaps to Udio to ensure pipeline continuity.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_10px_rgba(192,132,252,0.5)]" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">Human-in-the-Loop</span>
                    </div>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">
                      `Human_Gate` step pauses distribution, sending assets to the Live Pipeline UI for final strategic sign-off.
                    </p>
                  </div>
                </div>
              </CardContent>
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
