"use client";

import { useState } from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Sparkles, Target, Zap, TrendingUp, BarChart3, Layers, BookOpen, DollarSign } from "lucide-react";
import { aiNicheStrategy } from "@/ai/flows/ai-niche-strategy";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

export default function StrategyPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    youtubeTrends: "High interest in AI tools, curiosity-driven medical explainers, and serialized 'Rich Habits' content.",
    competitionAnalysis: "Generic niches are saturated; micro-learning and mystery storytelling show high growth with low production friction.",
    keywordData: "Searches for 'AI tools to replace job' and 'body hack psychology' up 55% month-over-month.",
    includeFastest2026Niches: true
  });

  async function handleAnalyze() {
    setLoading(true);
    try {
      const output = await aiNicheStrategy(formData);
      setResult(output);
      toast({ title: "Analysis Complete", description: "Identified 2026 growth opportunities." });
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Niche analysis failed." });
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
            <h1 className="font-headline font-bold text-xl uppercase tracking-tight text-primary">Niche Discovery Engine v5.1</h1>
          </header>

          <main className="p-6 md:p-8 space-y-8">
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="space-y-6">
                <Card className="bg-card">
                  <CardHeader>
                    <CardTitle className="font-headline text-lg flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-primary" />
                      2026 Market Intelligence
                    </CardTitle>
                    <CardDescription>Input data to identify 400x view compounding gaps</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Trend Signals (TikTok/Reddit/Google)</Label>
                      <Textarea 
                        placeholder="Paste trend snippets..."
                        value={formData.youtubeTrends}
                        onChange={(e) => setFormData({...formData, youtubeTrends: e.target.value})}
                        className="min-h-[100px] bg-secondary/30"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Competitive Landscape</Label>
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
                          Analyzing Compound Gaps...
                        </>
                      ) : (
                        <>
                          <Sparkles className="mr-2 h-4 w-4" />
                          Evaluate 7-Niche Stack
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-primary/5 border-primary/20">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xs font-bold uppercase text-primary">Strategy Idea: 60 Second Knowledge</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs italic text-muted-foreground leading-relaxed">
                      "A multi-topic hybrid channel stacking Body Facts, Psychology, Money habits, and AI tools. Upload frequency: 3 Shorts/day. Compound velocity: EXTREME."
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                {!result && !loading && (
                  <div className="flex flex-col items-center justify-center h-full text-center p-12 border-2 border-dashed border-border rounded-3xl opacity-50 min-h-[400px]">
                    <Target className="w-12 h-12 mb-4 text-muted-foreground" />
                    <p className="text-lg font-medium">Discovery Engine Idle</p>
                    <p className="text-sm text-muted-foreground">Identifying niches with High Stacking & Serialized compounding potential.</p>
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
                          Niche Opportunity Scoring
                        </CardTitle>
                        <Badge variant="outline" className="border-primary/20 text-primary">v2026.5</Badge>
                      </CardHeader>
                      <CardContent className="pt-6 space-y-6">
                        {result.suggestedMicroNiches.map((niche: any, idx: number) => (
                          <div key={idx} className="space-y-2 p-4 rounded-xl bg-secondary/20 border border-border">
                            <div className="flex justify-between items-center">
                              <h4 className="font-bold text-sm">{niche.name}</h4>
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
                          Serialized Series Formula
                        </CardTitle>
                        <CardDescription>Series compound 400x faster than one-offs</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-6 space-y-4">
                        {result.serializedSeriesIdeas.map((series: any, idx: number) => (
                          <div key={idx} className="p-3 rounded-lg border border-blue-500/10 bg-blue-500/5">
                            <p className="text-xs font-bold text-blue-400 mb-1">{series.seriesTitle}</p>
                            <p className="text-[11px] text-muted-foreground italic leading-relaxed">"{series.concept}"</p>
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
                          <p className="text-[10px] font-bold text-muted-foreground uppercase">Ad Revenue</p>
                          <p className="text-sm font-bold text-primary mt-1">{result.suggestedMonetization.adRevenueEst}</p>
                        </div>
                        <div className="p-3 rounded-xl bg-secondary/30 text-center">
                          <p className="text-[10px] font-bold text-muted-foreground uppercase">Affiliate</p>
                          <p className="text-sm font-bold text-green-500 mt-1">{result.suggestedMonetization.affiliateNiche}</p>
                        </div>
                        <div className="p-3 rounded-xl bg-secondary/30 text-center">
                          <p className="text-[10px] font-bold text-muted-foreground uppercase">Brand Deals</p>
                          <p className="text-sm font-bold text-orange-400 mt-1">{result.suggestedMonetization.brandDealPotential}</p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-card">
                      <CardHeader>
                        <CardTitle className="font-headline text-lg flex items-center gap-2">
                          <Sparkles className="w-5 h-5 text-primary" /> Actionable Insights
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-xs leading-relaxed text-muted-foreground whitespace-pre-wrap italic bg-secondary/20 p-4 rounded-xl">
                          "{result.actionableInsights}"
                        </p>
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
