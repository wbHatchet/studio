
"use client";

import { useState } from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Target, Search, BarChart3, TrendingUp, Zap, Sparkles, Brain, Award, Activity, CalendarDays } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

export default function NicheIntelPage() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        <SidebarInset className="bg-background">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b border-border/50 px-4">
            <SidebarTrigger className="-ml-1" />
            <div className="h-4 w-px bg-border/50 mx-2" />
            <h1 className="font-headline font-bold text-xl uppercase text-primary tracking-tight">Intelligence & Roadmap</h1>
          </header>

          <main className="p-6 md:p-8 space-y-8 max-w-6xl mx-auto w-full">
            <Tabs defaultValue="index" className="space-y-8">
              <TabsList className="bg-secondary/50 p-1 border border-border/50 rounded-xl">
                <TabsTrigger value="index" className="gap-2 font-bold uppercase text-[10px] tracking-widest px-6">Micro-Niche Index</TabsTrigger>
                <TabsTrigger value="timeline" className="gap-2 font-bold uppercase text-[10px] tracking-widest px-6">Growth Timeline</TabsTrigger>
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
