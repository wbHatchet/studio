
"use client";

import { useState, useEffect, useRef } from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Send, Bot, User, Sparkles, Terminal, ChevronRight, History, Trash2, Loader2 } from "lucide-react";
import { useUser, useFirestore, useMemoFirebase, useCollection } from "@/firebase";
import { collection, addDoc, serverTimestamp, orderBy, query, limit } from "firebase/firestore";
import { cn } from "@/lib/utils";

export default function ChatPage() {
  const { user } = useUser();
  const db = useFirestore();
  const [input, setInp] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const messagesQuery = useMemoFirebase(() => {
    if (!db || !user) return null;
    return query(
      collection(db, "users", user.uid, "chatHistory"),
      orderBy("timestamp", "asc"),
      limit(50)
    );
  }, [db, user]);

  const { data: messages, isLoading } = useCollection(messagesQuery);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !user || !db) return;

    const userMsg = input;
    setInp("");
    setIsTyping(true);

    try {
      const chatRef = collection(db, "users", user.uid, "chatHistory");
      await addDoc(chatRef, {
        role: "user",
        content: userMsg,
        timestamp: serverTimestamp()
      });

      // Simulate AI response delay
      setTimeout(async () => {
        await addDoc(chatRef, {
          role: "assistant",
          content: `Protocol active. Regarding "${userMsg}", the trend analysis agent suggests targeting the "Dark Academia Study" niche. CPM potential is $12.40 with a current supply gap of 42%. Would you like to generate a batch of 10 hooks for this niche?`,
          timestamp: serverTimestamp()
        });
        setIsTyping(false);
      }, 1500);

    } catch (error) {
      console.error(error);
      setIsTyping(false);
    }
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-[#0a0a0f]">
        <AppSidebar />
        <SidebarInset className="bg-background flex flex-col">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b border-border/50 px-4 backdrop-blur-md bg-background/80 sticky top-0 z-50">
            <SidebarTrigger className="-ml-1" />
            <div className="h-4 w-px bg-border/50 mx-2" />
            <div className="flex-1">
              <h1 className="font-headline font-bold text-xl tracking-tight uppercase text-primary">AI Strategy Assistant</h1>
              <p className="text-[9px] text-muted-foreground uppercase font-bold tracking-widest">Powered by Claude 3.5 Sonnet · Industrial Intel</p>
            </div>
            <Badge variant="outline" className="text-[9px] font-bold uppercase tracking-widest border-primary/20 text-primary bg-primary/5">
              Credits: 13.6K Remaining
            </Badge>
          </header>

          <div className="flex-1 flex overflow-hidden">
            {/* Sidebar History */}
            <aside className="hidden lg:flex w-64 border-r border-border/50 flex-col bg-secondary/10">
              <div className="p-4 border-b border-border/50 flex items-center justify-between">
                <span className="text-[9px] font-black uppercase text-muted-foreground tracking-widest">Protocol History</span>
                <History className="w-3 h-3 text-muted-foreground" />
              </div>
              <ScrollArea className="flex-1">
                <div className="p-2 space-y-1">
                  <HistoryItem active title="OVO Vibes Niche" date="Today" />
                  <HistoryItem title="ADHD Focus Strategy" date="Yesterday" />
                  <HistoryItem title="100 Channel Scale" date="Mar 12" />
                  <HistoryItem title="FFmpeg Loop Config" date="Mar 10" />
                </div>
              </ScrollArea>
              <div className="p-4 border-t border-border/50">
                <Button variant="ghost" className="w-full justify-start text-xs text-muted-foreground hover:text-destructive">
                  <Trash2 className="w-3 h-3 mr-2" /> Clear All History
                </Button>
              </div>
            </aside>

            {/* Chat Area */}
            <main className="flex-1 flex flex-col relative min-w-0">
              <ScrollArea className="flex-1 p-4 md:p-8">
                <div className="max-w-3xl mx-auto space-y-8 pb-32">
                  {!messages?.length && !isLoading && (
                    <div className="text-center space-y-6 pt-20">
                      <div className="inline-flex w-16 h-16 rounded-3xl bg-primary/10 items-center justify-center mb-4">
                        <Terminal className="w-8 h-8 text-primary" />
                      </div>
                      <h2 className="text-2xl font-headline font-bold uppercase tracking-tighter">System Ready</h2>
                      <p className="text-muted-foreground text-sm max-w-sm mx-auto uppercase font-bold tracking-widest leading-relaxed">
                        Ask about niche selection, viral structures, or production scaling protocols.
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto pt-4">
                        <QuickPrompt text="What is the highest CPM niche right now?" />
                        <QuickPrompt text="Write a viral script for AI tools." />
                        <QuickPrompt text="How do I scale to 10 channels?" />
                        <QuickPrompt text="Best lofi background prompts." />
                      </div>
                    </div>
                  )}

                  {messages?.map((msg: any, idx: number) => (
                    <div key={idx} className={cn(
                      "flex gap-4 group animate-in fade-in slide-in-from-bottom-2 duration-300",
                      msg.role === 'user' ? "flex-row-reverse" : "flex-row"
                    )}>
                      <div className={cn(
                        "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border",
                        msg.role === 'user' ? "bg-secondary border-border" : "bg-primary/10 border-primary/20"
                      )}>
                        {msg.role === 'user' ? <User className="w-4 h-4 text-muted-foreground" /> : <Bot className="w-4 h-4 text-primary" />}
                      </div>
                      <div className={cn(
                        "space-y-2 max-w-[85%]",
                        msg.role === 'user' ? "text-right" : "text-left"
                      )}>
                        <div className={cn(
                          "p-4 rounded-2xl text-sm leading-relaxed",
                          msg.role === 'user' ? "bg-primary text-background font-bold" : "bg-secondary/30 border border-border/50 text-muted-foreground"
                        )}>
                          {msg.content}
                        </div>
                        <p className="text-[8px] font-black uppercase text-muted-foreground tracking-widest opacity-0 group-hover:opacity-100 transition-opacity px-1">
                          {msg.timestamp?.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                        <Loader2 className="w-4 h-4 text-primary animate-spin" />
                      </div>
                      <div className="bg-secondary/30 border border-border/50 p-4 rounded-2xl">
                        <span className="flex gap-1">
                          <span className="w-1 h-1 rounded-full bg-primary animate-bounce" />
                          <span className="w-1 h-1 rounded-full bg-primary animate-bounce delay-75" />
                          <span className="w-1 h-1 rounded-full bg-primary animate-bounce delay-150" />
                        </span>
                      </div>
                    </div>
                  )}
                  <div ref={scrollRef} />
                </div>
              </ScrollArea>

              {/* Input Overlay */}
              <div className="absolute bottom-0 w-full p-4 md:p-8 bg-gradient-to-t from-background via-background to-transparent pt-20">
                <form onSubmit={handleSend} className="max-w-3xl mx-auto relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-2xl blur opacity-25 group-focus-within:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative flex gap-2 p-2 rounded-2xl bg-secondary/50 border border-border/50 backdrop-blur-xl group-focus-within:border-primary/50 transition-colors">
                    <Input 
                      value={input}
                      onChange={(e) => setInp(e.target.value)}
                      placeholder="Ask the industrial core..."
                      className="bg-transparent border-none focus-visible:ring-0 font-medium text-sm placeholder:text-muted-foreground h-12"
                    />
                    <Button type="submit" size="icon" className="h-12 w-12 rounded-xl bg-primary text-background shadow-lg shadow-primary/20 hover:scale-105 transition-all">
                      <Send className="w-5 h-5" />
                    </Button>
                  </div>
                  <p className="text-center text-[8px] font-bold uppercase text-muted-foreground tracking-widest mt-3">
                    Claude 3.5 Protocol · Industrial Strategy Engine · Est Cost: 12 Credits
                  </p>
                </form>
              </div>
            </main>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

function HistoryItem({ title, date, active }: any) {
  return (
    <button className={cn(
      "w-full p-3 rounded-xl text-left transition-all group relative",
      active ? "bg-primary/10 border border-primary/20" : "hover:bg-secondary/50 border border-transparent"
    )}>
      <div className="flex justify-between items-start mb-1">
        <span className={cn("text-xs font-bold truncate pr-4", active ? "text-primary" : "text-foreground")}>{title}</span>
        <ChevronRight className={cn("w-3 h-3 text-muted-foreground transition-transform group-hover:translate-x-1", active && "text-primary")} />
      </div>
      <span className="text-[9px] font-bold uppercase text-muted-foreground tracking-widest">{date}</span>
    </button>
  );
}

function QuickPrompt({ text }: { text: string }) {
  return (
    <button className="p-3 rounded-xl border border-border/50 bg-secondary/20 hover:bg-secondary/50 transition-all text-xs text-muted-foreground text-left flex items-center justify-between group">
      <span className="truncate">{text}</span>
      <Sparkles className="w-3 h-3 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
    </button>
  );
}
