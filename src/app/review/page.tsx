"use client";

import { useState } from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ChevronLeft, 
  CheckCircle2, 
  Clock, 
  Play, 
  Pause, 
  Volume2, 
  Youtube, 
  Check, 
  X, 
  Monitor,
  Activity,
  Zap,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { cn } from "@/lib/utils";

const STEPS = [
  { id: 1, label: "Excel Parser Agent", desc: "3 rows read — Halloween theme, Cozy mood", done: true },
  { id: 2, label: "Branding Agent", desc: "Channel name: 'Pumpkin Study Beats'", done: true },
  { id: 3, label: "Music Prompt Agent", desc: "30 Suno prompts generated", done: true },
  { id: 4, label: "Beat Generation Agent", desc: "28 tracks downloaded from Suno", done: true },
  { id: 5, label: "Arrangement Agent", desc: "2hr playlist arranged", done: true },
  { id: 6, label: "Visual Prompt Agent", desc: "Main scene + thumbnail prompts", done: true },
  { id: 7, label: "Image Generation Agent", desc: "DALL-E 3 — cozy cafe anime scene", done: true },
  { id: 8, label: "Animation Agent", desc: "Ken Burns 2hr loop configured", done: true },
  { id: 9, label: "Video Composer Agent", desc: "1080p MP4 · 2hr merged", done: true },
  { id: 10, label: "Metadata Agent", desc: "Title + 20 tags ready", done: true },
  { id: 11, label: "Quality Control Agent", desc: "6/6 checks passed", done: true },
  { id: 12, label: "Approval Agent", desc: "Awaiting your review", done: false, running: true },
  { id: 13, label: "YouTube Upload Agent", desc: "Pending approval", done: false },
];

export default function ReviewPage() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        <SidebarInset className="bg-background">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b border-border/50 px-4">
            <SidebarTrigger className="-ml-1" />
            <div className="h-4 w-px bg-border/50 mx-2" />
            <Link href="/projects">
              <Button variant="ghost" size="icon" className="h-8 w-8"><ChevronLeft className="w-4 h-4" /></Button>
            </Link>
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h1 className="font-headline font-bold text-xl tracking-tight text-primary">Halloween Lofi · 2 Hours</h1>
                <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20 uppercase text-[9px] font-bold">Needs Approval</Badge>
              </div>
              <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest italic">Job ID: jb_8f3k2x · Niche: Halloween Lofi</p>
            </div>
          </header>

          <main className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto w-full">
            <Card className="bg-card border-border/50 shadow-sm overflow-hidden">
              <CardContent className="p-6 space-y-4">
                <div className="flex justify-between items-center text-[10px] font-bold uppercase text-muted-foreground tracking-widest">
                  <span>12 of 13 agents complete</span>
                  <span>92%</span>
                </div>
                <Progress value={92} className="h-1.5 bg-secondary" />
                <p className="text-[10px] text-muted-foreground text-center italic">All agents complete — awaiting your approval to upload to YouTube</p>
              </CardContent>
            </Card>

            <div className="grid gap-8 lg:grid-cols-3">
              {/* STEPS TIMELINE */}
              <div className="lg:col-span-2 space-y-3">
                {STEPS.map((step) => (
                  <div 
                    key={step.id} 
                    className={cn(
                      "flex items-start gap-4 p-3 rounded-xl border transition-all",
                      step.done ? "border-green-500/20 bg-green-500/5" : step.running ? "border-primary bg-primary/5" : "border-border/50 bg-secondary/10"
                    )}
                  >
                    <div className={cn(
                      "w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0",
                      step.done ? "bg-green-500 text-white" : step.running ? "bg-primary text-white" : "bg-secondary text-muted-foreground border border-border/50"
                    )}>
                      {step.done ? <Check className="w-3.5 h-3.5" /> : step.id}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-bold">{step.label}</p>
                        {step.done && <Badge className="bg-green-500/10 text-green-500 border-none text-[8px] uppercase">Done</Badge>}
                        {step.running && <Badge className="bg-primary/10 text-primary border-none text-[8px] uppercase animate-pulse">Awaiting</Badge>}
                      </div>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* REVIEW SIDEBAR */}
              <div className="space-y-6">
                <Card className="bg-amber-500/5 border-amber-500/20 border shadow-lg overflow-hidden">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xs font-bold uppercase text-amber-600 tracking-widest">Video ready for review</CardTitle>
                    <CardDescription className="text-[10px] leading-relaxed">All 12 agents completed. Approve to upload to YouTube, or reject to discard.</CardDescription>
                  </CardHeader>
                  <CardContent className="flex gap-2">
                    <Button className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold h-10 text-[10px] uppercase">
                      <Check className="mr-2 w-4 h-4" /> Approve
                    </Button>
                    <Button variant="outline" className="bg-destructive/10 text-destructive border-destructive/20 h-10 px-4">
                      <X className="w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-card border-border/50 shadow-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Generated Metadata</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-xs font-bold">Cozy Halloween Lofi 🎃 Pumpkin Cafe Study Beats · 2 Hours</p>
                      <p className="text-[10px] text-muted-foreground mt-2 leading-relaxed italic">Relax with cozy pumpkin cafe lofi beats. Perfect for studying, relaxing, and focus sessions…</p>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {["#lofi", "#halloween", "#studybeats", "#pumpkin"].map(tag => (
                        <Badge key={tag} variant="secondary" className="text-[8px] bg-secondary text-muted-foreground font-mono">{tag}</Badge>
                      ))}
                      <span className="text-[8px] text-muted-foreground uppercase font-bold">+16 more</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card border-border/50 shadow-sm h-48 flex flex-col">
                  <CardHeader className="pb-2 border-b border-border/50 py-3">
                    <CardTitle className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Activity Log</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 overflow-y-auto p-4 space-y-2 font-mono text-[9px]">
                    <LogLine time="09:41" msg="Excel agent: 3 rows loaded" type="ok" />
                    <LogLine time="09:42" msg="Channel: 'Pumpkin Study Beats'" type="ok" />
                    <LogLine time="09:57" msg="Track 28/28 downloaded" type="ok" />
                    <LogLine time="10:11" msg="Video: 1080p MP4 · 2hr complete" type="ok" />
                    <LogLine time="10:12" msg="Approval agent: awaiting user" type="ag" />
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

function LogLine({ time, msg, type }: any) {
  const colors = {
    ok: "text-green-500",
    err: "text-red-500",
    ag: "text-primary",
  } as any;

  return (
    <div className="flex gap-2">
      <span className="text-muted-foreground">[{time}]</span>
      <span className={cn(colors[type])}>{msg}</span>
    </div>
  );
}