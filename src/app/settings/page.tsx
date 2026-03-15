"use client";

import { useState, useEffect } from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Key, Shield, Globe, Bell, Save, Eye, EyeOff, Music, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function SettingsPage() {
  const { toast } = useToast();
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({});
  const [sunoEndpoint, setSunoEndpoint] = useState("");

  useEffect(() => {
    // Load saved settings
    setSunoEndpoint(localStorage.getItem("suno_api_endpoint") || "");
  }, []);

  const toggleKey = (key: string) => {
    setShowKeys(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    localStorage.setItem("suno_api_endpoint", sunoEndpoint);
    toast({
      title: "Settings Saved",
      description: "Your configuration has been updated successfully.",
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
            <h1 className="font-headline font-bold text-xl">Factory Settings</h1>
          </header>

          <main className="p-6 md:p-8">
            <div className="max-w-4xl mx-auto">
              <Tabs defaultValue="api" className="space-y-6">
                <TabsList className="bg-secondary/50 p-1">
                  <TabsTrigger value="api" className="gap-2">
                    <Key className="w-4 h-4" /> API Keys
                  </TabsTrigger>
                  <TabsTrigger value="unofficial" className="gap-2">
                    <Music className="w-4 h-4" /> Suno (Unofficial)
                  </TabsTrigger>
                  <TabsTrigger value="general" className="gap-2">
                    <Globe className="w-4 h-4" /> General
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="api" className="space-y-6">
                  <Card className="bg-card">
                    <CardHeader>
                      <CardTitle className="font-headline">Core AI Brain</CardTitle>
                      <CardDescription>Required for script generation and niche analysis</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label>Anthropic (Claude) API Key</Label>
                        <div className="relative">
                          <Input 
                            type={showKeys['claude'] ? "text" : "password"} 
                            placeholder="sk-ant-..." 
                            className="bg-secondary/30 pr-10"
                          />
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="absolute right-0 top-0 h-full px-3"
                            onClick={() => toggleKey('claude')}
                          >
                            {showKeys['claude'] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>OpenAI API Key</Label>
                        <div className="relative">
                          <Input 
                            type={showKeys['openai'] ? "text" : "password"} 
                            placeholder="sk-..." 
                            className="bg-secondary/30 pr-10"
                          />
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="absolute right-0 top-0 h-full px-3"
                            onClick={() => toggleKey('openai')}
                          >
                            {showKeys['openai'] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-card">
                    <CardHeader>
                      <CardTitle className="font-headline">Production & Publishing</CardTitle>
                      <CardDescription>Connect your media generation and social APIs</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label>ElevenLabs API</Label>
                          <Input type="password" placeholder="Key..." className="bg-secondary/30" />
                        </div>
                        <div className="space-y-2">
                          <Label>Stability AI Key</Label>
                          <Input type="password" placeholder="Key..." className="bg-secondary/30" />
                        </div>
                        <div className="space-y-2">
                          <Label>YouTube Data API v3</Label>
                          <Input type="password" placeholder="Key..." className="bg-secondary/30" />
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t border-border/50 pt-6">
                      <Button onClick={handleSave} className="ml-auto gap-2 bg-primary text-primary-foreground font-bold">
                        <Save className="w-4 h-4" /> Save Configuration
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>

                <TabsContent value="unofficial" className="space-y-6">
                  <Card className="bg-card">
                    <CardHeader>
                      <CardTitle className="font-headline">Suno AI Integration (GitHub)</CardTitle>
                      <CardDescription>Integrate with unofficial Suno-API/Suno-API services</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <Alert className="bg-primary/5 border-primary/20">
                        <Info className="h-4 w-4 text-primary" />
                        <AlertTitle className="text-primary font-bold">Heads up!</AlertTitle>
                        <AlertDescription className="text-xs">
                          The official Suno API is not yet available. To enable automatic generation, 
                          host the <strong>Suno-API</strong> open-source project from GitHub and provide your endpoint URL here.
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
                        <p className="text-[10px] text-muted-foreground">
                          Leave blank to only generate prompts without triggering music synthesis.
                        </p>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t border-border/50 pt-6">
                      <Button onClick={handleSave} className="ml-auto gap-2 bg-primary text-primary-foreground font-bold">
                        <Save className="w-4 h-4" /> Connect Service
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>

                <TabsContent value="general">
                  <Card className="bg-card">
                    <CardHeader>
                      <CardTitle className="font-headline">Factory Preferences</CardTitle>
                      <CardDescription>Global defaults for content production</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label>Default Export Resolution</Label>
                        <Input placeholder="4K (3840x2160)" className="bg-secondary/30" />
                      </div>
                      <div className="space-y-2">
                        <Label>Auto-Publish Threshold (Views)</Label>
                        <Input type="number" placeholder="1000" className="bg-secondary/30" />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
