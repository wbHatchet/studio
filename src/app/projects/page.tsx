
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
  HardDrive
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
    progress: 65, 
    type: "Long Form",
    date: "2024-05-20"
  },
  { 
    id: 2, 
    name: "Cyberpunk Night Walk", 
    niche: "Dark Trap", 
    status: "AI Prompting", 
    progress: 30, 
    type: "Shorts",
    date: "2024-05-21"
  },
  { 
    id: 3, 
    name: "Cozy Study Session LIVE", 
    niche: "Lo-Fi Study", 
    status: "Streaming", 
    progress: 100, 
    type: "24/7 Live",
    date: "2024-05-19"
  },
  { 
    id: 4, 
    name: "Halloween Lofi Beats", 
    niche: "Seasonal Lo-Fi", 
    status: "Review Required", 
    progress: 90, 
    type: "Long Form",
    date: "2024-05-22"
  },
];

const cloudAssets = [
  { name: "assets/scripts/", icon: FileText, count: 1240, color: "text-blue-400" },
  { name: "assets/voices/", icon: Mic2, count: 1240, color: "text-purple-400" },
  { name: "assets/videos/", icon: Video, count: 850, color: "text-red-400" },
  { name: "assets/thumbnails/", icon: Sparkles, count: 3200, color: "text-amber-400" },
];

export default function ProjectsPage() {
  const [projects, setProjects] = useState(initialProjects);
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);

  const handleBulkUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      toast({
        title: "Spreadsheet Processed",
        description: "Added 12 new jobs to the production queue.",
      });
    }, 2000);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Rendering":
        return <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20"><Clock className="w-3 h-3 mr-1" /> Rendering</Badge>;
      case "AI Prompting":
        return <Badge variant="outline" className="bg-purple-500/10 text-purple-400 border-purple-500/20"><Layers className="w-3 h-3 mr-1" /> AI Thinking</Badge>;
      case "Streaming":
        return <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20"><PlayCircle className="w-3 h-3 mr-1" /> Live</Badge>;
      case "Review Required":
        return <Badge variant="outline" className="bg-orange-500/10 text-orange-400 border-orange-500/20"><Clock className="w-3 h-3 mr-1" /> Review</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
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
                  <Button variant="outline" size="sm" className="gap-2 border-primary/20 hover:bg-primary/5">
                    <FileSpreadsheet className="w-4 h-4" /> Ingest Factory Sheet
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="font-headline uppercase tracking-tighter text-xl">Ultra-Scale Ingestion</DialogTitle>
                    <DialogDescription>
                      Upload production sheets to trigger parallel rendering across 50 nodes.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-border rounded-xl bg-secondary/20 hover:bg-secondary/30 transition-colors cursor-pointer group">
                      <Upload className="w-8 h-8 mb-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      <p className="text-sm font-medium">Drop Factory CSV here</p>
                      <p className="text-xs text-muted-foreground mt-1 font-mono">Scale: 1000+ videos daily capacity</p>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={handleBulkUpload} disabled={isUploading} className="w-full bg-primary text-primary-foreground font-bold">
                      {isUploading ? "Starting Cluster..." : "Deploy to Render Grid"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Button size="sm" className="bg-primary text-primary-foreground font-bold">
                <PlusCircle className="w-4 h-4 mr-2" /> New Asset
              </Button>
            </div>
          </header>

          <main className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto w-full">
            <Tabs defaultValue="queue" className="w-full">
              <TabsList className="bg-secondary/50 p-1 mb-8 border border-border/50 backdrop-blur-md">
                <TabsTrigger value="queue" className="gap-2 font-bold uppercase text-[10px] tracking-widest px-6"><Layers className="w-3 h-3" /> Production Queue</TabsTrigger>
                <TabsTrigger value="storage" className="gap-2 font-bold uppercase text-[10px] tracking-widest px-6"><HardDrive className="w-3 h-3" /> Cloud Asset Factory</TabsTrigger>
                <TabsTrigger value="vector" className="gap-2 font-bold uppercase text-[10px] tracking-widest px-6"><Database className="w-3 h-3" /> Vector Asset Search</TabsTrigger>
              </TabsList>

              <TabsContent value="queue" className="space-y-6">
                <div className="grid gap-6">
                  {projects.map((project) => (
                    <Card key={project.id} className="bg-card hover:border-primary/30 transition-all group overflow-hidden border-border/50">
                      <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row md:items-center gap-6 p-6">
                          <div className="flex-1 space-y-4">
                            <div className="flex items-start justify-between">
                              <div>
                                <div className="flex items-center gap-3">
                                  <h3 className="text-lg font-headline font-bold group-hover:text-primary transition-colors">{project.name}</h3>
                                  <Badge variant="secondary" className="text-[9px] uppercase tracking-widest font-mono bg-secondary/50">{project.type}</Badge>
                                </div>
                                <p className="text-[10px] text-muted-foreground mt-1 uppercase font-bold tracking-tighter">Factory Niche: <span className="text-primary font-mono">{project.niche}</span></p>
                              </div>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="bg-popover border-border">
                                  <DropdownMenuItem>View Grid Assets</DropdownMenuItem>
                                  <DropdownMenuItem>Vector Similarity Search</DropdownMenuItem>
                                  <DropdownMenuItem className="text-destructive font-bold uppercase text-[10px]">Purge Node Cache</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>

                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-[10px] font-bold uppercase">
                                <span className="text-muted-foreground flex items-center gap-1 font-mono">
                                  <Clock className="w-3 h-3" /> GRID_ACTIVITY: {project.date}
                                </span>
                                <span className="text-primary font-mono tracking-tighter">{project.progress}% SYNCED</span>
                              </div>
                              <Progress value={project.progress} className="h-1 bg-secondary/50" />
                            </div>
                          </div>

                          <div className="flex md:flex-col gap-2 md:w-48 shrink-0">
                            {getStatusBadge(project.status)}
                            <div className="flex gap-1 mt-2">
                              <Button variant="outline" size="icon" className="h-8 w-8 opacity-50 border-border/50"><Music className="h-3.5 w-3.5" /></Button>
                              <Button variant="outline" size="icon" className="h-8 w-8 opacity-50 border-border/50"><Video className="h-3.5 w-3.5" /></Button>
                              <Button variant="outline" size="icon" className="h-8 w-8 opacity-50 border-border/50"><Search className="h-3.5 w-3.5" /></Button>
                              {project.progress === 100 && (
                                <Button variant="outline" size="icon" className="h-8 w-8 text-primary border-primary/30 animate-pulse"><ExternalLink className="h-3.5 w-3.5" /></Button>
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
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                  {cloudAssets.map((folder) => (
                    <Card key={folder.name} className="bg-card border-border/50 group hover:border-primary/30 transition-all cursor-pointer">
                      <CardHeader className="pb-2">
                        <folder.icon className={`w-8 h-8 ${folder.color} mb-2 group-hover:scale-110 transition-transform`} />
                        <CardTitle className="text-sm font-headline uppercase tracking-tighter">{folder.name}</CardTitle>
                        <CardDescription className="text-[10px] font-mono uppercase font-bold text-muted-foreground">{folder.count} objects synced</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="h-1 w-full bg-secondary/50 rounded-full overflow-hidden">
                          <div className="h-full bg-primary/40 w-full animate-pulse" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Card className="bg-card border-border/50">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="text-base font-headline uppercase tracking-tighter flex items-center gap-2">
                        <HardDrive className="w-4 h-4 text-primary" /> Google Cloud Storage Live (Free Tier)
                      </CardTitle>
                      <CardDescription className="text-xs">Recursive scan of factory asset structure: assets/*</CardDescription>
                    </div>
                    <Badge variant="outline" className="font-mono text-[9px] text-green-500 border-green-500/20">BUCKET_SYNC: OK</Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-xl border border-border/50 overflow-hidden font-mono text-[11px]">
                      <div className="bg-secondary/30 p-3 border-b border-border/50 flex items-center justify-between text-muted-foreground font-bold uppercase">
                        <span>Path / Filename (blob.upload_from_filename)</span>
                        <span>Size / Meta</span>
                      </div>
                      <div className="divide-y divide-border/50">
                        {[
                          { path: "assets/videos/batch_12_short_001.mp4", size: "4.2 MB", status: "Rendered" },
                          { path: "assets/voices/adam_script_v2.mp3", size: "1.1 MB", status: "Synthesized" },
                          { path: "assets/thumbnails/6lack_type_variant_a.jpg", size: "450 KB", status: "Generated" },
                          { path: "assets/scripts/midnight_rain_mix.json", size: "12 KB", status: "Archived" },
                          { path: "assets/videos/batch_12_short_002.mp4", size: "3.8 MB", status: "Queue" }
                        ].map((file, i) => (
                          <div key={i} className="p-4 flex items-center justify-between hover:bg-primary/5 transition-colors group">
                            <div className="flex items-center gap-3">
                              <Folder className="w-3 h-3 text-muted-foreground group-hover:text-primary" />
                              <span className="text-muted-foreground group-hover:text-foreground transition-colors">{file.path}</span>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className="text-muted-foreground opacity-50">{file.size}</span>
                              <Badge variant="outline" className="text-[9px] font-bold uppercase">{file.status}</Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="vector">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <Card className="bg-card border-primary/20 shadow-xl shadow-primary/5">
                    <CardHeader>
                      <CardTitle className="text-sm font-headline uppercase tracking-tighter flex items-center gap-2">
                        <SearchCode className="w-4 h-4 text-primary" /> Similarity Search Engine
                      </CardTitle>
                      <CardDescription>Find reusable clips using vector embeddings</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex gap-2">
                        <div className="flex-1 h-10 bg-secondary/30 rounded-lg border border-border/50 px-3 flex items-center text-[10px] text-muted-foreground font-mono">
                          QUERY: "atmospheric dark rnb studio vibes"
                        </div>
                        <Button size="icon" className="h-10 w-10 bg-primary/20 border border-primary/30 text-primary hover:bg-primary/30 transition-all"><Sparkles className="w-4 h-4" /></Button>
                      </div>
                      <div className="space-y-2">
                        {[1, 2, 3].map(i => (
                          <div key={i} className="p-3 rounded-lg bg-secondary/20 border border-border/50 flex items-center justify-between group hover:border-primary/30 transition-all">
                            <div className="flex items-center gap-3">
                              <Database className="w-3 h-3 text-muted-foreground group-hover:text-primary" />
                              <span className="text-xs font-bold font-mono">ASSET_REF_{100 + i}</span>
                            </div>
                            <Badge variant="outline" className="text-[9px] bg-green-500/10 text-green-500 border-green-500/20 font-bold uppercase">{99 - i}% MATCH</Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-card border-border/50 flex flex-col">
                    <CardHeader>
                      <CardTitle className="text-sm font-headline uppercase tracking-tighter flex items-center gap-2">
                        <Database className="w-4 h-4 text-primary" /> Asset Reuse Optimization
                      </CardTitle>
                      <CardDescription>Leveraging vector library to minimize compute</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 space-y-4">
                      <div className="p-6 bg-primary/5 rounded-2xl border border-primary/10 shadow-inner">
                        <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1 font-mono">REUSE_RATIO</p>
                        <p className="text-4xl font-headline font-bold text-primary tracking-tighter">42.8%</p>
                        <p className="text-[10px] text-muted-foreground mt-2 uppercase font-bold font-mono italic">EST_SAVINGS: $2,420.00 / MO</p>
                      </div>
                      <div className="space-y-3 pt-2">
                        <div className="flex justify-between text-[9px] font-bold uppercase text-muted-foreground font-mono">
                          <span>Vector Index Sync</span>
                          <span>98%</span>
                        </div>
                        <Progress value={98} className="h-1" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-card border-dashed border-2 border-border/50 flex flex-col items-center justify-center p-8 opacity-60 hover:opacity-100 transition-opacity cursor-pointer group">
                    <Database className="w-8 h-8 mb-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    <p className="text-xs font-bold uppercase tracking-widest">Connect External Vector DB</p>
                    <p className="text-[10px] text-muted-foreground mt-1 uppercase font-bold font-mono">Pinecone / Supabase Integration</p>
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
