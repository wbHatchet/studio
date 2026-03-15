"use client";

import { useState, useEffect } from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Loader2, TrendingUp, Target, Sparkles, BrainCircuit, DollarSign, LineChart, RefreshCw, Zap, Rocket, Star, BookOpen, Repeat } from "lucide-react";
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
    channelNiche: "Multi-Channel Cash-Cow Grid (Knowledge + Stories + Visuals)",
    currentContentStrategy: "3 videos/day per channel. Viral Multiplication triggered on 1M views. target AVD: 110%",
    performanceData: [
      { title: "Knowledge Engine #12", views: 1200000, ctr: 14.2, watchTimeMinutes: 450000, beatSales: 0, publicationDate: "2024-06-01" },
      { title: "Story Series: Dark History", views: 850000, ctr: 11.5, watchTimeMinutes: 320000, beatSales: 0, publicationDate: "2024-06-02" },
      { title: "Visual Satisfaction: Restoration", views: 420000, ctr: 9.8, watchTimeMinutes: 120000, beatSales: 0, publicationDate: "2024-06-03" },
    ],
    totalViewsThisWeek: 12250000,
    totalBeatSalesThisWeek: 0
  });

  async function handleAnalyze() {
    setLoading(true);
    try {
      const output = await aiPerformanceFeedback(formData);
      setResult(output);
      toast({ title: "Analysis Complete", description: "Viral logic optimized for $40K revenue model." });
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Failed to process performance data." });
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
            <h1 className="font-headline font-bold text-xl uppercase tracking-tighter text-primary">Self-Learning Intelligence Hub</h1>
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
                  <div className="text-2xl font-bold font-headline">$38,850.00</div>
                  <p className="text-[10px] text-green-500 mt-1">Target: $40K/mo model</p>
                </CardContent>
              </Card>
              <Card className="bg-card border-blue-500/20 shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs font-bold uppercase text-muted-foreground flex items-center gap-2">
                    <LineChart className="w-3 h-3 text-blue-500" /> Average Retention
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold font-headline text-blue-400">112.4%</div>
                  <p className="text-[10px] text-muted-foreground mt-1">Format: Knowledge Engine</p>
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
                  <p className="text-[10px] text-muted-foreground mt-1">Serialized view compounding</p>
                </CardContent>
              </Card>
              <Card className="bg-card shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs font-bold uppercase text-muted-foreground flex items-center gap-2">
                    <Repeat className="w-3 h-3 text-orange-400" /> Viral Clones
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold font-headline">124</div>
                  <p className="text-[10px] text-muted-foreground mt-1">Active multiplication loops</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-6">
                <Card className="bg-card">
                  <CardHeader>
                    <CardTitle className="font-headline flex items-center gap-2">
                      <Target className="w-5 h-5 text-primary" />
                      1M+ Sub Growth Analysis
                    </CardTitle>
                    <CardDescription>Performance across Knowledge, Stories, and Visual Satisfaction</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="p-4 rounded-xl bg-secondary/30 border border-border">
                        <p className="text-[10px] font-bold uppercase text-muted-foreground mb-1">Knowledge Hub</p>
                        <p className="text-lg font-bold font-headline text-primary">12.4M Views</p>
                      </div>
                      <div className="p-4 rounded-xl bg-secondary/30 border border-border">
                        <p className="text-[10px] font-bold uppercase text-muted-foreground mb-1">Story Series</p>
                        <p className="text-lg font-bold font-headline text-green-500">18.2M Views</p>
                      </div>
                      <div className="p-4 rounded-xl bg-secondary/30 border border-border">
                        <p className="text-[10px] font-bold uppercase text-muted-foreground mb-1">Visual Satisfaction</p>
                        <p className="text-lg font-bold font-headline text-orange-400">22.8M Views</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Active Retraining Payload</Label>
                      <Textarea 
                        value={formData.currentContentStrategy}
                        onChange={(e) => setFormData({...formData, currentContentStrategy: e.target.value})}
                        className="bg-secondary/30 min-h-[100px] font-mono text-[11px]"
                      />
                    </div>
                    <Button 
                      className="w-full bg-primary text-primary-foreground font-bold h-12 shadow-xl"
                      onClick={handleAnalyze}
                      disabled={loading}
                    >
                      {loading ? <Loader2 className="animate-spin mr-2" /> : <RefreshCw className="mr-2 h-4 w-4" />}
                      Optimize Viral Multiplication Loop
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-card">
                  <CardHeader>
                    <CardTitle className="font-headline text-primary">Multi-Platform Compounding</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <PerformanceChart />
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="bg-card border-primary/20 shadow-xl overflow-hidden">
                  <div className="h-1.5 w-full bg-primary/20">
                    <div className="h-full bg-primary w-[85%] animate-pulse" />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-sm font-bold uppercase flex items-center gap-2">
                      <Rocket className="w-4 h-4 text-primary" /> Scaling Roadmap (2026)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-3">
                      <div className="flex justify-between text-[10px] font-bold uppercase text-muted-foreground">
                        <span>Phase 1 (5 CH Grid)</span>
                        <span className="text-primary">85% COMPLETE</span>
                      </div>
                      <Progress value={85} className="h-1.5" />
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between text-[10px] font-bold uppercase text-muted-foreground">
                        <span>Phase 2 (10 CH Grid)</span>
                        <span className="text-primary">42% TARGET</span>
                      </div>
                      <Progress value={42} className="h-1.5" />
                    </div>
                    <div className="p-4 bg-primary/5 rounded-xl border border-primary/10 italic text-[11px] leading-relaxed text-muted-foreground">
                      "System retraining: Scaling 'Knowledge Engine' Node clusters. Revenue model calibrated for $10K-$40K monthly velocity. Serialized compounding active."
                    </div>
                  </CardContent>
                </Card>

                {result && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                    <Card className="bg-card border-primary/20 shadow-lg">
                      <CardHeader className="bg-primary/5 py-3">
                        <CardTitle className="flex items-center gap-2 text-primary font-headline text-xs uppercase tracking-widest">
                          <Sparkles className="w-4 h-4" />
                          Viral Multiplier Update
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <p className="text-[11px] leading-relaxed text-muted-foreground italic">"{result.summaryAnalysis}"</p>
                      </CardContent>
                    </Card>

                    <Card className="bg-card shadow-lg">
                      <CardHeader className="py-3">
                        <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Strategic Adjustments</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {result.strategyImprovements.map((improvement, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-[10px] p-2 rounded-lg bg-blue-500/5 border border-blue-500/10">
                              <Star className="w-3 h-3 text-blue-500 mt-0.5 shrink-0" />
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
