"use client";

import { useState } from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Sparkles, Target, TrendingUp, Layers, BookOpen, DollarSign, Repeat, Zap } from "lucide-react";
import { aiNicheStrategy } from "@/ai/flows/ai-niche-strategy";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

export default function StrategyPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    youtubeTrends: "Massive growth in AI job replacement tools and dark psychology tricks. 30s list formats are dominating.",
    competitionAnalysis: "Saturation in generic motivation; micro-learning and 'What Happens If' body facts show highest global gaps.",
    keywordData: "Searches for 'AI tool to replace Excel' and 'negotiation psychology' up 120% month-over-month.",
    includeFastestTo1M: true
  });

  async function handleAnalyze() {
    setLoading(true);
    try {
      const output = await aiNicheStrategy(formData);
      setResult(output);
      toast({ title: "Intelligence Calibrated", description: "Identified Top 7 growth niches for 2026." });
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Niche discovery failed." });
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
            <h1 className="font-headline font-bold text-xl uppercase tracking-tight text-primary">Niche Discovery Engine v10.0</h1>
          </header>

          <main className="p-6 md:p-8 space-y-8">
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="space-y-6">
                <Card className="bg-card">
                  <CardHeader>
                    <CardTitle className="font-headline text-lg flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-primary" />
                      1M+ Subscriber Intelligence
                    </CardTitle>
                    <CardDescription>Input signals to identify formats that hit 1M subs fast</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Platform Signals (Apify / TikTok / Reddit)</Label>
                      <Textarea 
                        placeholder="Paste trend snippets..."
                        value={formData.youtubeTrends}
                        onChange={(e) => setFormData({...formData, youtubeTrends: e.target.value})}
                        className="min-h-[100px] bg-secondary/30"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Competitive Landscape Gaps</Label>
                      <Textarea 
                        placeholder="Current saturation levels..."
                        value={formData.competitionAnalysis}
                        onChange={(e) => setFormData({...formData, competitionAnalysis: e.target.value})}
                        className="min-h-[100px] bg-secondary/30"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Keyword Velocity Data</Label>
                      <Input 
                        placeholder="Search volumes, CTR trends..."
                        value={formData.keywordData}
                        onChange={(e) => setFormData({...formData, keywordData: e.target.value})}
                        className="bg-secondary/30"
                      />
                    </div>
                    <Button 
                      className="w-full bg-primary text-primary-foreground font-bold h-12 shadow-lg"
                      onClick={handleAnalyze}
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Calibrating Growth Gaps...
                        </>
                      ) : (
                        <>
                          <Sparkles className="mr-2 h-4 w-4" />
                          Evaluate 7-Niche Grid
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-primary/5 border-primary/20">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xs font-bold uppercase text-primary flex items-center gap-2">
                      <Zap className="w-3 h-3" /> Viral Formula (30s)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-2 text-[10px] uppercase font-bold text-muted-foreground">
                      <div className="p-2 border border-border/50 rounded bg-secondary/30">0-2s: Curiosity Hook</div>
                      <div className="p-2 border border-border/50 rounded bg-secondary/30">2-12s: Explanation</div>
                      <div className="p-2 border border-border/50 rounded bg-secondary/30">12-25s: Reveal</div>
                      <div className="p-2 border border-border/50 rounded bg-secondary/30">25-30s: Loop Hook</div>
                    </div>
                    <p className="text-[10px] italic text-muted-foreground leading-relaxed pt-2">
                      "Target Metrics: Retention 90-120% | Likes 8%+ | 3 Shorts per channel daily."
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                {!result && !loading && (
                  <div className="flex flex-col items-center justify-center h-full text-center p-12 border-2 border-dashed border-border rounded-3xl opacity-50 min-h-[400px]">
                    <Target className="w-12 h-12 mb-4 text-muted-foreground" />
                    <p className="text-lg font-medium">Grid Strategy Idle</p>
                    <p className="text-sm text-muted-foreground">Calibrating for high-volume cross-platform distribution.</p>
                  </div>
                )}

                {loading && (
                   <div className="space-y-4 animate-pulse">
                     {[1, 2, 3].map(i => (
                       <div key={i} className="h-40 bg-secondary/30 rounded-2xl" />
                     ))}
                   </div>
                )}

                {result && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                    <Card className="bg-card border-primary/20">
                      <CardHeader className="bg-primary/5 flex flex-row items-center justify-between">
                        <CardTitle className="flex items-center gap-2 text-primary font-headline text-lg">
                          <Layers className="w-5 h-5" />
                          Master Stack Scoring
                        </CardTitle>
                        <Badge variant="outline" className="border-primary/20 text-primary">GRID_READY</Badge>
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
                                  Score: {niche.score}
                                </Badge>
                              </div>
                            </div>
                            <Progress value={niche.score} className="h-1.5" />
                            <div className="flex justify-between text-[10px] uppercase font-bold text-muted-foreground">
                              <span>Velocity: {niche.trendVelocity}</span>
                              <span>Stack: {niche.stackingPotential}</span>
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>

                    <Card className="bg-card border-blue-500/20">
                      <CardHeader className="bg-blue-500/5">
                        <CardTitle className="flex items-center gap-2 text-blue-400 font-headline text-lg">
                          <BookOpen className="w-5 h-5" />
                          Serialized Content Formula
                        </CardTitle>
                        <CardDescription>Series #1-20 compound views 400x faster</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-6 space-y-4">
                        {result.serializedSeriesIdeas.map((series: any, idx: number) => (
                          <div key={idx} className="p-3 rounded-lg border border-blue-500/10 bg-blue-500/5">
                            <div className="flex justify-between items-start mb-1">
                              <p className="text-xs font-bold text-blue-400">{series.seriesTitle}</p>
                              <Badge variant="outline" className="text-[8px] border-blue-500/30">REPLICATION_ENABLED</Badge>
                            </div>
                            <p className="text-[11px] text-muted-foreground italic leading-relaxed mb-2">"{series.concept}"</p>
                            <p className="text-[9px] text-blue-500/80 font-bold uppercase">Clone Logic: {series.viralMultiplier}</p>
                          </div>
                        ))}
                      </CardContent>
                    </Card>

                    <Card className="bg-card">
                      <CardHeader>
                        <CardTitle className="font-headline text-lg flex items-center gap-2">
                          <DollarSign className="w-5 h-5 text-green-500" /> Revenue Forecast ($30K-$100K Model)
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="grid grid-cols-3 gap-4">
                        <div className="p-3 rounded-xl bg-secondary/30 text-center">
                          <p className="text-[10px] font-bold text-muted-foreground uppercase">Ad Rev (Partner)</p>
                          <p className="text-sm font-bold text-primary mt-1">{result.suggestedMonetization.adRevenueEst}</p>
                        </div>
                        <div className="p-3 rounded-xl bg-secondary/30 text-center">
                          <p className="text-[10px] font-bold text-muted-foreground uppercase">Affiliate (Stack)</p>
                          <p className="text-sm font-bold text-green-500 mt-1">{result.suggestedMonetization.affiliateNiche}</p>
                        </div>
                        <div className="p-3 rounded-xl bg-secondary/30 text-center">
                          <p className="text-[10px] font-bold text-muted-foreground uppercase">Micro-Deals</p>
                          <p className="text-sm font-bold text-orange-400 mt-1">{result.suggestedMonetization.brandDealPotential}</p>
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
