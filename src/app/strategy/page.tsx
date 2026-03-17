"use client";

import { useState } from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Target, Search, BarChart3, TrendingUp, Zap, Sparkles, Brain, Award, Activity } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const NICHE_DATA = [
  { name: 'AI tools & automation', emoji: '🤖', desc: 'Highest CPM on YouTube. Every new AI tool is a video. Massive interest from software companies.', ex: ['"5 AI tools that replace your job"', '"AI that writes emails for you"', '"ChatGPT secrets nobody uses"'], cpm: '$10–$20', grow: 96, comp: 50, ai: 98, ret: 82 },
  { name: 'Body & health facts', emoji: '🧬', desc: 'High-retention curiosity hooks. "What happens if..." format is instantly compelling.', ex: ['"What if you stop drinking water"', '"What happens in your brain during sleep"'], cpm: '$6–$12', grow: 78, comp: 28, ai: 84, ret: 92 },
  { name: 'Luxury & billionaires', emoji: '💰', desc: 'Aspiration + curiosity = most viral emotional combo. Jeff Bezos, yachts, daily routines.', ex: ['"Jeff Bezos daily routine"', '"Inside a $400M yacht"'], cpm: '$7–$15', grow: 88, comp: 50, ai: 80, ret: 84 },
  { name: 'Micro-learning & facts', emoji: '🧠', desc: 'Viewers prefer quick-learning. Psychology tricks, science facts, money habits in 60s.', ex: ['"3 psychology tricks for status"', '"History in 30 seconds: Rome"'], cpm: '$5–$10', grow: 74, comp: 26, ai: 96, ret: 76 },
  { name: 'Transformation', emoji: '⚡', desc: 'Algorithm specifically rewards before→after content. Clean room, wealth transformation.', ex: ['"Dirty room → clean in 60 seconds"', '"$0 to first $10K journey"'], cpm: '$4–$9', grow: 86, comp: 48, ai: 74, ret: 90 },
];

export default function NicheIntelPage() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const activeNiche = NICHE_DATA[selectedIdx];

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        <SidebarInset className="bg-background">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b border-border/50 px-4">
            <SidebarTrigger className="-ml-1" />
            <div className="h-4 w-px bg-border/50 mx-2" />
            <div className="flex-1">
              <h1 className="font-headline font-bold text-xl uppercase text-primary">Niche Intelligence</h1>
              <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">7 fastest-growing niches in 2026 — click to explore</p>
            </div>
          </header>

          <main className="p-6 md:p-8 space-y-8 max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {NICHE_DATA.map((niche, idx) => (
                <button 
                  key={niche.name}
                  onClick={() => setSelectedIdx(idx)}
                  className={cn(
                    "p-4 rounded-2xl border transition-all text-center group",
                    selectedIdx === idx 
                      ? "border-primary bg-primary/10 shadow-lg shadow-primary/10" 
                      : "border-border/50 hover:border-primary/30 bg-secondary/20"
                  )}
                >
                  <span className="text-2xl mb-2 block">{niche.emoji}</span>
                  <p className="text-[10px] font-bold uppercase text-foreground leading-tight">{niche.name}</p>
                  <p className={cn(
                    "text-[9px] mt-1 font-bold",
                    selectedIdx === idx ? "text-primary" : "text-green-500/70"
                  )}>{niche.cpm} CPM</p>
                </button>
              ))}
            </div>

            <Card className="bg-card border-border/50 shadow-2xl overflow-hidden">
              <div className="grid md:grid-cols-2">
                <div className="p-8 space-y-6 border-r border-border/50">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-headline font-bold text-foreground">{activeNiche.name}</h2>
                    <p className="text-xs leading-relaxed text-muted-foreground italic">"{activeNiche.desc}"</p>
                  </div>

                  <div className="space-y-3">
                    <p className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Example Shorts Strategy</p>
                    <div className="space-y-2">
                      {activeNiche.ex.map((ex, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-secondary/30 border border-border/50 text-[11px] font-medium">
                          <span className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-[9px] font-bold">{i+1}</span>
                          {ex}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-8 bg-secondary/10 space-y-6">
                  <p className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Niche Scorecard (Algorithm Index)</p>
                  <div className="space-y-5">
                    <ScoreRow label="CPM Potential" value={activeNiche.cpm} progress={activeNiche.grow * 0.9} color="bg-primary" />
                    <ScoreRow label="Growth Rate" value="Explosive" progress={activeNiche.grow} color="bg-blue-400" />
                    <ScoreRow label="Competition (Low = Better)" value="Medium" progress={100 - activeNiche.comp} color="bg-amber-500" />
                    <ScoreRow label="AI-Friendliness" value="Perfect" progress={activeNiche.ai} color="bg-primary" />
                    <ScoreRow label="Retention Index" value="High" progress={activeNiche.ret} color="bg-green-500" />
                  </div>
                </div>
              </div>
            </Card>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-primary/5 border-primary/20 p-6">
                <Target className="w-6 h-6 text-primary mb-3" />
                <h3 className="text-[11px] font-bold uppercase text-primary mb-1">Profit Validation</h3>
                <p className="text-[10px] text-muted-foreground leading-relaxed">System only pushes ideas with &gt;$8 CPM potential and &lt;10K competitor average sub count.</p>
              </Card>
              <Card className="bg-blue-400/5 border-blue-400/20 p-6">
                <Brain className="w-6 h-6 text-blue-400 mb-3" />
                <h3 className="text-[11px] font-bold uppercase text-blue-400 mb-1">Agent Strategy</h3>
                <p className="text-[10px] text-muted-foreground leading-relaxed">Director Agent uses "Curiosity Gaps" to force retention scores above the 90% viral threshold.</p>
              </Card>
              <Card className="bg-amber-500/5 border-amber-500/20 p-6">
                <Zap className="w-6 h-6 text-amber-500 mb-3" />
                <h3 className="text-[11px] font-bold uppercase text-amber-500 mb-1">Viral Replication</h3>
                <p className="text-[10px] text-muted-foreground leading-relaxed">If any niche node hits 1M views, the system autonomously deploys 10 micro-niche sub-channels.</p>
              </Card>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

function ScoreRow({ label, value, progress, color }: any) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-end text-[10px] font-bold uppercase">
        <span className="text-muted-foreground">{label}</span>
        <span className="text-foreground">{value}</span>
      </div>
      <Progress value={progress} className={cn("h-1.5 bg-border/50", color)} />
    </div>
  );
}