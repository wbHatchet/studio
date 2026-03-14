"use client";

import { useState } from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Video, Copy, RefreshCcw, Image as ImageIcon, Sparkles } from "lucide-react";
import { aiVisualsAndAnimation, AiVisualsAndAnimationOutput } from "@/ai/flows/ai-visuals-and-animation-flow";
import { useToast } from "@/hooks/use-toast";

export default function VisualsProductionPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AiVisualsAndAnimationOutput | null>(null);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    description: "A cozy anime-style study room at night. A girl is sitting at a desk with a computer and a cup of steaming coffee. Outside the window, a futuristic rainy city skyline is visible.",
    mood: "Calm, dreamy, nostalgic",
    style: "Anime Lo-Fi aesthetic, soft lighting, purple and blue hues",
    animationEffect: "Subtle rain falling against the glass, steam rising from the coffee, hair gently swaying"
  });

  async function handleGenerate() {
    setLoading(true);
    try {
      const output = await aiVisualsAndAnimation(formData);
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
            <div className="max-w-4xl mx-auto space-y-8">
              <Card className="bg-card">
                <CardHeader>
                  <CardTitle className="font-headline flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-primary" />
                    Scene Concept & Aesthetic
                  </CardTitle>
                  <CardDescription>Describe the atmospheric visual loop for your Lo-Fi video</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2 md:col-span-2">
                    <Label>Core Scene Description</Label>
                    <Textarea 
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      className="bg-secondary/30 min-h-[100px]"
                      placeholder="What is happening in the scene?"
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
                    <Label>Artistic Style</Label>
                    <Input 
                      value={formData.style}
                      onChange={(e) => setFormData({...formData, style: e.target.value})}
                      className="bg-secondary/30"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label>Animation Effects</Label>
                    <Input 
                      value={formData.animationEffect}
                      onChange={(e) => setFormData({...formData, animationEffect: e.target.value})}
                      className="bg-secondary/30"
                      placeholder="e.g. flickering candles, falling snow..."
                    />
                  </div>
                </CardContent>
                <CardFooter className="bg-secondary/10 border-t border-border/50 p-6">
                  <Button 
                    className="w-full bg-primary text-primary-foreground font-bold"
                    onClick={handleGenerate}
                    disabled={loading}
                  >
                    {loading ? <Loader2 className="animate-spin mr-2" /> : <Sparkles className="mr-2 h-4 w-4" />}
                    Engineer Artwork Prompts
                  </Button>
                </CardFooter>
              </Card>

              {result && (
                <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
                  <Card className="bg-card border-primary/20 shadow-lg">
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle className="font-headline text-lg">Midjourney / DALL-E Prompt</CardTitle>
                        <CardDescription>Copy this to generate the base artwork</CardDescription>
                      </div>
                      <Button variant="outline" size="icon" onClick={() => copyToClipboard(result.imagePrompt)}>
                        <Copy className="h-4 w-4" />
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <div className="p-4 rounded-xl bg-secondary/50 border border-border text-sm leading-relaxed italic">
                        {result.imagePrompt}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-card">
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle className="font-headline text-lg">Pika / Hailuo Animation Prompt</CardTitle>
                        <CardDescription>Use this to animate the static image</CardDescription>
                      </div>
                      <Button variant="outline" size="icon" onClick={() => copyToClipboard(result.animationPrompt)}>
                        <Copy className="h-4 w-4" />
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <div className="p-4 rounded-xl bg-secondary/50 border border-border text-sm leading-relaxed italic">
                        {result.animationPrompt}
                      </div>
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
