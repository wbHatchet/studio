
"use client";

import { useState } from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Zap, Target, Repeat, Sparkles, Copy, Layout } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function GrowthLabPage() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <SidebarInset className="bg-background">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b border-border/50 px-4">
            <SidebarTrigger className="-ml-1" />
            <div className="h-4 w-px bg-border/50 mx-2" />
            <h1 className="font-headline font-bold text-xl">Hook & Title Lab</h1>
          </header>

          <main className="p-6 md:p-8 space-y-8">
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="space-y-8">
                <Card className="bg-card">
                  <CardHeader>
                    <CardTitle className="font-headline flex items-center gap-2">
                      <Zap className="w-5 h-5 text-primary" />
                      Hook Optimization Agent
                    </CardTitle>
                    <CardDescription>Rewrite the first 3 seconds to reduce swipe rate</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Original Script Segment</Label>
                      <Textarea 
                        placeholder="Paste your opening 5-10 seconds here..."
                        className="bg-secondary/30 min-h-[100px]"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Tone Profile</Label>
                        <Input placeholder="e.g. Mysterious, Urgent" className="bg-secondary/30" />
                      </div>
                      <div className="space-y-2">
                        <Label>Target Swipe Rate</Label>
                        <Input placeholder="< 20%" className="bg-secondary/30" />
                      </div>
                    </div>
                    <Button className="w-full bg-primary text-primary-foreground font-bold">
                      <Sparkles className="w-4 h-4 mr-2" /> Engineer Viral Hooks
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-card">
                  <CardHeader>
                    <CardTitle className="font-headline flex items-center gap-2">
                      <Layout className="w-5 h-5 text-primary" />
                      Thumbnail A/B Variants
                    </CardTitle>
                    <CardDescription>Generate layout ideas for testing</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="aspect-video bg-secondary/50 rounded-xl flex items-center justify-center border-2 border-dashed border-border group hover:border-primary/50 transition-all cursor-pointer">
                        <div className="text-center">
                          <Repeat className="w-6 h-6 mx-auto mb-2 text-muted-foreground group-hover:text-primary" />
                          <p className="text-[10px] font-bold uppercase">Variant A (Bold Text)</p>
                        </div>
                      </div>
                      <div className="aspect-video bg-secondary/50 rounded-xl flex items-center justify-center border-2 border-dashed border-border group hover:border-primary/50 transition-all cursor-pointer">
                        <div className="text-center">
                          <Repeat className="w-6 h-6 mx-auto mb-2 text-muted-foreground group-hover:text-primary" />
                          <p className="text-[10px] font-bold uppercase">Variant B (No Text)</p>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full text-xs font-bold">Generate More Variants</Button>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="bg-card border-primary/20">
                  <CardHeader className="bg-primary/5">
                    <CardTitle className="flex items-center gap-2 text-primary font-headline">
                      <Target className="w-5 h-5" />
                      Title Testing Pool
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-4">
                    <div className="p-4 rounded-xl bg-secondary/30 border border-border flex items-center justify-between">
                      <p className="text-sm font-medium">1. These 5 Beats Broke the Internet 😻</p>
                      <Badge className="bg-green-500/20 text-green-400">High CTR</Badge>
                    </div>
                    <div className="p-4 rounded-xl bg-secondary/30 border border-border flex items-center justify-between">
                      <p className="text-sm font-medium">2. Dark Drake Type Beat (Take Care Era)</p>
                      <Badge className="bg-blue-500/20 text-blue-400">Steady Search</Badge>
                    </div>
                    <div className="p-4 rounded-xl bg-secondary/30 border border-border flex items-center justify-between">
                      <p className="text-sm font-medium">3. YOU ARE NOT READY FOR THIS SOUND...</p>
                      <Badge className="bg-orange-500/20 text-orange-400">Curiosity Gap</Badge>
                    </div>
                    <div className="pt-4">
                      <p className="text-[10px] text-muted-foreground uppercase font-bold mb-2">AI Reasoning</p>
                      <p className="text-xs italic text-muted-foreground leading-relaxed">
                        "Title 1 uses emotional appeal and scarcity. Title 3 leverages the curiosity gap strategy used by top 1% channels in 2024."
                      </p>
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
