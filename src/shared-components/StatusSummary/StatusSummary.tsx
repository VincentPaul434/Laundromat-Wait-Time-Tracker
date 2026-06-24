import { CheckCircle2, Clock, Hash, MapPin, PlayCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatusSummaryProps {
  branchName: string;
  total: number;
  available: number;
  inUse: number;
  finishingSoon: number;
}

export function StatusSummary({
  branchName,
  total,
  available,
  inUse,
  finishingSoon,
}: StatusSummaryProps): JSX.Element {
  return (
    <Card aria-labelledby="status-summary-heading" className="flex flex-col h-full rounded-3xl border-border/60 bg-card shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-3 sm:p-5">
      <CardHeader className="gap-4 sm:flex-row sm:items-start sm:justify-between pb-5">
        <div className="space-y-1.5">
          <CardTitle id="status-summary-heading" className="text-2xl font-bold tracking-tight">
            Live Status Overview
          </CardTitle>
          <div className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
            <MapPin className="size-3.5" />
            <p>{branchName}</p>
          </div>
        </div>
        
        <Badge variant="secondary" className="w-fit rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary border-0 flex items-center gap-2 shadow-sm hover:bg-primary/20 transition-colors">
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex size-2 rounded-full bg-primary"></span>
          </span>
          Mock Live Feed
        </Badge>
      </CardHeader>
      
      <CardContent className="mt-auto px-0 pb-0 pt-2">
        <ul className="grid gap-3 grid-cols-2">
          {/* Total Machines */}
          <li className="group flex flex-col justify-between rounded-2xl border border-border/50 bg-slate-50/50 p-5 transition-all hover:bg-slate-100/50 dark:bg-slate-900/20 dark:hover:bg-slate-900/40">
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <Hash className="size-4" />
              <p className="text-sm font-semibold">Total Machines</p>
            </div>
            <p className="mt-4 text-4xl font-extrabold text-slate-900 dark:text-slate-100">{total}</p>
          </li>
          
          {/* Available */}
          <li className="group flex flex-col justify-between rounded-2xl border border-emerald-200/50 bg-emerald-50/50 p-5 transition-all hover:bg-emerald-100/50 dark:border-emerald-900/30 dark:bg-emerald-900/10">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="size-4" />
              <p className="text-sm font-semibold">Available</p>
            </div>
            <p className="mt-4 text-4xl font-extrabold text-emerald-950 dark:text-emerald-100">{available}</p>
          </li>
          
          {/* In Use */}
          <li className="group flex flex-col justify-between rounded-2xl border border-amber-200/50 bg-amber-50/50 p-5 transition-all hover:bg-amber-100/50 dark:border-amber-900/30 dark:bg-amber-900/10">
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
              <PlayCircle className="size-4" />
              <p className="text-sm font-semibold">In Use</p>
            </div>
            <p className="mt-4 text-4xl font-extrabold text-amber-950 dark:text-amber-100">{inUse}</p>
          </li>
          
          {/* Finishing Soon */}
          <li className="group flex flex-col justify-between rounded-2xl border border-sky-200/50 bg-sky-50/50 p-5 transition-all hover:bg-sky-100/50 dark:border-sky-900/30 dark:bg-sky-900/10">
            <div className="flex items-center gap-2 text-sky-600 dark:text-sky-400">
              <Clock className="size-4" />
              <p className="text-sm font-semibold">Finishing Soon</p>
            </div>
            <p className="mt-4 text-4xl font-extrabold text-sky-950 dark:text-sky-100">{finishingSoon}</p>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
}