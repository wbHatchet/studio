
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
import { Loader2, Mic2, Download, Wand2, Copy, Sparkles, CheckCircle2, AlertCircle, Info, Layers } from "lucide-react";
import { generateVoiceScript, textToSpeech } from "@/ai/flows/ai-voice-generation";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export default function VoiceProductionPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [isGeneratingAudio, setIsGeneratingAudio] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    topic: "The secret billionaire routine that triggers high retention.",
    tone: "Energetic",
    targetDuration: 30,
    batchSize: 50
  });

  async function handleGenerateScript() {
    setLoading(true);
    setAudioUrl(null);
    try {
      const output = await generateVoiceScript(formData);
      setResult(output);
      toast({ title: "Scripts Engineered", description: "Bulk viral optimization complete." });
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Failed to generate scripts." });
    } finally {
      setLoading(false);
    }
  }

  async function handleSynthesize() {
    if (!result?.script) return;
    setIsGeneratingAudio(true);
    try {
      const dataUri = await textToSpeech(result.script);
      setAudioUrl(dataUri);
      toast({ title: "Batch Synthesis Complete", description: `${formData.batchSize} voiceovers ready.` });
    } catch (error) {
      console.error(error);
      toast({ variant: "destructive", title: "Error", description: "Synthesis failed. Check ElevenLabs API." });
    } finally {
      setIsGeneratingAudio(false);
    }
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <SidebarInset className="bg-background">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b border-border/50 px-4">
            <SidebarTrigger className="-ml-1" />
            <div className="h-4 w-px bg-border/50 mx-2" />
            <h1 className="font-headline font-bold text-xl uppercase tracking-tight text-primary">Voice Generation Command</h1>
          </header>

          <main className="p-6 md:p-8 space-y-8">
            <div className="max-w-5xl mx-auto grid gap-8 lg:grid-cols-2">
              <div className="space-y-6">
                <Card className="bg-card border-border/50 shadow-md">
                  <CardHeader>
                    <CardTitle className="font-headline flex items-center gap-2">
                      <Mic2 className="w-5 h-5 text-primary" />
                      Batch Parameters
                    </CardTitle>
                    <CardDescription>Configure mass synthesis for the network</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Bulk Topic / Viral Niche</Label>
                      <Textarea 
                        value={formData.topic}
                        onChange={(e) => setFormData({...formData, topic: e.target.value})}
                        className="bg-secondary/30 min-h-[100px]"
                        placeholder="e.g. Billionaire Habits Series #1-50"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Voice Style</Label>
                        <Select value={formData.tone} onValueChange={(v) => setFormData({...formData, tone: v})}>
                          <SelectTrigger className="bg-secondary/30">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Energetic">Energetic (Viral)</SelectItem>
                            <SelectItem value="Narrative & Calm">Narrative (Story)</SelectItem>
                            <SelectItem value="Deep & Mysterious">Deep (Mystery)</SelectItem>
                            <SelectItem value="Corporate">Corporate (News)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Batch size (Videos)</Label>
                        <Input 
                          type="number" 
                          value={formData.batchSize}
                          onChange={(e) => setFormData({...formData, batchSize: parseInt(e.target.value)})}
                          className="bg-secondary/30"
                        />
                      </div>
                    </div>
                    <Button 
                      className="w-full bg-primary text-primary-foreground font-bold h-12 uppercase text-[10px] tracking-widest"
                      onClick={handleGenerateScript}
                      disabled={loading}
                    >
                      {loading ? <Loader2 className="animate-spin mr-2" /> : <Wand2 className="mr-2 h-4 w-4" />}
                      Engineer Batch Scripts
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-card border-primary/20">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xs font-bold uppercase text-primary flex items-center gap-2">
                      <Info className="w-3 h-3" /> ElevenLabs API Capacity
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 border border-border">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-500 font-bold">E</div>
                        <div>
                          <p className="text-xs font-bold">Command Voice: ADAM</p>
                          <p className="text-[10px] text-muted-foreground uppercase font-bold">Professional Tier Active</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">GRID_READY</Badge>
                    </div>

                    <Button 
                      variant="outline" 
                      className="w-full border-primary/20 hover:bg-primary/5 font-bold h-12 uppercase text-[10px] tracking-widest"
                      onClick={handleSynthesize}
                      disabled={!result || isGeneratingAudio}
                    >
                      {isGeneratingAudio ? <Loader2 className="animate-spin mr-2" /> : <Layers className="mr-2 h-4 w-4" />}
                      Start Batch Synthesis ({formData.batchSize} files)
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                {!result && !loading && (
                  <div className="flex flex-col items-center justify-center h-full text-center p-12 border-2 border-dashed border-border rounded-3xl opacity-50 min-h-[400px]">
                    <Sparkles className="w-12 h-12 mb-4 text-muted-foreground" />
                    <p className="text-lg font-medium uppercase text-[10px] tracking-widest font-bold">Pipeline Status: IDLE</p>
                    <p className="text-xs text-muted-foreground max-w-xs mx-auto mt-2">Ready for mass synthesis of scripts for the 100+ channel network.</p>
                  </div>
                )}

                {result && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                    <Card className="bg-card border-primary/20 shadow-lg">
                      <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-[10px] font-bold uppercase text-primary tracking-widest">Engineered Script Library</CardTitle>
                        <Badge variant="secondary" className="font-mono text-[9px]">{formData.batchSize} ITEMS</Badge>
                      </CardHeader>
                      <CardContent>
                        <div className="relative">
                          <pre className="text-xs whitespace-pre-wrap font-sans leading-relaxed h-72 overflow-y-auto pr-2 custom-scrollbar bg-secondary/20 p-4 rounded-lg italic text-muted-foreground border border-border/50">
                            {result.script}
                          </pre>
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
