
"use client";

import { useState, useEffect } from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Search, Copy, RefreshCcw, Tag, Hash, FileText, Flame, AlertCircle, CheckCircle2, Terminal, Sparkles } from "lucide-react";
import { aiYoutubeSeoOptimization, AiYoutubeSeoOptimizationOutput } from "@/ai/flows/ai-youtube-seo-optimization";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Link from "next/link";

const POWER_SEO_TAGS = [
  "lofi beats", "lofi study music", "harbor lofi", "moon lofi", "lofi radio", 
  "study beats", "lofi chill", "relaxing lofi music", "late night lofi", 
  "lofi sleep music", "lofi hip hop", "study music 2026", "rain lofi", 
  "coding music", "focus music", "chill beats", "ambient lofi", "lofi mix", 
  "deep focus music", "background study music", "cozy lofi beats", 
  "nighttime lofi", "chill study beats", "peaceful lofi music", "sleep lofi radio"
];

const MASTER_PROMPT = `Act as a YouTube SEO expert for lofi music channels. Generate 500 HIGH-RANKING YouTube tags for a lofi channel called "Harbor Moon Lofi Radio"...`;

export default function SeoOptimizerPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AiYoutubeSeoOptimizationOutput | null>(null);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    microNiche: "Harbor Moon LoFi Radio - Night Escape",
    videoTopic: "Moonlit Harbor Lofi 🌙 Deep Focus Study Beats",
    keywords: POWER_SEO_TAGS,
    artistName: "Harbor Moon",
    bpm: 78,
    key: "C Minor",
    licensingInfo: "FREE for non-profit. Harbor Moon LoFi Radio Exclusive."
  });

  const tagString = formData.keywords.join(", ");
  const tagLength = tagString.length;
  const isOverLimit = tagLength > 500;

  async function handleGenerate() {
    if (isOverLimit) {
      toast({ variant: "destructive", title: "Limit Exceeded", description: "Tags must be under 500 characters for YouTube Studio." });
      return;
    }
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

  const copyMasterPrompt = () => {
    navigator.clipboard.writeText(MASTER_PROMPT);
    toast({ title: "Master Prompt Copied", description: "Paste into ChatGPT for 500+ tags." });
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-[#0a0a0f]">
        <AppSidebar />
        <SidebarInset className="bg-background">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b border-border/50 px-4 backdrop-blur-md bg-background/80 sticky top-0 z-50">
            <SidebarTrigger className="-ml-1" />
            <div className="h-4 w-px bg-border/50 mx-2" />
            <h1 className="font-headline font-bold text-xl uppercase tracking-tight text-primary">SEO Metadata Hub</h1>
          </header>

          <main className="p-6 md:p-8 space-y-8">
            <div className="bg-primary/5 border border-primary/20 p-4 rounded-2xl flex items-center justify-between max-w-5xl mx-auto shadow-[0_0_30px_rgba(var(--primary),0.05)]">
               <div className="flex items-center gap-3">
                 <Flame className="w-5 h-5 text-orange-500 animate-pulse" />
                 <div>
                   <p className="text-[10px] font-bold uppercase text-primary tracking-widest">Active Blueprint: Harbor Moon LoFi Radio</p>
                   <p className="text-xs font-headline font-bold">Industrial SEO Calibration: Power Tag Block v2</p>
                 </div>
               </div>
               <Badge className="bg-green-500/20 text-green-500 uppercase font-mono text-[10px] border-green-500/20">ALGO-OPTIMIZED</Badge>
            </div>

            <div className="max-w-5xl mx-auto grid gap-8 lg:grid-cols-5">
              <div className="lg:col-span-2 space-y-6">
                <Card className="bg-card border-border/50 shadow-xl overflow-hidden rounded-3xl">
                  <CardHeader className="bg-secondary/10 border-b border-border/50">
                    <CardTitle className="font-headline text-sm uppercase tracking-widest flex items-center gap-2">
                      <Tag className="w-4 h-4 text-primary" />
                      Algorithm Calibration
                    </CardTitle>
                    <CardDescription className="text-[10px] font-bold uppercase tracking-tighter">Emotion + Scene + Use Case Logic</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6 pt-6">
                    <div className="space-y-2">
                      <Label className="text-[10px] uppercase font-bold text-muted-foreground">Channel / Micro-Niche</Label>
                      <Input 
                        value={formData.microNiche}
                        onChange={(e) => setFormData({...formData, microNiche: e.target.value})}
                        className="bg-secondary/30 h-10 text-xs border-border/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] uppercase font-bold text-muted-foreground">Scene & Viral Purpose</Label>
                      <Textarea 
                        value={formData.videoTopic}
                        onChange={(e) => setFormData({...formData, videoTopic: e.target.value})}
                        className="bg-secondary/30 min-h-[80px] text-xs border-border/50 leading-relaxed"
                        placeholder="e.g. Moonlit Harbor Lofi Deep Focus Study Beats"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center mb-1">
                        <Label className="text-[10px] uppercase font-bold text-muted-foreground">Power SEO Tag Block</Label>
                        <span className={cn(
                          "text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded-full border",
                          isOverLimit ? "bg-red-500/10 text-red-500 border-red-500/20" : "bg-primary/10 text-primary border-primary/20"
                        )}>
                          {tagLength} / 500 Chars
                        </span>
                      </div>
                      <Textarea 
                        value={tagString}
                        onChange={(e) => setFormData({...formData, keywords: e.target.value.split(",").map(k => k.trim())})}
                        className={cn(
                          "bg-secondary/30 min-h-[120px] text-[10px] font-mono border-border/50 custom-scrollbar",
                          isOverLimit && "border-red-500/50"
                        )}
                      />
                      {isOverLimit && (
                        <p className="text-[9px] text-red-400 font-bold uppercase flex items-center gap-1 mt-1">
                          <AlertCircle className="w-3 h-3" /> Exceeds YouTube Studio pasting limit
                        </p>
                      )}
                    </div>

                    <Button 
                      className="w-full bg-primary text-background font-bold h-12 uppercase text-[10px] tracking-widest shadow-lg shadow-primary/10"
                      onClick={handleGenerate}
                      disabled={loading || isOverLimit}
                    >
                      {loading ? <Loader2 className="animate-spin mr-2" /> : <Search className="mr-2 h-4 w-4" />}
                      Engineer Viral Metadata
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-orange-500/5 border-orange-500/20 border-dashed">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-[10px] font-black uppercase text-orange-400 flex items-center gap-2">
                      <Terminal className="w-3 h-3" /> 30s Master Prompt
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-[10px] text-muted-foreground uppercase font-bold italic">"Generate 500 HIGH-RANKING tags for Harbor Moon..."</p>
                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1 h-8 text-[9px] uppercase font-bold border-orange-500/20 text-orange-400 hover:bg-orange-500/10" onClick={copyMasterPrompt}>
                        <Copy className="w-3 h-3 mr-2" /> Copy Prompt
                      </Button>
                      <Link href="/strategy" className="flex-1">
                        <Button variant="ghost" className="w-full h-8 text-[9px] uppercase font-bold text-muted-foreground">View Blueprint</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="lg:col-span-3 space-y-6">
                {!result && !loading && (
                  <div className="flex flex-col items-center justify-center h-full text-center p-12 border-2 border-dashed border-border/50 rounded-3xl opacity-50 min-h-[450px] bg-secondary/5">
                    <FileText className="w-12 h-12 mb-4 text-muted-foreground" />
                    <p className="text-lg font-headline font-bold uppercase text-[10px] tracking-[0.2em]">Metadata Engine: STANDBY</p>
                    <p className="text-[10px] text-muted-foreground max-w-xs mx-auto mt-2 uppercase font-bold tracking-widest leading-relaxed">
                      Input Harbor Moon vibes to generate SEO-optimized assets calibrated for high-ranking indexing.
                    </p>
                  </div>
                )}

                {loading && (
                   <div className="space-y-6 animate-pulse">
                     <Card className="h-24 bg-secondary/20 rounded-3xl border-border/50" />
                     <Card className="h-64 bg-secondary/20 rounded-3xl border-border/50" />
                     <Card className="h-32 bg-secondary/20 rounded-3xl border-border/50" />
                   </div>
                )}

                {result && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                    <Card className="bg-card border-primary/20 shadow-xl rounded-3xl overflow-hidden">
                      <CardHeader className="flex flex-row items-center justify-between pb-3 bg-primary/5 border-b border-primary/10">
                        <CardTitle className="text-[10px] font-black uppercase text-primary tracking-[0.2em]">Viral Optimized Title</CardTitle>
                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-primary/10" onClick={() => copyToClipboard(result.title)}>
                          <Copy className="h-3.5 w-3.5 text-primary" />
                        </Button>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <p className="text-xl font-headline font-bold text-foreground leading-tight">{result.title}</p>
                      </CardContent>
                    </Card>

                    <Card className="bg-card border-border/50 shadow-lg rounded-3xl overflow-hidden">
                      <CardHeader className="flex flex-row items-center justify-between pb-3 bg-secondary/10 border-b border-border/50">
                        <CardTitle className="text-[10px] font-black uppercase text-muted-foreground tracking-[0.2em]">Industrial Description Block</CardTitle>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => copyToClipboard(result.description)}>
                          <Copy className="h-3.5 w-3.5" />
                        </Button>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <pre className="text-[11px] whitespace-pre-wrap font-sans text-muted-foreground leading-relaxed h-64 overflow-y-auto pr-2 custom-scrollbar bg-secondary/20 p-5 rounded-2xl italic border border-border/50 shadow-inner">
                          {result.description}
                        </pre>
                      </CardContent>
                    </Card>

                    <Card className="bg-card border-border/50 shadow-md rounded-3xl overflow-hidden">
                      <CardHeader className="flex flex-row items-center justify-between pb-3">
                        <CardTitle className="text-[10px] font-black uppercase text-muted-foreground tracking-[0.2em]">Tag Blueprint Index</CardTitle>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => copyToClipboard(result.tags.join(", "))}>
                          <Copy className="h-3.5 w-3.5" />
                        </Button>
                      </CardHeader>
                      <CardContent className="pt-2">
                        <div className="flex flex-wrap gap-2">
                          {result.tags.map((tag, idx) => (
                            <Badge key={idx} variant="secondary" className="bg-primary/5 text-[9px] text-primary border-primary/20 uppercase font-mono tracking-tighter">
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
