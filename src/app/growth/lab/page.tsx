
"use client";

import { useState } from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Zap, Target, Repeat, Sparkles, Layout, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { optimizeHooks } from "@/ai/flows/ai-hook-optimizer";
import { useToast } from "@/hooks/use-toast";

export default function GrowthLabPage() {
  const [loading, setLoading] = useState(false);
  const [results, setResult] = useState<any>(null);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    originalScript: "Hey guys, check out this new lofi beat I made. It's really chill and good for studying.",
    toneProfile: "Curiosity Gap / Scarcity"
  });

  async function handleOptimize() {
    setLoading(true);
    try {
      const output = await optimizeHooks(formData);
      setResult(output);
    } catch (error) {
      toast({ title: "Error", description: "Optimization failed." });
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
            <h1 className="font-headline font-bold text-xl">Hook & Title Lab</h1>
          </header>

          <main className="p-6 md:p-8 space-y-8">
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="space-y-8">
                <Card className="bg-card">
                  <CardHeader>
                    <CardTitle className="font-headline flex items-center gap-2">
                      <Zap className="w-5 h-5 text-primary" />
                      Hook Optimization Agent
                    </CardTitle>
                    <CardDescription>Rewrite the first 3 seconds to reduce swipe rate</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Original Script Segment</Label>
                      <Textarea 
                        value={formData.originalScript}
                        onChange={(e) => setFormData({...formData, originalScript: e.target.value})}
                        className="bg-secondary/30 min-h-[100px]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Tone Profile</Label>
                      <Input 
                        value={formData.toneProfile}
                        onChange={(e) => setFormData({...formData, toneProfile: e.target.value})}
                        className="bg-secondary/30" 
                      />
                    </div>
                    <Button className="w-full bg-primary text-primary-foreground font-bold" onClick={handleOptimize} disabled={loading}>
                      {loading ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : <Sparkles className="w-4 h-4 mr-2" />}
                      Engineer Viral Hooks
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-card">
                  <CardHeader>
                    <CardTitle className="font-headline flex items-center gap-2">
                      <Layout className="w-5 h-5 text-primary" />
                      Thumbnail A/B Variants
                    </CardTitle>
                    <CardDescription>Generate layout ideas for testing</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="aspect-video bg-secondary/50 rounded-xl flex items-center justify-center border-2 border-dashed border-border group hover:border-primary/50 transition-all cursor-pointer">
                        <div className="text-center">
                          <Repeat className="w-6 h-6 mx-auto mb-2 text-muted-foreground group-hover:text-primary" />
                          <p className="text-[10px] font-bold uppercase">Variant A (Bold Text)</p>
                        </div>
                      </div>
                      <div className="aspect-video bg-secondary/50 rounded-xl flex items-center justify-center border-2 border-dashed border-border group hover:border-primary/50 transition-all cursor-pointer">
                        <div className="text-center">
                          <Repeat className="w-6 h-6 mx-auto mb-2 text-muted-foreground group-hover:text-primary" />
                          <p className="text-[10px] font-bold uppercase">Variant B (No Text)</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                {!results && (
                  <Card className="bg-card border-dashed border-2 opacity-50 h-[400px] flex flex-col items-center justify-center">
                    <Target className="w-12 h-12 mb-4" />
                    <p className="text-sm">Optimized hooks will appear here.</p>
                  </Card>
                )}
                {results && (
                  <Card className="bg-card border-primary/20 animate-in fade-in slide-in-from-right-4 duration-500">
                    <CardHeader className="bg-primary/5">
                      <CardTitle className="flex items-center gap-2 text-primary font-headline">
                        <Target className="w-5 h-5" />
                        Viral Hook Options
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-4">
                      {results.optimizedHooks.map((hook: string, idx: number) => (
                        <div key={idx} className="p-4 rounded-xl bg-secondary/30 border border-border flex items-center justify-between">
                          <p className="text-sm font-medium">{hook}</p>
                          <Badge className="bg-green-500/20 text-green-400">High Retention</Badge>
                        </div>
                      ))}
                      <div className="pt-4">
                        <p className="text-[10px] text-muted-foreground uppercase font-bold mb-2">AI Strategy Reasoning</p>
                        <p className="text-xs italic text-muted-foreground leading-relaxed">
                          {results.reasoning}
                        </p>
                      </div>
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
