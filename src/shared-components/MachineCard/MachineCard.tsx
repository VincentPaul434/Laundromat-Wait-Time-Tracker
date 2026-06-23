import { Bell, Sparkles, TimerReset } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { MachineStatus } from '../../features/dashboard/model/dashboard.model';

interface MachineCardProps {
  id: string;
  label: string;
  typeLabel: string;
  status: MachineStatus;
  statusLabel: string;
  loadSizeLabel: string;
  etaLabel: string;
  notifyEnabled: boolean;
  onNotifyToggle: (machineId: string) => void;
}

export function MachineCard({
  id,
  label,
  typeLabel,
  status,
  statusLabel,
  loadSizeLabel,
  etaLabel,
  notifyEnabled,
  onNotifyToggle,
}: MachineCardProps): JSX.Element {
  const statusClasses: Record<MachineStatus, string> = {
    available: "border-primary text-primary",
    "in-use": "border-foreground text-foreground",
    "finishing-soon": "border-muted-foreground text-muted-foreground",
  };

  return (
    <Card
      aria-live="polite"
      data-status={status}
      className="group relative overflow-hidden rounded-none border-border bg-card shadow-none transition-colors hover:border-primary"
    >
      <CardHeader className="gap-4">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-muted-foreground">
              {typeLabel}
            </p>
            <CardTitle className="text-2xl font-black uppercase">{label}</CardTitle>
          </div>
          <Badge className={`${statusClasses[status]} rounded-none bg-transparent font-mono text-[10px] uppercase tracking-[0.2em]`} variant="outline">
            {statusLabel}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Sparkles className="size-4 text-foreground" />
          <span>{loadSizeLabel}</span>
        </div>
        <div className="flex items-center gap-2">
          <TimerReset className="size-4 text-foreground" />
          <span>{etaLabel}</span>
        </div>
      </CardContent>

      <CardFooter>
        <Button
          type="button"
          variant={notifyEnabled ? "secondary" : "default"}
          className="w-full rounded-none font-mono text-xs uppercase tracking-[0.18em]"
          onClick={() => onNotifyToggle(id)}
          aria-pressed={notifyEnabled}
        >
          <Bell className="size-4" />
          {notifyEnabled ? 'Notify Me Enabled' : 'Notify Me'}
        </Button>
      </CardFooter>
    </Card>
  );
}
