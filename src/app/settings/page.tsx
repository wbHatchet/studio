
"use client";

import { useState, useEffect } from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Music, Info, Cpu, Zap, Video, HardDrive, Server, Layers, Terminal, Search, Share2, Youtube, Mic2, ShieldAlert } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function SettingsPage() {
  const { toast } = useToast();
  const [nodeCount, setNodeCount] = useState(50);

  const handleSave = () => {
    toast({
      title: "Network Config Saved",
      description: "Enterprise Grid parameters updated.",
    });
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <SidebarInset className="bg-background">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b border-border/50 px-4">
            <SidebarTrigger className="-ml-1" />
            <div className="h-4 w-px bg-border/50 mx-2" />
            <h1 className="font-headline font-bold text-xl uppercase tracking-tight text-primary">Grid Configuration</h1>
          </header>

          <main className="p-6 md:p-8">
            <div className="max-w-5xl mx-auto space-y-6">
              <Tabs defaultValue="core" className="space-y-6">
                <TabsList className="bg-secondary/50 p-1 border border-border/50 rounded-xl">
                  <TabsTrigger value="core" className="gap-2 font-bold uppercase text-[10px] tracking-widest"><Cpu className="w-4 h-4" /> Command Brain</TabsTrigger>
                  <TabsTrigger value="storage" className="gap-2 font-bold uppercase text-[10px] tracking-widest"><HardDrive className="w-4 h-4" /> Asset Storage</TabsTrigger>
                  <TabsTrigger value="media" className="gap-2 font-bold uppercase text-[10px] tracking-widest"><Video className="w-4 h-4" /> Production</TabsTrigger>
                </TabsList>

                <TabsContent value="core" className="space-y-6">
                  <Card className="bg-card border-border/50">
                    <CardHeader>
                      <CardTitle className="font-headline text-primary uppercase text-sm tracking-widest">Enterprise Orchestration</CardTitle>
                      <CardDescription>Managing the 100+ channel network Grid</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label className="text-[10px] uppercase font-bold text-muted-foreground">Network Mode</Label>
                          <Input value="HYPER-SCALE (9,000+ videos/mo)" className="bg-secondary/30 font-mono" readOnly />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-[10px] uppercase font-bold text-muted-foreground">Parallel Render Nodes</Label>
                          <Input 
                            type="number" 
                            value={nodeCount} 
                            onChange={(e) => setNodeCount(parseInt(e.target.value))}
                            className="bg-secondary/30 font-mono" 
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-secondary/10 border-dashed border-border/50 p-6 rounded-2xl flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <ShieldAlert className="w-8 h-8 text-orange-400" />
                      <div>
                        <h4 className="text-sm font-bold uppercase tracking-tight">Manage Credentials</h4>
                        <p className="text-[10px] text-muted-foreground uppercase font-medium">API Keys, OAuth Secrets, and Webhook URLs have moved to the Registry.</p>
                      </div>
                    </div>
                    <Link href="/apikeys">
                      <Button variant="outline" className="text-[10px] font-bold uppercase h-9 border-border/50 px-6">Open Registry</Button>
                    </Link>
                  </Card>
                </TabsContent>

                <TabsContent value="storage" className="space-y-6">
                  <Card className="bg-card border-border/50">
                    <CardHeader>
                      <CardTitle className="font-headline text-primary uppercase text-sm tracking-widest">Bucket Configuration</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label className="text-[10px] uppercase font-bold text-muted-foreground">GCS Asset Bucket</Label>
                        <Input value="video-assets-factory-prod" className="bg-secondary/30 font-mono" readOnly />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              <div className="flex justify-end">
                <Button onClick={handleSave} className="bg-primary text-primary-foreground font-bold px-10 uppercase text-[10px] tracking-widest h-12">
                  Deploy Network Grid
                </Button>
              </div>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
