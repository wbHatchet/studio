"use client";

import { useState } from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Search, Copy, RefreshCcw, Tag, Hash, FileText } from "lucide-react";
import { aiYoutubeSeoOptimization, AiYoutubeSeoOptimizationOutput } from "@/ai/flows/ai-youtube-seo-optimization";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

export default function SeoOptimizerPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AiYoutubeSeoOptimizationOutput | null>(null);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    microNiche: "Old Drake x 2010 R&B Type Beats",
    videoTopic: "Emotional late night drive vibes with filtered piano and smooth sub bass.",
    keywords: ["old drake type beat", "take care type beat", "rnb type beat 2026", "emotional r&b instrumental"],
    artistName: "Drake",
    bpm: 82,
    key: "Eb Minor",
    licensingInfo: "FREE for non-profit. Purchase license for monetization."
  });

  async function handleGenerate() {
    setLoading(true);
    try {
      const output = await aiYoutubeSeoOptimization(formData);
      setResult(output);
    } catch (error) {
      toast({ title: "Error", description: "Failed to generate SEO metadata." });
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
            <h1 className="font-headline font-bold text-xl">SEO Metadata Optimizer</h1>
          </header>

          <main className="p-6 md:p-8 space-y-8">
            <div className="max-w-5xl mx-auto grid gap-8 lg:grid-cols-5">
              <Card className="bg-card lg:col-span-2 h-fit">
                <CardHeader>
                  <CardTitle className="font-headline flex items-center gap-2">
                    <Tag className="w-5 h-5 text-primary" />
                    Content Details
                  </CardTitle>
                  <CardDescription>Input video details for optimized metadata</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Micro-Niche</Label>
                    <Input 
                      value={formData.microNiche}
                      onChange={(e) => setFormData({...formData, microNiche: e.target.value})}
                      className="bg-secondary/30"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Video Topic</Label>
                    <Textarea 
                      value={formData.videoTopic}
                      onChange={(e) => setFormData({...formData, videoTopic: e.target.value})}
                      className="bg-secondary/30 min-h-[80px]"
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
                    <Label>Keywords (Comma separated)</Label>
                    <Input 
                      value={formData.keywords.join(", ")}
                      onChange={(e) => setFormData({...formData, keywords: e.target.value.split(",").map(k => k.trim())})}
                      className="bg-secondary/30"
                    />
                  </div>
                  <Button 
                    className="w-full bg-primary text-primary-foreground font-bold"
                    onClick={handleGenerate}
                    disabled={loading}
                  >
                    {loading ? <Loader2 className="animate-spin mr-2" /> : <Search className="mr-2 h-4 w-4" />}
                    Optimize for Ranking
                  </Button>
                </CardContent>
              </Card>

              <div className="lg:col-span-3 space-y-6">
                {!result && !loading && (
                  <div className="flex flex-col items-center justify-center h-full text-center p-12 border-2 border-dashed border-border rounded-3xl opacity-50">
                    <FileText className="w-12 h-12 mb-4 text-muted-foreground" />
                    <p className="text-lg font-medium">Metadata Engine Ready</p>
                    <p className="text-sm text-muted-foreground">Fill in the beat details to generate SEO-ready titles and descriptions.</p>
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
                      <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-bold uppercase text-muted-foreground tracking-wider">Video Title</CardTitle>
                        <Button variant="ghost" size="icon" onClick={() => copyToClipboard(result.title)}>
                          <Copy className="h-4 w-4" />
                        </Button>
                      </CardHeader>
                      <CardContent>
                        <p className="text-xl font-headline font-bold">{result.title}</p>
                      </CardContent>
                    </Card>

                    <Card className="bg-card">
                      <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-bold uppercase text-muted-foreground tracking-wider">Description</CardTitle>
                        <Button variant="ghost" size="icon" onClick={() => copyToClipboard(result.description)}>
                          <Copy className="h-4 w-4" />
                        </Button>
                      </CardHeader>
                      <CardContent>
                        <pre className="text-xs whitespace-pre-wrap font-sans text-muted-foreground leading-relaxed h-64 overflow-y-auto pr-2 custom-scrollbar bg-secondary/20 p-4 rounded-lg">
                          {result.description}
                        </pre>
                      </CardContent>
                    </Card>

                    <Card className="bg-card">
                      <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-bold uppercase text-muted-foreground tracking-wider">Tags & Hashtags</CardTitle>
                        <Button variant="ghost" size="icon" onClick={() => copyToClipboard(result.tags.join(", "))}>
                          <Copy className="h-4 w-4" />
                        </Button>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {result.tags.map((tag, idx) => (
                            <Badge key={idx} variant="secondary" className="bg-primary/5 text-[10px] text-primary border-primary/10">
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
