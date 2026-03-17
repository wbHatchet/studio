
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Rocket, Zap, Cpu, Globe, BarChart3, HelpCircle, ArrowRight } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const PLANS = [
  {
    name: "Starter",
    price: "$19",
    desc: "Perfect for testing 1-3 micro-niches.",
    features: [
      "5,000 Empire Credits",
      "3 Channel Node Slots",
      "Standard Render Priority",
      "Basic Retention Analytics",
      "Community Strategy Chat",
      "12-Agent Pipeline Access"
    ]
  },
  {
    name: "Pro",
    price: "$49",
    desc: "Industrial scaling for serious content farms.",
    featured: true,
    features: [
      "20,000 Empire Credits",
      "10 Channel Node Slots",
      "High-Priority Render Nodes",
      "Industrial Analytics Suite",
      "Priority Strategy Support",
      "Custom Filter Graph Logic",
      "FFmpeg High-Res Scaling"
    ]
  },
  {
    name: "Empire",
    price: "$99",
    desc: "Full autonomy for media monopolies.",
    features: [
      "60,000 Empire Credits",
      "50 Channel Node Slots",
      "Instant Render Nodes",
      "Enterprise Niche Scanning",
      "White-Glove Setup Support",
      "Bulk Excel Intake (Unlimited)",
      "API Direct Distribution"
    ]
  }
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white selection:bg-primary/30 pb-20">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 border-b border-white/5 backdrop-blur-md bg-[#0a0a0f]/80">
        <div className="max-w-7xl mx-auto h-16 flex items-center justify-between px-6">
          <Link href="/landing" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Rocket className="w-5 h-5 text-background" />
            </div>
            <span className="font-headline font-bold text-lg uppercase tracking-tight">AI Empire</span>
          </Link>
          <Link href="/auth">
            <Button size="sm" className="bg-primary text-background font-bold uppercase text-[10px] tracking-widest px-6 h-9">Sign In</Button>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-40 pb-20 px-6 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <Badge variant="outline" className="border-primary/20 bg-primary/5 text-primary py-1 px-4 text-[10px] uppercase font-bold tracking-[0.2em]">Scale My Output</Badge>
          <h1 className="text-5xl md:text-6xl font-headline font-bold tracking-tighter uppercase leading-none">Industrial <span className="text-primary italic">Scaling</span> Protocol.</h1>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg leading-relaxed">
            Choose the capacity required for your network velocity. From foundation to full operation.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="px-6 py-12">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          {PLANS.map((plan) => (
            <div key={plan.name} className={plan.featured ? 'scale-105 z-10' : ''}>
              <div className={`h-full p-8 rounded-[2.5rem] border transition-all ${plan.featured ? 'border-primary bg-primary/5 shadow-[0_0_50px_rgba(var(--primary),0.1)]' : 'border-white/10 bg-white/[0.02]'}`}>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-headline font-bold uppercase tracking-tight mb-2">{plan.name}</h3>
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest h-8">{plan.desc}</p>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-headline font-bold">{plan.price}</span>
                    <span className="text-sm font-bold text-muted-foreground uppercase tracking-widest">/Month</span>
                  </div>
                  <Link href="/auth" className="block">
                    <Button className={`w-full h-12 font-bold uppercase text-[10px] tracking-widest rounded-2xl ${plan.featured ? 'bg-primary text-background shadow-lg shadow-primary/20' : 'bg-white/10 hover:bg-white/20'}`}>
                      Deploy Protocol
                    </Button>
                  </Link>
                  <div className="pt-6 space-y-4">
                    <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest border-b border-white/5 pb-2">Industrial Specs</p>
                    <ul className="space-y-4">
                      {plan.features.map((feat) => (
                        <li key={feat} className="flex items-center gap-3 text-xs font-bold uppercase tracking-tight text-muted-foreground group">
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${plan.featured ? 'bg-primary/20 text-primary' : 'bg-white/5 text-muted-foreground'}`}>
                            <Check className="w-3 h-3" />
                          </div>
                          {feat}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-32 px-6 max-w-3xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl font-headline font-bold uppercase tracking-tighter">System Intelligence</h2>
          <p className="text-muted-foreground uppercase font-bold tracking-widest text-[10px]">Operations FAQ</p>
        </div>
        <Accordion type="single" collapsible className="space-y-4">
          <FaqItem 
            q="How are credits calculated?" 
            a="Credits are consumed by industrial operations: 1 batch of 10 hooks = 5 credits, 1 Suno audio generation = 10 credits, 1 high-res FFmpeg render = 20 credits." 
          />
          <FaqItem 
            q="Can I switch plans mid-cycle?" 
            a="Yes. Upgrades are immediate and prorated. Downgrades take effect at the end of your current deployment cycle." 
          />
          <FaqItem 
            q="What happens to unused credits?" 
            a="Credits reset at the start of each industrial cycle (monthly). Empire plans support credit rollover up to 20%." 
          />
          <FaqItem 
            q="Is there a limit on YouTube uploads?" 
            a="Your only limits are the YouTube Data API quotas and your account's node capacity. Pro plans support up to 10 uploads per node per day." 
          />
        </Accordion>
      </section>
    </div>
  );
}

function FaqItem({ q, a }: { q: string, a: string }) {
  return (
    <AccordionItem value={q} className="border border-white/5 bg-white/[0.02] rounded-3xl px-6">
      <AccordionTrigger className="text-sm font-bold uppercase tracking-tight hover:no-underline text-left py-6">
        {q}
      </AccordionTrigger>
      <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-6">
        {a}
      </AccordionContent>
    </AccordionItem>
  );
}
