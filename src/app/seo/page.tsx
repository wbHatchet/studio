
"use client";

import { useState } from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Search, Copy, RefreshCcw, Tag, Hash, FileText, Flame } from "lucide-react";
import { aiYoutubeSeoOptimization, AiYoutubeSeoOptimizationOutput } from "@/ai/flows/ai-youtube-seo-optimization";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

const viralKeywords = [
  "lofi beats", "lofi study music", "harbor lofi", "moon lofi", "lofi radio",
  "study beats", "lofi chill", "relaxing lofi music", "late night lofi",
  "lofi sleep music", "lofi hip hop", "study music 2026", "rain lofi",
  "coding music", "focus music", "chill beats", "ambient lofi", "lofi mix",
  "deep focus music", "background study music"
];

export default function SeoOptimizerPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AiYoutubeSeoOptimizationOutput | null>(null);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    microNiche: "Harbor Moon LoFi Radio - Night Escape",
    videoTopic: "Moonlit Harbor Lofi 🌙 Deep Focus Study Beats",
    keywords: viralKeywords,
    artistName: "Harbor Moon",
    bpm: 78,
    key: "C Minor",
    licensingInfo: "FREE for non-profit. Harbor Moon LoFi Radio Exclusive."
  });

  async function handleGenerate() {
    setLoading(true);
    try {
      const output = await aiYoutubeSeoOptimization(formData);
      setResult(output);
      toast({ title: "Viral SEO Engineered", description: "Metadata optimized for Harbor Moon algorithm warm-up." });
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Failed to generate SEO metadata." });
    } finally {
      setLoading(false);
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Copied", description: "Copied to clipboard." });
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <SidebarInset className="bg-background">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b border-border/50 px-4">
            <SidebarTrigger className="-ml-1" />
            <div className="h-4 w-px bg-border/50 mx-2" />
            <h1 className="font-headline font-bold text-xl uppercase tracking-tight text-primary">SEO Metadata Hub (Harbor Moon)</h1>
          </header>

          <main className="p-6 md:p-8 space-y-8">
            <div className="bg-primary/5 border border-primary/20 p-4 rounded-2xl flex items-center justify-between max-w-5xl mx-auto">
               <div className="flex items-center gap-3">
                 <Flame className="w-5 h-5 text-orange-500" />
                 <div>
                   <p className="text-[10px] font-bold uppercase text-primary">Active Blueprint: Harbor Moon LoFi Radio</p>
                   <p className="text-xs font-headline font-bold">Week 1 Algorithm Warm-Up Calibration</p>
                 </div>
               </div>
               <Badge className="bg-green-500/20 text-green-500 uppercase font-mono text-[10px]">VIRAL-READY</Badge>
            </div>

            <div className="max-w-5xl mx-auto grid gap-8 lg:grid-cols-5">
              <Card className="bg-card lg:col-span-2 h-fit">
                <CardHeader>
                  <CardTitle className="font-headline flex items-center gap-2">
                    <Tag className="w-5 h-5 text-primary" />
                    Algorithm Calibration
                  </CardTitle>
                  <CardDescription>Engineering titles based on Emotion + Scene + Use</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Micro-Niche / Channel</Label>
                    <Input 
                      value={formData.microNiche}
                      onChange={(e) => setFormData({...formData, microNiche: e.target.value})}
                      className="bg-secondary/30"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Scene & Purpose (Viral Title Structure)</Label>
                    <Textarea 
                      value={formData.videoTopic}
                      onChange={(e) => setFormData({...formData, videoTopic: e.target.value})}
                      className="bg-secondary/30 min-h-[80px]"
                      placeholder="Emotion + Scene + Use (e.g. Moonlit Harbor Lofi Deep Focus Study Beats)"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>BPM</Label>
                      <Input 
                        type="number"
                        value={formData.bpm}
                        onChange={(e) => setFormData({...formData, bpm: parseInt(e.target.value)})}
                        className="bg-secondary/30"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Key</Label>
                      <Input 
                        value={formData.key}
                        onChange={(e) => setFormData({...formData, key: e.target.value})}
                        className="bg-secondary/30"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Viral Keyword Stack</Label>
                    <Textarea 
                      value={formData.keywords.join(", ")}
                      onChange={(e) => setFormData({...formData, keywords: e.target.value.split(",").map(k => k.trim())})}
                      className="bg-secondary/30 min-h-[100px]"
                    />
                  </div>
                  <Button 
                    className="w-full bg-primary text-primary-foreground font-bold h-12 uppercase text-[10px] tracking-widest shadow-lg"
                    onClick={handleGenerate}
                    disabled={loading}
                  >
                    {loading ? <Loader2 className="animate-spin mr-2" /> : <Search className="mr-2 h-4 w-4" />}
                    Engineer Viral Metadata
                  </Button>
                </CardContent>
              </Card>

              <div className="lg:col-span-3 space-y-6">
                {!result && !loading && (
                  <div className="flex flex-col items-center justify-center h-full text-center p-12 border-2 border-dashed border-border rounded-3xl opacity-50 min-h-[400px]">
                    <FileText className="w-12 h-12 mb-4 text-muted-foreground" />
                    <p className="text-lg font-bold uppercase text-[10px] tracking-widest">Metadata Engine: READY</p>
                    <p className="text-xs text-muted-foreground mt-2 max-w-xs mx-auto">Input Harbor Moon vibes to generate SEO-optimized titles and descriptions.</p>
                  </div>
                )}

                {loading && (
                   <div className="space-y-4 animate-pulse">
                     <div className="h-20 bg-secondary/30 rounded-2xl" />
                     <div className="h-64 bg-secondary/30 rounded-2xl" />
                     <div className="h-32 bg-secondary/30 rounded-2xl" />
                   </div>
                )}

                {result && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                    <Card className="bg-card border-primary/20">
                      <CardHeader className="flex flex-row items-center justify-between pb-2 bg-primary/5 rounded-t-lg">
                        <CardTitle className="text-[10px] font-bold uppercase text-primary tracking-widest">Viral Optimized Title</CardTitle>
                        <Button variant="ghost" size="icon" onClick={() => copyToClipboard(result.title)}>
                          <Copy className="h-4 w-4" />
                        </Button>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <p className="text-xl font-headline font-bold text-foreground">{result.title}</p>
                      </CardContent>
                    </Card>

                    <Card className="bg-card border-border/50">
                      <CardHeader className="flex flex-row items-center justify-between pb-2 bg-secondary/10 rounded-t-lg">
                        <CardTitle className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Description Template</CardTitle>
                        <Button variant="ghost" size="icon" onClick={() => copyToClipboard(result.description)}>
                          <Copy className="h-4 w-4" />
                        </Button>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <pre className="text-[11px] whitespace-pre-wrap font-sans text-muted-foreground leading-relaxed h-64 overflow-y-auto pr-2 custom-scrollbar bg-secondary/20 p-4 rounded-lg italic">
                          {result.description}
                        </pre>
                      </CardContent>
                    </Card>

                    <Card className="bg-card border-border/50">
                      <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Tag Blueprint</CardTitle>
                        <Button variant="ghost" size="icon" onClick={() => copyToClipboard(result.tags.join(", "))}>
                          <Copy className="h-4 w-4" />
                        </Button>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {result.tags.map((tag, idx) => (
                            <Badge key={idx} variant="secondary" className="bg-primary/10 text-[9px] text-primary border-primary/20 uppercase font-mono">
                              {tag}
                            </Badge>
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
