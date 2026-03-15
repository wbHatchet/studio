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
import { Loader2, Video, Copy, RefreshCcw, Image as ImageIcon, Sparkles, ImagePlus, Type } from "lucide-react";
import { aiVisualsAndAnimation, AiVisualsAndAnimationOutput } from "@/ai/flows/ai-visuals-and-animation-flow";
import { useToast } from "@/hooks/use-toast";

export default function VisualsProductionPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AiVisualsAndAnimationOutput | null>(null);
  const { toast } = useToast();
  
  const [inputType, setInputType] = useState<'text' | 'image'>('text');
  const [formData, setFormData] = useState({
    description: "A cozy anime-style study room at night. A girl is sitting at a desk with a computer and a cup of steaming coffee. Outside the window, a futuristic rainy city skyline is visible.",
    mood: "Calm, dreamy, nostalgic",
    style: "Anime Lo-Fi aesthetic, soft lighting, purple and blue hues",
    variationCount: 10
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
            <h1 className="font-headline font-bold text-xl">AI Visuals Director</h1>
          </header>

          <main className="p-6 md:p-8 space-y-8">
            <div className="max-w-5xl mx-auto space-y-8">
              <Card className="bg-card">
                <CardHeader>
                  <CardTitle className="font-headline flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-primary" />
                    Scene Concept & Aesthetic
                  </CardTitle>
                  <CardDescription>Choose how you want to engineer your Lo-Fi visuals</CardDescription>
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
                          placeholder={inputType === 'text' ? "What is happening in the scene?" : "Describe your favorite image from Pinterest or YouTube..."}
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
                          <Label>Artistic Style</Label>
                          <Input 
                            value={formData.style}
                            onChange={(e) => setFormData({...formData, style: e.target.value})}
                            className="bg-secondary/30"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Number of Variations (1-10)</Label>
                        <Input 
                          type="number"
                          min={1}
                          max={10}
                          value={formData.variationCount}
                          onChange={(e) => setFormData({...formData, variationCount: parseInt(e.target.value)})}
                          className="bg-secondary/30"
                        />
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
                    Engineer {formData.variationCount} Prompt Variations
                  </Button>
                </CardFooter>
              </Card>

              {result && (
                <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
                  <h2 className="text-xl font-headline font-bold text-primary flex items-center gap-2">
                    <ImageIcon className="w-5 h-5" /> Generated Prompt Sets
                  </h2>
                  <div className="grid gap-6 md:grid-cols-2">
                    {result.variations.map((v, idx) => (
                      <Card key={idx} className="bg-card border-primary/10 overflow-hidden">
                        <CardHeader className="bg-primary/5 py-3">
                          <CardTitle className="text-sm font-headline">Variation {idx + 1}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 pt-4">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <Label className="text-[10px] uppercase font-bold text-muted-foreground">Image Prompt (Leonardo/Midjourney)</Label>
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
                              <Label className="text-[10px] uppercase font-bold text-muted-foreground">Animation Prompt (Hailuo/Pika)</Label>
                              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => copyToClipboard(v.animationPrompt)}>
                                <Copy className="h-3 w-3" />
                              </Button>
                            </div>
                            <div className="p-3 rounded-lg bg-secondary/30 text-xs italic leading-relaxed">
                              {v.animationPrompt}
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
