"use client";

import { useState } from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Mic2, Download, Wand2, Copy, Sparkles, CheckCircle2, AlertCircle, Info, Layers, Zap, Clock, TrendingUp } from "lucide-react";
import { generateVoiceScripts, textToSpeech } from "@/ai/flows/ai-voice-generation";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function VoiceProductionPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [isGeneratingAudio, setIsGeneratingAudio] = useState(false);
  const [audioUrls, setAudioUrls] = useState<Record<number, string>>({});
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    niche: "AI tools",
    topicDetail: "New tools that replace daily Excel tasks.",
    batchSize: 3
  });

  async function handleGenerateBatch() {
    setLoading(true);
    setAudioUrls({});
    try {
      const output = await generateVoiceScripts(formData as any);
      setResult(output);
      toast({ title: "Batch Scripts Engineered", description: `${formData.batchSize} viral structures ready for synthesis.` });
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Failed to generate viral scripts." });
    } finally {
      setLoading(false);
    }
  }

  async function handleSynthesizeSingle(index: number, text: string) {
    setIsGeneratingAudio(true);
    try {
      const dataUri = await textToSpeech(text);
      setAudioUrls(prev => ({ ...prev, [index]: dataUri }));
      toast({ title: "Synthesis Complete", description: `Voiceover ${index + 1} ready.` });
    } catch (error) {
      console.error(error);
      toast({ variant: "destructive", title: "Error", description: "Synthesis failed. Check ElevenLabs API." });
    } finally {
      setIsGeneratingAudio(false);
    }
  }

  const niches = [
    'AI tools',
    'Psychology tricks',
    'Weird history',
    'Human body facts',
    'Luxury lifestyle',
    'Money habits',
    'Tech discoveries'
  ];

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <SidebarInset className="bg-background">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b border-border/50 px-4">
            <SidebarTrigger className="-ml-1" />
            <div className="h-4 w-px bg-border/50 mx-2" />
            <h1 className="font-headline font-bold text-xl uppercase tracking-tight text-primary">Viral Batch Architect</h1>
          </header>

          <main className="p-6 md:p-8 space-y-8">
            <div className="max-w-6xl mx-auto grid gap-8 lg:grid-cols-5">
              <div className="lg:col-span-2 space-y-6">
                <Card className="bg-card border-border/50 shadow-md">
                  <CardHeader>
                    <CardTitle className="font-headline flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-primary" />
                      Viral Master Prompt
                    </CardTitle>
                    <CardDescription>Batch-generate high-retention Shorts scripts</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Target Viral Niche</Label>
                      <Select value={formData.niche} onValueChange={(v) => setFormData({...formData, niche: v})}>
                        <SelectTrigger className="bg-secondary/30">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {niches.map(n => (
                            <SelectItem key={n} value={n}>{n}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Topic Focus / Context</Label>
                      <Textarea 
                        value={formData.topicDetail}
                        onChange={(e) => setFormData({...formData, topicDetail: e.target.value})}
                        className="bg-secondary/30 min-h-[80px]"
                        placeholder="e.g. 2026 OVO vibes, billionaire routines, etc."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Batch Size (Scripts)</Label>
                      <Input 
                        type="number" 
                        value={formData.batchSize}
                        onChange={(e) => setFormData({...formData, batchSize: parseInt(e.target.value)})}
                        className="bg-secondary/30"
                        min={1}
                        max={10}
                      />
                    </div>
                    <Button 
                      className="w-full bg-primary text-primary-foreground font-bold h-12 uppercase text-[10px] tracking-widest"
                      onClick={handleGenerateBatch}
                      disabled={loading}
                    >
                      {loading ? <Loader2 className="animate-spin mr-2" /> : <Wand2 className="mr-2 h-4 w-4" />}
                      Execute Batch Prompt
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-card border-primary/20">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xs font-bold uppercase text-primary flex items-center gap-2">
                      <Info className="w-3 h-3" /> Production Capacity
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 border border-border">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-500 font-bold">E</div>
                        <div>
                          <p className="text-xs font-bold">ADAM Voice Node</p>
                          <p className="text-[10px] text-muted-foreground uppercase font-bold">Ready for Synthesis</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">GRID_READY</Badge>
                    </div>
                    <p className="text-[10px] text-muted-foreground italic">"Running prompt 5 times &rarr; 500 scripts. Current run: {formData.batchSize} nodes."</p>
                  </CardContent>
                </Card>
              </div>

              <div className="lg:col-span-3 space-y-6">
                {!result && !loading && (
                  <div className="flex flex-col items-center justify-center h-full text-center p-12 border-2 border-dashed border-border rounded-3xl opacity-50 min-h-[400px]">
                    <Sparkles className="w-12 h-12 mb-4 text-muted-foreground" />
                    <p className="text-lg font-medium uppercase text-[10px] tracking-widest font-bold">Script Engine: IDLE</p>
                    <p className="text-xs text-muted-foreground max-w-xs mx-auto mt-2">Pick a niche and trigger the Master Prompt to generate your viral batch.</p>
                  </div>
                )}

                {loading && (
                  <div className="space-y-4">
                    {[1, 2, 3].map(i => (
                      <Card key={i} className="bg-secondary/20 h-32 animate-pulse rounded-2xl" />
                    ))}
                  </div>
                )}

                {result && (
                  <ScrollArea className="h-[calc(100vh-200px)] pr-4">
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                      <div className="flex items-center justify-between">
                        <h2 className="text-sm font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                          <Layers className="w-4 h-4" /> Script Library: {result.scripts.length} Assets
                        </h2>
                        <Badge variant="outline" className="text-green-500 border-green-500/20 uppercase font-mono text-[9px]">
                          Target Retention: {result.nicheMetadata.targetRetention}
                        </Badge>
                      </div>

                      {result.scripts.map((script: any, idx: number) => (
                        <Card key={idx} className="bg-card border-border/50 hover:border-primary/20 transition-all overflow-hidden">
                          <CardHeader className="bg-primary/5 py-3 flex flex-row items-center justify-between">
                            <div>
                              <CardTitle className="text-xs font-bold uppercase">{script.title}</CardTitle>
                              <CardDescription className="text-[10px] font-mono">{script.estimatedWordCount} Words | 30s Structure</CardDescription>
                            </div>
                            <div className="flex gap-2">
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="h-8 text-[10px] font-bold uppercase border-primary/20"
                                onClick={() => handleSynthesizeSingle(idx, script.fullScript)}
                                disabled={isGeneratingAudio}
                              >
                                {isGeneratingAudio ? <Loader2 className="w-3 h-3 animate-spin mr-1" /> : <Mic2 className="w-3 h-3 mr-1" />}
                                {audioUrls[idx] ? "Re-Synthesize" : "Synthesize"}
                              </Button>
                            </div>
                          </CardHeader>
                          <CardContent className="pt-4 space-y-4">
                            <div className="grid grid-cols-4 gap-2">
                              <div className="p-2 rounded-lg bg-secondary/30 text-center border border-border/50">
                                <p className="text-[8px] font-bold uppercase text-primary">Hook</p>
                                <p className="text-[9px] line-clamp-1 italic">"{script.structure.hook}"</p>
                              </div>
                              <div className="p-2 rounded-lg bg-secondary/30 text-center border border-border/50">
                                <p className="text-[8px] font-bold uppercase text-muted-foreground">Gap</p>
                                <p className="text-[9px] line-clamp-1 italic">"{script.structure.curiosity}"</p>
                              </div>
                              <div className="p-2 rounded-lg bg-secondary/30 text-center border border-border/50">
                                <p className="text-[8px] font-bold uppercase text-muted-foreground">Value</p>
                                <p className="text-[9px] line-clamp-1 italic">"{script.structure.facts[0]}"</p>
                              </div>
                              <div className="p-2 rounded-lg bg-secondary/30 text-center border border-border/50">
                                <p className="text-[8px] font-bold uppercase text-primary">Twist</p>
                                <p className="text-[9px] line-clamp-1 italic">"{script.structure.twist}"</p>
                              </div>
                            </div>
                            <div className="relative">
                              <p className="text-xs leading-relaxed text-muted-foreground bg-secondary/10 p-3 rounded-lg border border-border/30 italic">
                                {script.fullScript}
                              </p>
                            </div>
                            {audioUrls[idx] && (
                              <div className="pt-2">
                                <audio controls className="w-full h-8 opacity-80">
                                  <source src={audioUrls[idx]} type="audio/mpeg" />
                                </audio>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </ScrollArea>
                )}
              </div>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
