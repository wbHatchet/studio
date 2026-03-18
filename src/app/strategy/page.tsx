
"use client";

import { useState } from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Target, 
  Search, 
  BarChart3, 
  TrendingUp, 
  Zap, 
  Sparkles, 
  Brain, 
  Award, 
  Activity, 
  CalendarDays,
  Copy,
  Flame,
  Terminal,
  MousePointer2,
  CheckCircle2,
  Lightbulb,
  ArrowRight
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const NICHE_DATA = [
  { name: 'Pop', score: 100, color: 'bg-primary', badge: 'Highest' },
  { name: 'R&B', score: 88, color: 'bg-blue-400', badge: 'Very High' },
  { name: 'Boom Bap', score: 78, color: 'bg-purple-400', badge: 'High' },
  { name: 'Soul / Trap Soul', score: 60, color: 'bg-amber-500', badge: 'Medium' },
  { name: 'Trap', score: 28, color: 'bg-muted-foreground', badge: 'Lowest' },
];

const TIMELINE = [
  { month: 'Month 1', title: 'Foundation', desc: 'Pick niche, 60 videos, connect Suno + DALL-E, build prompt sheet.', stats: '60 Videos · $0-$50' },
  { month: 'Month 2-3', title: 'Traction', desc: 'Study performing video, replicate format, first funnel.', stats: '300 Videos · $200-$1K' },
  { month: 'Month 4-6', title: 'Monetized', desc: 'YPP eligibility, 2nd micro-niche channel, email list.', stats: '600 Videos · $1K-$5K' },
  { month: 'Month 7-9', title: 'Scaling', desc: '3-5 channels, Director agent auto-replicates winning beats.', stats: '900 Videos · $3K-$10K' },
  { month: 'Month 10-12', title: 'Full Op', desc: 'Beat farm running, placements happening, funnels converting.', stats: '1,000+ Videos · $5K-$20K+' },
];

const VIRAL_PROMPT = `Act as a YouTube SEO expert for lofi music channels.

Generate 500 HIGH-RANKING YouTube tags for a lofi channel called "Harbor Moon Lofi Radio".

Rules:
- Focus on: lofi beats, study music, sleep music, relaxing music, rain sounds, coding music, chill beats
- Include variations of: "lofi", "study", "relax", "sleep", "focus", "rain", "night", "calm"
- Include long-tail keywords (3–6 words)
- Include trending phrases for 2026
- Include niche tags like: harbor, ocean, moon, night, cafe, cozy
- Mix high-competition + low-competition tags
- Avoid duplicates
- Format ALL tags in ONE line separated by commas
- Optimize for YouTube search + suggested algorithm

Goal: maximize discoverability, CTR, and suggested video traffic.`;

export default function StrategyPage() {
  const { toast } = useToast();

  const copyPrompt = () => {
    navigator.clipboard.writeText(VIRAL_PROMPT);
    toast({
      title: "Master Prompt Copied",
      description: "Paste this into ChatGPT or Claude to generate 500 tags.",
    });
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        <SidebarInset className="bg-background">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b border-border/50 px-4 backdrop-blur-md bg-background/80 sticky top-0 z-50">
            <SidebarTrigger className="-ml-1" />
            <div className="h-4 w-px bg-border/50 mx-2" />
            <div className="flex-1">
              <h1 className="font-headline font-bold text-xl uppercase text-primary tracking-tight">Intelligence & Roadmap</h1>
              <p className="text-[9px] text-muted-foreground uppercase font-bold tracking-widest">Industrial Strategy Cluster</p>
            </div>
          </header>

          <main className="p-6 md:p-8 space-y-8 max-w-6xl mx-auto w-full">
            <Tabs defaultValue="index" className="space-y-8">
              <TabsList className="bg-secondary/50 p-1 border border-border/50 rounded-xl">
                <TabsTrigger value="index" className="gap-2 font-bold uppercase text-[10px] tracking-widest px-6">Micro-Niche Index</TabsTrigger>
                <TabsTrigger value="timeline" className="gap-2 font-bold uppercase text-[10px] tracking-widest px-6">Growth Timeline</TabsTrigger>
                <TabsTrigger value="prompts" className="gap-2 font-bold uppercase text-[10px] tracking-widest px-6"><Flame className="w-3 h-3 text-orange-500" /> Master Prompts</TabsTrigger>
              </TabsList>

              <TabsContent value="index" className="space-y-8 m-0">
                <div className="grid gap-8 lg:grid-cols-2">
                  <Card className="bg-card border-border/50 shadow-xl">
                    <CardHeader>
                      <CardTitle className="font-headline text-primary uppercase text-xs tracking-widest">Genre Profitability Ranking</CardTitle>
                      <CardDescription>Industrial ranking by revenue potential (2026 Index)</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {NICHE_DATA.map((niche, idx) => (
                        <div key={niche.name} className="space-y-2">
                          <div className="flex justify-between items-end">
                            <div className="flex items-center gap-3">
                              <span className="text-[10px] font-mono text-muted-foreground">#0{idx + 1}</span>
                              <p className="text-xs font-bold uppercase">{niche.name}</p>
                            </div>
                            <Badge variant="outline" className={cn("text-[8px] border-0 bg-secondary px-2", niche.color.replace('bg-', 'text-'))}>
                              {niche.badge}
                            </Badge>
                          </div>
                          <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                            <div className={cn("h-full", niche.color)} style={{ width: `${niche.score}%` }} />
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card className="bg-card border-border/50 shadow-xl">
                    <CardHeader>
                      <CardTitle className="font-headline text-primary uppercase text-xs tracking-widest">Niche Selection Checklist</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <CheckItem label="Starts from profitable genre (R&B, Bap, Pop)" />
                      <CheckItem label="Competition has under 10K subscribers" />
                      <CheckItem label="Consistent views — not spike-reliant" />
                      <CheckItem label="More demand than current supply" />
                      <CheckItem label="Validated with VidIQ search score" />
                    </CardContent>
                  </Card>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <NicheSampleCard title="Old Drake x Take Care" genre="R&B" tags="sad drake, 2010 rnb" />
                  <NicheSampleCard title="J Cole x Forest Hills" genre="Boom Bap" tags="soulful, jid type" />
                  <NicheSampleCard title="6LACK x Trap Soul" genre="Trap Soul" tags="dark rnb, nighttime" />
                </div>
              </TabsContent>

              <TabsContent value="timeline" className="space-y-6 m-0">
                <Card className="bg-card border-border/50 shadow-2xl">
                  <CardHeader className="bg-primary/5 py-6">
                    <CardTitle className="font-headline text-lg uppercase tracking-tight">12-Month Road to Full Operation</CardTitle>
                    <CardDescription>Realistic roadmap using the 2 beats/day micro-niche strategy</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="divide-y divide-border/50">
                      {TIMELINE.map((item) => (
                        <div key={item.month} className="flex flex-col md:flex-row gap-4 p-6 hover:bg-secondary/10 transition-colors">
                          <div className="w-32 shrink-0">
                            <p className="text-[10px] font-bold text-primary uppercase tracking-widest">{item.month}</p>
                          </div>
                          <div className="flex-1 space-y-1">
                            <p className="font-headline font-bold text-foreground">{item.title}</p>
                            <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge variant="outline" className="text-[9px] font-mono border-primary/20 text-primary uppercase">{item.stats}</Badge>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="prompts" className="space-y-8 m-0">
                <div className="grid gap-8 lg:grid-cols-3">
                  <Card className="lg:col-span-2 bg-card border-orange-500/20 shadow-xl overflow-hidden rounded-3xl">
                    <CardHeader className="bg-orange-500/5 border-b border-orange-500/10">
                      <div className="flex justify-between items-center">
                        <div>
                          <CardTitle className="font-headline text-lg uppercase text-orange-400">🔥 30-Second AI Master Prompt</CardTitle>
                          <CardDescription className="text-[10px] font-bold uppercase tracking-widest">Generate 500 Viral Lofi Tags Instantly</CardDescription>
                        </div>
                        <Button variant="outline" size="sm" onClick={copyPrompt} className="h-8 border-orange-500/30 text-orange-400 hover:bg-orange-500/10">
                          <Copy className="w-3 h-3 mr-2" /> Copy Prompt
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="p-6 rounded-2xl bg-black/40 border border-white/5 font-mono text-xs leading-relaxed text-blue-300 whitespace-pre-wrap">
                        {VIRAL_PROMPT}
                      </div>
                      
                      <div className="mt-8 grid grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">🧠 Why This Works</h4>
                          <ul className="space-y-2">
                            <li className="flex gap-2 text-[11px] text-muted-foreground"><CheckCircle2 className="w-3 h-3 text-orange-400 shrink-0" /> Forces AI into SEO mode</li>
                            <li className="flex gap-2 text-[11px] text-muted-foreground"><CheckCircle2 className="w-3 h-3 text-orange-400 shrink-0" /> Mixes broad + niche tags</li>
                            <li className="flex gap-2 text-[11px] text-muted-foreground"><CheckCircle2 className="w-3 h-3 text-orange-400 shrink-0" /> Long-tail = easier ranking early</li>
                            <li className="flex gap-2 text-[11px] text-muted-foreground"><CheckCircle2 className="w-3 h-3 text-orange-400 shrink-0" /> Algorithm sees topic authority fast</li>
                          </ul>
                        </div>
                        <div className="space-y-3">
                          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">🧩 Simple Action Plan</h4>
                          <div className="space-y-3">
                            <div className="flex gap-3">
                              <span className="w-5 h-5 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center text-[10px] font-bold shrink-0">1</span>
                              <p className="text-[11px] text-muted-foreground">Run prompt in ChatGPT or Claude</p>
                            </div>
                            <div className="flex gap-3">
                              <span className="w-5 h-5 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center text-[10px] font-bold shrink-0">2</span>
                              <p className="text-[11px] text-muted-foreground">Copy all tags and pick top 30 per video</p>
                            </div>
                            <div className="flex gap-3">
                              <span className="w-5 h-5 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center text-[10px] font-bold shrink-0">3</span>
                              <p className="text-[11px] text-muted-foreground">Rotate keyword focus daily and upload consistently</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="space-y-6">
                    <Card className="bg-primary/5 border-primary/20 shadow-lg">
                      <CardHeader>
                        <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-primary flex items-center gap-2">
                          <Zap className="w-4 h-4" /> ⚡ Pro Upgrade
                        </CardTitle>
                        <CardDescription className="text-[10px] font-bold uppercase">Multi-Keyword Dominance</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <p className="text-[10px] font-bold uppercase text-muted-foreground">Step 1: Paste & Pick</p>
                            <p className="text-[11px] text-foreground leading-relaxed">Paste into YouTube Studio → pick top 25-40 highest relevance tags.</p>
                          </div>
                          <div className="space-y-2">
                            <p className="text-[10px] font-bold uppercase text-muted-foreground">Step 2: Rotate per Video</p>
                            <div className="p-3 rounded-xl bg-background/50 border border-border/50 space-y-2">
                              <p className="text-[10px] text-muted-foreground">Video 1 &rarr; focus <span className="text-primary font-bold">"study"</span></p>
                              <p className="text-[10px] text-muted-foreground">Video 2 &rarr; focus <span className="text-primary font-bold">"sleep"</span></p>
                              <p className="text-[10px] text-muted-foreground">Video 3 &rarr; focus <span className="text-primary font-bold">"rain"</span></p>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <p className="text-[10px] font-bold uppercase text-muted-foreground">Step 3: Dominance</p>
                            <p className="text-[11px] text-muted-foreground leading-relaxed">Repeat weekly to build topic authority across all 3 traffic lanes simultaneously.</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-card border-border/50">
                      <CardHeader>
                        <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
                          <Lightbulb className="w-4 h-4" /> 🚀 Power Move
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-[11px] text-muted-foreground leading-relaxed">
                          Run the prompt 3 times with specific variations like <span className="text-foreground font-bold">"study lofi"</span>, <span className="text-foreground font-bold">"sleep lofi"</span>, and <span className="text-foreground font-bold">"rain lofi"</span>. 
                          You now own 3 separate traffic lanes instead of one.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

function CheckItem({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center">
        <Zap className="w-2.5 h-2.5 text-primary" />
      </div>
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  );
}

function NicheSampleCard({ title, genre, tags }: any) {
  return (
    <Card className="bg-secondary/20 border-border/50 p-4 hover:border-primary/30 transition-all group">
      <div className="flex justify-between items-start mb-3">
        <p className="text-sm font-bold group-hover:text-primary transition-colors">{title}</p>
        <Badge variant="secondary" className="text-[8px] uppercase">{genre}</Badge>
      </div>
      <p className="text-[10px] text-muted-foreground italic mb-3">Tags: {tags}</p>
      <Button variant="ghost" size="sm" className="w-full h-7 text-[9px] uppercase font-bold border border-border/50 group-hover:bg-primary group-hover:text-primary-foreground">Analyze Demand</Button>
    </Card>
  );
}
