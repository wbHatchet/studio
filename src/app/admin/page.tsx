"use client";

import { useState } from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Users, 
  ShieldCheck, 
  Search, 
  MoreHorizontal, 
  Activity, 
  Server, 
  Database,
  Cpu,
  BarChart3,
  ExternalLink,
  Ban,
  Zap,
  Globe
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const MOCK_USERS = [
  { id: "USR-001", email: "jeff@harbormoon.ai", plan: "Empire", status: "Active", credits: "42,400", nodes: 42, joined: "Jan 12, 2026" },
  { id: "USR-002", email: "admin@loficontrol.com", plan: "Pro", status: "Active", credits: "13,600", nodes: 12, joined: "Jan 15, 2026" },
  { id: "USR-003", email: "beta@testnode.io", plan: "Starter", status: "Warning", credits: "120", nodes: 3, joined: "Feb 01, 2026" },
  { id: "USR-004", email: "scammer@spam.com", plan: "Free", status: "Suspended", credits: "0", nodes: 0, joined: "Mar 01, 2026" },
];

export default function AdminPage() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-[#0a0a0f]">
        <AppSidebar />
        <SidebarInset className="bg-background">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b border-border/50 px-4 backdrop-blur-md bg-background/80 sticky top-0 z-50">
            <SidebarTrigger className="-ml-1" />
            <div className="h-4 w-px bg-border/50 mx-2" />
            <div className="flex-1">
              <h1 className="font-headline font-bold text-xl tracking-tight uppercase text-primary">Industrial Command Console</h1>
              <p className="text-[9px] text-muted-foreground uppercase font-bold tracking-widest">Global Grid Governance & User Management</p>
            </div>
          </header>

          <main className="p-6 md:p-8 space-y-8">
            {/* Global Stats */}
            <div className="grid gap-6 md:grid-cols-4">
              <AdminStat icon={Globe} label="Global Network Nodes" value="1,420" sub="+42 Today" />
              <AdminStat icon={Cpu} label="Total AI Inference" value="842K" sub="Operations/mo" />
              <AdminStat icon={Database} label="Asset Volume" value="12.4TB" sub="Storage utilized" />
              <AdminStat icon={Zap} label="Monthly Revenue" value="$84,250" sub="Industrial MRR" />
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-6">
                <Card className="bg-card border-border/50 shadow-xl">
                  <CardHeader className="flex flex-row items-center justify-between pb-6">
                    <div className="space-y-1">
                      <CardTitle className="font-headline text-lg uppercase tracking-tight">Active Deployments</CardTitle>
                      <CardDescription className="text-[10px] font-bold uppercase tracking-widest">Managing 1,240 Workspace Instances</CardDescription>
                    </div>
                    <div className="relative w-64">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground" />
                      <Input placeholder="Search UID or Email..." className="pl-8 bg-secondary/30 h-9 text-xs border-border/50 font-mono" />
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader className="bg-secondary/10">
                        <TableRow className="border-border/50">
                          <TableHead className="text-[10px] font-black uppercase tracking-widest h-10 px-6">Account ID</TableHead>
                          <TableHead className="text-[10px] font-black uppercase tracking-widest h-10">Industrial Tier</TableHead>
                          <TableHead className="text-[10px] font-black uppercase tracking-widest h-10">Quota Status</TableHead>
                          <TableHead className="text-[10px] font-black uppercase tracking-widest h-10">Nodes</TableHead>
                          <TableHead className="text-[10px] font-black uppercase tracking-widest h-10 text-right px-6">Control</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {MOCK_USERS.map((user) => (
                          <TableRow key={user.id} className="border-border/50 hover:bg-secondary/5 transition-colors">
                            <TableCell className="px-6 py-4">
                              <p className="text-xs font-bold text-foreground">{user.email}</p>
                              <p className="text-[9px] font-mono text-muted-foreground uppercase">{user.id}</p>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className={cn(
                                "text-[8px] uppercase tracking-widest font-black",
                                user.plan === 'Empire' ? 'border-primary text-primary bg-primary/5' : 'border-white/10 text-muted-foreground'
                              )}>
                                {user.plan}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <StatusDot status={user.status} />
                                <span className="text-[10px] font-bold uppercase tracking-tighter">{user.status}</span>
                              </div>
                            </TableCell>
                            <TableCell className="font-mono text-[10px] text-muted-foreground">{user.nodes}</TableCell>
                            <TableCell className="text-right px-6">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-secondary">
                                    <MoreHorizontal className="w-4 h-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="bg-popover border-border p-1">
                                  <DropdownMenuItem className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                                    <ExternalLink className="w-3 h-3" /> View Workspace
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 text-primary">
                                    <Zap className="w-3 h-3" /> Grant Credits
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 text-destructive">
                                    <Ban className="w-3 h-3" /> Kill Session
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="bg-card border-border/50 shadow-md">
                  <CardHeader className="bg-primary/5 py-4 border-b border-border/50">
                    <CardTitle className="text-[10px] font-bold uppercase text-primary flex items-center gap-2 tracking-widest">
                      <Activity className="w-3 h-3" /> Grid Health
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-4">
                    <HealthItem label="Render_Node_Cluster" status="Nominal" value="100%" />
                    <HealthItem label="Suno_API_Bridge" status="Nominal" value="98.4%" />
                    <HealthItem label="Firestore_Index_Sync" status="Nominal" value="100%" />
                    <HealthItem label="GCS_Asset_Bucket" status="Nominal" value="99.9%" />
                  </CardContent>
                </Card>

                <Card className="bg-card border-border/50 shadow-md">
                  <CardHeader className="bg-secondary/10 py-4 border-b border-border/50">
                    <CardTitle className="text-[10px] font-bold uppercase text-muted-foreground flex items-center gap-2 tracking-widest">
                      <ShieldCheck className="w-3 h-3" /> Admin Protocols
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-3">
                    <Button variant="outline" className="w-full text-[10px] font-bold uppercase h-10 border-border/50">Reset Monthly Quotas</Button>
                    <Button variant="outline" className="w-full text-[10px] font-bold uppercase h-10 border-border/50">Force Index Update</Button>
                    <Button variant="outline" className="w-full text-[10px] font-bold uppercase h-10 border-border/50">Prune Suspended Assets</Button>
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

function AdminStat({ icon: Icon, label, value, sub }: any) {
  return (
    <Card className="bg-card border-border/50 shadow-md">
      <CardContent className="p-6 space-y-2">
        <div className="flex items-center gap-2">
          <Icon className="w-3 h-3 text-primary" />
          <span className="text-[9px] font-black uppercase text-muted-foreground tracking-widest">{label}</span>
        </div>
        <p className="text-3xl font-headline font-bold">{value}</p>
        <p className="text-[10px] text-green-500 font-bold uppercase tracking-tight">{sub}</p>
      </CardContent>
    </Card>
  );
}

function StatusDot({ status }: { status: string }) {
  const colors: any = {
    Active: "bg-green-500",
    Warning: "bg-amber-500",
    Suspended: "bg-red-500"
  };
  return <div className={cn("w-1.5 h-1.5 rounded-full shadow-[0_0_10px_rgba(var(--tw-gradient-stops),0.5)]", colors[status] || "bg-muted")} />;
}

function HealthItem({ label, status, value }: any) {
  return (
    <div className="flex items-center justify-between p-3 rounded-xl bg-secondary/30 border border-border/50">
      <div className="space-y-0.5">
        <p className="text-[9px] font-black uppercase text-muted-foreground tracking-tighter">{label}</p>
        <p className="text-[10px] font-bold text-green-500 uppercase">{status}</p>
      </div>
      <span className="text-xs font-mono font-bold">{value}</span>
    </div>
  );
}