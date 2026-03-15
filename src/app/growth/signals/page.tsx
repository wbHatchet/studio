
"use client";

import { useState } from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Target, Search, ArrowUpRight, Flame, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { predictTrends } from "@/ai/flows/ai-trend-prediction";
import { useToast } from "@/hooks/use-toast";

export default function ViralSignalsPage() {
  const [loading, setLoading] = useState(false);
  const [signals, setSignals] = useState<any[]>([]);
  const { toast } = useToast();

  async function handleScan() {
    setLoading(true);
    try {
      const result = await predictTrends({
        scannedPlatforms: ["TikTok", "YouTube", "Reddit"],
        currentSignals: "High chatter about vintage iPhone filters and Japanese countryside ambience. Jersey Club beats are leaking into Lo-Fi study playlists."
      });
      setSignals(result.detectedSignals);
    } catch (error) {
      toast({ title: "Scan Failed", description: "Could not fetch viral signals." });
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
            <h1 className="font-headline font-bold text-xl">Viral Signal Monitor</h1>
            <Button size="sm" className="ml-auto bg-primary text-primary-foreground font-bold" onClick={handleScan} disabled={loading}>
              {loading ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : <Sparkles className="mr-2 h-4 w-4" />}
              Run Global Trend Scan
            </Button>
          </header>

          <main className="p-6 md:p-8 space-y-8">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card className="bg-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs font-bold uppercase text-muted-foreground flex items-center gap-2">
                    <TrendingUp className="w-3 h-3" /> Trend Coverage
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold font-headline">92%</div>
                  <p className="text-[10px] text-green-500 flex items-center gap-1 mt-1">
                    <ArrowUpRight className="w-3 h-3" /> 4.2% from yesterday
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs font-bold uppercase text-muted-foreground flex items-center gap-2">
                    <Target className="w-3 h-3" /> Prediction Accuracy
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold font-headline">78.4%</div>
                  <p className="text-[10px] text-muted-foreground mt-1">Based on last 500 signals</p>
                </CardContent>
              </Card>
              <Card className="bg-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs font-bold uppercase text-muted-foreground flex items-center gap-2">
                    <Flame className="w-3 h-3" /> Hot Niches
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold font-headline">12</div>
                  <p className="text-[10px] text-orange-400 mt-1">3 exploding right now</p>
                </CardContent>
              </Card>
              <Card className="bg-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs font-bold uppercase text-muted-foreground flex items-center gap-2">
                    <Search className="w-3 h-3" /> Scanned Keywords
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold font-headline">4.5K</div>
                  <p className="text-[10px] text-muted-foreground mt-1">Daily scanner capacity</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
              <Card className="lg:col-span-2 bg-card">
                <CardHeader>
                  <CardTitle className="font-headline">Detected Signals</CardTitle>
                  <CardDescription>AI-identified viral patterns across TikTok, YouTube, and Reddit</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {signals.length === 0 && (
                      <p className="text-sm text-center py-12 text-muted-foreground italic">Run a scan to detect new viral signals...</p>
                    )}
                    {signals.map((signal, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 rounded-xl border border-border bg-secondary/20 group hover:bg-secondary/30 transition-all">
                        <div className="flex items-start gap-4">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <TrendingUp className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-bold text-sm">{signal.subject}</h4>
                              <Badge variant="outline" className="text-[10px] h-4 bg-primary/5">{signal.type}</Badge>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">Recommended Niche: <span className="text-primary/80 font-medium">{signal.nicheRecommendation}</span></p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-bold text-green-500">{signal.growth}</div>
                          <div className="text-[10px] text-muted-foreground uppercase font-bold">Confidence: {signal.confidence}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card">
                <CardHeader>
                  <CardTitle className="font-headline">Competitor Tracker</CardTitle>
                  <CardDescription>Channels gaining fast traction</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-secondary" />
                      <div>
                        <p className="text-xs font-bold">Dark Mood Beats</p>
                        <p className="text-[10px] text-muted-foreground">14 videos / week</p>
                      </div>
                    </div>
                    <Badge className="bg-orange-500/20 text-orange-400">High Activity</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-secondary" />
                      <div>
                        <p className="text-xs font-bold">Rainy Day Piano</p>
                        <p className="text-[10px] text-muted-foreground">Exploding search</p>
                      </div>
                    </div>
                    <Badge className="bg-green-500/20 text-green-400">+400% views</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
