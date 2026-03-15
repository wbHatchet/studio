"use client";

import { useState, useEffect } from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, Target, Sparkles, DollarSign, LineChart, RefreshCw, Rocket, BookOpen, Repeat } from "lucide-react";
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
    currentContentStrategy: "1,080 videos/mo. Viral replication (1M threshold). 30s twist/loop structure.",
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
      toast({ title: "Command Insight Generated", description: "Network optimized for $1M/year blueprint." });
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
            <h1 className="font-headline font-bold text-xl uppercase tracking-tighter text-primary">Intelligence Hub ($1M Blueprint)</h1>
          </header>

          <main className="p-6 md:p-8 space-y-8">
            <div className="grid gap-6 md:grid-cols-4">
              <Card className="bg-card border-green-500/20 shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs font-bold uppercase text-muted-foreground flex items-center gap-2">
                    <DollarSign className="w-3 h-3 text-green-500" /> Revenue Velocity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold font-headline">$84,250.00</div>
                  <p className="text-[10px] text-green-500 mt-1 uppercase font-bold tracking-widest">Target: $80K/mo ($1M/Year Goal)</p>
                </CardContent>
              </Card>
              <Card className="bg-card border-blue-500/20 shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs font-bold uppercase text-muted-foreground flex items-center gap-2">
                    <LineChart className="w-3 h-3 text-blue-500" /> Average Retention
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold font-headline text-blue-400">114.2%</div>
                  <p className="text-[10px] text-muted-foreground mt-1 uppercase font-bold tracking-widest">Target Metric: {">"}95%</p>
                </CardContent>
              </Card>
              <Card className="bg-card border-primary/20 shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs font-bold uppercase text-muted-foreground flex items-center gap-2">
                    <BookOpen className="w-3 h-3 text-primary" /> Series Multiplier
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold font-headline text-primary">400x</div>
                  <p className="text-[10px] text-muted-foreground mt-1 uppercase font-bold tracking-widest">Compounding Views Enabled</p>
                </CardContent>
              </Card>
              <Card className="bg-card shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs font-bold uppercase text-muted-foreground flex items-center gap-2">
                    <Repeat className="w-3 h-3 text-orange-400" /> Scaling Phase
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold font-headline">Phase 3</div>
                  <p className="text-[10px] text-muted-foreground mt-1 uppercase font-bold tracking-widest">20+ Channels | 2,000+ Videos</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-6">
                <Card className="bg-card border-border/50">
                  <CardHeader>
                    <CardTitle className="font-headline flex items-center gap-2 text-primary">
                      <Target className="w-5 h-5" />
                      $1M Network Matrix
                    </CardTitle>
                    <CardDescription>Revenue stack performance across 104 active media assets</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="p-4 rounded-xl bg-secondary/30 border border-border text-center">
                        <p className="text-[10px] font-bold uppercase text-muted-foreground mb-1">Ad Revenue</p>
                        <p className="text-lg font-bold font-headline text-primary">$18.4K</p>
                      </div>
                      <div className="p-4 rounded-xl bg-secondary/30 border border-border text-center">
                        <p className="text-[10px] font-bold uppercase text-muted-foreground mb-1">Affiliate Stack</p>
                        <p className="text-lg font-bold font-headline text-green-500">$32.1K</p>
                      </div>
                      <div className="p-4 rounded-xl bg-secondary/30 border border-border text-center">
                        <p className="text-[10px] font-bold uppercase text-muted-foreground mb-1">Traffic Funnels</p>
                        <p className="text-lg font-bold font-headline text-orange-400">$33.7K</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] uppercase font-bold text-muted-foreground">Active Intelligence Retraining Payload</Label>
                      <Textarea 
                        value={formData.currentContentStrategy}
                        onChange={(e) => setFormData({...formData, currentContentStrategy: e.target.value})}
                        className="bg-secondary/30 min-h-[80px] font-mono text-[11px] border-border/50"
                      />
                    </div>
                    <Button 
                      className="w-full bg-primary text-primary-foreground font-bold h-12 shadow-xl uppercase text-[10px] tracking-widest"
                      onClick={handleAnalyze}
                      disabled={loading}
                    >
                      {loading ? <Loader2 className="animate-spin mr-2" /> : <RefreshCw className="mr-2 h-4 w-4" />}
                      Recalibrate Network Intelligence
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
                  <div className="h-1.5 w-full bg-primary/20">
                    <div className="h-full bg-primary w-[92%] animate-pulse" />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-[10px] font-bold uppercase flex items-center gap-2 tracking-widest">
                      <Rocket className="w-4 h-4 text-primary" /> Scaling Roadmap ($1M Goal)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-3 opacity-60">
                      <div className="flex justify-between text-[10px] font-bold uppercase text-muted-foreground">
                        <span>Phase 1 (3 CH | 90 Videos)</span>
                        <span className="text-green-500">COMPLETE</span>
                      </div>
                      <Progress value={100} className="h-1.5 bg-secondary/50" />
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between text-[10px] font-bold uppercase text-muted-foreground">
                        <span>Phase 2 (10 CH | 900 Videos)</span>
                        <span className="text-primary">92% COMPLETE</span>
                      </div>
                      <Progress value={92} className="h-1.5 bg-secondary/50" />
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between text-[10px] font-bold uppercase text-muted-foreground">
                        <span>Phase 3 (20 CH | 2,000+ Videos)</span>
                        <span className="text-primary">15% TARGET</span>
                      </div>
                      <Progress value={15} className="h-1.5 bg-secondary/50" />
                    </div>
                    <div className="p-4 bg-primary/5 rounded-xl border border-primary/10 italic text-[11px] leading-relaxed text-muted-foreground">
                      "Strategic Pivot: Shifting resources from motivation to 'AI Tools' and 'Dark Psychology' niches to maximize CPM and conversion value. Viral clones triggered for 12 winning asset nodes."
                    </div>
                  </CardContent>
                </Card>

                {result && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                    <Card className="bg-card border-primary/20 shadow-lg">
                      <CardHeader className="bg-primary/5 py-3">
                        <CardTitle className="flex items-center gap-2 text-primary font-headline text-[10px] uppercase tracking-widest">
                          <Sparkles className="w-4 h-4" />
                          $1M Blueprint Update
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <p className="text-[11px] leading-relaxed text-muted-foreground italic">"{result.summaryAnalysis}"</p>
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