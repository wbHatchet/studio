
"use client";

import { useState, useEffect } from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Loader2, TrendingUp, Target, Sparkles, BrainCircuit, CheckCircle2, DollarSign, LineChart } from "lucide-react";
import { aiPerformanceFeedback, AiPerformanceFeedbackOutput } from "@/ai/flows/ai-performance-feedback-flow";
import { PerformanceChart } from "@/components/analytics/performance-chart";
import { useToast } from "@/hooks/use-toast";

export default function AnalyticsPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AiPerformanceFeedbackOutput | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const [formData, setFormData] = useState({
    channelNiche: "Old Drake R&B Micro-Niche",
    currentContentStrategy: "Posting daily 3-minute instrumentals with vintage Drake aesthetics. Focused on 80-90 BPM ranges.",
    performanceData: [
      { title: "Midnight Confessions", views: 12000, ctr: 8.5, watchTimeMinutes: 45000, beatSales: 4, publicationDate: "2024-05-10" },
      { title: "Late Night Drive", views: 8000, ctr: 6.2, watchTimeMinutes: 28000, beatSales: 1, publicationDate: "2024-05-12" },
      { title: "Filtered Memories", views: 15000, ctr: 9.1, watchTimeMinutes: 52000, beatSales: 7, publicationDate: "2024-05-15" },
    ],
    totalViewsThisWeek: 35000,
    totalBeatSalesThisWeek: 12
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
            <h1 className="font-headline font-bold text-xl">Performance Feedback AI</h1>
          </header>

          <main className="p-6 md:p-8 space-y-8">
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="bg-card border-green-500/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs font-bold uppercase text-muted-foreground flex items-center gap-2">
                    <DollarSign className="w-3 h-3 text-green-500" /> Projected Revenue
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold font-headline">$4,250.00</div>
                  <p className="text-[10px] text-muted-foreground mt-1">Based on current sales velocity</p>
                </CardContent>
              </Card>
              <Card className="bg-card border-blue-500/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs font-bold uppercase text-muted-foreground flex items-center gap-2">
                    <LineChart className="w-3 h-3 text-blue-500" /> Retention Average
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold font-headline">68.2%</div>
                  <p className="text-[10px] text-muted-foreground mt-1">+12% from previous week</p>
                </CardContent>
              </Card>
              <Card className="bg-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs font-bold uppercase text-muted-foreground flex items-center gap-2">
                    <BrainCircuit className="w-3 h-3 text-primary" /> Strategy Score
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold font-headline">A-</div>
                  <p className="text-[10px] text-muted-foreground mt-1">Niche alignment is excellent</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              <div className="space-y-6">
                <Card className="bg-card">
                  <CardHeader>
                    <CardTitle className="font-headline flex items-center gap-2">
                      <Target className="w-5 h-5 text-primary" />
                      Channel Statistics
                    </CardTitle>
                    <CardDescription>Current performance metrics for AI analysis</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Total Views (Week)</Label>
                        <Input 
                          type="number" 
                          value={formData.totalViewsThisWeek}
                          onChange={(e) => setFormData({...formData, totalViewsThisWeek: parseInt(e.target.value)})}
                          className="bg-secondary/30"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Beat Sales (Week)</Label>
                        <Input 
                          type="number" 
                          value={formData.totalBeatSalesThisWeek}
                          onChange={(e) => setFormData({...formData, totalBeatSalesThisWeek: parseInt(e.target.value)})}
                          className="bg-secondary/30"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Current Strategy</Label>
                      <Textarea 
                        value={formData.currentContentStrategy}
                        onChange={(e) => setFormData({...formData, currentContentStrategy: e.target.value})}
                        className="bg-secondary/30 min-h-[100px]"
                      />
                    </div>
                    <Button 
                      className="w-full bg-primary text-primary-foreground font-bold"
                      onClick={handleAnalyze}
                      disabled={loading}
                    >
                      {loading ? <Loader2 className="animate-spin mr-2" /> : <BrainCircuit className="mr-2 h-4 w-4" />}
                      Generate AI Growth Strategy
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-card">
                  <CardHeader>
                    <CardTitle className="font-headline">Recent Engagement</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <PerformanceChart />
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                {!result && !loading && (
                  <div className="flex flex-col items-center justify-center h-full text-center p-12 border-2 border-dashed border-border rounded-3xl opacity-50">
                    <TrendingUp className="w-12 h-12 mb-4 text-muted-foreground" />
                    <p className="text-lg font-medium">Ready for Insight Analysis</p>
                    <p className="text-sm text-muted-foreground">Input your channel data to see successful patterns and improvements.</p>
                  </div>
                )}

                {loading && (
                   <div className="space-y-4 animate-pulse">
                     <div className="h-32 bg-secondary/30 rounded-2xl" />
                     <div className="h-48 bg-secondary/30 rounded-2xl" />
                     <div className="h-32 bg-secondary/30 rounded-2xl" />
                   </div>
                )}

                {result && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                    <Card className="bg-card border-primary/20">
                      <CardHeader className="bg-primary/5">
                        <CardTitle className="flex items-center gap-2 text-primary font-headline">
                          <Sparkles className="w-5 h-5" />
                          Summary Analysis
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <p className="text-sm leading-relaxed text-muted-foreground">{result.summaryAnalysis}</p>
                      </CardContent>
                    </Card>

                    <Card className="bg-card">
                      <CardHeader>
                        <CardTitle className="text-lg font-headline">Successful Patterns</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {result.successfulPatterns.map((pattern, idx) => (
                            <div key={idx} className="flex items-start gap-3 text-sm p-3 rounded-lg bg-green-500/5 border border-green-500/10">
                              <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                              {pattern}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-card">
                      <CardHeader>
                        <CardTitle className="text-lg font-headline">Strategy Improvements</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {result.strategyImprovements.map((improvement, idx) => (
                            <div key={idx} className="flex items-start gap-3 text-sm p-3 rounded-lg bg-blue-500/5 border border-blue-500/10">
                              <Target className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
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
