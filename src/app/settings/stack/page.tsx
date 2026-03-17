
"use client";

import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Server, Cpu, Database, Cloud, Code2, Layers, Zap, Terminal } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const STACK = [
  { name: 'OpenClaw', desc: 'Director agent—orchestrates tasks, memory, and autonomous decisions.', badge: 'Core' },
  { name: 'Lobster Engine', desc: 'YAML workflow engine inside OpenClaw—deterministic agent order.', badge: 'Core' },
  { name: 'Claude / GPT-4o', desc: 'AI models powering Director + Prompt agents (model-agnostic).', badge: 'Active' },
  { name: 'Suno AI', desc: 'Music generation node triggered via Playwright automation.', badge: 'Active' },
  { name: 'FFmpeg Node', desc: 'MP3 + artwork → 1080p MP4 with high-retention zoom effects.', badge: 'Active' },
  { name: 'YouTube Data API', desc: 'Handles industrial-scale upload, metadata, and scheduling.', badge: 'Active' },
  { name: 'AWS S3 / GCS', desc: 'Asset storage—hosting MP3, JPG, and MP4 buffer blobs.', badge: 'Active' },
];

export default function TechStackPage() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        <SidebarInset className="bg-background">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b border-border/50 px-4">
            <SidebarTrigger className="-ml-1" />
            <div className="h-4 w-px bg-border/50 mx-2" />
            <h1 className="font-headline font-bold text-xl uppercase text-primary tracking-tight">Tech Stack & Infrastructure</h1>
          </header>

          <main className="p-6 md:p-8 space-y-8 max-w-5xl mx-auto w-full">
            <Card className="bg-card border-border/50 shadow-xl overflow-hidden">
              <CardHeader className="bg-primary/5 py-6">
                <CardTitle className="font-headline text-lg uppercase tracking-tight">System Infrastructure</CardTitle>
                <CardDescription>Full industrial stack powering the AI beat factory</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-border/50">
                  {STACK.map((item) => (
                    <div key={item.name} className="p-6 flex items-start gap-6 hover:bg-secondary/10 transition-colors">
                      <div className="w-32 shrink-0">
                        <p className="text-xs font-bold text-foreground">{item.name}</p>
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                      </div>
                      <Badge variant={item.badge === 'Core' ? 'default' : 'outline'} className="text-[9px] uppercase font-bold h-5">
                        {item.badge}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border/50 shadow-xl">
              <CardHeader>
                <CardTitle className="font-headline text-primary uppercase text-xs tracking-widest">Build Order (90-Day Execution)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <BuildStep num="1" label="Install OpenClaw on VPS — Configure Gateway process" />
                <BuildStep num="2" label="Write SOUL.md — Define Director rules and memory logic" />
                <BuildStep num="3" label="Build Lobster YAML pipeline — Deterministic step order" />
                <BuildStep num="4" label="Connect Suno via Playwright browser automation" />
                <BuildStep num="5" label="Add DALL-E image agent + FFmpeg zoom scripts" />
                <BuildStep num="6" label="Connect YouTube Data API for scheduled publishing" />
              </CardContent>
            </Card>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

function BuildStep({ num, label }: any) {
  return (
    <div className="flex items-center gap-4 p-3 rounded-xl bg-secondary/20 border border-border/50">
      <span className="w-6 h-6 rounded-lg bg-primary/20 text-primary flex items-center justify-center text-[10px] font-bold font-mono">{num}</span>
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  );
}
