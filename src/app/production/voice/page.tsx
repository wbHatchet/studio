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
import { Loader2, Mic2, Play, Download, Sparkles, Wand2, Copy, CheckCircle2, Volume2 } from "lucide-react";
import { generateVoiceScript, textToSpeech } from "@/ai/flows/ai-voice-generation";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

export default function VoiceProductionPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [isGeneratingAudio, setIsGeneratingAudio] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    topic: "The secret history of Lo-Fi music and why it helps you study.",
    tone: "Narrative & Calm",
    targetDuration: 60
  });

  async function handleGenerateScript() {
    setLoading(true);
    setAudioUrl(null);
    try {
      const output = await generateVoiceScript(formData);
      setResult(output);
      toast({ title: "Script Engineered", description: "Optimization for ElevenLabs complete." });
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Failed to generate script." });
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
      toast({ title: "Synthesis Complete", description: "Voiceover is ready for preview." });
    } catch (error) {
      console.error(error);
      toast({ variant: "destructive", title: "Error", description: "Synthesis failed. Check API key." });
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
            <h1 className="font-headline font-bold text-xl">AI Voice Architect</h1>
          </header>

          <main className="p-6 md:p-8 space-y-8">
            <div className="max-w-5xl mx-auto grid gap-8 lg:grid-cols-2">
              <div className="space-y-6">
                <Card className="bg-card">
                  <CardHeader>
                    <CardTitle className="font-headline flex items-center gap-2">
                      <Mic2 className="w-5 h-5 text-primary" />
                      Vocal Parameters
                    </CardTitle>
                    <CardDescription>Configure the script persona and duration</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Core Topic / Hook</Label>
                      <Textarea 
                        value={formData.topic}
                        onChange={(e) => setFormData({...formData, topic: e.target.value})}
                        className="bg-secondary/30 min-h-[100px]"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Voice Tone</Label>
                        <Select value={formData.tone} onValueChange={(v) => setFormData({...formData, tone: v})}>
                          <SelectTrigger className="bg-secondary/30">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Energetic">Energetic</SelectItem>
                            <SelectItem value="Narrative & Calm">Narrative & Calm</SelectItem>
                            <SelectItem value="Deep & Mysterious">Deep & Mysterious</SelectItem>
                            <SelectItem value="Corporate">Corporate</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Target Duration (s)</Label>
                        <Input 
                          type="number" 
                          value={formData.targetDuration}
                          onChange={(e) => setFormData({...formData, targetDuration: parseInt(e.target.value)})}
                          className="bg-secondary/30"
                        />
                      </div>
                    </div>
                    <Button 
                      className="w-full bg-primary text-primary-foreground font-bold"
                      onClick={handleGenerateScript}
                      disabled={loading}
                    >
                      {loading ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : <Wand2 className="mr-2 h-4 w-4" />}
                      Engineer Narrative Script
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-card border-orange-500/20">
                  <CardHeader>
                    <CardTitle className="text-sm font-bold uppercase text-orange-400">ElevenLabs Integration</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 border border-border">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-500 font-bold">E</div>
                        <div>
                          <p className="text-xs font-bold">Adam (Legacy)</p>
                          <p className="text-[10px] text-muted-foreground">High stability narrative</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-green-500/10 text-green-500">Live</Badge>
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full border-primary/20 hover:bg-primary/5 font-bold"
                      onClick={handleSynthesize}
                      disabled={!result || isGeneratingAudio}
                    >
                      {isGeneratingAudio ? <Loader2 className="animate-spin mr-2" /> : <Mic2 className="mr-2 h-4 w-4" />}
                      Synthesize to Audio
                    </Button>
                    
                    {audioUrl && (
                      <div className="mt-4 p-4 rounded-xl bg-primary/5 border border-primary/10 animate-in fade-in zoom-in-95 duration-300">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-[10px] font-bold uppercase text-primary">Vocal Preview</span>
                          <a href={audioUrl} download="voiceover.mp3">
                            <Button size="sm" variant="ghost" className="h-7 text-xs gap-1">
                              <Download className="w-3 h-3" /> Download MP3
                            </Button>
                          </a>
                        </div>
                        <audio controls className="w-full h-8">
                          <source src={audioUrl} type="audio/mpeg" />
                        </audio>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                {!result && !loading && (
                  <div className="flex flex-col items-center justify-center h-full text-center p-12 border-2 border-dashed border-border rounded-3xl opacity-50 min-h-[400px]">
                    <Mic2 className="w-12 h-12 mb-4 text-muted-foreground" />
                    <p className="text-lg font-medium">Script Engine Idle</p>
                    <p className="text-sm text-muted-foreground">Input a topic to generate a high-retention script.</p>
                  </div>
                )}

                {loading && (
                   <div className="space-y-4 animate-pulse">
                     <div className="h-64 bg-secondary/30 rounded-2xl" />
                     <div className="h-32 bg-secondary/30 rounded-2xl" />
                   </div>
                )}

                {result && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                    <Card className="bg-card border-primary/20">
                      <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-bold uppercase text-primary">Generated Script</CardTitle>
                        <Button variant="ghost" size="icon" onClick={() => navigator.clipboard.writeText(result.script)}>
                          <Copy className="h-4 w-4" />
                        </Button>
                      </CardHeader>
                      <CardContent>
                        <pre className="text-xs whitespace-pre-wrap font-sans leading-relaxed h-64 overflow-y-auto pr-2 custom-scrollbar bg-secondary/20 p-4 rounded-lg italic">
                          {result.script}
                        </pre>
                        <div className="mt-4 flex justify-between items-center text-[10px] text-muted-foreground font-bold uppercase">
                          <span>Words: {result.estimatedWordCount}</span>
                          <span>Est. Duration: {formData.targetDuration}s</span>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-card">
                      <CardHeader>
                        <CardTitle className="text-sm font-bold uppercase text-muted-foreground">Retention Triggers</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {result.retentionTriggers.map((t: string, i: number) => (
                            <div key={i} className="flex items-start gap-2 text-xs p-2 rounded-md bg-secondary/30 border border-border">
                              <Sparkles className="w-3 h-3 text-primary mt-0.5 shrink-0" />
                              {t}
                            </div>
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
