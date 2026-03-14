
"use client";

import { useState } from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Sparkles, Target, Users, Zap } from "lucide-react";
import { aiNicheStrategy, AiNicheStrategyOutput } from "@/ai/flows/ai-niche-strategy";
import { Badge } from "@/components/ui/badge";

export default function StrategyPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AiNicheStrategyOutput | null>(null);
  const [formData, setFormData] = useState({
    youtubeTrends: "Rainy jazz lofi is trending, specifically focused on nighttime city vibes.",
    competitionAnalysis: "High competition for generic study beats, low competition for niche localized lofi (e.g. Japanese countryside).",
    keywordData: "Searches for '4K rainy window lofi' and 'deep work lofi' are up 40% month-over-month.",
  });

  async function handleAnalyze() {
    setLoading(true);
    try {
      const output = await aiNicheStrategy(formData);
      setResult(output);
    } catch (error) {
      console.error(error);
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
            <h1 className="font-headline font-bold text-xl">Micro-Niche Strategist</h1>
          </header>

          <main className="p-6 md:p-8 space-y-8">
            <div className="grid gap-8 lg:grid-cols-2">
              <Card className="bg-card h-fit">
                <CardHeader>
                  <CardTitle className="font-headline">Market Input</CardTitle>
                  <CardDescription>Provide current trends and data for AI analysis</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="trends">YouTube Trends</Label>
                    <Textarea 
                      id="trends" 
                      placeholder="What's trending in Lo-Fi?"
                      value={formData.youtubeTrends}
                      onChange={(e) => setFormData({...formData, youtubeTrends: e.target.value})}
                      className="min-h-[100px] bg-secondary/30"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="comp">Competition Analysis</Label>
                    <Textarea 
                      id="comp" 
                      placeholder="What is the competitive landscape like?"
                      value={formData.competitionAnalysis}
                      onChange={(e) => setFormData({...formData, competitionAnalysis: e.target.value})}
                      className="min-h-[100px] bg-secondary/30"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="keywords">Keyword Data</Label>
                    <Input 
                      id="keywords" 
                      placeholder="Search volumes, VidIQ insights, etc."
                      value={formData.keywordData}
                      onChange={(e) => setFormData({...formData, keywordData: e.target.value})}
                      className="bg-secondary/30"
                    />
                  </div>
                  <Button 
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold"
                    onClick={handleAnalyze}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Analyzing Markets...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Generate Strategy
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              <div className="space-y-6">
                {!result && !loading && (
                  <div className="flex flex-col items-center justify-center h-full text-center p-12 border-2 border-dashed border-border rounded-3xl opacity-50">
                    <Target className="w-12 h-12 mb-4 text-muted-foreground" />
                    <p className="text-lg font-medium">Ready for Insight Engine</p>
                    <p className="text-sm text-muted-foreground">Input your market data to discover profitable micro-niches.</p>
                  </div>
                )}

                {loading && (
                   <div className="space-y-4 animate-pulse">
                     {[1, 2, 3].map(i => (
                       <div key={i} className="h-32 bg-secondary/30 rounded-2xl" />
                     ))}
                   </div>
                )}

                {result && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                    <Card className="bg-card border-primary/20">
                      <CardHeader className="bg-primary/5">
                        <CardTitle className="flex items-center gap-2 text-primary font-headline">
                          <Zap className="w-5 h-5" />
                          Suggested Micro-Niches
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <div className="flex flex-wrap gap-2">
                          {result.suggestedMicroNiches.map((niche, idx) => (
                            <Badge key={idx} variant="secondary" className="px-3 py-1 text-sm bg-primary/10 text-primary border-primary/20">
                              {niche}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-card">
                      <CardHeader>
                        <CardTitle className="font-headline text-lg">Thematic Concepts</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          {result.suggestedThematicConcepts.map((concept, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-sm">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                              {concept}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="bg-card">
                      <CardHeader>
                        <CardTitle className="font-headline text-lg">Actionable Insights</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm leading-relaxed text-muted-foreground whitespace-pre-wrap">
                          {result.actionableInsights}
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
