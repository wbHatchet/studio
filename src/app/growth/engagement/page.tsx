
"use client";

import { useState } from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Heart, Pin, Reply, BrainCircuit, ShieldCheck, Zap } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function EngagementBotPage() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <SidebarInset className="bg-background">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b border-border/50 px-4">
            <SidebarTrigger className="-ml-1" />
            <div className="h-4 w-px bg-border/50 mx-2" />
            <h1 className="font-headline font-bold text-xl">Comment Engagement Bot</h1>
          </header>

          <main className="p-6 md:p-8 space-y-8">
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-6">
                <Card className="bg-card">
                  <CardHeader>
                    <CardTitle className="font-headline">Moderation Queue</CardTitle>
                    <CardDescription>AI-generated draft replies for approval</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 rounded-xl bg-secondary/20 border border-border space-y-3">
                      <div className="flex justify-between items-start">
                        <div className="flex gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center font-bold text-xs text-blue-400">JD</div>
                          <div>
                            <p className="text-xs font-bold">JohnDoe_Music <span className="text-muted-foreground font-normal ml-2">2m ago</span></p>
                            <p className="text-sm mt-1">This beat is literally insane. Drake would slide on this!</p>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-[10px] text-green-500 border-green-500/20">Positive</Badge>
                      </div>
                      <div className="p-3 rounded-lg bg-primary/5 border border-primary/10">
                        <p className="text-[10px] uppercase font-bold text-primary mb-1">AI Draft Reply</p>
                        <p className="text-sm">Appreciate the love! 🌊 That Take Care vibe is exactly what we were going for. Who should we do next?</p>
                      </div>
                      <div className="flex gap-2 justify-end">
                        <Button variant="ghost" size="sm" className="h-8 text-xs text-destructive">Reject</Button>
                        <Button variant="outline" size="sm" className="h-8 text-xs"><Heart className="w-3 h-3 mr-1" /> Heart & Approve</Button>
                        <Button size="sm" className="h-8 text-xs bg-primary text-primary-foreground">Post Reply</Button>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-secondary/20 border border-border space-y-3 opacity-60">
                      <div className="flex justify-between items-start">
                        <div className="flex gap-3">
                          <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center font-bold text-xs text-purple-400">LS</div>
                          <div>
                            <p className="text-xs font-bold">LofiSamurai <span className="text-muted-foreground font-normal ml-2">1h ago</span></p>
                            <p className="text-sm mt-1">What BPM is this? Also what piano plugin did you use?</p>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-[10px]">Inquiry</Badge>
                      </div>
                      <div className="flex gap-2 justify-end">
                        <Button variant="outline" size="sm" className="h-8 text-xs">Generate Reply</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="bg-card">
                  <CardHeader>
                    <CardTitle className="font-headline text-lg">Bot Strategy</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Auto-Heart Comments</Label>
                        <p className="text-[10px] text-muted-foreground">Hearts 100% of non-spam comments</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>AI Draft Replies</Label>
                        <p className="text-[10px] text-muted-foreground">Pre-generate replies for review</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Engagement Boost</Label>
                        <p className="text-[10px] text-muted-foreground">Auto-ask questions to top fans</p>
                      </div>
                      <Switch />
                    </div>
                    <div className="pt-4 border-t border-border/50">
                      <Label className="text-xs font-bold uppercase text-muted-foreground">Auto-Pin Template</Label>
                      <div className="mt-2 p-3 rounded-lg bg-secondary/30 text-[10px] leading-relaxed italic">
                        "🔥 BUY 1 GET 2 FREE at the link in bio! Which artist should I flip next? Let me know in the comments! 👇"
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-primary text-primary-foreground font-bold">
                      <ShieldCheck className="w-4 h-4 mr-2" /> Save Engagement Rules
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="bg-card border-primary/20">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-primary/10 rounded-full">
                        <Zap className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-lg font-bold font-headline">420</p>
                        <p className="text-[10px] text-muted-foreground uppercase font-bold">Replies Sent This Week</p>
                      </div>
                    </div>
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
