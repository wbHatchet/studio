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
  HardDrive,
  Terminal,
  Code2
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
    // Simulate YouTube Data API v3 insert logic: 
    // youtube.videos().insert({ 
    //   part: "snippet,status", 
    //   body: { snippet: {...}, status: { privacyStatus: "public" } }, 
    //   media_body: "video.mp4" 
    // })
    setTimeout(() => {
      setIsPublishing(false);
      toast({
        title: "YouTube API: Sequence Triggered",
        description: "Asset slotted into the 10-20/day upload sequence. GCS blob synced.",
      });
    }, 2000);
  };

  const mockApiPayload = {
    part: "snippet,status",
    body: {
      snippet: {
        title: "[FREE] 6LACK x Drake Type Beat - \"Midnight Confessions\"",
        description: "💵 Purchase This Beat: [Link]\n🔥 BUY 1 GET 2 FREE!\nBPM: 140 | KEY: F Minor\n#6LACK #Drake #TypeBeat2025",
        tags: ["6lack type beat", "drake type beat", "free type beat 2025", "midnight confessions"]
      },
      status: {
        privacyStatus: "public"
      }
    },
    media_body: "video-assets-factory/videos/video1.mp4"
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <SidebarInset className="bg-background">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b border-border/50 px-4">
            <SidebarTrigger className="-ml-1" />
            <div className="h-4 w-px bg-border/50 mx-2" />
            <h1 className="font-headline font-bold text-xl uppercase tracking-tight text-primary">Approval & Factory Distribution</h1>
          </header>

          <main className="p-6 md:p-8 space-y-8">
            <div className="max-w-6xl mx-auto grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-6">
                <Card className="bg-black border-border/50 overflow-hidden aspect-video relative group shadow-2xl rounded-3xl">
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
                      <span className="text-[10px] font-mono">00:15 / 00:30 (Ultra-Scale Factory Optimized)</span>
                    </div>
                  </div>
                </Card>

                <Tabs defaultValue="metadata" className="w-full">
                  <TabsList className="bg-secondary/50 w-full justify-start border border-border/50 rounded-2xl p-1 h-auto overflow-x-auto custom-scrollbar">
                    <TabsTrigger value="metadata" className="rounded-xl py-2 px-6 font-bold uppercase text-[10px] tracking-widest">Metadata</TabsTrigger>
                    <TabsTrigger value="factory" className="rounded-xl py-2 px-6 font-bold uppercase text-[10px] tracking-widest">Factory Logic</TabsTrigger>
                    <TabsTrigger value="api" className="rounded-xl py-2 px-6 font-bold uppercase text-[10px] tracking-widest flex gap-2"><Code2 className="w-3 h-3" /> API Payload</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="metadata" className="mt-4 space-y-4 m-0">
                    <Card className="bg-card border-border/50 rounded-2xl">
                      <CardContent className="pt-6 space-y-4">
                        <div className="space-y-1">
                          <Label className="text-[10px] uppercase text-muted-foreground font-bold tracking-widest">YouTube Optimized Title</Label>
                          <p className="text-lg font-headline font-bold text-foreground">{mockApiPayload.body.snippet.title}</p>
                        </div>
                        <div className="space-y-1">
                          <Label className="text-[10px] uppercase text-muted-foreground font-bold tracking-widest">SEO Description Block</Label>
                          <div className="p-4 rounded-xl bg-secondary/30 border border-border/50 font-mono text-[10px] leading-relaxed text-muted-foreground whitespace-pre-wrap">
                            {mockApiPayload.body.snippet.description}
                          </div>
                        </div>
                        <div className="flex gap-2 pt-2">
                          <Button variant="outline" size="sm" className="h-8 text-[10px] font-bold uppercase tracking-widest rounded-lg"><Edit3 className="w-3 h-3 mr-2" /> Modify Meta</Button>
                          <Button variant="outline" size="sm" className="h-8 text-[10px] font-bold uppercase tracking-widest rounded-lg"><Youtube className="w-3 h-3 mr-2" /> View Channel</Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="factory" className="mt-4 m-0 space-y-4">
                    <Card className="bg-card border-border/50 rounded-2xl">
                      <CardContent className="pt-6">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-4 bg-secondary/30 rounded-xl border border-border/50">
                            <Label className="text-[9px] uppercase font-bold text-muted-foreground">GCS media_body</Label>
                            <p className="text-[11px] font-bold font-mono text-primary truncate">{mockApiPayload.media_body}</p>
                          </div>
                          <div className="p-4 bg-secondary/30 rounded-xl border border-border/50">
                            <Label className="text-[9px] uppercase font-bold text-muted-foreground">Render Node</Label>
                            <p className="text-[11px] font-bold font-mono">GCP_COMPUTE_NODE_42</p>
                          </div>
                          <div className="p-4 bg-secondary/30 rounded-xl border border-border/50">
                            <Label className="text-[9px] uppercase font-bold text-muted-foreground">YouTube API Part</Label>
                            <Badge className="bg-primary/10 text-primary border-primary/20 text-[9px] uppercase">{mockApiPayload.part}</Badge>
                          </div>
                          <div className="p-4 bg-secondary/30 rounded-xl border border-border/50">
                            <Label className="text-[9px] uppercase font-bold text-muted-foreground">Factory Method</Label>
                            <p className="text-[11px] font-bold font-mono">youtube.videos().insert()</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="api" className="mt-4 m-0">
                    <Card className="bg-card border-border/50 rounded-2xl">
                      <CardHeader className="bg-primary/5 py-4">
                        <CardTitle className="text-xs font-bold uppercase text-primary flex items-center gap-2">
                          <Terminal className="w-3 h-3" /> JSON Payload Preview
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <pre className="text-[10px] font-mono bg-black/90 p-4 rounded-xl text-green-400 overflow-auto max-h-[300px] custom-scrollbar">
                          {JSON.stringify(mockApiPayload, null, 2)}
                        </pre>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>

              <div className="space-y-6">
                <Card className="bg-card border-primary/20 shadow-xl overflow-hidden rounded-3xl">
                  <div className="h-1.5 w-full bg-primary/20">
                    <div className="h-full bg-primary w-2/3 animate-pulse" />
                  </div>
                  <CardHeader>
                    <CardTitle className="font-headline text-lg flex items-center gap-2">
                      <Zap className="w-5 h-5 text-primary" />
                      Factory Approval
                    </CardTitle>
                    <CardDescription className="text-xs">Triggering 10-20/day automated upload sequence</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 rounded-2xl bg-green-500/5 border border-green-500/10 flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-[10px] font-bold uppercase text-green-500">YouTube v3 Ready</p>
                        <p className="text-[10px] text-muted-foreground">Snippet and Status parameters validated for API insert.</p>
                      </div>
                    </div>
                    
                    <div className="p-4 rounded-2xl bg-blue-500/5 border border-blue-500/10 flex items-start gap-3">
                      <HardDrive className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-[10px] font-bold uppercase text-blue-500">video-assets-factory</p>
                        <p className="text-[10px] text-muted-foreground">Destination bucket mapped. blob.upload_from_filename sequence started.</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col gap-3">
                    <Button 
                      className="w-full bg-primary text-primary-foreground font-bold h-14 text-base shadow-[0_0_20px_rgba(var(--primary),0.3)] hover:scale-105 transition-all rounded-2xl"
                      onClick={handlePublish}
                      disabled={isPublishing}
                    >
                      {isPublishing ? (
                        <>
                          <Loader2 className="animate-spin mr-2" />
                          API_INSERT_PENDING...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Approve & Publish (YouTube v3)
                        </>
                      )}
                    </Button>
                    <Button variant="outline" className="w-full text-destructive border-destructive/20 hover:bg-destructive/10 text-[10px] font-bold uppercase tracking-widest rounded-2xl h-10">
                      <XCircle className="w-3 h-3 mr-2" /> Kill Factory Process
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="bg-card border-border/50 rounded-2xl shadow-md">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Network Distribution Logs</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between p-2 rounded-xl bg-secondary/30">
                      <div className="flex items-center gap-2">
                        <Youtube className="w-3 h-3 text-red-500" />
                        <span className="text-[10px] font-bold">YouTube API v3</span>
                      </div>
                      <Badge variant="outline" className="text-[8px] bg-green-500/10 text-green-500 border-green-500/20">READY</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-xl bg-secondary/30">
                      <div className="flex items-center gap-2">
                        <Zap className="w-3 h-3 text-primary" />
                        <span className="text-[10px] font-bold">GCS_BLOB_SYNC</span>
                      </div>
                      <Badge variant="outline" className="text-[8px] bg-blue-500/10 text-blue-400 border-blue-500/20">ACTIVE</Badge>
                    </div>
                    <div className="pt-2">
                      <p className="text-[8px] text-center text-muted-foreground italic uppercase tracking-tighter">Current Slot: 14/20 Videos Published Today</p>
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
