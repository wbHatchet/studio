
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
  Upload,
  Database,
  SearchCode,
  Sparkles,
  FileText,
  Mic2,
  HardDrive,
  Youtube,
  Scissors,
  Zap,
  CheckCircle2,
  Loader2,
  Terminal,
  Cpu,
  Workflow,
  ArrowRight
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

const pipelineStages = [
  { id: "idea", label: "Ideas", count: 120, color: "text-blue-400" },
  { id: "script", label: "Scripts", count: 65, color: "text-purple-400" },
  { id: "voice", label: "Voice", count: 42, color: "text-orange-400" },
  { id: "render", label: "Rendering", count: 18, color: "text-amber-400" },
  { id: "upload", label: "Ready", count: 32, color: "text-green-400" },
];

const initialProjects = [
  { 
    id: 1, 
    name: "Did You Know #42", 
    niche: "Knowledge Hub", 
    status: "Rendering", 
    publishStatus: "Pending Approval",
    progress: 65, 
    type: "Shorts",
    node: "NODE-FFMPEG-42",
    stage: "render"
  },
  { 
    id: 2, 
    name: "Dark History Series #3", 
    niche: "Story Series", 
    status: "AI Prompting", 
    publishStatus: "Draft",
    progress: 30, 
    type: "Shorts",
    node: "NODE-OPENAI-08",
    stage: "script"
  },
  { 
    id: 3, 
    name: "Factory Satisfying Loop", 
    niche: "Visual Dopamine", 
    status: "Ready", 
    publishStatus: "Scheduled",
    progress: 100, 
    type: "Shorts",
    node: "NODE-DIST-12",
    stage: "upload"
  }
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
        description: "Ingested 50 new jobs into the Command Pipeline via n8n.",
      });
    }, 2000);
  };

  const handleVectorSearch = () => {
    if (!vectorQuery) return;
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setSearchResults([
        { path: "clips/luxury_mansion_4k.mp4", score: 0.98, type: "video/mp4" },
        { path: "clips/factory_loop_01.mp4", score: 0.85, type: "video/mp4" },
        { path: "hooks/shock_hook_05.wav", score: 0.72, type: "audio/wav" },
      ]);
      toast({
        title: "Vector DB Results",
        description: `Found 3 reusable semantic matches for: "${vectorQuery}"`,
      });
    }, 1500);
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <SidebarInset className="bg-background text-foreground">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b border-border/50 px-4">
            <SidebarTrigger className="-ml-1" />
            <div className="h-4 w-px bg-border/50 mx-2" />
            <h1 className="font-headline font-bold text-xl uppercase tracking-tight text-primary">Video Production Pipeline</h1>
            <div className="ml-auto flex gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2 border-primary/20 hover:bg-primary/5 h-9 font-bold uppercase text-[10px] tracking-widest px-4">
                    <Workflow className="w-4 h-4" /> n8n Bulk Ingest
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle className="font-headline uppercase tracking-tighter text-2xl">Pipeline Ingestion</DialogTitle>
                    <DialogDescription>
                      Trigger the [Apify] &rarr; [Suno] &rarr; [FFmpeg] mass production pipeline.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-border rounded-2xl bg-secondary/20 hover:bg-secondary/30 transition-all cursor-pointer group">
                      <Upload className="w-8 h-8 mb-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      <p className="text-sm font-bold uppercase tracking-widest">Drop Automation Data</p>
                      <p className="text-[9px] text-muted-foreground mt-2 font-mono uppercase tracking-tighter">Payload: Channel_ID, Niche, Topic_Batch</p>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={handleBulkUpload} disabled={isUploading} className="w-full bg-primary text-primary-foreground font-bold h-12 uppercase tracking-widest">
                      {isUploading ? "Initializing Network Workflow..." : "Deploy to Render Grid"}
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
            <div className="grid grid-cols-5 gap-4">
              {pipelineStages.map((stage) => (
                <Card key={stage.id} className="bg-card border-border/50 shadow-sm overflow-hidden relative group">
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
              <TabsList className="bg-secondary/50 p-1 mb-8 border border-border/50 backdrop-blur-md rounded-xl">
                <TabsTrigger value="queue" className="gap-2 font-bold uppercase text-[10px] tracking-widest px-6 py-2 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <Layers className="w-3 h-3" /> Production Monitor
                </TabsTrigger>
                <TabsTrigger value="storage" className="gap-2 font-bold uppercase text-[10px] tracking-widest px-6 py-2 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <HardDrive className="w-3 h-3" /> Asset Command Library
                </TabsTrigger>
                <TabsTrigger value="logic" className="gap-2 font-bold uppercase text-[10px] tracking-widest px-6 py-2 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <Terminal className="w-3 h-3" /> Grid Logic
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
                                    Stage: <span className="text-blue-400 font-mono italic">{project.stage.toUpperCase()}</span>
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
                                  <DropdownMenuItem className="text-[10px] font-bold uppercase tracking-widest">Pipeline Details</DropdownMenuItem>
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
                            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 text-[9px] uppercase font-bold text-center justify-center py-1">
                              {project.status}
                            </Badge>
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
                        <SearchCode className="w-4 h-4 text-primary" /> Vector Command Search
                      </CardTitle>
                      <CardDescription className="text-[10px] uppercase font-bold text-muted-foreground">Semantic retrieval from GCS Factory Bucket</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex gap-2">
                        <Input 
                          placeholder="Search semantics (e.g. 'luxury mansion clips')" 
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
                      <p className="text-[10px] font-bold uppercase">Asset Inventory</p>
                      <p className="text-xl font-headline font-bold">124,500</p>
                    </Card>
                    <Card className="bg-card border-border/50 flex flex-col justify-center items-center p-4">
                      <Zap className="w-6 h-6 text-amber-400 mb-2" />
                      <p className="text-[10px] font-bold uppercase">Network Reuse Rate</p>
                      <p className="text-xl font-headline font-bold">82%</p>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="logic" className="space-y-6">
                <Card className="bg-card border-border/50 shadow-md">
                  <CardHeader>
                    <CardTitle className="text-base font-headline uppercase tracking-tighter flex items-center gap-2 text-primary">
                      <Terminal className="w-5 h-5" /> Pipeline Command Logic
                    </CardTitle>
                    <CardDescription className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground mt-1">Multi-Channel Distribution Orchestration</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="p-4 bg-black/90 rounded-xl font-mono text-[11px] leading-relaxed text-green-400 overflow-auto">
                      <p className="text-primary mb-2"># Distribution mapping for 100+ channels</p>
                      <p>for channel in network_grid:</p>
                      <p>&nbsp;&nbsp;topic = trend_miner.get_gap(channel.niche)</p>
                      <p>&nbsp;&nbsp;script = openai.bulk_gen(topic, count=50)</p>
                      <p>&nbsp;&nbsp;voice = elevenlabs.batch_synth(script)</p>
                      <p>&nbsp;&nbsp;video = ffmpeg_cluster.render(voice, assets.vector_search(topic))</p>
                      <p>&nbsp;&nbsp;repurpose.distribute(video, ["shorts", "reels", "tiktok"])</p>
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
