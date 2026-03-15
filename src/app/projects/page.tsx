
"use client";

import { useState } from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  PlusCircle, 
  Layers, 
  MoreVertical, 
  PlayCircle, 
  Clock, 
  Music,
  Video,
  Search,
  ExternalLink,
  FileSpreadsheet,
  Upload,
  Database,
  SearchCode,
  Sparkles,
  Folder,
  FileText,
  Mic2,
  HardDrive,
  Send,
  Youtube,
  Scissors
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const initialProjects = [
  { 
    id: 1, 
    name: "Midnight Rain Mix #42", 
    niche: "Drake R&B", 
    status: "Rendering", 
    publishStatus: "Pending Approval",
    progress: 65, 
    type: "Shorts",
    date: "2024-05-20"
  },
  { 
    id: 2, 
    name: "Cyberpunk Night Walk", 
    niche: "Dark Trap", 
    status: "AI Prompting", 
    publishStatus: "Draft",
    progress: 30, 
    type: "Shorts",
    date: "2024-05-21"
  },
  { 
    id: 3, 
    name: "Cozy Study Session LIVE", 
    niche: "Lo-Fi Study", 
    status: "Live", 
    publishStatus: "Published",
    progress: 100, 
    type: "Long Form",
    date: "2024-05-19"
  },
  { 
    id: 4, 
    name: "Halloween Lofi Beats", 
    niche: "Seasonal Lo-Fi", 
    status: "Ready", 
    publishStatus: "Scheduled (10/20)",
    progress: 100, 
    type: "Shorts",
    date: "2024-05-22"
  },
];

const cloudAssets = [
  { name: "scripts/", icon: FileText, count: 1240, color: "text-blue-400" },
  { name: "voice/", icon: Mic2, count: 1240, color: "text-purple-400" },
  { name: "clips/", icon: Scissors, count: 4500, color: "text-orange-400" },
  { name: "thumbnails/", icon: Sparkles, count: 3200, color: "text-amber-400" },
  { name: "videos/", icon: Video, count: 850, color: "text-red-400" },
  { name: "music/", icon: Music, count: 980, color: "text-green-400" },
];

export default function ProjectsPage() {
  const [projects] = useState(initialProjects);
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);

  const handleBulkUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      toast({
        title: "Factory Pipeline: Active",
        description: "Ingested 12 new jobs into the Render Grid.",
      });
    }, 2000);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Rendering":
        return <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20 text-[9px] uppercase"><Clock className="w-3 h-3 mr-1" /> Rendering</Badge>;
      case "AI Prompting":
        return <Badge variant="outline" className="bg-purple-500/10 text-purple-400 border-purple-500/20 text-[9px] uppercase"><Layers className="w-3 h-3 mr-1" /> AI Thinking</Badge>;
      case "Live":
        return <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20 text-[9px] uppercase"><PlayCircle className="w-3 h-3 mr-1" /> Streaming</Badge>;
      case "Ready":
        return <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 text-[9px] uppercase"><CheckCircle2 className="w-3 h-3 mr-1" /> Ready</Badge>;
      default:
        return <Badge variant="secondary" className="text-[9px] uppercase">{status}</Badge>;
    }
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <SidebarInset className="bg-background text-foreground">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b border-border/50 px-4">
            <SidebarTrigger className="-ml-1" />
            <div className="h-4 w-px bg-border/50 mx-2" />
            <h1 className="font-headline font-bold text-xl uppercase tracking-tight">Enterprise Production Grid</h1>
            <div className="ml-auto flex gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2 border-primary/20 hover:bg-primary/5 h-9 font-bold uppercase text-[10px] tracking-widest px-4">
                    <FileSpreadsheet className="w-4 h-4" /> Bulk Factory Ingest
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle className="font-headline uppercase tracking-tighter text-2xl">Ultra-Scale Ingestion</DialogTitle>
                    <DialogDescription>
                      Upload production sheets to trigger parallel rendering across 50 nodes.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-border rounded-2xl bg-secondary/20 hover:bg-secondary/30 transition-all cursor-pointer group">
                      <Upload className="w-8 h-8 mb-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      <p className="text-sm font-bold uppercase tracking-widest">Drop Factory CSV</p>
                      <p className="text-[9px] text-muted-foreground mt-2 font-mono uppercase tracking-tighter">Capacity: 1000+ videos/day</p>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={handleBulkUpload} disabled={isUploading} className="w-full bg-primary text-primary-foreground font-bold h-12 uppercase tracking-widest">
                      {isUploading ? "Initializing Render Nodes..." : "Deploy to Render Grid"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Button size="sm" className="bg-primary text-primary-foreground font-bold h-9 uppercase text-[10px] tracking-widest px-6">
                <PlusCircle className="w-4 h-4 mr-2" /> New Asset
              </Button>
            </div>
          </header>

          <main className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto w-full">
            <Tabs defaultValue="queue" className="w-full">
              <TabsList className="bg-secondary/50 p-1 mb-8 border border-border/50 backdrop-blur-md rounded-xl">
                <TabsTrigger value="queue" className="gap-2 font-bold uppercase text-[10px] tracking-widest px-6 py-2 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <Layers className="w-3 h-3" /> Production Queue
                </TabsTrigger>
                <TabsTrigger value="storage" className="gap-2 font-bold uppercase text-[10px] tracking-widest px-6 py-2 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <HardDrive className="w-3 h-3" /> Cloud Asset Factory
                </TabsTrigger>
                <TabsTrigger value="publish" className="gap-2 font-bold uppercase text-[10px] tracking-widest px-6 py-2 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <Youtube className="w-3 h-3" /> Distribution Log
                </TabsTrigger>
              </TabsList>

              <TabsContent value="queue" className="space-y-6">
                <div className="grid gap-6">
                  {projects.map((project) => (
                    <Card key={project.id} className="bg-card hover:border-primary/30 transition-all group overflow-hidden border-border/50 shadow-sm">
                      <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row md:items-center gap-6 p-6">
                          <div className="flex-1 space-y-4">
                            <div className="flex items-start justify-between">
                              <div>
                                <div className="flex items-center gap-3">
                                  <h3 className="text-lg font-headline font-bold group-hover:text-primary transition-colors">{project.name}</h3>
                                  <Badge variant="secondary" className="text-[9px] uppercase tracking-widest font-mono bg-secondary/50 border-border/50">{project.type}</Badge>
                                </div>
                                <div className="flex items-center gap-4 mt-2">
                                  <p className="text-[9px] text-muted-foreground uppercase font-bold tracking-tighter flex items-center gap-1">
                                    Factory Niche: <span className="text-primary font-mono">{project.niche}</span>
                                  </p>
                                  <p className="text-[9px] text-muted-foreground uppercase font-bold tracking-tighter flex items-center gap-1">
                                    Publish: <span className="text-blue-400 font-mono italic">{project.publishStatus}</span>
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
                                  <DropdownMenuItem className="text-[10px] font-bold uppercase tracking-widest">Asset Details</DropdownMenuItem>
                                  <DropdownMenuItem className="text-[10px] font-bold uppercase tracking-widest">API Logs</DropdownMenuItem>
                                  <DropdownMenuItem className="text-destructive font-bold uppercase text-[10px] tracking-widest">Kill Process</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>

                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-[10px] font-bold uppercase">
                                <span className="text-muted-foreground flex items-center gap-1 font-mono tracking-tighter">
                                  <Clock className="w-3 h-3" /> GRID_SYNC: {project.date}
                                </span>
                                <span className="text-primary font-mono tracking-tighter">{project.progress}% RENDERED</span>
                              </div>
                              <Progress value={project.progress} className="h-1 bg-secondary/50 rounded-full" />
                            </div>
                          </div>

                          <div className="flex md:flex-col gap-2 md:w-48 shrink-0">
                            {getStatusBadge(project.status)}
                            <div className="flex gap-1 mt-1">
                              <Button variant="outline" size="icon" className="h-8 w-8 opacity-50 border-border/50 hover:opacity-100 transition-opacity"><Music className="h-3.5 w-3.5" /></Button>
                              <Button variant="outline" size="icon" className="h-8 w-8 opacity-50 border-border/50 hover:opacity-100 transition-opacity"><Video className="h-3.5 w-3.5" /></Button>
                              <Button variant="outline" size="icon" className="h-8 w-8 opacity-50 border-border/50 hover:opacity-100 transition-opacity"><Search className="h-3.5 w-3.5" /></Button>
                              {project.progress === 100 && (
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

              <TabsContent value="storage" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-6">
                  {cloudAssets.map((folder) => (
                    <Card key={folder.name} className="bg-card border-border/50 group hover:border-primary/30 transition-all cursor-pointer shadow-sm">
                      <CardHeader className="p-4 pb-2">
                        <folder.icon className={`w-6 h-6 ${folder.color} mb-2 group-hover:scale-110 transition-transform`} />
                        <CardTitle className="text-[10px] font-headline uppercase tracking-widest">{folder.name}</CardTitle>
                        <CardDescription className="text-[8px] font-mono uppercase font-bold text-muted-foreground mt-0.5">{folder.count} objects</CardDescription>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <div className="h-0.5 w-full bg-secondary/50 rounded-full overflow-hidden">
                          <div className="h-full bg-primary/40 w-full animate-pulse" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Card className="bg-card border-border/50 shadow-md">
                  <CardHeader className="flex flex-row items-center justify-between border-b border-border/50 pb-4">
                    <div>
                      <CardTitle className="text-base font-headline uppercase tracking-tighter flex items-center gap-2">
                        <HardDrive className="w-4 h-4 text-primary" /> video-assets-factory
                      </CardTitle>
                      <CardDescription className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground mt-1">Live grid activity (Python Workers)</CardDescription>
                    </div>
                    <Badge variant="outline" className="font-mono text-[9px] text-green-500 border-green-500/20 bg-green-500/5 px-3 py-1 uppercase tracking-tighter">GCS_BUCKET: READY</Badge>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="overflow-hidden font-mono text-[11px]">
                      <div className="bg-secondary/30 p-4 flex items-center justify-between text-muted-foreground font-bold uppercase tracking-widest border-b border-border/50">
                        <span>Factory Path / blob.upload_from_filename</span>
                        <span>Size / Meta</span>
                      </div>
                      <div className="divide-y divide-border/50 max-h-[400px] overflow-y-auto custom-scrollbar">
                        {[
                          { path: "videos/video1.mp4", size: "4.2 MB", status: "Rendered" },
                          { path: "voice/voice_42.mp3", size: "1.1 MB", status: "Synthesized" },
                          { path: "thumbnails/short_thumb_v1.jpg", size: "450 KB", status: "Generated" },
                          { path: "scripts/script_09.json", size: "12 KB", status: "Archived" },
                          { path: "music/lofi_loop_82bpm.mp3", size: "2.8 MB", status: "Curated" },
                          { path: "clips/urban_rain_3s.mp4", size: "1.2 MB", status: "Mined" },
                          { path: "videos/video2.mp4", size: "3.8 MB", status: "Queue" }
                        ].map((file, i) => (
                          <div key={i} className="p-4 flex items-center justify-between hover:bg-primary/5 transition-colors group">
                            <div className="flex items-center gap-3">
                              <Folder className="w-3 h-3 text-muted-foreground group-hover:text-primary transition-colors" />
                              <span className="text-muted-foreground group-hover:text-foreground transition-colors">{file.path}</span>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className="text-muted-foreground opacity-50">{file.size}</span>
                              <Badge variant="outline" className="text-[8px] font-bold uppercase border-border/50">{file.status}</Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="publish" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="grid gap-6">
                  <Card className="bg-card border-border/50 shadow-md">
                    <CardHeader>
                      <CardTitle className="text-base font-headline uppercase tracking-tighter flex items-center gap-2">
                        <Youtube className="w-5 h-5 text-red-500" /> YouTube Publication Grid
                      </CardTitle>
                      <CardDescription className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground mt-1">Status of automated 10-20/day upload sequence</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          { title: "Midnight Confessions", slot: "Slot #14", status: "Published", platform: "YouTube" },
                          { title: "Filtered Memories", slot: "Slot #15", status: "Scheduled", platform: "YouTube" },
                          { title: "Late Night Drive", slot: "Slot #16", status: "Queued", platform: "YouTube" }
                        ].map((pub, i) => (
                          <div key={i} className="p-4 rounded-xl bg-secondary/30 border border-border/50 flex items-center justify-between group hover:border-primary/30 transition-all">
                            <div className="flex items-center gap-4">
                              <div className="p-2 bg-red-500/10 rounded-lg">
                                <Send className="w-4 h-4 text-red-500" />
                              </div>
                              <div>
                                <p className="text-xs font-bold uppercase tracking-widest">{pub.title}</p>
                                <p className="text-[9px] text-muted-foreground font-mono mt-1">Factory Sequence: {pub.slot}</p>
                              </div>
                            </div>
                            <Badge variant="outline" className={`text-[9px] font-bold uppercase ${pub.status === 'Published' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-blue-500/10 text-blue-400 border-blue-500/20'}`}>
                              {pub.status}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
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
