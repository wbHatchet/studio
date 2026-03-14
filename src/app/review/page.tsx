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
  SkipForward, 
  Volume2,
  Youtube,
  Info,
  ExternalLink,
  Edit3
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ReviewPage() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <SidebarInset className="bg-background">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b border-border/50 px-4">
            <SidebarTrigger className="-ml-1" />
            <div className="h-4 w-px bg-border/50 mx-2" />
            <h1 className="font-headline font-bold text-xl">Review & Approval</h1>
          </header>

          <main className="p-6 md:p-8 space-y-8">
            <div className="max-w-6xl mx-auto grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-6">
                <Card className="bg-black border-border/50 overflow-hidden aspect-video relative group">
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-all">
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      className="h-16 w-16 rounded-full bg-primary text-primary-foreground hover:scale-110 transition-transform"
                      onClick={() => setIsPlaying(!isPlaying)}
                    >
                      {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8 ml-1" />}
                    </Button>
                  </div>
                  <img 
                    src="https://picsum.photos/seed/review1/1280/720" 
                    alt="Preview" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                    <div className="flex items-center justify-between text-white">
                      <div className="flex items-center gap-4">
                        <Volume2 className="w-4 h-4" />
                        <span className="text-xs font-mono">02:45 / 03:30</span>
                      </div>
                      <SkipForward className="w-4 h-4 cursor-pointer" />
                    </div>
                  </div>
                </Card>

                <Tabs defaultValue="metadata" className="w-full">
                  <TabsList className="bg-secondary/50 w-full justify-start border-b border-border/50 rounded-none h-auto p-0">
                    <TabsTrigger value="metadata" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-3 px-6">Metadata</TabsTrigger>
                    <TabsTrigger value="lyrics" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-3 px-6">Beat Details</TabsTrigger>
                    <TabsTrigger value="history" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-3 px-6">Generation Log</TabsTrigger>
                  </TabsList>
                  <Card className="border-t-0 rounded-t-none bg-card">
                    <CardContent className="pt-6">
                      <TabsContent value="metadata" className="space-y-4 m-0">
                        <div className="space-y-1">
                          <Label className="text-[10px] uppercase text-muted-foreground font-bold">YouTube Title</Label>
                          <p className="text-lg font-headline font-bold">[FREE] 6LACK x Drake Type Beat - "Midnight Confessions"</p>
                        </div>
                        <div className="space-y-1">
                          <Label className="text-[10px] uppercase text-muted-foreground font-bold">Description Snippet</Label>
                          <p className="text-sm text-muted-foreground line-clamp-3">
                            Purchase This Beat (Untagged) 🔥 BUY 1 GET 2 FREE. BPM: 140. KEY: F Minor.
                            This is a smooth atmospheric 6LACK type beat inspired by dark R&B melodies...
                          </p>
                        </div>
                        <div className="flex gap-2 pt-2">
                          <Button variant="outline" size="sm" className="h-8"><Edit3 className="w-3 h-3 mr-2" /> Edit Info</Button>
                          <Button variant="outline" size="sm" className="h-8"><Youtube className="w-3 h-3 mr-2" /> Preview on YouTube</Button>
                        </div>
                      </TabsContent>
                      <TabsContent value="lyrics" className="m-0">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="p-3 bg-secondary/30 rounded-lg">
                            <span className="text-xs text-muted-foreground">Tempo</span>
                            <p className="font-bold">140 BPM</p>
                          </div>
                          <div className="p-3 bg-secondary/30 rounded-lg">
                            <span className="text-xs text-muted-foreground">Key</span>
                            <p className="font-bold">F Minor</p>
                          </div>
                          <div className="p-3 bg-secondary/30 rounded-lg">
                            <span className="text-xs text-muted-foreground">Vibe</span>
                            <p className="font-bold">Dark, Emotional</p>
                          </div>
                          <div className="p-3 bg-secondary/30 rounded-lg">
                            <span className="text-xs text-muted-foreground">Scale</span>
                            <p className="font-bold">Melodic Trap Soul</p>
                          </div>
                        </div>
                      </TabsContent>
                    </CardContent>
                  </Card>
                </Tabs>
              </div>

              <div className="space-y-6">
                <Card className="bg-card border-primary/20 shadow-xl">
                  <CardHeader>
                    <CardTitle className="font-headline">Final Approval</CardTitle>
                    <CardDescription>Confirm quality check before publishing</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                      <div className="text-xs">
                        <p className="font-bold text-green-500">Audio Pass</p>
                        <p className="text-muted-foreground">No clipping or distortion detected in masters.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                      <div className="text-xs">
                        <p className="font-bold text-green-500">Visual Pass</p>
                        <p className="text-muted-foreground">Loop points are seamless. High-res output ready.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                      <Info className="w-5 h-5 text-blue-500 mt-0.5" />
                      <div className="text-xs">
                        <p className="font-bold text-blue-500">SEO Optimized</p>
                        <p className="text-muted-foreground">Metadata ready for "6LACK type beat" micro-niche.</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col gap-3">
                    <Button className="w-full bg-primary text-primary-foreground font-bold h-12 text-lg">
                      Approve & Publish to YouTube
                    </Button>
                    <Button variant="outline" className="w-full text-destructive border-destructive/20 hover:bg-destructive/10">
                      <XCircle className="w-4 h-4 mr-2" /> Reject & Regenerate
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="bg-card">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-bold">Distribution Channels</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        <span className="text-xs">6LACK R&B Beats</span>
                      </div>
                      <Badge variant="secondary" className="text-[10px]">YouTube</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 opacity-50">
                        <div className="w-2 h-2 rounded-full bg-muted" />
                        <span className="text-xs">BeatStars Store</span>
                      </div>
                      <Badge variant="secondary" className="text-[10px]">E-Commerce</Badge>
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
