
"use client";

import { useState } from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  PlusCircle, 
  Layers, 
  MoreVertical, 
  PlayCircle, 
  Clock, 
  Music,
  Video,
  Search,
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
  Scissors,
  Zap,
  CheckCircle2,
  Loader2,
  Terminal,
  Cpu,
  Workflow
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
    date: "2024-05-20",
    node: "NODE-FFMPEG-42"
  },
  { 
    id: 2, 
    name: "Cyberpunk Night Walk", 
    niche: "Dark Trap", 
    status: "AI Prompting", 
    publishStatus: "Draft",
    progress: 30, 
    type: "Shorts",
    date: "2024-05-21",
    node: "NODE-SUNO-08"
  },
  { 
    id: 3, 
    name: "Cozy Study Session LIVE", 
    niche: "Lo-Fi Study", 
    status: "Live", 
    publishStatus: "Published",
    progress: 100, 
    type: "Long Form",
    date: "2024-05-19",
    node: "NODE-FFMPEG-12"
  }
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
  const [vectorQuery, setVectorQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const handleBulkUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      toast({
        title: "n8n Orchestration: Triggered",
        description: "Ingested 12 new jobs into the Render Grid via n8n webhook.",
      });
    }, 2000);
  };

  const handleVectorSearch = () => {
    if (!vectorQuery) return;
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setSearchResults([
        { path: "clips/vintage_rain_3s.mp4", score: 0.98, type: "video/mp4" },
        { path: "clips/toronto_night_loop.mp4", score: 0.85, type: "video/mp4" },
        { path: "thumbnails/vintage_60s_aesthetic.jpg", score: 0.72, type: "image/jpeg" },
      ]);
      toast({
        title: "Vector DB Results",
        description: `Found ${3} reusable assets for query: "${vectorQuery}"`,
      });
    }, 1500);
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
            <h1 className="font-headline font-bold text-xl uppercase tracking-tight text-primary">Production Logic Grid</h1>
            <div className="ml-auto flex gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2 border-primary/20 hover:bg-primary/5 h-9 font-bold uppercase text-[10px] tracking-widest px-4">
                    <Workflow className="w-4 h-4" /> n8n Bulk Ingest
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle className="font-headline uppercase tracking-tighter text-2xl">n8n Workflow Ingestion</DialogTitle>
                    <DialogDescription>
                      Upload a CSV/JSON to trigger the Suno &rarr; FFmpeg visualizer pipeline via n8n.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-border rounded-2xl bg-secondary/20 hover:bg-secondary/30 transition-all cursor-pointer group">
                      <Upload className="w-8 h-8 mb-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      <p className="text-sm font-bold uppercase tracking-widest">Drop Automation Data</p>
                      <p className="text-[9px] text-muted-foreground mt-2 font-mono uppercase tracking-tighter">Payload: Suno_Prompt, Title, Aesthetic</p>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={handleBulkUpload} disabled={isUploading} className="w-full bg-primary text-primary-foreground font-bold h-12 uppercase tracking-widest">
                      {isUploading ? "Initializing n8n Workflow..." : "Deploy to Render Grid"}
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
                <TabsTrigger value="logic" className="gap-2 font-bold uppercase text-[10px] tracking-widest px-6 py-2 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <Terminal className="w-3 h-3" /> Factory Logic
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
                                    Niche: <span className="text-primary font-mono">{project.niche}</span>
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
                                  <DropdownMenuItem className="text-[10px] font-bold uppercase tracking-widest">n8n Logic Log</DropdownMenuItem>
                                  <DropdownMenuItem className="text-destructive font-bold uppercase text-[10px] tracking-widest">Kill Node</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>

                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-[10px] font-bold uppercase">
                                <span className="text-muted-foreground flex items-center gap-1 font-mono tracking-tighter">
                                  <Cpu className="w-3 h-3" /> {project.node}
                                </span>
                                <span className="text-primary font-mono tracking-tighter">{project.progress}% PROCESSED</span>
                              </div>
                              <Progress value={project.progress} className="h-1 bg-secondary/50 rounded-full" />
                            </div>
                          </div>

                          <div className="flex md:flex-col gap-2 md:w-48 shrink-0">
                            {getStatusBadge(project.status)}
                            <div className="flex gap-1 mt-1">
                              <Button variant="outline" size="icon" className="h-8 w-8 opacity-50 border-border/50 hover:opacity-100 transition-opacity"><Music className="h-3.5 w-3.5" /></Button>
                              <Button variant="outline" size="icon" className="h-8 w-8 opacity-50 border-border/50 hover:opacity-100 transition-opacity"><Video className="h-3.5 w-3.5" /></Button>
                              <Button variant="outline" size="icon" className="h-8 w-8 opacity-50 border-border/50 hover:opacity-100 transition-opacity"><Terminal className="h-3.5 w-3.5" /></Button>
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
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                  <Card className="bg-card border-primary/30 shadow-lg lg:col-span-2">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-headline uppercase tracking-widest flex items-center gap-2">
                        <SearchCode className="w-4 h-4 text-primary" /> Vector Asset Search
                      </CardTitle>
                      <CardDescription className="text-[10px] uppercase font-bold text-muted-foreground">Supabase Vector Semantic Retrieval</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex gap-2">
                        <Input 
                          placeholder="Search semantics (e.g. 'vintage rainy night')" 
                          value={vectorQuery}
                          onChange={(e) => setVectorQuery(e.target.value)}
                          className="bg-secondary/30 border-border/50"
                        />
                        <Button 
                          onClick={handleVectorSearch} 
                          disabled={isSearching} 
                          className="bg-primary text-primary-foreground font-bold"
                        >
                          {isSearching ? <Loader2 className="animate-spin w-4 h-4" /> : <Database className="w-4 h-4" />}
                        </Button>
                      </div>
                      
                      {searchResults.length > 0 && (
                        <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                          <p className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Similarity Match Results</p>
                          <div className="grid gap-2">
                            {searchResults.map((res, i) => (
                              <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-primary/5 border border-primary/20">
                                <div className="flex items-center gap-2">
                                  <Scissors className="w-3 h-3 text-primary" />
                                  <span className="text-[10px] font-mono text-primary truncate max-w-[200px]">{res.path}</span>
                                </div>
                                <Badge variant="outline" className="text-[8px] font-mono border-primary/20">SCORE: {res.score}</Badge>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-2 gap-4 lg:col-span-2">
                    <Card className="bg-card border-border/50 flex flex-col justify-center items-center p-4">
                      <Database className="w-6 h-6 text-primary mb-2" />
                      <p className="text-[10px] font-bold uppercase">Vector Index</p>
                      <p className="text-xl font-headline font-bold">12,450</p>
                    </Card>
                    <Card className="bg-card border-border/50 flex flex-col justify-center items-center p-4">
                      <Zap className="w-6 h-6 text-amber-400 mb-2" />
                      <p className="text-[10px] font-bold uppercase">Reuse Rate</p>
                      <p className="text-xl font-headline font-bold">42%</p>
                    </Card>
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-6">
                  {cloudAssets.map((folder) => (
                    <Card key={folder.name} className="bg-card border-border/50 group hover:border-primary/30 transition-all cursor-pointer shadow-sm">
                      <CardHeader className="p-4 pb-2">
                        <folder.icon className={`w-6 h-6 ${folder.color} mb-2 group-hover:scale-110 transition-transform`} />
                        <CardTitle className="text-[10px] font-headline uppercase tracking-widest">{folder.name}</CardTitle>
                        <CardDescription className="text-[8px] font-mono uppercase font-bold text-muted-foreground mt-0.5">{folder.count} objects</CardDescription>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="logic" className="space-y-6">
                <Card className="bg-card border-border/50 shadow-md">
                  <CardHeader>
                    <CardTitle className="text-base font-headline uppercase tracking-tighter flex items-center gap-2 text-primary">
                      <Terminal className="w-5 h-5" /> FFmpeg Visualizer Engine Logic
                    </CardTitle>
                    <CardDescription className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground mt-1">Python Class: VideoGenerator | filter_complex Specs</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="p-4 bg-black/90 rounded-xl font-mono text-[11px] leading-relaxed text-green-400 overflow-auto">
                      <p className="text-primary mb-2"># filter_complex construction for Vintage aesthetic</p>
                      <p>curves=vintage,</p>
                      <p>vignette=angle=PI/4,</p>
                      <p>noise=alls=12:allf=t,</p>
                      <p>showwaves=s=1280x720:mode=line:colors=white@0.3</p>
                      <div className="h-px bg-white/10 my-4" />
                      <p className="text-blue-400"># FFmpeg Mapping Sequence</p>
                      <p>ffmpeg -y -loop 1 -i image.jpg -i audio.mp3 -filter_complex ... -map [outv] -map 1:a -c:v libx264 -preset medium -crf 18 -shortest output.mp4</p>
                    </div>
                    
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="p-4 rounded-xl bg-secondary/30 border border-border">
                        <Label className="text-[9px] uppercase font-bold text-muted-foreground">n8n Orchestrator Hook</Label>
                        <p className="text-[11px] font-mono text-primary mt-1 truncate">POST https://n8n.factory.io/webhook/visualizer-start</p>
                      </div>
                      <div className="p-4 rounded-xl bg-secondary/30 border border-border">
                        <Label className="text-[9px] uppercase font-bold text-muted-foreground">Worker Node Context</Label>
                        <p className="text-[11px] font-mono mt-1">Python 3.10+ | FFmpeg 6.0+ | Docker Isolated</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
