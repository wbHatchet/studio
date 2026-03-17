
"use client";

import { useState } from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Zap, CreditCard, History, CheckCircle2, ArrowUpRight, ShieldCheck, HelpCircle, Layers, Cpu } from "lucide-react";
import { cn } from "@/lib/utils";

const BILLING_HISTORY = [
  { id: "INV-001", date: "Mar 01, 2026", amount: "$49.00", status: "Paid" },
  { id: "INV-002", date: "Feb 01, 2026", amount: "$49.00", status: "Paid" },
  { id: "INV-003", date: "Jan 01, 2026", amount: "$49.00", status: "Paid" },
];

export default function BillingPage() {
  const [currentPlan] = useState("Pro");

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-[#0a0a0f]">
        <AppSidebar />
        <SidebarInset className="bg-background">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b border-border/50 px-4 backdrop-blur-md bg-background/80 sticky top-0 z-50">
            <SidebarTrigger className="-ml-1" />
            <div className="h-4 w-px bg-border/50 mx-2" />
            <div className="flex-1">
              <h1 className="font-headline font-bold text-xl tracking-tight uppercase text-primary">Billing & Quota</h1>
              <p className="text-[9px] text-muted-foreground uppercase font-bold tracking-widest">Manage industrial scale and empire resources</p>
            </div>
          </header>

          <main className="p-6 md:p-8 space-y-8 max-w-6xl mx-auto w-full">
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Left Column: Usage & History */}
              <div className="lg:col-span-2 space-y-8">
                <Card className="bg-card border-border/50 shadow-xl overflow-hidden">
                  <CardHeader className="bg-primary/5 py-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle className="font-headline text-lg uppercase tracking-tight">Resource Utilization</CardTitle>
                        <CardDescription className="text-[10px] font-bold uppercase tracking-widest">Industrial Credit Consumption</CardDescription>
                      </div>
                      <Badge className="bg-primary text-background font-black uppercase tracking-tighter px-4 py-1">Pro Active</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-8 space-y-8">
                    <div className="space-y-4">
                      <div className="flex justify-between items-end">
                        <div className="space-y-1">
                          <p className="text-2xl font-headline font-bold">13,600 / 20,000</p>
                          <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Empire Credits Used (Cycle ends in 14 days)</p>
                        </div>
                        <span className="text-xs font-bold text-primary">68% Capacity</span>
                      </div>
                      <div className="h-2 w-full bg-secondary/50 rounded-full overflow-hidden">
                        <div className="h-full bg-primary w-[68%] rounded-full shadow-[0_0_15px_rgba(var(--primary),0.4)]" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <UsageDetail icon={Cpu} label="AI Node Operations" value="8,420" sub="Credits" />
                      <UsageDetail icon={Layers} label="Channel Node Slots" value="12 / 50" sub="Active Nodes" />
                    </div>
                  </CardContent>
                  <CardFooter className="bg-secondary/10 border-t border-border/50 px-8 py-4">
                    <p className="text-[9px] font-bold uppercase text-muted-foreground leading-relaxed">
                      Credits power all autonomous agents including suno music nodes, MJ scene renders, and LLM script batches.
                    </p>
                  </CardFooter>
                </Card>

                <Card className="bg-card border-border/50">
                  <CardHeader>
                    <CardTitle className="font-headline text-sm uppercase tracking-widest flex items-center gap-2">
                      <History className="w-4 h-4 text-muted-foreground" /> Deployment History
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="divide-y divide-border/50">
                      {BILLING_HISTORY.map((inv) => (
                        <div key={inv.id} className="p-4 flex items-center justify-between hover:bg-secondary/20 transition-colors">
                          <div className="flex items-center gap-4">
                            <div className="w-8 h-8 rounded-lg bg-secondary/50 flex items-center justify-center">
                              <CreditCard className="w-4 h-4 text-muted-foreground" />
                            </div>
                            <div>
                              <p className="text-xs font-bold uppercase tracking-tight">{inv.id}</p>
                              <p className="text-[9px] font-bold text-muted-foreground uppercase">{inv.date}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-headline font-bold">{inv.amount}</p>
                            <Badge variant="outline" className="text-[8px] border-green-500/20 text-green-500 uppercase px-2">{inv.status}</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column: Plans */}
              <div className="space-y-6">
                <div className="text-center p-6 rounded-3xl border border-primary bg-primary/5 space-y-4">
                  <Zap className="w-8 h-8 text-primary mx-auto" />
                  <h3 className="font-headline font-bold uppercase tracking-tight">Expand Output</h3>
                  <p className="text-[10px] text-muted-foreground uppercase font-bold leading-relaxed px-4">
                    Upgrade your industrial capacity to support higher video velocity.
                  </p>
                  <Link href="/pricing" className="block">
                    <Button className="w-full bg-primary text-background font-bold uppercase text-[10px] tracking-widest h-12 shadow-xl shadow-primary/10">
                      View Scaling Tiers
                    </Button>
                  </Link>
                </div>

                <Card className="bg-card border-border/50 shadow-md">
                  <CardHeader>
                    <CardTitle className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-primary" /> Management
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button variant="outline" className="w-full justify-start text-[10px] font-bold uppercase h-11 border-border/50">
                      <CreditCard className="w-3 h-3 mr-3" /> Update Payment Method
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-[10px] font-bold uppercase h-11 border-border/50">
                      <ArrowUpRight className="w-3 h-3 mr-3" /> Billing Portal (Stripe)
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-[10px] font-bold uppercase h-11 text-destructive hover:bg-destructive/10">
                      <Trash2 className="w-3 h-3 mr-3" /> Terminate Subscription
                    </Button>
                  </CardContent>
                </Card>

                <div className="p-6 rounded-3xl border border-border/50 bg-secondary/10 flex items-start gap-4">
                  <HelpCircle className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold uppercase tracking-tight">Support Node</p>
                    <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                      Need custom enterprise limits for 100+ channels? Contact our distribution specialists.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

import Link from "next/link";
import { Trash2 } from "lucide-react";

function UsageDetail({ icon: Icon, label, value, sub }: any) {
  return (
    <div className="p-4 rounded-2xl bg-secondary/30 border border-border/50">
      <div className="flex items-center gap-2 mb-2">
        <Icon className="w-3 h-3 text-primary" />
        <span className="text-[9px] font-black uppercase text-muted-foreground tracking-widest">{label}</span>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-xl font-headline font-bold">{value}</span>
        <span className="text-[9px] font-bold uppercase text-muted-foreground">{sub}</span>
      </div>
    </div>
  );
}
