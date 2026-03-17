
"use client";

import { useState, useEffect } from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { DollarSign, TrendingUp, BarChart3, PieChart, Info, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function RevenueCalculatorPage() {
  const [views, setViews] = useState(300000);
  const [cpm, setCpm] = useState(5);
  const [beatPrice, setBeatPrice] = useState(30);
  const [convRate, setConvRate] = useState(0.5);
  const [bundles, setBundles] = useState(10);
  const [bundlePrice, setBundlePrice] = useState(99);

  const ads = Math.round((views / 1000) * cpm);
  const licensing = Math.round(views * (convRate / 100) * beatPrice);
  const bundleRev = Math.round(bundles * bundlePrice);
  const total = ads + licensing + bundleRev;

  const licensePercent = Math.round((licensing / (total || 1)) * 100);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        <SidebarInset className="bg-background">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b border-border/50 px-4">
            <SidebarTrigger className="-ml-1" />
            <div className="h-4 w-px bg-border/50 mx-2" />
            <h1 className="font-headline font-bold text-xl uppercase text-primary tracking-tight">Revenue Calculator</h1>
          </header>

          <main className="p-6 md:p-8 space-y-8 max-w-6xl mx-auto w-full">
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="space-y-6">
                <Card className="bg-card border-border/50 shadow-xl">
                  <CardHeader>
                    <CardTitle className="font-headline text-primary uppercase text-xs tracking-widest">Model Your Income</CardTitle>
                    <CardDescription>Adjust sliders to forecast monthly media network revenue</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <Label className="text-[10px] uppercase font-bold text-muted-foreground">Monthly Views</Label>
                        <span className="text-sm font-mono font-bold text-primary">{views >= 1000000 ? (views / 1000000).toFixed(1) + 'M' : (views / 1000) + 'K'}</span>
                      </div>
                      <Slider value={[views]} min={10000} max={2000000} step={10000} onValueChange={([v]) => setViews(v)} />
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <Label className="text-[10px] uppercase font-bold text-muted-foreground">CPM ($)</Label>
                        <span className="text-sm font-mono font-bold text-primary">${cpm.toFixed(1)}</span>
                      </div>
                      <Slider value={[cpm]} min={1} max={15} step={0.5} onValueChange={([v]) => setCpm(v)} />
                    </div>

                    <div className="grid grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <Label className="text-[10px] uppercase font-bold text-muted-foreground">Beat Price</Label>
                          <span className="text-sm font-mono font-bold text-primary">${beatPrice}</span>
                        </div>
                        <Slider value={[beatPrice]} min={20} max={200} step={5} onValueChange={([v]) => setBeatPrice(v)} />
                      </div>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <Label className="text-[10px] uppercase font-bold text-muted-foreground">Conv. Rate</Label>
                          <span className="text-sm font-mono font-bold text-primary">{convRate}%</span>
                        </div>
                        <Slider value={[convRate]} min={0.1} max={3} step={0.1} onValueChange={([v]) => setConvRate(v)} />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <Label className="text-[10px] uppercase font-bold text-muted-foreground">Bundle Sales</Label>
                          <span className="text-sm font-mono font-bold text-primary">{bundles}</span>
                        </div>
                        <Slider value={[bundles]} min={0} max={100} step={1} onValueChange={([v]) => setBundles(v)} />
                      </div>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <Label className="text-[10px] uppercase font-bold text-muted-foreground">Bundle Price</Label>
                          <span className="text-sm font-mono font-bold text-primary">${bundlePrice}</span>
                        </div>
                        <Slider value={[bundlePrice]} min={49} max={299} step={1} onValueChange={([v]) => setBundlePrice(v)} />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-primary/5 border-primary/20">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-[10px] font-bold uppercase text-primary flex items-center gap-2">
                      <Info className="w-3 h-3" /> Growth Insight
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-muted-foreground leading-relaxed italic">
                      "At {views / 1000}K views/month with {convRate}% conversion, licensing makes up {licensePercent}% of your income. 
                      {bundles > 20 ? " Your bundle volume is high—this is where the real profit compounds." : " Consider ramping up bundle funnels—they scale without needing more views."}"
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <MetricResult label="YouTube Ads" value={ads} color="text-blue-400" />
                  <MetricResult label="Beat Licensing" value={licensing} color="text-primary" />
                  <MetricResult label="Bundle Funnels" value={bundleRev} color="text-purple-400" />
                  <MetricResult label="Total / Month" value={total} color="text-green-500" isTotal />
                </div>

                <Card className="bg-card border-border/50 overflow-hidden shadow-xl">
                  <CardHeader className="bg-primary/5 border-b border-border/50 py-4">
                    <CardTitle className="text-[10px] font-bold uppercase text-primary tracking-widest">Revenue Streams</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <StreamRow label="YouTube Ad Revenue" desc="$3–$8 CPM · 100K views = $300–$800/mo" color="bg-blue-400" />
                      <StreamRow label="Beat Licensing" desc="MP3 $30 · WAV $75 · Exclusive $300–$1,500" color="bg-primary" />
                      <StreamRow label="Beat Packs / Funnels" desc="50 beats for $99 · producer kits · samples" color="bg-purple-400" />
                      <StreamRow label="Artist Placements" desc="Big artists find beats on YouTube organically" color="bg-amber-500" />
                    </div>
                  </CardContent>
                </Card>

                <div className="p-6 rounded-2xl bg-secondary/30 border border-border/50 text-center">
                  <p className="text-[10px] font-bold uppercase text-muted-foreground mb-1">Annual Forecast</p>
                  <p className="text-4xl font-headline font-bold text-foreground">${(total * 12).toLocaleString()}</p>
                  <p className="text-[9px] text-green-500 font-bold uppercase mt-2">Projected Industrial Growth Scale</p>
                </div>
              </div>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

function MetricResult({ label, value, color, isTotal }: any) {
  return (
    <Card className={cn("bg-secondary/20 border-border/50 p-4", isTotal && "border-green-500/20 bg-green-500/5")}>
      <p className="text-[9px] font-bold uppercase text-muted-foreground mb-1">{label}</p>
      <p className={cn("text-2xl font-headline font-bold", color)}>${value.toLocaleString()}</p>
    </Card>
  );
}

function StreamRow({ label, desc, color }: any) {
  return (
    <div className="flex gap-3">
      <div className={cn("w-1.5 h-1.5 rounded-full mt-1.5 shrink-0", color)} />
      <div>
        <p className="text-xs font-bold text-foreground">{label}</p>
        <p className="text-[10px] text-muted-foreground">{desc}</p>
      </div>
    </div>
  );
}
