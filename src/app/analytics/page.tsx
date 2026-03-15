"use client";

import { useState, useEffect } from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Loader2, TrendingUp, Target, Sparkles, BrainCircuit, DollarSign, LineChart, RefreshCw, Zap, Rocket } from "lucide-react";
import { aiPerformanceFeedback, AiPerformanceFeedbackOutput } from "@/ai/flows/ai-performance-feedback-flow";
import { PerformanceChart } from "@/components/analytics/performance-chart";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";

export default function AnalyticsPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AiPerformanceFeedbackOutput | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const [formData, setFormData] = useState({
    channelNiche: "Multi-Channel Cash-Cow Network",
    currentContentStrategy: "2 videos/day across 10 channels. Niche stacking in Luxury, Facts, and Mystery.",
    performanceData: [
      { title: "Billionaire Habit #1", views: 420000, ctr: 12.5, watchTimeMinutes: 125000, beatSales: 0, publicationDate: "2024-05-10" },
      { title: "Mystery of the Void", views: 82000, ctr: 8.2, watchTimeMinutes: 28000, beatSales: 0, publicationDate: "2024-05-12" },
      { title: "Unbelievable Fact", views: 150000, ctr: 9.1, watchTimeMinutes: 52000, beatSales: 0, publicationDate: "2024-05-15" },
    ],
    totalViewsThisWeek: 850000,
    totalBeatSalesThisWeek: 0
  });

  async function handleAnalyze() {
    setLoading(true);
    try {
      const output = await aiPerformanceFeedback(formData);
      setResult(output);
    } catch (error) {
      toast({ title: "Error", description: "Failed to process performance data." });
    } finally {
      setLoading(false);
    }
  }

  if (!isMounted) return null;

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <SidebarInset className="bg-background">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b border-border/50 px-4">
            <SidebarTrigger className="-ml-1" />
            <div className="h-4 w-px bg-border/50 mx-2" />
            <h1 className="font-headline font-bold text-xl">Cash-Cow Intelligence Hub</h1>
          </header>

          <main className="p-6 md:p-8 space-y-8">
            <div className="grid gap-6 md:grid-cols-4">
              <Card className="bg-card border-green-500/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs font-bold uppercase text-muted-foreground flex items-center gap-2">
                    <DollarSign className="w-3 h-3 text-green-500" /> Est. Net Revenue
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold font-headline">$42,450.00</div>
                  <p className="text-[10px] text-muted-foreground mt-1">+24% revenue velocity</p>
                </CardContent>
              </Card>
              <Card className="bg-card border-blue-500/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs font-bold uppercase text-muted-foreground flex items-center gap-2">
                    <LineChart className="w-3 h-3 text-blue-500" /> Avg View Duration
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold font-headline">92.4%</div>
                  <p className="text-[10px] text-muted-foreground mt-1">Goal: 85-120%</p>
                </CardContent>
              </Card>
              <Card className="bg-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs font-bold uppercase text-muted-foreground flex items-center gap-2">
                    <BrainCircuit className="w-3 h-3 text-primary" /> Learning Engine
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold font-headline text-primary">SCALING</div>
                  <p className="text-[10px] text-muted-foreground mt-1">Niche Shift: Facts → Luxury</p>
                </CardContent>
              </Card>
              <Card className="bg-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs font-bold uppercase text-muted-foreground flex items-center gap-2">
                    <Zap className="w-3 h-3 text-orange-400" /> Swipe Rate
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold font-headline">12.1%</div>
                  <p className="text-[10px] text-muted-foreground mt-1">Target: &lt;20%</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-6">
                <Card className="bg-card">
                  <CardHeader>
                    <CardTitle className="font-headline flex items-center gap-2">
                      <Target className="w-5 h-5 text-primary" />
                      Revenue Model Tracking
                    </CardTitle>
                    <CardDescription>Monetization layers across the channel stack</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="p-4 rounded-xl bg-secondary/30 border border-border">
                        <p className="text-[10px] font-bold uppercase text-muted-foreground mb-1">Shorts Ads</p>
                        <p className="text-lg font-bold font-headline text-primary">$12.4K</p>
                      </div>
                      <div className="p-4 rounded-xl bg-secondary/30 border border-border">
                        <p className="text-[10px] font-bold uppercase text-muted-foreground mb-1">Affiliates</p>
                        <p className="text-lg font-bold font-headline text-green-500">$18.2K</p>
                      </div>
                      <div className="p-4 rounded-xl bg-secondary/30 border border-border">
                        <p className="text-[10px] font-bold uppercase text-muted-foreground mb-1">Brand Deals</p>
                        <p className="text-lg font-bold font-headline text-orange-400">$11.8K</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Active Strategy Pattern</Label>
                      <Textarea 
                        value={formData.currentContentStrategy}
                        onChange={(e) => setFormData({...formData, currentContentStrategy: e.target.value})}
                        className="bg-secondary/30 min-h-[100px]"
                      />
                    </div>
                    <Button 
                      className="w-full bg-primary text-primary-foreground font-bold h-12"
                      onClick={handleAnalyze}
                      disabled={loading}
                    >
                      {loading ? <Loader2 className="animate-spin mr-2" /> : <RefreshCw className="mr-2 h-4 w-4" />}
                      Re-Retrain Viral Scaling Loop
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-card">
                  <CardHeader>
                    <CardTitle className="font-headline">Network Retention Matrix</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <PerformanceChart />
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="bg-card border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-sm font-bold uppercase flex items-center gap-2">
                      <Rocket className="w-4 h-4 text-primary" /> Scaling Roadmap
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-3">
                      <div className="flex justify-between text-[10px] font-bold uppercase text-muted-foreground">
                        <span>Month 3 Target (10 CH)</span>
                        <span>85%</span>
                      </div>
                      <Progress value={85} className="h-1.5" />
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between text-[10px] font-bold uppercase text-muted-foreground">
                        <span>Month 6 Target (20 CH)</span>
                        <span>42%</span>
                      </div>
                      <Progress value={42} className="h-1.5" />
                    </div>
                    <div className="p-4 bg-primary/5 rounded-xl border border-primary/10 italic text-xs leading-relaxed text-muted-foreground">
                      "System has detected 'Billionaire Morning Routines' as the primary viral multiplier. Initiating 10 variant renders for node cluster 4."
                    </div>
                  </CardContent>
                </Card>

                {result && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                    <Card className="bg-card">
                      <CardHeader className="bg-primary/5">
                        <CardTitle className="flex items-center gap-2 text-primary font-headline text-sm">
                          <Sparkles className="w-4 h-4" />
                          Viral Multiplier Insights
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <p className="text-xs leading-relaxed text-muted-foreground">{result.summaryAnalysis}</p>
                      </CardContent>
                    </Card>

                    <Card className="bg-card">
                      <CardHeader>
                        <CardTitle className="text-sm font-headline">Niche Stacking Adjustments</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {result.strategyImprovements.map((improvement, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-[11px] p-2 rounded-lg bg-blue-500/5 border border-blue-500/10">
                              <Target className="w-3 h-3 text-blue-500 mt-0.5 shrink-0" />
                              {improvement}
                            </div>
                          ))}
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
