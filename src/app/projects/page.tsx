
"use client";

import { useState } from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { 
  PlusCircle, 
  Layers, 
  MoreVertical, 
  Clock, 
  Music,
  Video,
  Upload,
  Database,
  SearchCode,
  Sparkles,
  ImageIcon,
  Youtube,
  Cpu,
  Workflow,
  Terminal,
  Activity,
  Flame
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const productionStages = [
  { id: "idea", label: "Ideas", count: 120, color: "text-blue-400" },
  { id: "music", label: "Suno Music", count: 65, color: "text-purple-400" },
  { id: "scene", label: "MJ Scenes", count: 42, color: "text-orange-400" },
  { id: "render", label: "FFmpeg Queue", count: 18, color: "text-amber-400" },
  { id: "published", label: "YouTube Ready", count: 32, color: "text-green-400" },
];

const warmUpQueue = [
  { 
    id: 1, 
    name: "Moonlit Harbor Study Beats 🌙", 
    niche: "Harbor Moon Radio", 
    status: "FFmpeg Rendering", 
    duration: "3h Loop",
    progress: 85, 
    type: "Long-form",
    node: "FFMPEG-NODE-01",
    stage: "render"
  },
  { 
    id: 2, 
    name: "Rainy Dock Lofi – Deep Focus Mix", 
    niche: "Harbor Moon Radio", 
    status: "Music Gen (Suno)", 
    duration: "2h Loop",
    progress: 30, 
    type: "Long-form",
    node: "SUNO-API-02",
    stage: "music"
  },
  { 
    id: 3, 
    name: "Late Night Harbor Radio", 
    niche: "Harbor Moon Radio", 
    status: "Ready for Upload", 
    duration: "3h Loop",
    progress: 100, 
    type: "Long-form",
    node: "YT-API-UPLOAD-03",
    stage: "published"
  },
  { 
    id: 4, 
    name: "Quiet Harbor Café Lofi", 
    niche: "Harbor Moon Radio", 
    status: "Pending Scene", 
    duration: "1h Loop",
    progress: 15, 
    type: "Long-form",
    node: "MJ-SCENE-04",
    stage: "scene"
  }
];

export default function ProjectsPage() {
  const [queue] = useState(warmUpQueue);
  const { toast } = useToast();

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <SidebarInset className="bg-background text-foreground">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b border-border/50 px-4">
            <SidebarTrigger className="-ml-1" />
            <div className="h-4 w-px bg-border/50 mx-2" />
            <h1 className="font-headline font-bold text-xl uppercase tracking-tight text-primary">Week 1 Algorithm Warm-Up Queue</h1>
            <Button size="sm" className="ml-auto bg-primary text-primary-foreground font-bold h-9 uppercase text-[10px] tracking-widest px-6">
              <PlusCircle className="w-4 h-4 mr-2" /> Launch Harbor Moon Video
            </Button>
          </header>

          <main className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto w-full">
            <div className="bg-primary/5 border border-primary/20 p-4 rounded-2xl flex items-center justify-between">
               <div className="flex items-center gap-3">
                 <Flame className="w-5 h-5 text-orange-500" />
                 <div>
                   <p className="text-[10px] font-bold uppercase text-primary">Active Blueprint: Harbor Moon LoFi Radio</p>
                   <p className="text-xs font-headline font-bold">Week 1 Strategy: 10 Videos / Algorithm Warm-Up</p>
                 </div>
               </div>
               <Badge className="bg-green-500/20 text-green-500 uppercase font-mono text-[10px]">3/10 COMPLETE</Badge>
            </div>

            <div className="grid grid-cols-5 gap-4">
              {productionStages.map((stage) => (
                <Card key={stage.id} className="bg-card border-border/50 shadow-sm overflow-hidden">
                  <CardHeader className="p-4 pb-2">
                    <div className="flex justify-between items-center">
                      <p className={cn("text-[10px] font-bold uppercase tracking-widest", stage.color)}>{stage.label}</p>
                      <Badge variant="outline" className="text-[10px] font-mono border-primary/20">{stage.count}</Badge>
                    </div>
                  </CardHeader>
                  <div className="h-1 w-full bg-secondary/50">
                    <div className={cn("h-full w-1/3 opacity-50", stage.color.replace('text', 'bg'))} />
                  </div>
                </Card>
              ))}
            </div>

            <Tabs defaultValue="queue" className="w-full">
              <TabsList className="bg-secondary/50 p-1 mb-8 border border-border/50 rounded-xl">
                <TabsTrigger value="queue" className="gap-2 font-bold uppercase text-[10px] tracking-widest px-6 py-2 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <Layers className="w-3 h-3" /> Factory Monitor
                </TabsTrigger>
                <TabsTrigger value="assets" className="gap-2 font-bold uppercase text-[10px] tracking-widest px-6 py-2 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <Database className="w-3 h-3" /> Asset Library
                </TabsTrigger>
              </TabsList>

              <TabsContent value="queue" className="space-y-6">
                <div className="grid gap-6">
                  {queue.map((item) => (
                    <Card key={item.id} className="bg-card hover:border-primary/30 transition-all group overflow-hidden border-border/50 shadow-sm">
                      <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row md:items-center gap-6 p-6">
                          <div className="flex-1 space-y-4">
                            <div className="flex items-start justify-between">
                              <div>
                                <div className="flex items-center gap-3">
                                  <h3 className="text-lg font-headline font-bold group-hover:text-primary transition-colors">{item.name}</h3>
                                  <Badge variant="secondary" className="text-[9px] uppercase tracking-widest font-mono bg-secondary/50 border-border/50">{item.duration}</Badge>
                                </div>
                                <div className="flex items-center gap-4 mt-2">
                                  <p className="text-[9px] text-muted-foreground uppercase font-bold tracking-tighter flex items-center gap-1">
                                    Niche: <span className="text-primary font-mono">{item.niche}</span>
                                  </p>
                                  <p className="text-[9px] text-muted-foreground uppercase font-bold tracking-tighter flex items-center gap-1">
                                    Stage: <span className="text-blue-400 font-mono italic">{item.stage.toUpperCase()}</span>
                                  </p>
                                </div>
                              </div>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="bg-popover border-border p-1">
                                  <DropdownMenuItem className="text-[10px] font-bold uppercase tracking-widest">Restart Render</DropdownMenuItem>
                                  <DropdownMenuItem className="text-destructive font-bold uppercase text-[10px] tracking-widest">Kill Job</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>

                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-[10px] font-bold uppercase">
                                <span className="text-muted-foreground flex items-center gap-1 font-mono tracking-tighter">
                                  <Cpu className="w-3 h-3" /> {item.node}
                                </span>
                                <span className="text-primary font-mono tracking-tighter">{item.progress}% ASSEMBLY</span>
                              </div>
                              <Progress value={item.progress} className="h-1 bg-secondary/50 rounded-full" />
                            </div>
                          </div>

                          <div className="flex md:flex-col gap-2 md:w-48 shrink-0">
                            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 text-[9px] uppercase font-bold text-center justify-center py-1">
                              {item.status}
                            </Badge>
                            <div className="flex gap-1 mt-1">
                              <Button variant="outline" size="icon" className="h-8 w-8 opacity-50 border-border/50 hover:opacity-100 transition-opacity"><Music className="h-3.5 w-3.5" /></Button>
                              <Button variant="outline" size="icon" className="h-8 w-8 opacity-50 border-border/50 hover:opacity-100 transition-opacity"><Video className="h-3.5 w-3.5" /></Button>
                              {item.progress === 100 && (
                                <Button variant="outline" size="icon" className="h-8 w-8 text-primary border-primary/30 animate-pulse"><Youtube className="h-3.5 w-3.5" /></Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="assets" className="space-y-8">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                  <Card className="bg-card border-border/50 flex flex-col justify-center items-center p-8 text-center group hover:border-primary/30 transition-all">
                    <Music className="w-8 h-8 text-primary mb-2" />
                    <p className="text-[10px] font-bold uppercase">Music Tracks</p>
                    <p className="text-2xl font-headline font-bold">1,240</p>
                  </Card>
                  <Card className="bg-card border-border/50 flex flex-col justify-center items-center p-8 text-center group hover:border-primary/30 transition-all">
                    <ImageIcon className="w-8 h-8 text-purple-400 mb-2" />
                    <p className="text-[10px] font-bold uppercase">Background Scenes</p>
                    <p className="text-2xl font-headline font-bold">850</p>
                  </Card>
                  <Card className="bg-card border-border/50 flex flex-col justify-center items-center p-8 text-center group hover:border-primary/30 transition-all">
                    <Video className="w-8 h-8 text-amber-400 mb-2" />
                    <p className="text-[10px] font-bold uppercase">Rendered Loops</p>
                    <p className="text-2xl font-headline font-bold">450</p>
                  </Card>
                  <Card className="bg-card border-border/50 flex flex-col justify-center items-center p-8 text-center group hover:border-primary/30 transition-all">
                    <Youtube className="w-8 h-8 text-red-400 mb-2" />
                    <p className="text-[10px] font-bold uppercase">Published Videos</p>
                    <p className="text-2xl font-headline font-bold">312</p>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
