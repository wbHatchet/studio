
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Rocket, Github, Mail, ArrowRight, Loader2, Play } from "lucide-react";
import { useAuth } from "@/firebase";
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  GoogleAuthProvider, 
  signInWithPopup 
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      router.push("/dashboard");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Auth Error",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push("/dashboard");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Google Auth Failed",
        description: error.message,
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center p-6 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-[#0a0a0f] to-[#0a0a0f]">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-4">
          <div className="inline-flex w-12 h-12 rounded-xl bg-primary items-center justify-center shadow-[0_0_30px_rgba(var(--primary),0.3)] mb-4">
            <Rocket className="w-6 h-6 text-background" />
          </div>
          <h1 className="text-3xl font-headline font-bold uppercase tracking-tighter">Initialize Empire</h1>
          <p className="text-muted-foreground text-sm font-medium uppercase tracking-widest">Connect to the industrial grid</p>
        </div>

        <Card className="bg-white/5 border-white/10 shadow-2xl backdrop-blur-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-lg uppercase font-headline">{isLogin ? "Welcome Back" : "Deploy New Account"}</CardTitle>
            <CardDescription className="text-[10px] font-bold uppercase tracking-widest">Secure Gateway Access</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="border-white/10 bg-white/5 text-[10px] font-bold uppercase tracking-widest h-11 hover:bg-white/10" onClick={handleGoogleSignIn}>
                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                Google
              </Button>
              <Button variant="outline" className="border-white/10 bg-white/5 text-[10px] font-bold uppercase tracking-widest h-11 hover:bg-white/10">
                <Github className="w-4 h-4 mr-2" />
                GitHub
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-white/5"></span></div>
              <div className="relative flex justify-center text-[8px] font-black uppercase"><span className="bg-[#0a0a0f] px-2 text-muted-foreground tracking-[0.3em]">OR VIA TERMINAL</span></div>
            </div>

            <form onSubmit={handleAuth} className="space-y-4">
              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Email Address</Label>
                <Input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/5 border-white/10 h-11 font-mono text-xs focus:border-primary" 
                  placeholder="admin@factory.ai" 
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Access Key</Label>
                <Input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-white/5 border-white/10 h-11 font-mono text-xs focus:border-primary" 
                  placeholder="••••••••" 
                  required 
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-primary text-background font-bold uppercase text-[10px] tracking-[0.2em] h-12 shadow-lg shadow-primary/10 hover:scale-[1.02] transition-all"
                disabled={loading}
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : (
                  <>Deploy Protocol <ArrowRight className="ml-2 w-4 h-4" /></>
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
            >
              {isLogin ? "Need new node? Register Here" : "Already active? Login System"}
            </button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
