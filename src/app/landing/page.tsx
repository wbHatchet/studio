
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Zap, Cpu, TrendingUp, BarChart3, ArrowRight, ShieldCheck, Globe, Rocket } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white selection:bg-primary/30">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 border-b border-white/5 backdrop-blur-md bg-[#0a0a0f]/80">
        <div className="max-w-7xl mx-auto h-16 flex items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
              <Rocket className="w-5 h-5 text-background" />
            </div>
            <span className="font-headline font-bold text-lg uppercase tracking-tight">AI Empire</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">Features</Link>
            <Link href="/pricing" className="text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">Pricing</Link>
            <Link href="/auth" className="text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">Sign In</Link>
            <Link href="/auth">
              <Button size="sm" className="bg-primary text-background font-bold uppercase text-[10px] tracking-widest px-6 h-9">Get Started</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-40 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <Badge variant="outline" className="border-primary/20 bg-primary/5 text-primary py-1 px-4 text-[10px] uppercase font-bold tracking-[0.2em] animate-pulse">
            The 2026 YouTube Automation Standard
          </Badge>
          <h1 className="text-5xl md:text-7xl font-headline font-bold tracking-tighter uppercase leading-[0.9]">
            Build Your <span className="text-primary italic">Autonomous</span> <br /> Media Empire.
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            Industrial-scale YouTube automation driven by a 12-agent AI cluster. Ingest topics via Excel, generate content, and dominate niches automatically.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/auth">
              <Button className="bg-primary text-background font-bold h-14 px-10 text-base uppercase tracking-widest shadow-[0_0_30px_rgba(var(--primary),0.3)] hover:scale-105 transition-all">
                Launch My Factory <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Button variant="outline" className="border-white/10 h-14 px-10 text-base uppercase tracking-widest hover:bg-white/5">
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-headline font-bold text-primary tracking-tighter">84.2M</div>
            <div className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest mt-2">Network Reach</div>
          </div>
          <div>
            <div className="text-4xl font-headline font-bold text-primary tracking-tighter">104</div>
            <div className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest mt-2">Active Channels</div>
          </div>
          <div>
            <div className="text-4xl font-headline font-bold text-primary tracking-tighter">9,000+</div>
            <div className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest mt-2">Monthly Videos</div>
          </div>
          <div>
            <div className="text-4xl font-headline font-bold text-primary tracking-tighter">$1M+</div>
            <div className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest mt-2">Rev Potential</div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section id="features" className="py-32 px-6">
        <div className="max-w-7xl mx-auto space-y-20">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-headline font-bold uppercase tracking-tighter">Industrial Workflow Agents</h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm">Everything you need to scale from 1 to 100 channels without touching an editor.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={Cpu} 
              title="12-Agent Cluster" 
              desc="Trend scans, viral scripts, music gen, and automated rendering nodes working in sync."
            />
            <FeatureCard 
              icon={TrendingUp} 
              title="Retention Engine" 
              desc="Drop-off analysis and pattern-interrupt insertion to maximize Average View Duration."
            />
            <FeatureCard 
              icon={Zap} 
              title="FFmpeg Loops" 
              desc="Industrial-grade rendering pipeline creating 3-hour loops from 2-minute AI audio nodes."
            />
            <FeatureCard 
              icon={Globe} 
              title="Cross-Platform Distro" 
              desc="Autonomous clips for TikTok, Reels, and Pinterest to loop traffic back to your empire."
            />
            <FeatureCard 
              icon={ShieldCheck} 
              title="Factory QC" 
              desc="Automated copyright scans and visual check gates before any video goes live."
            />
            <FeatureCard 
              icon={BarChart3} 
              title="Revenue Optimizer" 
              desc="Tracks RPM across AdSense, Affiliates, and Spotify to maximize your bottom line."
            />
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-32 px-6 bg-primary/5 border-y border-primary/10">
        <div className="max-w-7xl mx-auto text-center space-y-12">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-5xl font-headline font-bold uppercase tracking-tighter">Scale Your Output</h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm">Industrial plans for serious creators ready to build a media monopoly.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <PricingPreviewCard plan="Starter" price="$19" credits="5,000" channels="3" />
            <PricingPreviewCard plan="Pro" price="$49" credits="20,000" channels="10" featured />
            <PricingPreviewCard plan="Empire" price="$99" credits="60,000" channels="50" />
          </div>
          <div className="pt-8">
            <Link href="/pricing">
              <Button variant="link" className="text-primary font-bold uppercase tracking-widest text-[10px]">View Full Feature Comparison <ArrowRight className="ml-2 w-3 h-3" /></Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-white/5 text-center">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex items-center justify-center gap-3">
            <Rocket className="w-6 h-6 text-primary" />
            <span className="font-headline font-bold text-xl uppercase tracking-tight">AI Empire</span>
          </div>
          <p className="text-muted-foreground text-xs uppercase font-bold tracking-widest">© 2026 AI Empire Industrial. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, desc }: any) {
  return (
    <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-primary/30 transition-all group">
      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <h3 className="text-lg font-headline font-bold uppercase mb-3 tracking-tight">{title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
    </div>
  );
}

function PricingPreviewCard({ plan, price, credits, channels, featured }: any) {
  return (
    <div className={`p-8 rounded-3xl border ${featured ? 'border-primary bg-primary/5 shadow-[0_0_40px_rgba(var(--primary),0.1)]' : 'border-white/10 bg-[#0a0a0f]'} text-left space-y-6 relative overflow-hidden`}>
      {featured && <div className="absolute top-4 right-4 bg-primary text-background text-[8px] font-black uppercase px-3 py-1 rounded-full tracking-widest">Popular</div>}
      <div>
        <div className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest mb-1">{plan}</div>
        <div className="text-4xl font-headline font-bold">{price}<span className="text-sm font-normal text-muted-foreground">/mo</span></div>
      </div>
      <ul className="space-y-3 text-xs text-muted-foreground font-medium uppercase tracking-tight">
        <li className="flex items-center gap-2"><Zap className="w-3 h-3 text-primary" /> {credits} Monthly Credits</li>
        <li className="flex items-center gap-2"><Zap className="w-3 h-3 text-primary" /> {channels} Channel Nodes</li>
        <li className="flex items-center gap-2"><Zap className="w-3 h-3 text-primary" /> 20-Agent Pipeline</li>
      </ul>
      <Link href="/auth" className="block">
        <Button className={`w-full font-bold uppercase text-[10px] tracking-widest h-11 ${featured ? 'bg-primary text-background' : 'bg-white/10 hover:bg-white/20'}`}>Get Started</Button>
      </Link>
    </div>
  );
}
