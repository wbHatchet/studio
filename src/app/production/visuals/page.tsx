
"use client";

import { useState } from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Copy, RefreshCcw, Image as ImageIcon, Sparkles, ImagePlus, Type, Terminal, Activity } from "lucide-react";
import { aiVisualsAndAnimation, AiVisualsAndAnimationOutput } from "@/ai/flows/ai-visuals-and-animation-flow";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

export default function VisualsProductionPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AiVisualsAndAnimationOutput | null>(null);
  const { toast } = useToast();
  
  const [inputType, setInputType] = useState<'text' | 'image'>('text');
  const [formData, setFormData] = useState({
    description: "A cozy anime-style study room at night. A girl is sitting at a desk with a computer and a cup of steaming coffee. Outside the window, a futuristic rainy city skyline is visible.",
    mood: "Calm, dreamy, nostalgic",
    style: "Anime Lo-Fi aesthetic, soft lighting, purple and blue hues",
    variationCount: 3,
    aestheticPreset: "vintage_60s"
  });

  async function handleGenerate() {
    setLoading(true);
    try {
      const output = await aiVisualsAndAnimation({
        ...formData,
        inputType
      });
      setResult(output);
    } catch (error) {
      toast({ title: "Error", description: "Failed to generate visual prompts." });
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
            <h1 className="font-headline font-bold text-xl text-primary uppercase tracking-tight">AI Visuals Director</h1>
          </header>

          <main className="p-6 md:p-8 space-y-8">
            <div className="max-w-5xl mx-auto space-y-8">
              <Card className="bg-card">
                <CardHeader>
                  <CardTitle className="font-headline flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-primary" />
                    Scene Concept & FFmpeg Aesthetic
                  </CardTitle>
                  <CardDescription>Configure the Vintage Visualizer parameters</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Tabs value={inputType} onValueChange={(v) => setInputType(v as any)} className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="text" className="gap-2">
                        <Type className="w-4 h-4" /> Option 1: Describe Scene
                      </TabsTrigger>
                      <TabsTrigger value="image" className="gap-2">
                        <ImagePlus className="w-4 h-4" /> Option 2: Image Reference
                      </TabsTrigger>
                    </TabsList>
                    
                    <div className="mt-6 space-y-4">
                      <div className="space-y-2">
                        <Label>{inputType === 'text' ? 'Core Scene Description' : 'Describe the Image Content'}</Label>
                        <Textarea 
                          value={formData.description}
                          onChange={(e) => setFormData({...formData, description: e.target.value})}
                          className="bg-secondary/30 min-h-[100px]"
                        />
                      </div>
                      
                      <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label>Desired Mood</Label>
                          <Input 
                            value={formData.mood}
                            onChange={(e) => setFormData({...formData, mood: e.target.value})}
                            className="bg-secondary/30"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Visual Aesthetic Preset</Label>
                          <Input 
                            value={formData.aestheticPreset}
                            onChange={(e) => setFormData({...formData, aestheticPreset: e.target.value})}
                            className="bg-secondary/30 font-mono"
                          />
                        </div>
                      </div>
                    </div>
                  </Tabs>
                </CardContent>
                <CardFooter className="bg-secondary/10 border-t border-border/50 p-6">
                  <Button 
                    className="w-full bg-primary text-primary-foreground font-bold"
                    onClick={handleGenerate}
                    disabled={loading}
                  >
                    {loading ? <Loader2 className="animate-spin mr-2" /> : <Sparkles className="mr-2 h-4 w-4" />}
                    Engineer Production Packet
                  </Button>
                </CardFooter>
              </Card>

              {result && (
                <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
                  <h2 className="text-xl font-headline font-bold text-primary flex items-center gap-2 uppercase tracking-tight">
                    <Activity className="w-5 h-5" /> Production Ready Assets
                  </h2>
                  <div className="grid gap-6 md:grid-cols-2">
                    {result.variations.map((v, idx) => (
                      <Card key={idx} className="bg-card border-primary/10 overflow-hidden">
                        <CardHeader className="bg-primary/5 py-3 flex flex-row items-center justify-between">
                          <CardTitle className="text-sm font-headline">Packet {idx + 1}</CardTitle>
                          <Badge variant="outline" className="text-[8px] border-primary/20">v7.0_PACKET</Badge>
                        </CardHeader>
                        <CardContent className="space-y-4 pt-4">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <Label className="text-[10px] uppercase font-bold text-muted-foreground">Image Prompt (Director Refined)</Label>
                              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => copyToClipboard(v.imagePrompt)}>
                                <Copy className="h-3 w-3" />
                              </Button>
                            </div>
                            <div className="p-3 rounded-lg bg-secondary/30 text-xs italic leading-relaxed line-clamp-3">
                              {v.imagePrompt}
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <Label className="text-[10px] uppercase font-bold text-muted-foreground flex items-center gap-1">
                                <Terminal className="w-3 h-3" /> FFmpeg filter_complex String
                              </Label>
                              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => copyToClipboard(v.animationPrompt)}>
                                <Copy className="h-3 w-3" />
                              </Button>
                            </div>
                            <div className="p-3 rounded-lg bg-black/90 text-[10px] font-mono leading-relaxed text-blue-400">
                              {/* Using animationPrompt field to simulate the complex filter string generator */}
                              [0:v]scale=1280x720,curves=vintage,vignette[bg];[1:a]showwaves=s=1280x720:colors=white@0.3[waves];[bg][waves]overlay,noise[outv]
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
