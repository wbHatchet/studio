
"use client";

import { useState, useEffect } from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, Target, Sparkles, DollarSign, LineChart, RefreshCw, Rocket, BookOpen, Repeat, Activity, TrendingUp } from "lucide-react";
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
    channelNiche: "Enterprise Network (104 Asset Nodes)",
    currentContentStrategy: "1,800 videos/mo. Viral replication (1M threshold). 30s twist/loop structure.",
    performanceData: [
      { title: "AI Tools #42", views: 1200000, ctr: 14.2, watchTimeMinutes: 450000, beatSales: 0, publicationDate: "2024-06-01" },
      { title: "Body Facts Series #12", views: 850000, ctr: 11.5, watchTimeMinutes: 320000, beatSales: 0, publicationDate: "2024-06-02" },
      { title: "Future Tech #8", views: 420000, ctr: 9.8, watchTimeMinutes: 120000, beatSales: 0, publicationDate: "2024-06-03" },
    ],
    totalViewsThisWeek: 84250000,
    totalBeatSalesThisWeek: 0
  });

  async function handleAnalyze() {
    setLoading(true);
    try {
      const output = await aiPerformanceFeedback(formData);
      setResult(output);
      toast({ title: "Retention Data Analyzed", description: "Video Retention Agent sync complete." });
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Failed to process intelligence data." });
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
            <h1 className="font-headline font-bold text-xl uppercase tracking-tighter text-primary">Retention & Monetization Hub</h1>
          </header>

          <main className="p-6 md:p-8 space-y-8">
            <div className="grid gap-6 md:grid-cols-4">
              <Card className="bg-card border-green-500/20 shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs font-bold uppercase text-muted-foreground flex items-center gap-2">
                    <DollarSign className="w-3 h-3 text-green-500" /> AdSense Velocity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold font-headline">$84,250.00</div>
                  <p className="text-[10px] text-green-500 mt-1 uppercase font-bold tracking-widest">Goal: $1M/Year ($80K/mo)</p>
                </CardContent>
              </Card>
              <Card className="bg-card border-blue-500/20 shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs font-bold uppercase text-muted-foreground flex items-center gap-2">
                    <Activity className="w-3 h-3 text-blue-500" /> Avg. Retention
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold font-headline text-blue-400">114.2%</div>
                  <p className="text-[10px] text-muted-foreground mt-1 uppercase font-bold tracking-widest">Target Metric: &gt;95%</p>
                </CardContent>
              </Card>
              <Card className="bg-card border-primary/20 shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs font-bold uppercase text-muted-foreground flex items-center gap-2">
                    <TrendingUp className="w-3 h-3 text-primary" /> CTR Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold font-headline text-primary">12.4%</div>
                  <p className="text-[10px] text-muted-foreground mt-1 uppercase font-bold tracking-widest">Thumbnail AI Optimized</p>
                </CardContent>
              </Card>
              <Card className="bg-card shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs font-bold uppercase text-muted-foreground flex items-center gap-2">
                    <Repeat className="w-3 h-3 text-orange-400" /> Replay Ratio
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold font-headline">28.5%</div>
                  <p className="text-[10px] text-muted-foreground mt-1 uppercase font-bold tracking-widest">Loop Hook Success</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-6">
                <Card className="bg-card border-border/50">
                  <CardHeader>
                    <CardTitle className="font-headline flex items-center gap-2 text-primary">
                      <Target className="w-5 h-5" />
                      Video Retention Agent
                    </CardTitle>
                    <CardDescription>Analyzing drop-off points to optimize future content</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="p-4 rounded-xl bg-secondary/30 border border-border">
                      <div className="flex justify-between items-center mb-4">
                        <p className="text-xs font-bold uppercase tracking-tight">Drop-off Point Detection</p>
                        <Badge variant="outline" className="text-red-400 border-red-400/20 uppercase text-[8px]">Action Required</Badge>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-center gap-4">
                          <span className="text-[10px] font-mono font-bold w-12 text-muted-foreground">0:02</span>
                          <Progress value={92} className="h-2" />
                          <span className="text-[10px] font-mono font-bold w-8">92%</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-[10px] font-mono font-bold w-12 text-muted-foreground">0:12</span>
                          <Progress value={45} className="h-2 bg-red-500/10" />
                          <span className="text-[10px] font-mono font-bold w-8 text-red-400">45%</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-[10px] font-mono font-bold w-12 text-muted-foreground">0:25</span>
                          <Progress value={38} className="h-2" />
                          <span className="text-[10px] font-mono font-bold w-8">38%</span>
                        </div>
                      </div>
                      <p className="text-[10px] text-muted-foreground mt-4 italic">"Insight: Audience drop at 0:12 due to weak transition. Retention Agent suggests adding a pattern-interrupt cut at 0:11."</p>
                    </div>
                    
                    <Button 
                      className="w-full bg-primary text-primary-foreground font-bold h-12 shadow-xl uppercase text-[10px] tracking-widest"
                      onClick={handleAnalyze}
                      disabled={loading}
                    >
                      {loading ? <Loader2 className="animate-spin mr-2" /> : <RefreshCw className="mr-2 h-4 w-4" />}
                      Sync Retention Intel
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-card border-border/50">
                  <CardHeader>
                    <CardTitle className="font-headline text-primary uppercase text-sm tracking-widest">Network Growth Velocity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <PerformanceChart />
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="bg-card border-primary/20 shadow-xl overflow-hidden">
                  <CardHeader>
                    <CardTitle className="text-[10px] font-bold uppercase flex items-center gap-2 tracking-widest">
                      <Rocket className="w-4 h-4 text-primary" /> Monetization Agent
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="p-3 rounded-lg bg-secondary/30 flex justify-between items-center border border-border">
                        <span className="text-[10px] font-bold uppercase">Affiliate Stack</span>
                        <span className="text-xs font-bold text-green-500">$32,100</span>
                      </div>
                      <div className="p-3 rounded-lg bg-secondary/30 flex justify-between items-center border border-border">
                        <span className="text-[10px] font-bold uppercase">Digital Products</span>
                        <span className="text-xs font-bold text-blue-400">$18,450</span>
                      </div>
                      <div className="p-3 rounded-lg bg-secondary/30 flex justify-between items-center border border-border">
                        <span className="text-[10px] font-bold uppercase">Spotify Streams</span>
                        <span className="text-xs font-bold text-purple-400">$7,200</span>
                      </div>
                    </div>
                    <div className="p-4 bg-primary/5 rounded-xl border border-primary/10 italic text-[11px] leading-relaxed text-muted-foreground">
                      "Monetization Strategy: High-converting 'AI Website Builder' affiliate links pinned to top 12 channels. Conversion rate trending up 15%."
                    </div>
                  </CardContent>
                </Card>

                {result && (
                  <Card className="bg-card border-primary/20 shadow-lg">
                    <CardHeader className="bg-primary/5 py-3">
                      <CardTitle className="flex items-center gap-2 text-primary font-headline text-[10px] uppercase tracking-widest">
                        <Sparkles className="w-4 h-4" />
                        AI Strategic Pivot
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <p className="text-[11px] leading-relaxed text-muted-foreground italic">"{result.summaryAnalysis}"</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
