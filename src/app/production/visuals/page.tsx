
"use client";

import { useState } from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Copy, ImageIcon, Sparkles, ImagePlus, Maximize2, Zap } from "lucide-react";
import { aiVisualsAndAnimation, AiVisualsAndAnimationOutput } from "@/ai/flows/ai-visuals-and-animation-flow";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

export default function VisualsProductionPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AiVisualsAndAnimationOutput | null>(null);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    description: "cozy moonlit harbor, moonlight reflecting on water, lighthouse glow in distance, rainy dockside windows, anime lofi aesthetic, 4k detail",
    mood: "Calm, dreamy, nostalgic, late-night escape",
    style: "Midjourney Lo-Fi Style v6 (Harbor Theme)",
    variationCount: 1
  });

  async function handleGenerate() {
    setLoading(true);
    try {
      const output = await aiVisualsAndAnimation({
        ...formData,
        inputType: 'text'
      });
      setResult(output);
      toast({ title: "Harbor Scene Engineered", description: "Midjourney/Playground instructions for Harbor Moon Radio ready." });
    } catch (error) {
      toast({ title: "Error", description: "Failed to generate visual prompts." });
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
            <h1 className="font-headline font-bold text-xl uppercase tracking-tight text-primary">Visuals (Harbor Moon)</h1>
          </header>

          <main className="p-6 md:p-8 space-y-8">
            <div className="max-w-4xl mx-auto space-y-8">
              <Card className="bg-card border-border/50 shadow-2xl">
                <CardHeader>
                  <CardTitle className="font-headline flex items-center gap-2 text-primary">
                    <ImageIcon className="w-5 h-5" />
                    Visual Scene Context
                  </CardTitle>
                  <CardDescription>Engineering the moonlit aesthetic for Harbor Moon radio loops</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Visual Logic (Core Prompt)</Label>
                    <Textarea 
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      className="bg-secondary/30 min-h-[100px]"
                      placeholder="e.g. cozy moonlit harbor, rain on water..."
                    />
                  </div>
                  
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Midjourney Style V6</Label>
                      <Input 
                        value={formData.style}
                        onChange={(e) => setFormData({...formData, style: e.target.value})}
                        className="bg-secondary/30"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Atmosphere Target</Label>
                      <Input 
                        value={formData.mood}
                        onChange={(e) => setFormData({...formData, mood: e.target.value})}
                        className="bg-secondary/30"
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-secondary/10 border-t border-border/50 p-6">
                  <Button 
                    className="w-full bg-primary text-primary-foreground font-bold h-12 uppercase text-[10px] tracking-widest shadow-xl"
                    onClick={handleGenerate}
                    disabled={loading}
                  >
                    {loading ? <Loader2 className="animate-spin mr-2" /> : <Sparkles className="mr-2 h-4 w-4" />}
                    Engineer Aesthetic Scene
                  </Button>
                </CardFooter>
              </Card>

              {result && (
                <div className="grid gap-6 animate-in slide-in-from-bottom-4 duration-500">
                  <Card className="bg-card border-primary/20 shadow-md">
                    <CardHeader className="pb-2 bg-primary/5 rounded-t-lg">
                      <CardTitle className="text-[10px] font-bold uppercase text-primary flex items-center gap-2 tracking-widest">
                        <Maximize2 className="w-3 h-3" /> Scene Upscaling Hub
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-4">
                      <div className="p-4 rounded-xl bg-secondary/30 border border-border italic text-[11px] leading-relaxed text-muted-foreground bg-secondary/10">
                        {result.variations[0].imagePrompt}
                      </div>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20 text-[8px] uppercase font-bold">Node Ready for Playground AI</Badge>
                        <Button variant="ghost" size="sm" className="h-8 text-[10px] uppercase font-bold text-primary">
                          <Copy className="w-3 h-3 mr-2" /> Copy Prompt
                        </Button>
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
