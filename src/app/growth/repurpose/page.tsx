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
  ArrowRightLeft, 
  Video,
  Zap,
  Share2,
  Rocket,
  Facebook,
  CheckCircle2,
  Clock,
  Youtube
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

export default function RepurposingPage() {
  const activeTasks = [
    { id: 1, name: "Knowledge Batch #42", platforms: ["TikTok", "Reels", "Shorts"], progress: 85, status: "Processing" },
    { id: 2, name: "Story Series: History #12", platforms: ["Snapchat", "TikTok"], progress: 40, status: "Reframing" },
    { id: 3, name: "Visual Dopamine #8", platforms: ["YouTube", "Facebook"], progress: 100, status: "Posted" },
  ];

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <SidebarInset className="bg-background">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b border-border/50 px-4">
            <SidebarTrigger className="-ml-1" />
            <div className="h-4 w-px bg-border/50 mx-2" />
            <h1 className="font-headline font-bold text-xl uppercase tracking-tight text-primary">Multi-Platform Command</h1>
          </header>

          <main className="p-6 md:p-8 space-y-8">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <StatCard label="Network Distribution" value="104 Channels" icon={Rocket} />
              <StatCard label="Cross-Platform reach" value="84.2M" icon={Share2} trend="42%" trendType="positive" />
              <StatCard label="Monthly Outputs" value="9,450" icon={Layers} />
              <StatCard label="Sync Health" value="100%" icon={CheckCircle2} />
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-6">
                <Card className="bg-card border-border/50">
                  <CardHeader>
                    <CardTitle className="font-headline flex items-center gap-2 text-primary">
                      <ArrowRightLeft className="w-5 h-5" />
                      Active Distribution Tasks
                    </CardTitle>
                    <CardDescription>Multi-platform republishing via Repurpose.io Layer</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {activeTasks.map(task => (
                      <div key={task.id} className="p-4 rounded-xl border border-border bg-secondary/20 space-y-4 group hover:border-primary/30 transition-all">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-bold text-sm uppercase tracking-tight">{task.name}</h4>
                            <div className="flex gap-2 mt-1">
                              {task.platforms.map(p => (
                                <Badge key={p} variant="outline" className="text-[9px] font-bold bg-primary/5 uppercase">{p}</Badge>
                              ))}
                            </div>
                          </div>
                          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/20 text-[9px] uppercase font-bold">{task.status}</Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-[10px] font-bold uppercase text-muted-foreground">
                            <span>Sync Progress</span>
                            <span>{task.progress}%</span>
                          </div>
                          <Progress value={task.progress} className="h-1 bg-secondary/50" />
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="bg-card border-border/50 shadow-md">
                  <CardHeader>
                    <CardTitle className="font-headline uppercase text-[10px] tracking-widest">Platform Sync Status</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                      <div className="flex items-center gap-3">
                        <Smartphone className="w-4 h-4 text-pink-500" />
                        <span className="text-[10px] font-bold uppercase">TikTok Business API</span>
                      </div>
                      <Badge className="bg-green-500/20 text-green-500 text-[8px]">ONLINE</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                      <div className="flex items-center gap-3">
                        <Instagram className="w-4 h-4 text-purple-500" />
                        <span className="text-[10px] font-bold uppercase">Meta Graph API</span>
                      </div>
                      <Badge className="bg-green-500/20 text-green-500 text-[8px]">ONLINE</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                      <div className="flex items-center gap-3">
                        <Facebook className="w-4 h-4 text-blue-500" />
                        <span className="text-[10px] font-bold uppercase">FB Reels API</span>
                      </div>
                      <Badge className="bg-green-500/20 text-green-500 text-[8px]">ONLINE</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                      <div className="flex items-center gap-3">
                        <Youtube className="w-4 h-4 text-red-500" />
                        <span className="text-[10px] font-bold uppercase">YouTube V3 API</span>
                      </div>
                      <Badge className="bg-green-500/20 text-green-500 text-[8px]">ONLINE</Badge>
                    </div>
                    <Button className="w-full bg-primary text-primary-foreground font-bold mt-4 uppercase text-[10px] tracking-widest h-10">
                      Sync New Distribution Node
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

function StatCard({ label, value, icon: Icon, trend, trendType }: any) {
  return (
    <Card className="bg-card border-border/50">
      <CardHeader className="pb-2">
        <CardTitle className="text-[10px] font-bold uppercase text-muted-foreground flex items-center gap-2">
          <Icon className="w-3 h-3" /> {label}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-xl font-bold font-headline">{value}</div>
        {trend && (
          <p className={cn("text-[9px] font-bold mt-1 uppercase", trendType === 'positive' ? 'text-green-500' : 'text-red-500')}>
            {trendType === 'positive' ? '+' : '-'}{trend} (30d)
          </p>
        )}
      </CardContent>
    </Card>
  );
}