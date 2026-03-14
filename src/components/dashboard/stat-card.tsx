
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendType?: "positive" | "negative";
  className?: string;
}

export function StatCard({ label, value, icon: Icon, trend, trendType, className }: StatCardProps) {
  return (
    <Card className={cn("bg-card border-border shadow-md", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{label}</p>
            <h3 className="text-3xl font-headline font-bold mt-1">{value}</h3>
            {trend && (
              <p className={cn(
                "text-xs mt-2 font-medium",
                trendType === "positive" ? "text-green-500" : "text-destructive"
              )}>
                {trendType === "positive" ? "+" : ""}{trend} from last week
              </p>
            )}
          </div>
          <div className="p-3 bg-primary/10 rounded-xl">
            <Icon className="h-6 w-6 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
