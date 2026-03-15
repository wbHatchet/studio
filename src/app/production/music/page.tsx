
"use client";

import { useState } from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Music, Copy, RefreshCcw, Link as LinkIcon, Download, Play, CheckCircle2, Repeat } from "lucide-react";
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
    nicheConcept: "Rainy anime coffee shop",
    mood: "Chill Lo-Fi, nostalgic",
    keyInstruments: "Muffled piano, subtle boom bap drums, vinyl crackle",
    tempoDescription: "70-80 BPM",
    targetDuration: "Loop to 3 hours",
    additionalInstructions: "Suno AI optimized: Warm Rhodes piano, atmospheric pads."
  });

  async function handleGenerate() {
    setLoading(true);
    setStatus("prompting");
    try {
      const output = await generateMusicPrompt(formData);
      setResult(output);
      setStatus("complete");
      toast({ title: "Suno AI Prompt Ready", description: "Generation instructions engineered." });
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Failed to process music task." });
      setStatus("idle");
    } finally {
      setLoading(false);
    }
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <SidebarInset className="bg-background text-foreground">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b border-border/50 px-4">
            <SidebarTrigger className="-ml-1" />
            <div className="h-4 w-px bg-border/50 mx-2" />
            <h1 className="font-headline font-bold text-xl uppercase tracking-tight text-primary">Music Generation (Suno AI)</h1>
          </header>

          <main className="p-6 md:p-8 space-y-8">
            <div className="max-w-4xl mx-auto space-y-8">
              <Card className="bg-card border-border/50">
                <CardHeader>
                  <CardTitle className="font-headline flex items-center gap-2 text-primary">
                    <Music className="w-5 h-5" />
                    Lo-Fi Composition Parameters
                  </CardTitle>
                  <CardDescription>Step 3: Creating the 2-minute loopable foundation</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
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
                      <Label>Loop Strategy</Label>
                      <Input 
                        value={formData.targetDuration}
                        onChange={(e) => setFormData({...formData, targetDuration: e.target.value})}
                        className="bg-secondary/30"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label>Additional Instructions (Suno/Stable Audio)</Label>
                      <Textarea 
                        value={formData.additionalInstructions}
                        onChange={(e) => setFormData({...formData, additionalInstructions: e.target.value})}
                        className="bg-secondary/30 min-h-[80px]"
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-secondary/10 border-t border-border/50 p-6">
                  <Button 
                    className="w-full bg-primary text-primary-foreground font-bold h-12 shadow-lg uppercase tracking-widest text-[10px]"
                    onClick={handleGenerate}
                    disabled={loading}
                  >
                    {loading ? <Loader2 className="animate-spin mr-2" /> : <RefreshCcw className="mr-2 h-4 w-4" />}
                    Trigger Suno AI Generation
                  </Button>
                </CardFooter>
              </Card>

              {result && (
                <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
                  <Card className="bg-card border-primary/20 shadow-lg">
                    <CardHeader className="bg-primary/5 py-3">
                      <CardTitle className="text-sm font-headline text-primary flex items-center gap-2">
                        <Repeat className="w-4 h-4" /> FFmpeg Loop Instruction
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-4">
                      <div className="p-4 rounded-xl bg-secondary/50 border border-border font-mono text-xs leading-relaxed text-blue-400">
                        ffmpeg -i track.mp3 -filter_complex "aloop=loop=-1:size=2e+09" -t 10800 output_loop.mp3
                      </div>
                      <p className="text-[10px] text-muted-foreground uppercase font-bold italic">Process: 2-minute Suno track &rarr; 3-hour seamless background loop</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-card">
                    <CardHeader>
                      <CardTitle className="font-headline text-lg uppercase tracking-tight">AI Composition Prompt</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground italic bg-secondary/20 p-4 rounded-xl border border-border/50">"{result.musicGeneratorPrompt}"</p>
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
