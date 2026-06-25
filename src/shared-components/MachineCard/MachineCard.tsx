// ============================================================
// REDESIGNED: MachineCard
// Cleaner layout, status-aware accent bars, better ETA display,
// and tighter visual hierarchy.
// ============================================================

import { AnimatePresence, motion } from "framer-motion";
import { Bell, BellRing, Loader2, Sparkles, Timer, WashingMachine, Wind } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { MachineStatus } from "../../features/dashboard/model/dashboard.model";

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

const STATUS_CONFIG: Record<
  MachineStatus,
  {
    accent: string;
    bg: string;
    badgeBg: string;
    badgeText: string;
    badgeBorder: string;
    dot: string;
    pulse: boolean;
    barColor: string;
    icon: React.ElementType;
  }
> = {
  available: {
    accent: "bg-emerald-500",
    bg: "bg-emerald-50/60",
    badgeBg: "bg-emerald-50",
    badgeText: "text-emerald-700",
    badgeBorder: "border-emerald-200",
    dot: "bg-emerald-500",
    pulse: true,
    barColor: "bg-emerald-400",
    icon: Sparkles,
  },
  "in-use": {
    accent: "bg-amber-500",
    bg: "bg-amber-50/50",
    badgeBg: "bg-amber-50",
    badgeText: "text-amber-700",
    badgeBorder: "border-amber-200",
    dot: "bg-amber-500",
    pulse: false,
    barColor: "bg-amber-400",
    icon: Loader2,
  },
  "finishing-soon": {
    accent: "bg-sky-400",
    bg: "bg-sky-50/60",
    badgeBg: "bg-sky-50",
    badgeText: "text-sky-700",
    badgeBorder: "border-sky-200",
    dot: "bg-sky-400",
    pulse: true,
    barColor: "bg-sky-400",
    icon: Timer,
  },
};

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
  const cfg = STATUS_CONFIG[status];
  const MachineIcon = typeLabel.toLowerCase().includes("dryer") ? Wind : WashingMachine;
  const StatusIcon = cfg.icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -3 }}
      className="h-full"
    >
      <div
        aria-live="polite"
        data-status={status}
        className={`relative h-full flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md`}
      >
        {/* Top accent bar — color encodes status at a glance */}
        <AnimatePresence mode="wait">
          <motion.div
            key={status}
            className={`absolute top-0 inset-x-0 h-1 ${cfg.accent}`}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.4 }}
          />
        </AnimatePresence>

        {/* Ambient tint */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={status}
            className={`pointer-events-none absolute inset-0 ${cfg.bg}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          />
        </AnimatePresence>

        {/* Content */}
        <div className="relative z-10 flex flex-col gap-4 p-5 flex-1">

          {/* ── Header: machine identity + status badge ── */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              {/* Machine type icon circle */}
              <div className="flex size-10 items-center justify-center rounded-xl border border-border bg-white/80 shrink-0">
                <MachineIcon className="size-4.5 text-foreground" />
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground leading-none">
                  {typeLabel}
                </p>
                <p className="text-lg font-bold text-foreground mt-0.5 leading-none">{label}</p>
              </div>
            </div>

            {/* Status badge */}
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={status}
                initial={{ opacity: 0, scale: 0.88 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.88 }}
                transition={{ duration: 0.2 }}
              >
                <span
                  className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-bold
                    ${cfg.badgeBg} ${cfg.badgeText} ${cfg.badgeBorder}`}
                >
                  <span className="relative flex size-1.5 shrink-0">
                    {cfg.pulse && (
                      <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-70 ${cfg.dot}`} />
                    )}
                    <span className={`relative inline-flex size-1.5 rounded-full ${cfg.dot}`} />
                  </span>
                  {statusLabel}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── Info row ── */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              <StatusIcon className={`size-3.5 ${status === "in-use" ? "animate-spin" : ""}`} />
              <span>{loadSizeLabel}</span>
            </div>

            {/* ETA */}
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={etaLabel}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-1.5 text-xs font-semibold text-foreground"
              >
                <Timer className="size-3.5 text-muted-foreground" />
                <span className="tabular-nums">{etaLabel}</span>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── ETA progress bar (shown for in-use / finishing-soon) ── */}
          {(status === "in-use" || status === "finishing-soon") && (
            <div className="space-y-1">
              <div className="h-1.5 w-full rounded-full bg-black/8 overflow-hidden">
                <motion.div
                  className={`h-full rounded-full ${cfg.barColor}`}
                  initial={{ width: "0%" }}
                  animate={{
                    width: status === "finishing-soon" ? "88%" : "45%",
                  }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
              <p className="text-[10px] text-muted-foreground text-right font-medium">
                {status === "finishing-soon" ? "Almost done" : "In progress"}
              </p>
            </div>
          )}

          {/* Spacer */}
          <div className="flex-1" />

          {/* ── Notify button ── */}
          <motion.div whileTap={{ scale: 0.97 }}>
            <Button
              type="button"
              variant={notifyEnabled ? "secondary" : "outline"}
              size="sm"
              className={`w-full rounded-xl text-xs font-bold transition-all ${
                notifyEnabled
                  ? "bg-primary/10 text-primary border-primary/20 hover:bg-primary/15"
                  : "bg-white/80 border-border hover:bg-muted/60"
              }`}
              onClick={() => onNotifyToggle(id)}
              aria-pressed={notifyEnabled}
            >
              <motion.span
                key={notifyEnabled ? "on" : "off"}
                initial={{ rotate: 0 }}
                animate={notifyEnabled ? { rotate: [0, -18, 18, -10, 10, 0] } : { rotate: 0 }}
                transition={{ duration: 0.4 }}
                className="mr-1.5"
              >
                {notifyEnabled ? (
                  <BellRing className="size-3.5" />
                ) : (
                  <Bell className="size-3.5" />
                )}
              </motion.span>
              {notifyEnabled ? "Notification on" : "Notify me when free"}
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
