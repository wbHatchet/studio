
"use client";

import { useState } from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle2, 
  XCircle, 
  Play, 
  Pause, 
  Volume2,
  Youtube,
  Edit3,
  Zap,
  Clock,
  Send,
  Loader2,
  HardDrive
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function ReviewPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const { toast } = useToast();

  const handlePublish = async () => {
    setIsPublishing(true);
    // Simulate YouTube API insert logic: 
    // youtube.videos().insert({ part: "snippet,status", media_body: "video.mp4" })
    // and GCS upload: blob.upload_from_filename("video1.mp4")
    setTimeout(() => {
      setIsPublishing(false);
      toast({
        title: "Factory Pipeline: Published",
        description: "Asset uploaded to video-assets-factory/videos and scheduled on YouTube.",
      });
    }, 2000);
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <SidebarInset className="bg-background">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b border-border/50 px-4">
            <SidebarTrigger className="-ml-1" />
            <div className="h-4 w-px bg-border/50 mx-2" />
            <h1 className="font-headline font-bold text-xl uppercase tracking-tight">Approval & Factory Publish</h1>
          </header>

          <main className="p-6 md:p-8 space-y-8">
            <div className="max-w-6xl mx-auto grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-6">
                <Card className="bg-black border-border/50 overflow-hidden aspect-video relative group shadow-2xl">
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-all">
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      className="h-16 w-16 rounded-full bg-primary text-primary-foreground hover:scale-110 transition-transform shadow-[0_0_30px_rgba(var(--primary),0.4)]"
                      onClick={() => setIsPlaying(!isPlaying)}
                    >
                      {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8 ml-1" />}
                    </Button>
                  </div>
                  <img 
                    src="https://picsum.photos/seed/review1/1280/720" 
                    alt="Preview" 
                    className="w-full h-full object-cover opacity-80"
                  />
                  <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                    <div className="flex items-center justify-between text-white">
                      <div className="flex items-center gap-4">
                        <Volume2 className="w-4 h-4 opacity-70" />
                        <span className="text-[10px] font-mono tracking-widest uppercase text-primary">video-assets-factory/videos/video1.mp4</span>
                      </div>
                      <span className="text-[10px] font-mono">00:15 / 00:30 (Shorts Optimized)</span>
                    </div>
                  </div>
                </Card>

                <Tabs defaultValue="metadata" className="w-full">
                  <TabsList className="bg-secondary/50 w-full justify-start border border-border/50 rounded-xl p-1 h-auto">
                    <TabsTrigger value="metadata" className="rounded-lg py-2 px-6 font-bold uppercase text-[10px] tracking-widest">Metadata</TabsTrigger>
                    <TabsTrigger value="factory" className="rounded-lg py-2 px-6 font-bold uppercase text-[10px] tracking-widest">Factory Logic</TabsTrigger>
                    <TabsTrigger value="distribution" className="rounded-lg py-2 px-6 font-bold uppercase text-[10px] tracking-widest">Distribution</TabsTrigger>
                  </TabsList>
                  <Card className="mt-4 bg-card border-border/50">
                    <CardContent className="pt-6">
                      <TabsContent value="metadata" className="space-y-4 m-0">
                        <div className="space-y-1">
                          <Label className="text-[10px] uppercase text-muted-foreground font-bold tracking-widest">YouTube Optimized Title</Label>
                          <p className="text-lg font-headline font-bold">[FREE] 6LACK x Drake Type Beat - "Midnight Confessions"</p>
                        </div>
                        <div className="space-y-1">
                          <Label className="text-[10px] uppercase text-muted-foreground font-bold tracking-widest">SEO Description Block</Label>
                          <div className="p-4 rounded-xl bg-secondary/30 border border-border/50 font-mono text-[10px] leading-relaxed text-muted-foreground">
                            💵 Purchase This Beat: [Link]<br/>
                            🔥 BUY 1 GET 2 FREE!<br/>
                            BPM: 140 | KEY: F Minor<br/>
                            #6LACK #Drake #TypeBeat2025
                          </div>
                        </div>
                        <div className="flex gap-2 pt-2">
                          <Button variant="outline" size="sm" className="h-8 text-[10px] font-bold uppercase tracking-widest"><Edit3 className="w-3 h-3 mr-2" /> Modify Meta</Button>
                          <Button variant="outline" size="sm" className="h-8 text-[10px] font-bold uppercase tracking-widest"><Youtube className="w-3 h-3 mr-2" /> View Channel</Button>
                        </div>
                      </TabsContent>
                      <TabsContent value="factory" className="m-0 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-4 bg-secondary/30 rounded-xl border border-border/50">
                            <Label className="text-[9px] uppercase font-bold text-muted-foreground">GCS Path</Label>
                            <p className="text-[11px] font-bold font-mono">videos/video1.mp4</p>
                          </div>
                          <div className="p-4 bg-secondary/30 rounded-xl border border-border/50">
                            <Label className="text-[9px] uppercase font-bold text-muted-foreground">Render Node</Label>
                            <p className="text-[11px] font-bold font-mono">GCP_COMPUTE_NODE_42</p>
                          </div>
                          <div className="p-4 bg-secondary/30 rounded-xl border border-border/50">
                            <Label className="text-[9px] uppercase font-bold text-muted-foreground">AI Strategy</Label>
                            <Badge className="bg-primary/10 text-primary border-primary/20 text-[9px] uppercase">Retention_Focused</Badge>
                          </div>
                          <div className="p-4 bg-secondary/30 rounded-xl border border-border/50">
                            <Label className="text-[9px] uppercase font-bold text-muted-foreground">Blob Method</Label>
                            <p className="text-[11px] font-bold font-mono">upload_from_filename</p>
                          </div>
                        </div>
                      </TabsContent>
                    </CardContent>
                  </Card>
                </Tabs>
              </div>

              <div className="space-y-6">
                <Card className="bg-card border-primary/20 shadow-xl overflow-hidden">
                  <div className="h-1.5 w-full bg-primary/20">
                    <div className="h-full bg-primary w-2/3 animate-pulse" />
                  </div>
                  <CardHeader>
                    <CardTitle className="font-headline text-lg flex items-center gap-2">
                      <Zap className="w-5 h-5 text-primary" />
                      Factory Approval
                    </CardTitle>
                    <CardDescription className="text-xs">Scheduling for 10-20 uploads/day sequence</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 rounded-xl bg-green-500/5 border border-green-500/10 flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-[10px] font-bold uppercase text-green-500">Quality Check: PASS</p>
                        <p className="text-[10px] text-muted-foreground">Shorts aspect ratio (9:16) and GCS parity verified.</p>
                      </div>
                    </div>
                    
                    <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/10 flex items-start gap-3">
                      <HardDrive className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-[10px] font-bold uppercase text-blue-500">video-assets-factory</p>
                        <p className="text-[10px] text-muted-foreground">Destination bucket mapped for Python workers.</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col gap-3">
                    <Button 
                      className="w-full bg-primary text-primary-foreground font-bold h-14 text-base shadow-[0_0_20px_rgba(var(--primary),0.3)] hover:scale-105 transition-all"
                      onClick={handlePublish}
                      disabled={isPublishing}
                    >
                      {isPublishing ? (
                        <>
                          <Loader2 className="animate-spin mr-2" />
                          INSERTING_VIDEO_API...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Approve & Factory Publish
                        </>
                      )}
                    </Button>
                    <Button variant="outline" className="w-full text-destructive border-destructive/20 hover:bg-destructive/10 text-[10px] font-bold uppercase tracking-widest">
                      <XCircle className="w-3 h-3 mr-2" /> Purge Asset
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="bg-card border-border/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Network Distribution Status</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between p-2 rounded-lg bg-secondary/30">
                      <div className="flex items-center gap-2">
                        <Youtube className="w-3 h-3 text-red-500" />
                        <span className="text-[10px] font-bold">Main Channel</span>
                      </div>
                      <Badge variant="outline" className="text-[8px] bg-green-500/10 text-green-500 border-green-500/20">READY</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-lg bg-secondary/30">
                      <div className="flex items-center gap-2">
                        <Zap className="w-3 h-3 text-primary" />
                        <span className="text-[10px] font-bold">GCS_BLOB_SYNC</span>
                      </div>
                      <Badge variant="outline" className="text-[8px] bg-blue-500/10 text-blue-400 border-blue-500/20">ACTIVE</Badge>
                    </div>
                    <div className="pt-2">
                      <p className="text-[8px] text-center text-muted-foreground italic uppercase tracking-tighter">Factory Load: 14/20 Videos Published Today</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
