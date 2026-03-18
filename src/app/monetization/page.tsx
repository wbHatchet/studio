
"use client";

import { useState } from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  DollarSign, 
  ShoppingCart, 
  Package, 
  TrendingUp, 
  ArrowUpRight, 
  Globe, 
  Music,
  ExternalLink,
  Target,
  Zap,
  Layers
} from "lucide-react";
import { PerformanceChart } from "@/components/analytics/performance-chart";

export default function MonetizationPage() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        <SidebarInset className="bg-background">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b border-border/50 px-4 backdrop-blur-md bg-background/80 sticky top-0 z-50">
            <SidebarTrigger className="-ml-1" />
            <div className="h-4 w-px bg-border/50 mx-2" />
            <h1 className="font-headline font-bold text-xl uppercase text-primary tracking-tight">Revenue & Monetization</h1>
          </header>

          <main className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto w-full">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <MonetizationMetric label="Total Beat Sales" value="$4,820" sub="MP3/WAV/Exclusive" icon={Music} trend="+12%" />
              <MonetizationMetric label="Bundle Revenue" value="$2,140" sub="50-Beat Packs" icon={Package} trend="+24%" />
              <MonetizationMetric label="YouTube AdSense" value="$1,240" sub="Ad Revenue" icon={DollarSign} trend="+8%" />
              <MonetizationMetric label="Total Monthly" value="$8,200" sub="Combined Streams" icon={TrendingUp} trend="+15%" isTotal />
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              <Card className="lg:col-span-2 bg-card border-border/50">
                <CardHeader>
                  <CardTitle className="font-headline flex items-center gap-2 text-primary">
                    <TrendingUp className="w-5 h-5" />
                    Revenue Velocity
                  </CardTitle>
                  <CardDescription>Industrial tracking across all monetization layers</CardDescription>
                </CardHeader>
                <CardContent>
                  <PerformanceChart />
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card className="bg-card border-primary/20 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xs font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                      <Target className="w-4 h-4" /> Funnel Optimization
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 rounded-xl bg-secondary/30 border border-border">
                      <p className="text-[10px] font-bold text-muted-foreground uppercase">Buy 1 Get 2 Free</p>
                      <div className="flex justify-between items-end mt-1">
                        <p className="text-lg font-bold">142 Sales</p>
                        <Badge className="bg-green-500/20 text-green-500 text-[8px]">ACTIVE</Badge>
                      </div>
                    </div>
                    <div className="p-4 rounded-xl bg-secondary/30 border border-border">
                      <p className="text-[10px] font-bold text-muted-foreground uppercase">50-Beat Empire Bundle</p>
                      <div className="flex justify-between items-end mt-1">
                        <p className="text-lg font-bold">28 Sales</p>
                        <Badge className="bg-blue-500/20 text-blue-400 text-[8px]">TRENDING</Badge>
                      </div>
                    </div>
                    <Button className="w-full bg-primary text-background font-bold uppercase text-[10px] h-10">
                      Sync BeatStars Inventory
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-card border-border/50">
                  <CardHeader>
                    <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">External Platforms</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <PlatformRow name="BeatStars" status="Connected" />
                    <PlatformRow name="Gumroad" status="Connected" />
                    <PlatformRow name="Stripe" status="Connected" />
                    <PlatformRow name="DistroKid" status="Pending" />
                  </CardContent>
                </Card>
              </div>
            </div>

            <Card className="bg-card border-border/50 overflow-hidden">
              <CardHeader className="bg-primary/5 py-4 border-b border-border/50">
                <CardTitle className="text-[10px] font-bold uppercase text-primary flex items-center gap-2 tracking-widest">
                  <Layers className="w-3 h-3" /> Recent Transactions
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-border/50">
                  <TransactionRow beat="Midnight Harbor" license="Exclusive" price="$500" date="2h ago" />
                  <TransactionRow beat="Rainy Dock Side" license="WAV Lease" price="$75" date="5h ago" />
                  <TransactionRow beat="Harbor Loop #4" license="MP3 Lease" price="$30" date="12h ago" />
                  <TransactionRow beat="Empire Bundle v1" license="Bundle" price="$99" date="1d ago" />
                </div>
              </CardContent>
            </Card>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

function MonetizationMetric({ label, value, sub, icon: Icon, trend, isTotal }: any) {
  return (
    <Card className={`bg-card border-border/50 ${isTotal ? 'border-primary/30 bg-primary/5' : ''}`}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className="p-2 rounded-lg bg-secondary/50">
            <Icon className={`w-4 h-4 ${isTotal ? 'text-primary' : 'text-muted-foreground'}`} />
          </div>
          <span className="text-[10px] font-bold text-green-500 flex items-center gap-1">
            <ArrowUpRight className="w-3 h-3" /> {trend}
          </span>
        </div>
        <div className="mt-4">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{label}</p>
          <p className="text-2xl font-headline font-bold mt-1">{value}</p>
          <p className="text-[9px] text-muted-foreground mt-1 font-medium">{sub}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function PlatformRow({ name, status }: any) {
  return (
    <div className="flex items-center justify-between p-2 rounded-lg bg-secondary/20">
      <span className="text-[10px] font-bold uppercase">{name}</span>
      <Badge variant="outline" className={`text-[8px] uppercase font-black ${status === 'Connected' ? 'border-green-500/20 text-green-500' : 'border-orange-500/20 text-orange-400'}`}>
        {status}
      </Badge>
    </div>
  );
}

function TransactionRow({ beat, license, price, date }: any) {
  return (
    <div className="flex items-center justify-between p-4 hover:bg-secondary/10 transition-colors group">
      <div className="flex items-center gap-4">
        <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
          <ShoppingCart className="w-4 h-4 text-muted-foreground" />
        </div>
        <div>
          <p className="text-xs font-bold">{beat}</p>
          <p className="text-[9px] text-muted-foreground uppercase">{license}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-sm font-bold text-green-500">{price}</p>
        <p className="text-[9px] text-muted-foreground uppercase">{date}</p>
      </div>
    </div>
  );
}
