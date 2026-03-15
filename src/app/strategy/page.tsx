
"use client";

import { useState } from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Sparkles, Target, TrendingUp, Layers, BookOpen, DollarSign, Zap, Brain, Search, Activity } from "lucide-react";
import { aiNicheStrategy } from "@/ai/flows/ai-niche-strategy";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

export default function StrategyPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    youtubeTrends: "High chatter about AI job replacement tools and dark psychology tricks. 30s twist/loop formats are dominating the FYP.",
    competitionAnalysis: "Gaps identified in 'Future Tech' and 'Money Facts' for global audiences. Language-agnostic visual satiation is scaling fast.",
    keywordData: "Searches for 'AI website builder' and 'manipulation hacks' up 300% week-over-month.",
    includeFastestTo1M: true
  });

  async function handleAnalyze() {
    setLoading(true);
    try {
      const output = await aiNicheStrategy(formData);
      setResult(output);
      toast({ title: "Blueprint Intelligence Calibrated", description: "Network targets set for $1M/year growth." });
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Strategy discovery failed." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <SidebarInset className="bg-background">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b border-border/50 px-4">
            <SidebarTrigger className="-ml-1" />
            <div className="h-4 w-px bg-border/50 mx-2" />
            <h1 className="font-headline font-bold text-xl uppercase tracking-tight text-primary">Intelligence Hub (12-Agent Cluster)</h1>
          </header>

          <main className="p-6 md:p-8 space-y-8">
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="space-y-6">
                <Card className="bg-card">
                  <CardHeader>
                    <CardTitle className="font-headline text-lg flex items-center gap-2">
                      <Search className="w-5 h-5 text-primary" />
                      Keyword Intelligence Agent
                    </CardTitle>
                    <CardDescription>Scans Google Trends & VidIQ for low-competition gaps</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Trending Keywords (VidIQ Scan)</Label>
                      <Input 
                        placeholder="Search volumes, CTR trends..."
                        value={formData.keywordData}
                        onChange={(e) => setFormData({...formData, keywordData: e.target.value})}
                        className="bg-secondary/30"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Trend Prediction Signals</Label>
                      <Textarea 
                        placeholder="Paste trend snippets..."
                        value={formData.youtubeTrends}
                        onChange={(e) => setFormData({...formData, youtubeTrends: e.target.value})}
                        className="min-h-[100px] bg-secondary/30"
                      />
                    </div>
                    <Button 
                      className="w-full bg-primary text-primary-foreground font-bold h-12 shadow-lg uppercase tracking-widest text-[10px]"
                      onClick={handleAnalyze}
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Calibrating Intel...
                        </>
                      ) : (
                        <>
                          <Sparkles className="mr-2 h-4 w-4" />
                          Execute Market Analysis
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-primary/5 border-primary/20 shadow-xl overflow-hidden">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xs font-bold uppercase text-primary flex items-center gap-2">
                      <Activity className="w-3 h-3" /> Retention Blueprint (95%+ Target)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 border border-primary/20 rounded-xl bg-background/50 space-y-1">
                        <p className="text-[10px] font-bold text-primary uppercase">0-2s: Shock Hook</p>
                        <p className="text-[9px] text-muted-foreground leading-tight italic">"Stop the scroll immediately."</p>
                      </div>
                      <div className="p-3 border border-border/50 rounded-xl bg-secondary/30 space-y-1">
                        <p className="text-[10px] font-bold text-foreground uppercase">2-10s: Curiosity Gap</p>
                        <p className="text-[9px] text-muted-foreground leading-tight italic">"Force viewer to stay."</p>
                      </div>
                      <div className="p-3 border border-border/50 rounded-xl bg-secondary/30 space-y-1">
                        <p className="text-[10px] font-bold text-foreground uppercase">10-20s: Value Reveal</p>
                        <p className="text-[9px] text-muted-foreground leading-tight italic">"Fast dopamine hits."</p>
                      </div>
                      <div className="p-3 border border-primary/20 rounded-xl bg-background/50 space-y-1">
                        <p className="text-[10px] font-bold text-primary uppercase">20-30s: Twist + Loop</p>
                        <p className="text-[9px] text-muted-foreground leading-tight italic">"Trigger binge-watching."</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                {!result && !loading && (
                  <div className="flex flex-col items-center justify-center h-full text-center p-12 border-2 border-dashed border-border rounded-3xl opacity-50 min-h-[400px]">
                    <Target className="w-12 h-12 mb-4 text-muted-foreground" />
                    <p className="text-lg font-medium">Growth Engine Idle</p>
                    <p className="text-sm text-muted-foreground">Ready to scan for viral high-CPM content gaps.</p>
                  </div>
                )}

                {result && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                    <Card className="bg-card border-primary/20">
                      <CardHeader className="bg-primary/5 flex flex-row items-center justify-between">
                        <CardTitle className="flex items-center gap-2 text-primary font-headline text-lg">
                          <Layers className="w-5 h-5" />
                          Network Asset Scoring
                        </CardTitle>
                        <Badge variant="outline" className="border-primary/20 text-primary uppercase font-mono text-[10px]">BLUEPRINT_V12</Badge>
                      </CardHeader>
                      <CardContent className="pt-6 space-y-6">
                        {result.suggestedMicroNiches.map((niche: any, idx: number) => (
                          <div key={idx} className="space-y-2 p-4 rounded-xl bg-secondary/20 border border-border">
                            <div className="flex justify-between items-center">
                              <div>
                                <h4 className="font-bold text-sm">{niche.name}</h4>
                                <p className="text-[10px] text-primary font-bold uppercase">{niche.growthFormat}</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] font-mono font-bold text-green-500">{niche.cpmEstimate} CPM</span>
                                <Badge className="bg-primary text-primary-foreground text-[9px] uppercase">
                                  Index: {niche.score}
                                </Badge>
                              </div>
                            </div>
                            <Progress value={niche.score} className="h-1.5" />
                          </div>
                        ))}
                      </CardContent>
                    </Card>

                    <Card className="bg-card border-blue-500/20">
                      <CardHeader className="bg-blue-500/5">
                        <CardTitle className="flex items-center gap-2 text-blue-400 font-headline text-lg">
                          <BookOpen className="w-5 h-5" />
                          Trend Prediction Node
                        </CardTitle>
                        <CardDescription>Binge-watch behavior triggers algorithm amplification</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-6 space-y-4">
                        {result.serializedSeriesIdeas.map((series: any, idx: number) => (
                          <div key={idx} className="p-3 rounded-lg border border-blue-500/10 bg-blue-500/5">
                            <p className="text-xs font-bold text-blue-400">{series.seriesTitle}</p>
                            <p className="text-[11px] text-muted-foreground italic leading-relaxed mt-1">"{series.concept}"</p>
                          </div>
                        ))}
                      </CardContent>
                    </Card>

                    <Card className="bg-card">
                      <CardHeader>
                        <CardTitle className="font-headline text-lg flex items-center gap-2">
                          <DollarSign className="w-5 h-5 text-green-500" /> Monetization Forecast
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="grid grid-cols-3 gap-4">
                        <div className="p-3 rounded-xl bg-secondary/30 text-center">
                          <p className="text-[10px] font-bold text-muted-foreground uppercase">AdSense</p>
                          <p className="text-sm font-bold text-primary mt-1">$20K/mo</p>
                        </div>
                        <div className="p-3 rounded-xl bg-secondary/30 text-center">
                          <p className="text-[10px] font-bold text-muted-foreground uppercase">Affiliate</p>
                          <p className="text-sm font-bold text-green-500 mt-1">$30K/mo</p>
                        </div>
                        <div className="p-3 rounded-xl bg-secondary/30 text-center">
                          <p className="text-[10px] font-bold text-muted-foreground uppercase">Sponsors</p>
                          <p className="text-sm font-bold text-orange-400 mt-1">$30K/mo</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
