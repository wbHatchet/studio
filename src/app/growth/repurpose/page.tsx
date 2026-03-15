
"use client";

import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Instagram, 
  Smartphone, 
  Layers, 
  Repeat, 
  ArrowRightLeft, 
  Video,
  CheckCircle2,
  Clock,
  Zap,
  Share2,
  Rocket
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function RepurposingPage() {
  const activeTasks = [
    { id: 1, name: "Drake R&B Batch #12", platforms: ["TikTok", "Reels", "Shorts"], progress: 85, status: "Opus AI Processing" },
    { id: 2, name: "Midnight Rain Mix", platforms: ["Snapchat", "TikTok"], progress: 40, status: "AI Reframing (Runway)" },
  ];

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <SidebarInset className="bg-background">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b border-border/50 px-4">
            <SidebarTrigger className="-ml-1" />
            <div className="h-4 w-px bg-border/50 mx-2" />
            <h1 className="font-headline font-bold text-xl">Multi-Platform Republisher v3.0</h1>
          </header>

          <main className="p-6 md:p-8 space-y-8">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card className="bg-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-[10px] font-bold uppercase text-muted-foreground">Repurpose Velocity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold font-headline">12.5x</div>
                  <p className="text-[10px] text-primary mt-1">Shorts created per long-form asset</p>
                </CardContent>
              </Card>
              <Card className="bg-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-[10px] font-bold uppercase text-muted-foreground">Global Reach</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold font-headline">1.4M</div>
                  <p className="text-[10px] text-green-500 mt-1">+45% cross-platform traffic</p>
                </CardContent>
              </Card>
              <Card className="bg-card border-primary/20">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-xl">
                      <Rocket className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-lg font-bold font-headline">Opus AI</p>
                      <p className="text-[10px] text-muted-foreground uppercase font-bold">Mining viral moments</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-card">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-secondary rounded-xl">
                      <Share2 className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-lg font-bold font-headline">Repurpose.io</p>
                      <p className="text-[10px] text-muted-foreground uppercase font-bold">Distribution Sync: ACTIVE</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-6">
                <Card className="bg-card">
                  <CardHeader>
                    <CardTitle className="font-headline flex items-center gap-2">
                      <ArrowRightLeft className="w-5 h-5 text-primary" />
                      Active Republish Tasks
                    </CardTitle>
                    <CardDescription>Converting long-form to short-form loops using Hidden Stack</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {activeTasks.map(task => (
                      <div key={task.id} className="p-4 rounded-xl border border-border bg-secondary/20 space-y-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-bold text-sm">{task.name}</h4>
                            <div className="flex gap-2 mt-1">
                              {task.platforms.map(p => (
                                <Badge key={p} variant="outline" className="text-[10px] bg-primary/5">{p}</Badge>
                              ))}
                            </div>
                          </div>
                          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/20">{task.status}</Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-[10px] font-bold uppercase text-muted-foreground">
                            <span>Automation Progress</span>
                            <span>{task.progress}%</span>
                          </div>
                          <Progress value={task.progress} className="h-1" />
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="bg-card">
                  <CardHeader>
                    <CardTitle className="font-headline">Distribution API</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                      <div className="flex items-center gap-3">
                        <Smartphone className="w-4 h-4 text-pink-500" />
                        <span className="text-xs font-bold">TikTok Business API</span>
                      </div>
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                      <div className="flex items-center gap-3">
                        <Instagram className="w-4 h-4 text-purple-500" />
                        <span className="text-xs font-bold">Meta Graph API</span>
                      </div>
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                      <div className="flex items-center gap-3">
                        <Layers className="w-4 h-4 text-blue-400" />
                        <span className="text-xs font-bold">Snapchat Lens API</span>
                      </div>
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                    </div>
                    <Button className="w-full bg-primary text-primary-foreground font-bold mt-4">
                      Connect New Platform
                    </Button>
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
