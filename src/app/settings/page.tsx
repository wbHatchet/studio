
"use client";

import { useState, useEffect } from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Music, Info, Cpu, Zap, Video, HardDrive, Server, Layers, Terminal } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

export default function SettingsPage() {
  const { toast } = useToast();
  const [sunoEndpoint, setSunoEndpoint] = useState("");
  const [gcsBucket, setGcsBucket] = useState("video-assets-factory");
  const [nodeCount, setNodeCount] = useState(50);

  useEffect(() => {
    setSunoEndpoint(localStorage.getItem("suno_api_endpoint") || "");
  }, []);

  const handleSave = () => {
    localStorage.setItem("suno_api_endpoint", sunoEndpoint);
    toast({
      title: "Settings Saved",
      description: "Ultra-Scale Factory configuration updated.",
    });
  };

  const estimatedOutput = nodeCount * 20; // Simulated multiplier

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <SidebarInset className="bg-background">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b border-border/50 px-4">
            <SidebarTrigger className="-ml-1" />
            <div className="h-4 w-px bg-border/50 mx-2" />
            <h1 className="font-headline font-bold text-xl">Hidden Stack Configuration</h1>
          </header>

          <main className="p-6 md:p-8">
            <div className="max-w-5xl mx-auto space-y-6">
              <Tabs defaultValue="core" className="space-y-6">
                <TabsList className="bg-secondary/50 p-1">
                  <TabsTrigger value="core" className="gap-2"><Cpu className="w-4 h-4" /> Core Brain</TabsTrigger>
                  <TabsTrigger value="storage" className="gap-2"><HardDrive className="w-4 h-4" /> Asset Storage</TabsTrigger>
                  <TabsTrigger value="media" className="gap-2"><Video className="w-4 h-4" /> Media Engine</TabsTrigger>
                  <TabsTrigger value="growth" className="gap-2"><Zap className="w-4 h-4" /> Growth Stack</TabsTrigger>
                </TabsList>

                <TabsContent value="core" className="space-y-6">
                  <Card className="bg-card">
                    <CardHeader>
                      <CardTitle className="font-headline">Intelligence Layer</CardTitle>
                      <CardDescription>Primary LLMs and Render Grid Orchestration</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label>OpenAI API Key</Label>
                          <Input type="password" placeholder="sk-..." className="bg-secondary/30" />
                        </div>
                        <div className="space-y-2">
                          <Label>Anthropic (Claude) Key</Label>
                          <Input type="password" placeholder="sk-ant-..." className="bg-secondary/30" />
                        </div>
                      </div>

                      <div className="pt-6 border-t border-border/50">
                        <Label className="text-sm font-bold uppercase text-primary flex items-center gap-2 mb-4">
                          <Server className="w-4 h-4" /> FFmpeg Render Cluster (K8s)
                        </Label>
                        <div className="grid gap-6 md:grid-cols-2">
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label>Parallel Render Nodes</Label>
                              <Input 
                                type="number" 
                                value={nodeCount} 
                                onChange={(e) => setNodeCount(parseInt(e.target.value))}
                                className="bg-secondary/30" 
                              />
                            </div>
                            <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-between">
                              <div>
                                <p className="text-[10px] font-bold uppercase text-muted-foreground">Est. Daily Output</p>
                                <p className="text-xl font-headline font-bold text-primary">{estimatedOutput}+ Videos</p>
                              </div>
                              <Layers className="w-8 h-8 text-primary/20" />
                            </div>
                          </div>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label>Cluster Region</Label>
                              <Input value="us-central1" className="bg-secondary/30" readOnly />
                            </div>
                            <div className="p-4 rounded-xl bg-secondary/30 border border-border flex items-center gap-3">
                              <Terminal className="w-5 h-5 text-muted-foreground" />
                              <p className="text-[10px] font-mono leading-relaxed">
                                sudo apt install ffmpeg<br/>
                                docker-compose up -d --scale worker={nodeCount}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="storage" className="space-y-6">
                  <Card className="bg-card">
                    <CardHeader>
                      <CardTitle className="font-headline">GCS Asset Factory</CardTitle>
                      <CardDescription>Google Cloud Storage Bucket configuration</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label>Primary Bucket Name</Label>
                        <Input 
                          value={gcsBucket} 
                          onChange={(e) => setGcsBucket(e.target.value)} 
                          className="bg-secondary/30 font-mono" 
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl bg-secondary/20 border border-border">
                          <p className="text-[10px] font-bold uppercase text-muted-foreground mb-1">Upload Method</p>
                          <p className="text-xs font-mono">blob.upload_from_filename</p>
                        </div>
                        <div className="p-4 rounded-xl bg-secondary/20 border border-border">
                          <p className="text-[10px] font-bold uppercase text-muted-foreground mb-1">Structure Integrity</p>
                          <Badge className="bg-green-500/20 text-green-500 hover:bg-green-500/20 text-[10px]">VERIFIED</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="media" className="space-y-6">
                  <Card className="bg-card">
                    <CardHeader>
                      <CardTitle className="font-headline">Visual & Audio Synthesis</CardTitle>
                      <CardDescription>High-retention asset generation</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label>ElevenLabs API (Voice)</Label>
                          <Badge className="bg-green-500/20 text-green-500 hover:bg-green-500/20 text-[10px]">LIVE</Badge>
                        </div>
                        <Input type="password" value="********************************" className="bg-secondary/30" readOnly />
                      </div>
                      <div className="space-y-2">
                        <Label>Runway ML Key (Hooks)</Label>
                        <Input type="password" placeholder="Key..." className="bg-secondary/30" />
                      </div>
                      <div className="space-y-2">
                        <Label>Stability AI Key (Thumbs)</Label>
                        <Input type="password" placeholder="Key..." className="bg-secondary/30" />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="growth" className="space-y-6">
                  <Card className="bg-card">
                    <CardHeader>
                      <CardTitle className="font-headline">Distribution & Scraping</CardTitle>
                      <CardDescription>Viral signals and multi-platform reach</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Apify API (Clip Scraper)</Label>
                        <Input type="password" placeholder="Token..." className="bg-secondary/30" />
                      </div>
                      <div className="space-y-2">
                        <Label>Repurpose.io API</Label>
                        <Input type="password" placeholder="Key..." className="bg-secondary/30" />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              <div className="flex justify-end">
                <Button onClick={handleSave} className="bg-primary text-primary-foreground font-bold px-8">
                  Deploy Ultra-Scale Config
                </Button>
              </div>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
