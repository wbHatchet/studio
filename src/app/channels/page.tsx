
"use client";

import { useState } from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Youtube, 
  Radio, 
  TrendingUp, 
  Users, 
  ExternalLink,
  Settings2,
  AlertCircle,
  Network,
  Zap,
  Play
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

const mockChannels = [
  {
    id: 1,
    name: "Harbor Moon LoFi Radio",
    niche: "Late Night Harbor Escape",
    handle: "@harbormoonlofi",
    subs: "420K",
    views: "15.4M",
    status: "Active",
    health: 98,
    avatar: "https://picsum.photos/seed/moon1/100/100",
    queued: 85,
    today: 3
  },
  {
    id: 2,
    name: "Knowledge Engine",
    niche: "Did You Know? Facts",
    subs: "850K",
    views: "42.8M",
    status: "Active",
    health: 95,
    avatar: "https://picsum.photos/seed/ch2/100/100",
    queued: 120,
    today: 5
  },
  {
    id: 3,
    name: "Dark Psychology Tricks",
    niche: "Mind Hacks",
    subs: "124K",
    views: "2.1M",
    status: "Warming Up",
    health: 80,
    avatar: "https://picsum.photos/seed/ch3/100/100",
    queued: 45,
    today: 2
  }
];

export default function ChannelsPage() {
  const [channels] = useState(mockChannels);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <SidebarInset className="bg-background">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b border-border/50 px-4">
            <SidebarTrigger className="-ml-1" />
            <div className="h-4 w-px bg-border/50 mx-2" />
            <h1 className="font-headline font-bold text-xl uppercase tracking-tight text-primary">Channel Grid Command (104 Active)</h1>
            <Button size="sm" className="ml-auto bg-primary text-primary-foreground font-bold uppercase text-[10px] tracking-widest px-6">
              <Plus className="w-4 h-4 mr-2" /> Connect Network
            </Button>
          </header>

          <main className="p-6 md:p-8 space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              <Card className="bg-primary/5 border-primary/20 flex flex-col justify-center items-center p-6 text-center">
                <Network className="w-8 h-8 text-primary mb-2" />
                <p className="text-xl font-headline font-bold">104</p>
                <p className="text-[10px] font-bold uppercase text-muted-foreground">Network Channels</p>
              </Card>
              <Card className="bg-green-500/5 border-green-500/20 flex flex-col justify-center items-center p-6 text-center">
                <TrendingUp className="w-8 h-8 text-green-500 mb-2" />
                <p className="text-xl font-headline font-bold">312</p>
                <p className="text-[10px] font-bold uppercase text-muted-foreground">Videos Scheduled Today</p>
              </Card>
              <Card className="bg-blue-500/5 border-blue-500/20 flex flex-col justify-center items-center p-6 text-center">
                <Zap className="w-8 h-8 text-blue-500 mb-2" />
                <p className="text-xl font-headline font-bold">12</p>
                <p className="text-[10px] font-bold uppercase text-muted-foreground">Viral Spikes Tracked</p>
              </Card>
              <Card className="bg-orange-500/5 border-orange-500/20 flex flex-col justify-center items-center p-6 text-center">
                <Users className="w-8 h-8 text-orange-500 mb-2" />
                <p className="text-xl font-headline font-bold">12.4M</p>
                <p className="text-[10px] font-bold uppercase text-muted-foreground">Total Network Subs</p>
              </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {channels.map((channel) => (
                <Card key={channel.id} className="bg-card hover:border-primary/30 transition-all overflow-hidden border-border/50">
                  <CardHeader className="flex flex-row items-center gap-4 pb-4">
                    <img src={channel.avatar} alt="" className="w-12 h-12 rounded-full border border-border" />
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-base truncate font-headline">{channel.name}</CardTitle>
                      <CardDescription className="text-[10px] font-bold uppercase text-primary">
                        {channel.niche} • {channel.handle}
                      </CardDescription>
                    </div>
                    <Badge variant={channel.status === "Active" ? "default" : "secondary"} className="text-[9px] uppercase">
                      {channel.status}
                    </Badge>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 rounded-lg bg-secondary/30 text-center">
                        <p className="text-[10px] text-muted-foreground uppercase font-bold">Subscribers</p>
                        <p className="text-lg font-bold font-headline">{channel.subs}</p>
                      </div>
                      <div className="p-3 rounded-lg bg-secondary/30 text-center">
                        <p className="text-[10px] text-muted-foreground uppercase font-bold">Views (30d)</p>
                        <p className="text-lg font-bold font-headline">{channel.views}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <div className="space-y-1">
                        <p className="text-[9px] uppercase font-bold text-muted-foreground">Queued</p>
                        <p className="text-sm font-mono font-bold text-primary">{channel.queued} videos</p>
                      </div>
                      <div className="space-y-1 text-right">
                        <p className="text-[9px] uppercase font-bold text-muted-foreground">Uploads Today</p>
                        <p className="text-sm font-mono font-bold text-green-500">{channel.today} / 5</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-[10px] font-bold uppercase text-muted-foreground">
                        <span>Algorithm Health</span>
                        <span>{channel.health}%</span>
                      </div>
                      <Progress value={channel.health} className="h-1 bg-secondary/50" />
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" className="flex-1 text-[10px] font-bold uppercase h-8 border-border/50">
                        <Settings2 className="w-3 h-3 mr-2" /> Config
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-primary">
                        <ExternalLink className="w-3 h-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              <button className="flex flex-col items-center justify-center gap-4 p-8 border-2 border-dashed border-border rounded-xl hover:bg-secondary/20 transition-colors opacity-60 group">
                <div className="p-4 bg-secondary rounded-full group-hover:bg-primary/10 group-hover:text-primary transition-all">
                  <Youtube className="w-8 h-8" />
                </div>
                <div className="text-center">
                  <p className="font-bold uppercase text-[10px] tracking-widest">Connect New Node</p>
                  <p className="text-[10px] text-muted-foreground uppercase font-bold mt-1">Scale your network capacity</p>
                </div>
              </button>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
