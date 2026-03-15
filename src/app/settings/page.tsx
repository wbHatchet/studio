"use client";

import { useState, useEffect } from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Key, Shield, Globe, Music, Info, Github, ExternalLink, Cpu, Zap, Share2, Video } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

export default function SettingsPage() {
  const { toast } = useToast();
  const [sunoEndpoint, setSunoEndpoint] = useState("");

  useEffect(() => {
    setSunoEndpoint(localStorage.getItem("suno_api_endpoint") || "");
  }, []);

  const handleSave = () => {
    localStorage.setItem("suno_api_endpoint", sunoEndpoint);
    toast({
      title: "Settings Saved",
      description: "Hidden Stack configuration updated.",
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
            <h1 className="font-headline font-bold text-xl">Hidden Stack Configuration</h1>
          </header>

          <main className="p-6 md:p-8">
            <div className="max-w-5xl mx-auto space-y-6">
              <Tabs defaultValue="media" className="space-y-6">
                <TabsList className="bg-secondary/50 p-1">
                  <TabsTrigger value="core" className="gap-2"><Cpu className="w-4 h-4" /> Core Brain</TabsTrigger>
                  <TabsTrigger value="media" className="gap-2"><Video className="w-4 h-4" /> Media Engine</TabsTrigger>
                  <TabsTrigger value="growth" className="gap-2"><Zap className="w-4 h-4" /> Growth Stack</TabsTrigger>
                  <TabsTrigger value="unofficial" className="gap-2"><Music className="w-4 h-4" /> Suno (OSS)</TabsTrigger>
                </TabsList>

                <TabsContent value="core" className="space-y-6">
                  <Card className="bg-card">
                    <CardHeader>
                      <CardTitle className="font-headline">Intelligence Layer</CardTitle>
                      <CardDescription>Primary LLMs for strategy and scripting</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>OpenAI API Key</Label>
                        <Input type="password" placeholder="sk-..." className="bg-secondary/30" />
                      </div>
                      <div className="space-y-2">
                        <Label>Anthropic (Claude) Key</Label>
                        <Input type="password" placeholder="sk-ant-..." className="bg-secondary/30" />
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
                      <div className="space-y-2">
                        <Label>Pika Labs API</Label>
                        <Input type="password" placeholder="Coming soon..." className="bg-secondary/30" disabled />
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
                      <div className="space-y-2">
                        <Label>YouTube Data API v3</Label>
                        <Input type="password" placeholder="OAuth Client Secret..." className="bg-secondary/30" />
                      </div>
                      <div className="space-y-2">
                        <Label>TubeBuddy License</Label>
                        <Input type="text" placeholder="License Code..." className="bg-secondary/30" />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="unofficial">
                  <Card className="bg-card">
                    <CardHeader>
                      <CardTitle className="font-headline">Suno-API (Self-Hosted)</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Alert className="bg-primary/5 border-primary/20">
                        <Info className="h-4 w-4 text-primary" />
                        <AlertTitle className="text-primary font-bold">Integration Required</AlertTitle>
                        <AlertDescription className="text-xs">
                          Connect to your self-hosted <strong>gcui-art/suno-api</strong> instance for automated beat synthesis.
                        </AlertDescription>
                      </Alert>
                      <div className="space-y-2">
                        <Label>API Base URL</Label>
                        <Input 
                          placeholder="https://your-suno-api.vercel.app" 
                          value={sunoEndpoint}
                          onChange={(e) => setSunoEndpoint(e.target.value)}
                          className="bg-secondary/30" 
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              <div className="flex justify-end">
                <Button onClick={handleSave} className="bg-primary text-primary-foreground font-bold px-8">
                  Deploy Hidden Stack Config
                </Button>
              </div>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
