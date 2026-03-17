
"use client";

import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Terminal, Code2, Zap, Network, BrainCircuit, Repeat, ArrowUpRight, Cpu } from "lucide-react";
import { cn } from "@/lib/utils";

export default function DirectorLogicPage() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        <SidebarInset className="bg-background">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b border-border/50 px-4">
            <SidebarTrigger className="-ml-1" />
            <div className="h-4 w-px bg-border/50 mx-2" />
            <h1 className="font-headline font-bold text-xl uppercase text-primary tracking-tight">Director Logic (SOUL.md)</h1>
          </header>

          <main className="p-6 md:p-8 space-y-8 max-w-5xl mx-auto w-full">
            <div className="bg-primary/5 border border-primary/20 p-6 rounded-3xl space-y-2">
              <div className="flex items-center gap-3">
                <BrainCircuit className="w-6 h-6 text-primary" />
                <h2 className="text-lg font-headline font-bold uppercase">Autonomous Decision Engine</h2>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed max-w-3xl">
                OpenClaw's Director Agent retains memory across all sessions—analyzing thumbnails, arrangements, and keywords. 
                Every dispatch is informed by the cumulative data of the 100-channel network.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <LogicCard 
                title="Beat Replication Rule" 
                logic={`if video.ctr > 5% and video.views > 10000:\n  director.queue("replicate", beat_style, count=3)\n  director.memo("copy arrangement, aesthetic, title")\n# Drake R&B CTR 8.2% → 3 auto-queued`}
                icon={Repeat}
              />
              <LogicCard 
                title="New Channel Creation" 
                logic={`if niche_agent.demand_score > 80 and no_channel:\n  director.create_channel(niche, genre, keyword)\n  director.assign_all_agents(new_channel)\n# SZA R&B demand spike → auto-created`}
                icon={Network}
              />
              <LogicCard 
                title="Upload Cadence Rule" 
                logic={`for channel in active_channels:\n  if channel.uploads_today < 2:\n    director.dispatch(channel, next_queued_prompt)\n# Maintains 2 beats/day per node automatically`}
                icon={Zap}
              />
              <LogicCard 
                title="Niche Pivot Rule" 
                logic={`if channel.subs > 10000:\n  director.expand_keywords(channel, related)\nif niche.volume < threshold and trending_alt:\n  director.pivot_niche(channel, new_keyword)`}
                icon={ArrowUpRight}
              />
            </div>

            <Card className="bg-card border-border/50 shadow-2xl">
              <CardHeader className="bg-primary/5 border-b border-border/50">
                <CardTitle className="text-xs font-bold uppercase text-primary flex items-center gap-2">
                  <Cpu className="w-4 h-4" /> Global Memory System
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid gap-8 md:grid-cols-3">
                  <MemoryNode title="Visual Hooks" desc="Retains high-CTR color palettes and compositions for DALL-E prompts." />
                  <MemoryNode title="Retention Beats" desc="Learns which BPM and instrumental structures keep AVD above 90%." />
                  <MemoryNode title="Niche Decay" desc="Monitors search volume velocity to predict when a niche is oversaturated." />
                </div>
              </CardContent>
            </Card>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

function LogicCard({ title, logic, icon: Icon }: any) {
  return (
    <Card className="bg-card border-border/50 shadow-lg overflow-hidden">
      <CardHeader className="pb-3 border-b border-border/50">
        <CardTitle className="text-[10px] font-bold uppercase text-muted-foreground flex items-center gap-2">
          <Icon className="w-3 h-3 text-primary" /> {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <pre className="p-4 font-mono text-[10px] leading-relaxed text-blue-400 bg-black/40 whitespace-pre-wrap">
          {logic}
        </pre>
      </CardContent>
    </Card>
  );
}

function MemoryNode({ title, desc }: any) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-bold text-foreground uppercase tracking-tight">{title}</p>
      <p className="text-[10px] text-muted-foreground leading-relaxed">{desc}</p>
    </div>
  );
}
