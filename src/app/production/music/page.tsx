
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
import { Loader2, Music, Copy, RefreshCcw, Send } from "lucide-react";
import { generateMusicPrompt, GenerateMusicPromptOutput } from "@/ai/flows/ai-music-generation";
import { useToast } from "@/hooks/use-toast";

export default function MusicProductionPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GenerateMusicPromptOutput | null>(null);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    nicheConcept: "Rainy cyberpunk coffee shop at 2am",
    mood: "Chill, melancholic, nostalgic",
    keyInstruments: "Muffled piano, smooth sub bass, vinyl crackle",
    tempoDescription: "75 BPM, slow and relaxed",
    targetDuration: "Loopable 10 minute sequence",
    additionalInstructions: "Focus on atmospheric reverb and distant city sirens."
  });

  async function handleGenerate() {
    setLoading(true);
    try {
      const output = await generateMusicPrompt(formData);
      setResult(output);
    } catch (error) {
      toast({ title: "Error", description: "Failed to generate music prompt." });
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
                <CardContent className="grid gap-6 md:grid-cols-2">
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
                </CardContent>
                <CardFooter className="bg-secondary/10 border-t border-border/50 p-6">
                  <Button 
                    className="w-full bg-primary text-primary-foreground font-bold"
                    onClick={handleGenerate}
                    disabled={loading}
                  >
                    {loading ? <Loader2 className="animate-spin mr-2" /> : <RefreshCcw className="mr-2 h-4 w-4" />}
                    Craft Professional AI Prompt
                  </Button>
                </CardFooter>
              </Card>

              {result && (
                <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
                  <Card className="bg-card border-primary/20 shadow-lg">
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle className="font-headline text-lg">Optimized Prompt for Suno/Udio</CardTitle>
                        <CardDescription>Copy this into your music generator</CardDescription>
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
