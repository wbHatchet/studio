"use client";

import { useState } from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Plus, 
  ArrowRight, 
  Upload, 
  Settings2, 
  Rocket, 
  CheckCircle2, 
  Layout, 
  FileSpreadsheet,
  ChevronRight,
  ChevronLeft,
  Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

const NICHES = [
  { id: 'halloween', name: 'Halloween Lofi', icon: '🎃', sub: 'Cozy · Pumpkin Cafe' },
  { id: 'tokyo', name: 'Tokyo Night Lofi', icon: '🌃', sub: 'Dreamy · Rainy Street' },
  { id: 'ghibli', name: 'Studio Ghibli Lofi', icon: '🌿', sub: 'Peaceful · Forest Cottage' },
  { id: 'winter', name: 'Winter Cozy Lofi', icon: '❄️', sub: 'Warm · Fireplace' },
  { id: 'jazz', name: 'Midnight Jazz Cafe', icon: '🎷', sub: 'Sophisticated · Paris' },
  { id: 'space', name: 'Space & Stars Lofi', icon: '🌌', sub: 'Cosmic · Observatory' },
];

const STEPS = ["Pick Niche", "Upload Data", "Configure", "Launch"];

export default function NewProjectPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedNiche, setSelectedNiche] = useState('halloween');
  const [isLaunching, setIsLaunching] = useState(false);
  const { toast } = useToast();

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, STEPS.length - 1));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0));

  const handleLaunch = async () => {
    setIsLaunching(true);
    // Industrial logic: Triggering Zapper Deployment sequence
    setTimeout(() => {
      toast({
        title: "Zapper Deployment Triggered",
        description: "Industrial grid dispatching 13 agents via Zapper Deploy protocol.",
      });
      window.location.href = '/review';
    }, 1500);
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        <SidebarInset className="bg-background">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b border-border/50 px-4">
            <SidebarTrigger className="-ml-1" />
            <div className="h-4 w-px bg-border/50 mx-2" />
            <div className="flex-1">
              <h1 className="font-headline font-bold text-xl tracking-tight text-primary">New Project</h1>
              <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest italic">Create an automated lofi YouTube channel</p>
            </div>
          </header>

          <main className="p-6 md:p-8 max-w-4xl mx-auto w-full space-y-8">
            {/* TABS INDICATOR */}
            <div className="flex bg-secondary/50 rounded-xl p-1">
              {STEPS.map((step, idx) => (
                <div 
                  key={step}
                  className={cn(
                    "flex-1 py-2 text-[10px] font-bold uppercase tracking-widest text-center rounded-lg transition-all",
                    currentStep === idx ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"
                  )}
                >
                  {idx + 1} · {step}
                </div>
              ))}
            </div>

            {/* STEP 0: PICK NICHE */}
            {currentStep === 0 && (
              <div className="space-y-6">
                <div className="text-xs font-bold uppercase text-muted-foreground tracking-widest">Choose your channel niche</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {NICHES.map(niche => (
                    <Card 
                      key={niche.id}
                      onClick={() => setSelectedNiche(niche.id)}
                      className={cn(
                        "cursor-pointer transition-all hover:border-primary/50",
                        selectedNiche === niche.id ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-border/50"
                      )}
                    >
                      <CardContent className="p-4 flex flex-col items-center text-center">
                        <span className="text-3xl mb-3">{niche.icon}</span>
                        <p className="text-xs font-bold">{niche.name}</p>
                        <p className="text-[10px] text-muted-foreground mt-1">{niche.sub}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <div className="flex justify-end pt-4">
                  <Button onClick={nextStep} className="bg-primary text-primary-foreground font-bold uppercase text-[10px] h-10 px-8">
                    Continue <ChevronRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* STEP 1: UPLOAD EXCEL */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div 
                  className="border-2 border-dashed border-border/50 rounded-2xl p-12 text-center hover:bg-secondary/20 transition-all cursor-pointer group"
                  onClick={nextStep}
                >
                  <FileSpreadsheet className="w-10 h-10 mx-auto mb-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  <p className="text-sm font-bold">Drop your Excel file here</p>
                  <p className="text-[10px] text-muted-foreground mt-2 uppercase tracking-widest">.xlsx · .xls · .csv — columns: theme, mood, scene, title</p>
                </div>
                <div className="flex justify-between pt-4">
                  <Button variant="ghost" onClick={prevStep} className="text-[10px] font-bold uppercase">Back</Button>
                  <Button onClick={nextStep} className="bg-primary text-primary-foreground font-bold uppercase text-[10px] h-10 px-8">
                    Skip — Use Preset
                  </Button>
                </div>
              </div>
            )}

            {/* STEP 2: CONFIGURE */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="text-[10px] uppercase font-bold text-muted-foreground">Video Duration</Label>
                    <Select defaultValue="1h">
                      <SelectTrigger className="bg-secondary/30">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30m">30 Minutes (~8 tracks)</SelectItem>
                        <SelectItem value="1h">1 Hour (~15 tracks)</SelectItem>
                        <SelectItem value="2h">2 Hours (~30 tracks)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] uppercase font-bold text-muted-foreground">Upload Schedule</Label>
                    <Select defaultValue="now">
                      <SelectTrigger className="bg-secondary/30">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="now">Upload immediately</SelectItem>
                        <SelectItem value="9pm">Tonight 9 PM</SelectItem>
                        <SelectItem value="8am">Tomorrow 8 AM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] uppercase font-bold text-muted-foreground">YouTube Channel ID</Label>
                    <Input placeholder="UCxxxxxxxxxxxxxxxx" className="bg-secondary/30 h-10" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] uppercase font-bold text-muted-foreground">Custom Title (Optional)</Label>
                    <Input placeholder="Halloween Lofi · Study Beats 2026" className="bg-secondary/30 h-10" />
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-secondary/30 border border-border/50 flex items-center gap-3">
                  <Checkbox id="auto-publish" />
                  <Label htmlFor="auto-publish" className="text-xs cursor-pointer">Auto-publish — skip approval gate and upload immediately</Label>
                </div>
                <div className="flex justify-between pt-4">
                  <Button variant="ghost" onClick={prevStep} className="text-[10px] font-bold uppercase">Back</Button>
                  <Button onClick={nextStep} className="bg-primary text-primary-foreground font-bold uppercase text-[10px] h-10 px-8">
                    Review & Launch <ChevronRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* STEP 3: LAUNCH */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <Card className="bg-card border-border/50 shadow-sm overflow-hidden">
                  <CardHeader className="bg-secondary/10 py-4">
                    <CardTitle className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Launch Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      <SummaryItem label="Niche" value={NICHES.find(n => n.id === selectedNiche)?.name + " " + NICHES.find(n => n.id === selectedNiche)?.icon} />
                      <SummaryItem label="Duration" value="1 hour" />
                      <SummaryItem label="Agents" value="13 agents" />
                      <SummaryItem label="Est. Time" value="10–20 min" />
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  <AgentTag label="Excel Parser" />
                  <AgentTag label="Branding" />
                  <AgentTag label="Music Prompts" />
                  <AgentTag label="Beat Gen" />
                  <AgentTag label="Arrangement" />
                  <AgentTag label="Visual Prompts" />
                  <AgentTag label="Image Gen" />
                  <AgentTag label="Animation" />
                  <AgentTag label="Video Composer" />
                  <AgentTag label="Metadata" />
                  <AgentTag label="QC Gate" />
                  <AgentTag label="Zapper Deploy" />
                  <AgentTag label="YT Upload" />
                </div>

                <div className="flex justify-between pt-4">
                  <Button variant="ghost" onClick={prevStep} className="text-[10px] font-bold uppercase">Back</Button>
                  <Button 
                    onClick={handleLaunch}
                    disabled={isLaunching}
                    className="bg-primary text-primary-foreground font-bold uppercase text-xs h-12 px-12 shadow-xl shadow-primary/20"
                  >
                    {isLaunching ? <Loader2 className="mr-2 w-4 h-4 animate-spin" /> : <Rocket className="mr-2 w-4 h-4" />}
                    Launch via Zapper
                  </Button>
                </div>
              </div>
            )}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

function SummaryItem({ label, value }: any) {
  return (
    <div>
      <p className="text-[9px] font-bold uppercase text-muted-foreground tracking-tighter mb-1">{label}</p>
      <p className="text-sm font-bold">{value}</p>
    </div>
  );
}

function AgentTag({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 p-3 rounded-lg bg-secondary/30 border border-border/50 text-[10px] font-medium">
      <CheckCircle2 className="w-3 h-3 text-green-500" />
      {label}
    </div>
  );
}
