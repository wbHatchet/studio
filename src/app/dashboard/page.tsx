
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { StatCard } from "@/components/dashboard/stat-card";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Video as VideoIcon, 
  BarChart3, 
  PlayCircle,
  Clock,
  CheckCircle2,
  AlertCircle,
  Radio
} from "lucide-react";
import { PerformanceChart } from "@/components/analytics/performance-chart";

export default function DashboardPage() {
  const activeJobs = [
    { id: 1, name: "Midnight Rain Mix #42", status: "Rendering", progress: 65, type: "Long Form" },
    { id: 2, name: "Sunset Lo-fi Shorts", status: "AI Prompting", progress: 30, type: "Shorts" },
    { id: 3, name: "Cozy Study Session LIVE", status: "Streaming", progress: 100, type: "24/7 Live" },
  ];

  const recentJobs = [
    { id: 4, name: "Halloween Lofi Beats", status: "Ready for review", date: "2h ago" },
    { id: 5, name: "Cyberpunk Night Walk", status: "Uploaded", date: "5h ago" },
    { id: 6, name: "Autumn Leaves Vol 2", status: "Scheduled", date: "1d ago" },
  ];

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <SidebarInset className="bg-background">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b border-border/50 px-4">
            <SidebarTrigger className="-ml-1" />
            <div className="h-4 w-px bg-border/50 mx-2" />
            <h1 className="font-headline font-bold text-xl">Factory Overview</h1>
          </header>
          
          <main className="flex-1 space-y-6 p-6 md:p-8">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <StatCard label="Total Views" value="1.2M" icon={BarChart3} trend="12.5%" trendType="positive" />
              <StatCard label="Active Channels" value="8" icon={RadioIcon} />
              <StatCard label="Videos Uploaded" value="142" icon={VideoIcon} trend="8" trendType="positive" />
              <StatCard label="Subscribers" value="48.5K" icon={Users} trend="1.2K" trendType="positive" />
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
              <Card className="lg:col-span-4 bg-card">
                <CardHeader>
                  <CardTitle className="font-headline">Views This Week</CardTitle>
                  <CardDescription>Audience engagement across all channels</CardDescription>
                </CardHeader>
                <CardContent>
                  <PerformanceChart />
                </CardContent>
              </Card>

              <Card className="lg:col-span-3 bg-card">
                <CardHeader>
                  <CardTitle className="font-headline">Active Jobs</CardTitle>
                  <CardDescription>Real-time production queue</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {activeJobs.map((job) => (
                      <div key={job.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 border border-border/50">
                        <div className="space-y-1">
                          <p className="text-sm font-semibold">{job.name}</p>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-[10px] h-4 bg-primary/10 text-primary border-primary/20">{job.type}</Badge>
                            <span className="text-xs text-muted-foreground">{job.status}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-bold text-primary">{job.progress}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-1">
               <Card className="bg-card">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="font-headline">Recent Jobs</CardTitle>
                    <CardDescription>Latest actions and completions</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {recentJobs.map((job) => (
                      <div key={job.id} className="flex flex-col gap-2 p-4 rounded-xl border border-border bg-secondary/30">
                        <div className="flex justify-between items-start">
                          <h4 className="font-semibold text-sm">{job.name}</h4>
                          <span className="text-[10px] text-muted-foreground">{job.date}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-auto">
                          {job.status === "Ready for review" ? (
                             <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 font-medium">
                               <AlertCircle className="w-3 h-3 mr-1" />
                               Ready for review
                             </Badge>
                          ) : job.status === "Uploaded" ? (
                             <Badge className="bg-green-500/20 text-green-400 border-green-500/30 font-medium">
                               <CheckCircle2 className="w-3 h-3 mr-1" />
                               Uploaded
                             </Badge>
                          ) : (
                             <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 font-medium">
                               <Clock className="w-3 h-3 mr-1" />
                               {job.status}
                             </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
          
          {/* Bottom Review Bar */}
          <div className="sticky bottom-4 mx-6 p-4 bg-primary text-primary-foreground rounded-2xl shadow-xl flex items-center justify-between animate-in slide-in-from-bottom-8 duration-500">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-full">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-sm">Action Needed</p>
                <p className="text-xs opacity-90">"Halloween Lofi" is ready for review before final publication.</p>
              </div>
            </div>
            <button className="px-6 py-2 bg-white text-primary text-sm font-bold rounded-lg hover:bg-opacity-90 transition-all">
              Review Now
            </button>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

function RadioIcon(props: any) {
  return <Radio {...props} />;
}
