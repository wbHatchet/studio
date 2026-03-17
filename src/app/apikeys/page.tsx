
"use client";

import { useState } from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Zap, 
  ShieldCheck, 
  Key, 
  Terminal, 
  Cpu, 
  Search, 
  Share2, 
  Youtube, 
  Mic2, 
  Globe,
  CheckCircle2,
  AlertCircle,
  Database,
  Link as LinkIcon
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ApiKeysPage() {
  const { toast } = useToast();
  
  const handleSave = () => {
    toast({
      title: "API Registry Synchronized",
      description: "Industrial credentials updated across the grid.",
    });
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-[#0a0a0f]">
        <AppSidebar />
        <SidebarInset className="bg-background">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b border-border/50 px-4 backdrop-blur-md bg-background/80 sticky top-0 z-50">
            <SidebarTrigger className="-ml-1" />
            <div className="h-4 w-px bg-border/50 mx-2" />
            <div className="flex-1">
              <h1 className="font-headline font-bold text-xl tracking-tight uppercase text-primary">API Registry</h1>
              <p className="text-[9px] text-muted-foreground uppercase font-bold tracking-widest">Industrial Credential Management</p>
            </div>
            <Button onClick={handleSave} size="sm" className="bg-primary text-background font-bold uppercase text-[10px] tracking-widest h-9">
              Save Grid Keys
            </Button>
          </header>

          <main className="p-6 md:p-8 space-y-8 max-w-5xl mx-auto w-full">
            <Card className="bg-card border-border/50 shadow-xl overflow-hidden rounded-3xl">
              <div className="bg-primary/5 p-6 border-b border-border/50">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h2 className="text-lg font-headline font-bold uppercase tracking-tight">Industrial API Stack</h2>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">8 of 14 APIs configured · Grid Ready</p>
                  </div>
                  <Badge className="bg-primary text-background font-black uppercase text-[10px]">MVP Active</Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-[9px] font-black uppercase tracking-tighter text-muted-foreground">
                    <span>Integration Velocity</span>
                    <span>68% Complete</span>
                  </div>
                  <Progress value={68} className="h-1.5 bg-secondary" />
                </div>
              </div>
              <CardContent className="p-8 space-y-10">
                
                {/* CORE AI SECTION */}
                <section className="space-y-4">
                  <div className="flex items-center gap-2 pb-2 border-b border-border/50">
                    <Cpu className="w-4 h-4 text-primary" />
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Core AI Cluster</h3>
                  </div>
                  <div className="grid gap-6 md:grid-cols-2">
                    <ApiKeyInput 
                      label="OpenAI (GPT-4o / DALL-E)" 
                      placeholder="sk-proj-••••••••" 
                      status="Connected"
                      icon={Terminal}
                    />
                    <ApiKeyInput 
                      label="Anthropic (Claude 3.5)" 
                      placeholder="sk-ant-••••••••" 
                      status="Connected"
                      icon={Terminal}
                    />
                  </div>
                </section>

                {/* MEDIA GEN SECTION */}
                <section className="space-y-4">
                  <div className="flex items-center gap-2 pb-2 border-b border-border/50">
                    <Database className="w-4 h-4 text-primary" />
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Media Production Nodes</h3>
                  </div>
                  <div className="grid gap-6 md:grid-cols-2">
                    <ApiKeyInput 
                      label="ElevenLabs (Voice)" 
                      placeholder="Enter API Key..." 
                      status="Connected"
                      icon={Mic2}
                    />
                    <ApiKeyInput 
                      label="Apify (Trend Scrapers)" 
                      placeholder="Enter API Key..." 
                      status="Pending"
                      icon={Search}
                    />
                  </div>
                </section>

                {/* DISTRIBUTION & ZAPIER SECTION */}
                <section className="space-y-4">
                  <div className="flex items-center gap-2 pb-2 border-b border-border/50">
                    <Globe className="w-4 h-4 text-primary" />
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Orchestration & Distribution</h3>
                  </div>
                  <div className="grid gap-6 md:grid-cols-2">
                    <ApiKeyInput 
                      label="YouTube Data API v3" 
                      placeholder="OAuth Secret..." 
                      status="Connected"
                      icon={Youtube}
                    />
                    <ApiKeyInput 
                      label="Zapier / n8n Webhook" 
                      placeholder="https://hooks.zapier.com/..." 
                      status="Pending"
                      icon={LinkIcon}
                      isZapier
                    />
                    <ApiKeyInput 
                      label="Repurpose.io (Auto-Dist)" 
                      placeholder="Enter API Key..." 
                      status="Connected"
                      icon={Share2}
                    />
                  </div>
                </section>

              </CardContent>
            </Card>

            <div className="p-6 rounded-3xl border border-primary/20 bg-primary/5 flex items-start gap-4 shadow-lg shadow-primary/5">
              <ShieldCheck className="w-6 h-6 text-primary shrink-0 mt-1" />
              <div>
                <h4 className="text-xs font-bold uppercase tracking-tight text-primary">Industrial Encryption Logic</h4>
                <p className="text-[10px] text-muted-foreground leading-relaxed mt-1 uppercase font-bold">
                  All keys are vaulted using industrial AES-256 encryption. Only the "Director" process has execution-level access to credentials during active pipeline runs.
                </p>
              </div>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

function ApiKeyInput({ label, placeholder, status, icon: Icon, isZapier }: any) {
  return (
    <div className="space-y-2 group">
      <div className="flex justify-between items-center">
        <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
          {isZapier ? (
            <div className="w-3 h-3 bg-orange-500 rounded-sm flex items-center justify-center text-[8px] text-white font-black">Z</div>
          ) : (
            <Icon className="w-3 h-3 text-primary" />
          )}
          {label}
        </Label>
        <span className={`text-[8px] font-black uppercase tracking-tighter ${status === 'Connected' ? 'text-green-500' : 'text-orange-400'}`}>
          {status}
        </span>
      </div>
      <div className="relative">
        <Input 
          type="password" 
          placeholder={placeholder} 
          className="bg-secondary/30 border-border/50 h-10 font-mono text-[10px] focus:border-primary transition-all pr-10"
        />
        <Button variant="ghost" size="icon" className="absolute right-1 top-1 h-8 w-8 text-muted-foreground hover:text-primary">
          <Key className="w-3 h-3" />
        </Button>
      </div>
    </div>
  );
}
