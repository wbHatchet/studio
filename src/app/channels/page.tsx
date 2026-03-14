
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
  AlertCircle
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

const mockChannels = [
  {
    id: 1,
    name: "Midnight R&B Beats",
    niche: "Drake / 6LACK Type",
    subs: "12.4K",
    views: "450K",
    status: "Active",
    health: 98,
    avatar: "https://picsum.photos/seed/ch1/100/100"
  },
  {
    id: 2,
    name: "Boom Bap Gold",
    niche: "90s Soul / Vinyl",
    subs: "2.1K",
    views: "82K",
    status: "Active",
    health: 95,
    avatar: "https://picsum.photos/seed/ch2/100/100"
  },
  {
    id: 3,
    name: "Dark Trap Labs",
    niche: "Future / Metro Boomin",
    subs: "450",
    views: "12K",
    status: "Warming Up",
    health: 80,
    avatar: "https://picsum.photos/seed/ch3/100/100"
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
            <h1 className="font-headline font-bold text-xl">Channel Network</h1>
            <Button size="sm" className="ml-auto bg-primary text-primary-foreground">
              <Plus className="w-4 h-4 mr-2" /> Connect YouTube
            </Button>
          </header>

          <main className="p-6 md:p-8 space-y-6">
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {channels.map((channel) => (
                <Card key={channel.id} className="bg-card hover:border-primary/30 transition-all overflow-hidden">
                  <CardHeader className="flex flex-row items-center gap-4 pb-4">
                    <img src={channel.avatar} alt="" className="w-12 h-12 rounded-full border border-border" />
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-base truncate font-headline">{channel.name}</CardTitle>
                      <CardDescription className="text-xs truncate">{channel.niche}</CardDescription>
                    </div>
                    <Badge variant={channel.status === "Active" ? "default" : "secondary"} className="text-[10px]">
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
                    <div className="space-y-2">
                      <div className="flex justify-between text-[10px] font-bold uppercase text-muted-foreground">
                        <span>Algorithm Health</span>
                        <span>{channel.health}%</span>
                      </div>
                      <Progress value={channel.health} className="h-1" />
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" className="flex-1 text-xs h-8">
                        <Settings2 className="w-3 h-3 mr-2" /> Settings
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ExternalLink className="w-3 h-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              <button className="flex flex-col items-center justify-center gap-4 p-8 border-2 border-dashed border-border rounded-xl hover:bg-secondary/20 transition-colors opacity-60">
                <div className="p-4 bg-secondary rounded-full">
                  <Youtube className="w-8 h-8 text-muted-foreground" />
                </div>
                <div className="text-center">
                  <p className="font-bold">Add Distribution Channel</p>
                  <p className="text-xs text-muted-foreground">Expand your factory network</p>
                </div>
              </button>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
