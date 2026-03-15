
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
  CheckCircle2, 
  AlertCircle,
  Music,
  Video,
  Search,
  ExternalLink,
  FileSpreadsheet,
  Upload,
  Database,
  SearchCode,
  Sparkles
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
        return <Badge variant="outline" className="bg-orange-500/10 text-orange-400 border-orange-500/20"><AlertCircle className="w-3 h-3 mr-1" /> Review</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <SidebarInset className="bg-background">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b border-border/50 px-4">
            <SidebarTrigger className="-ml-1" />
            <div className="h-4 w-px bg-border/50 mx-2" />
            <h1 className="font-headline font-bold text-xl">Enterprise Production Grid</h1>
            <div className="ml-auto flex gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <FileSpreadsheet className="w-4 h-4" /> Ingest Factory Sheet
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Ultra-Scale Ingestion</DialogTitle>
                    <DialogDescription>
                      Upload production sheets to trigger parallel rendering across 50 nodes.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-border rounded-xl bg-secondary/20 hover:bg-secondary/30 transition-colors cursor-pointer group">
                      <Upload className="w-8 h-8 mb-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      <p className="text-sm font-medium">Drop Factory CSV here</p>
                      <p className="text-xs text-muted-foreground mt-1">Scale: 1000+ videos daily capacity</p>
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

          <main className="p-6 md:p-8 space-y-8">
            <Tabs defaultValue="queue" className="w-full">
              <TabsList className="bg-secondary/50 p-1 mb-6">
                <TabsTrigger value="queue" className="gap-2"><Layers className="w-4 h-4" /> Production Queue</TabsTrigger>
                <TabsTrigger value="vector" className="gap-2"><Database className="w-4 h-4" /> Vector Asset Library</TabsTrigger>
              </TabsList>

              <TabsContent value="queue" className="space-y-6">
                <div className="grid gap-6">
                  {projects.map((project) => (
                    <Card key={project.id} className="bg-card hover:border-primary/30 transition-colors">
                      <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row md:items-center gap-6 p-6">
                          <div className="flex-1 space-y-4">
                            <div className="flex items-start justify-between">
                              <div>
                                <div className="flex items-center gap-3">
                                  <h3 className="text-lg font-headline font-bold">{project.name}</h3>
                                  <Badge variant="secondary" className="text-[10px] uppercase tracking-wider">{project.type}</Badge>
                                </div>
                                <p className="text-sm text-muted-foreground mt-1">Factory Niche: <span className="text-primary/80 font-medium">{project.niche}</span></p>
                              </div>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>View Grid Assets</DropdownMenuItem>
                                  <DropdownMenuItem>Vector Similarity Search</DropdownMenuItem>
                                  <DropdownMenuItem className="text-destructive">Purge Node Cache</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>

                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-muted-foreground flex items-center gap-1">
                                  <Clock className="w-3 h-3" /> Grid Activity: {project.date}
                                </span>
                                <span className="font-bold text-primary">{project.progress}%</span>
                              </div>
                              <Progress value={project.progress} className="h-1.5" />
                            </div>
                          </div>

                          <div className="flex md:flex-col gap-2 md:w-48 shrink-0">
                            {getStatusBadge(project.status)}
                            <div className="flex gap-1 mt-2">
                              <Button variant="outline" size="icon" className="h-8 w-8 opacity-50"><Music className="h-3.5 w-3.5" /></Button>
                              <Button variant="outline" size="icon" className="h-8 w-8 opacity-50"><Video className="h-3.5 w-3.5" /></Button>
                              <Button variant="outline" size="icon" className="h-8 w-8 opacity-50"><Search className="h-3.5 w-3.5" /></Button>
                              {project.progress === 100 && (
                                <Button variant="outline" size="icon" className="h-8 w-8 text-primary border-primary/30"><ExternalLink className="h-3.5 w-3.5" /></Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="vector">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <Card className="bg-card border-primary/20">
                    <CardHeader>
                      <CardTitle className="text-sm flex items-center gap-2">
                        <SearchCode className="w-4 h-4 text-primary" /> Similarity Search
                      </CardTitle>
                      <CardDescription>Find reusable clips using vector embeddings</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex gap-2">
                        <div className="flex-1 h-10 bg-secondary/30 rounded-md border border-border px-3 flex items-center text-xs text-muted-foreground">
                          Find similar to: Midnight Rain #42
                        </div>
                        <Button size="icon" className="h-10 w-10"><Sparkles className="w-4 h-4" /></Button>
                      </div>
                      <div className="space-y-2">
                        {[1, 2, 3].map(i => (
                          <div key={i} className="p-3 rounded-lg bg-secondary/20 border border-border flex items-center justify-between">
                            <span className="text-xs font-medium">Cyberpunk Loop {i}</span>
                            <Badge variant="outline" className="text-[10px] bg-green-500/10 text-green-500 border-green-500/20">98% Match</Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-card border-border/50">
                    <CardHeader>
                      <CardTitle className="text-sm flex items-center gap-2">
                        <Database className="w-4 h-4 text-primary" /> Asset Reuse Engine
                      </CardTitle>
                      <CardDescription>Optimizing cost by reusing top-performing hooks</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="p-4 bg-primary/5 rounded-xl border border-primary/10">
                        <p className="text-xs font-bold text-primary mb-1">Vector Reuse Rate</p>
                        <p className="text-2xl font-headline font-bold">42%</p>
                        <p className="text-[10px] text-muted-foreground mt-1">Estimated savings: $2,400/mo</p>
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
