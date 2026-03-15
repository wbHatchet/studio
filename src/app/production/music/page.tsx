"use client";

import { useState } from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Music, Copy, RefreshCcw, Link as LinkIcon, Download, Play, CheckCircle2, AlertCircle } from "lucide-react";
import { generateMusicPrompt, GenerateMusicPromptOutput } from "@/ai/flows/ai-music-generation";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

export default function MusicProductionPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GenerateMusicPromptOutput | null>(null);
  const [status, setStatus] = useState<"idle" | "prompting" | "generating" | "complete">("idle");
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    referenceUrl: "",
    nicheConcept: "Rainy cyberpunk coffee shop at 2am",
    mood: "Chill, melancholic, nostalgic",
    keyInstruments: "Muffled piano, smooth sub bass, vinyl crackle",
    tempoDescription: "75 BPM, slow and relaxed",
    targetDuration: "Loopable 10 minute sequence",
    additionalInstructions: "Focus on atmospheric reverb and distant city sirens."
  });

  async function handleGenerate() {
    setLoading(true);
    setStatus("prompting");
    try {
      const sunoEndpoint = localStorage.getItem("suno_api_endpoint") || "";
      
      const output = await generateMusicPrompt({
        ...formData,
        apiEndpoint: sunoEndpoint
      });
      
      setResult(output);
      
      if (sunoEndpoint && output.status !== "Connection Failed" && output.status !== "API Error") {
        setStatus("generating");
        // For the unofficial API, we usually wait for audio files to be ready or poll /api/get?ids=...
        // For this UI, we'll simulate the "synthesis" completion
        setTimeout(() => {
          setStatus("complete");
          toast({ title: "Music Task Triggered", description: `Generation started. ID: ${output.generationId}` });
        }, 3000);
      } else if (output.status === "Connection Failed" || output.status === "API Error") {
        setStatus("idle");
        toast({ 
          variant: "destructive", 
          title: "API Error", 
          description: "Check your Suno API endpoint in Settings." 
        });
      } else {
        setStatus("idle");
        toast({ title: "Prompt Ready", description: "Music prompt has been engineered." });
      }
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Failed to process music task." });
      setStatus("idle");
    } finally {
      setLoading(false);
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Copied", description: "Prompt copied to clipboard." });
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <SidebarInset className="bg-background">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b border-border/50 px-4">
            <SidebarTrigger className="-ml-1" />
            <div className="h-4 w-px bg-border/50 mx-2" />
            <h1 className="font-headline font-bold text-xl">AI Music Curator</h1>
          </header>

          <main className="p-6 md:p-8 space-y-8">
            <div className="max-w-4xl mx-auto space-y-8">
              <Card className="bg-card">
                <CardHeader>
                  <CardTitle className="font-headline flex items-center gap-2">
                    <Music className="w-5 h-5 text-primary" />
                    Beat Composition Parameters
                  </CardTitle>
                  <CardDescription>Configure the mood and style for your AI music generation</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <LinkIcon className="w-3 h-3" />
                      Reference Lo-Fi URL (Optional)
                    </Label>
                    <Input 
                      placeholder="Paste link from Lofi Girl or other trendy channel"
                      value={formData.referenceUrl}
                      onChange={(e) => setFormData({...formData, referenceUrl: e.target.value})}
                      className="bg-secondary/30"
                    />
                    <p className="text-[10px] text-muted-foreground italic">AI will analyze the vibe of the song at this link.</p>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Micro-Niche Concept</Label>
                      <Input 
                        value={formData.nicheConcept}
                        onChange={(e) => setFormData({...formData, nicheConcept: e.target.value})}
                        className="bg-secondary/30"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Desired Mood</Label>
                      <Input 
                        value={formData.mood}
                        onChange={(e) => setFormData({...formData, mood: e.target.value})}
                        className="bg-secondary/30"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Key Instruments</Label>
                      <Input 
                        value={formData.keyInstruments}
                        onChange={(e) => setFormData({...formData, keyInstruments: e.target.value})}
                        className="bg-secondary/30"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Tempo & Rhythm</Label>
                      <Input 
                        value={formData.tempoDescription}
                        onChange={(e) => setFormData({...formData, tempoDescription: e.target.value})}
                        className="bg-secondary/30"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label>Additional Instructions</Label>
                      <Textarea 
                        value={formData.additionalInstructions}
                        onChange={(e) => setFormData({...formData, additionalInstructions: e.target.value})}
                        className="bg-secondary/30 min-h-[80px]"
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-secondary/10 border-t border-border/50 p-6 flex flex-col gap-4">
                  <Button 
                    className="w-full bg-primary text-primary-foreground font-bold h-12"
                    onClick={handleGenerate}
                    disabled={loading || status === "generating"}
                  >
                    {loading ? <Loader2 className="animate-spin mr-2" /> : <RefreshCcw className="mr-2 h-4 w-4" />}
                    {status === "idle" ? "Start Production Run" : status === "prompting" ? "Engineering Prompt..." : "Triggering Suno API..."}
                  </Button>
                  
                  {status === "generating" && (
                    <div className="w-full space-y-2 animate-pulse">
                      <div className="flex justify-between text-[10px] uppercase font-bold text-muted-foreground">
                        <span>Suno-API Status</span>
                        <span>Requesting synthesis...</span>
                      </div>
                      <div className="h-1 bg-secondary rounded-full overflow-hidden">
                        <div className="h-full bg-primary w-1/2 animate-[progress_2s_ease-in-out_infinite]" />
                      </div>
                    </div>
                  )}
                </CardFooter>
              </Card>

              {result && (
                <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
                  {status === "complete" && (
                    <Card className="bg-card border-green-500/20 shadow-xl overflow-hidden">
                      <CardHeader className="bg-green-500/5 py-3">
                        <CardTitle className="text-sm font-headline text-green-500 flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4" /> API Task Initiated
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-6 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-secondary rounded-full">
                            <Music className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <p className="font-bold text-sm">Lo-Fi Generation ID</p>
                            <p className="text-xs text-muted-foreground font-mono">{result.generationId}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">Active</Badge>
                          <Button variant="outline" size="sm" className="h-8 text-xs border-primary/20">
                            Check Status
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  <Card className="bg-card border-primary/20 shadow-lg">
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle className="font-headline text-lg">Optimized Prompt for Suno/Udio</CardTitle>
                        <CardDescription>Engineered for maximum vibe alignment</CardDescription>
                      </div>
                      <Button variant="outline" size="icon" onClick={() => copyToClipboard(result.musicGeneratorPrompt)}>
                        <Copy className="h-4 w-4" />
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <div className="p-4 rounded-xl bg-secondary/50 border border-border font-code text-sm leading-relaxed">
                        {result.musicGeneratorPrompt}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-card">
                    <CardHeader>
                      <CardTitle className="font-headline text-lg">Composition Description</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground italic">"{result.musicDescription}"</p>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
