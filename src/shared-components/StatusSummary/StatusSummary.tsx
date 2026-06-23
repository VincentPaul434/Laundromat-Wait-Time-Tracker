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
    <Card aria-labelledby="status-summary-heading" className="rounded-none border-border bg-card shadow-none">
      <CardHeader className="gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <CardTitle id="status-summary-heading" className="text-2xl font-black uppercase">
            Live Status Overview
          </CardTitle>
          <p className="text-sm text-muted-foreground">{branchName}</p>
        </div>
        <Badge variant="outline" className="w-fit rounded-none px-3 py-1 font-mono text-xs uppercase tracking-[0.16em]">
          Mock Live Feed
        </Badge>
      </CardHeader>
      <CardContent>
        <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <li className="border border-border bg-muted/40 p-4">
            <p className="text-sm text-muted-foreground">Total Machines</p>
            <p className="mt-2 text-3xl font-semibold">{total}</p>
          </li>
          <li className="border border-border bg-background p-4">
            <p className="text-sm text-muted-foreground">Available</p>
            <p className="mt-2 text-3xl font-semibold">{available}</p>
          </li>
          <li className="border border-border bg-background p-4">
            <p className="text-sm text-muted-foreground">In Use</p>
            <p className="mt-2 text-3xl font-semibold">{inUse}</p>
          </li>
          <li className="border border-border bg-background p-4">
            <p className="text-sm text-muted-foreground">Finishing Soon</p>
            <p className="mt-2 text-3xl font-semibold">{finishingSoon}</p>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
}
