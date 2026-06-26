// ============================================================
// REDESIGNED: StatusSummary — "Live Status Overview" panel
// Cleaner hierarchy, radial availability ring, machine type
// breakdown bar, and a real-time feel with pulsing indicators.
// ============================================================

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Clock, MapPin, PlayCircle, WashingMachine, Wind } from "lucide-react";
import { AnimatedCounter } from "../AnimatedCounter/AnimatedCounter";

interface StatusSummaryProps {
  branchName: string;
  total: number;
  available: number;
  inUse: number;
  finishingSoon: number;
}

// Mini arc SVG — availability as a ring segment
function AvailabilityRing({ pct }: { pct: number }) {
  const r = 36;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;

  const color =
    pct >= 60
      ? { stroke: "#10b981", track: "#d1fae5", label: "text-emerald-700" }
      : pct >= 30
      ? { stroke: "#f59e0b", track: "#fef3c7", label: "text-amber-700" }
      : { stroke: "#ef4444", track: "#fee2e2", label: "text-red-600" };

  return (
    <div className="relative flex items-center justify-center" style={{ width: 96, height: 96 }}>
      <svg width={96} height={96} viewBox="0 0 96 96" className="-rotate-90">
        {/* Track */}
        <circle cx={48} cy={48} r={r} fill="none" stroke={color.track} strokeWidth={9} />
        {/* Progress */}
        <motion.circle
          cx={48}
          cy={48}
          r={r}
          fill="none"
          stroke={color.stroke}
          strokeWidth={9}
          strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: circ - dash }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`text-xl font-extrabold tabular-nums ${color.label}`}>{pct}%</span>
        <span className="text-[10px] font-semibold text-muted-foreground leading-tight">free</span>
      </div>
    </div>
  );
}

// Horizontal proportion bar
function ProportionBar({
  available,
  inUse,
  finishingSoon,
  total,
}: {
  available: number;
  inUse: number;
  finishingSoon: number;
  total: number;
}) {
  if (total === 0) return null;
  const avPct = (available / total) * 100;
  const iuPct = (inUse / total) * 100;
  const fsPct = (finishingSoon / total) * 100;

  return (
    <div className="flex h-2 w-full overflow-hidden rounded-full bg-muted/60 gap-0.5">
      {avPct > 0 && (
        <motion.div
          className="h-full rounded-l-full bg-emerald-500"
          initial={{ width: 0 }}
          animate={{ width: `${avPct}%` }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />
      )}
      {iuPct > 0 && (
        <motion.div
          className="h-full bg-amber-400"
          initial={{ width: 0 }}
          animate={{ width: `${iuPct}%` }}
          transition={{ duration: 0.8, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
        />
      )}
      {fsPct > 0 && (
        <motion.div
          className="h-full rounded-r-full bg-sky-400"
          initial={{ width: 0 }}
          animate={{ width: `${fsPct}%` }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        />
      )}
    </div>
  );
}

export function StatusSummary({
  branchName,
  total,
  available,
  inUse,
  finishingSoon,
}: StatusSummaryProps): JSX.Element {
  const availPct = total > 0 ? Math.round((available / total) * 100) : 0;

  const stats = [
    {
      label: "Available",
      value: available,
      icon: CheckCircle2,
      bg: "bg-emerald-50 border-emerald-100",
      iconCls: "text-emerald-600",
      valCls: "text-emerald-700",
      dot: "bg-emerald-500",
      pulse: true,
    },
    {
      label: "In Use",
      value: inUse,
      icon: PlayCircle,
      bg: "bg-amber-50 border-amber-100",
      iconCls: "text-amber-600",
      valCls: "text-amber-700",
      dot: "bg-amber-500",
      pulse: false,
    },
    {
      label: "Finishing Soon",
      value: finishingSoon,
      icon: Clock,
      bg: "bg-sky-50 border-sky-100",
      iconCls: "text-sky-600",
      valCls: "text-sky-700",
      dot: "bg-sky-400",
      pulse: true,
    },
  ] as const;

  return (
    <div className="flex flex-col gap-4 h-full min-h-[460px] rounded-[1.8rem] border border-border bg-card p-6 shadow-sm">

      {/* ── Header ── */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-1">
            Live Status Overview
          </p>
          <AnimatePresence mode="wait">
            <motion.p
              key={branchName}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              className="flex items-center gap-1.5 text-sm font-semibold text-foreground"
            >
              <MapPin className="size-3.5 text-primary shrink-0" />
              {branchName}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Live pulse badge */}
        <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-100 px-3 py-1 text-[11px] font-bold text-emerald-700 shrink-0">
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
            <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
          </span>
          Live
        </span>
      </div>

      {/* ── Ring + Total ── */}
      <div className="flex items-center gap-5 py-1">
        <AvailabilityRing pct={availPct} />
        <div>
          <p className="text-4xl font-extrabold tabular-nums text-foreground leading-none">
            <AnimatedCounter value={total} />
          </p>
          <p className="text-sm text-muted-foreground mt-1 font-medium">total machines</p>
          <div className="flex items-center gap-3 mt-3">
            <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              <WashingMachine className="size-3.5" /> Washers
            </div>
            <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              <Wind className="size-3.5" /> Dryers
            </div>
          </div>
        </div>
      </div>

      {/* ── Proportion bar ── */}
      <div className="space-y-2">
        <ProportionBar
          available={available}
          inUse={inUse}
          finishingSoon={finishingSoon}
          total={total}
        />
        <div className="flex items-center gap-4 text-[11px] font-semibold text-muted-foreground">
          <span className="flex items-center gap-1"><span className="size-2 rounded-full bg-emerald-500 inline-block" />Available</span>
          <span className="flex items-center gap-1"><span className="size-2 rounded-full bg-amber-400 inline-block" />In use</span>
          <span className="flex items-center gap-1"><span className="size-2 rounded-full bg-sky-400 inline-block" />Finishing</span>
        </div>
      </div>

      {/* ── Stat tiles ── */}
      <div className="grid grid-cols-3 gap-2 mt-1">
        {stats.map(({ label, value, icon: Icon, bg, iconCls, valCls, dot, pulse }) => (
          <div
            key={label}
            className={`flex flex-col gap-2 rounded-2xl border p-3.5 ${bg}`}
          >
            <div className="flex items-center gap-1.5">
              {pulse ? (
                <span className="relative flex size-2 shrink-0">
                  <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-60 ${dot}`} />
                  <span className={`relative inline-flex size-2 rounded-full ${dot}`} />
                </span>
              ) : (
                <span className={`size-2 rounded-full shrink-0 ${dot}`} />
              )}
              <Icon className={`size-3.5 ${iconCls}`} />
            </div>
            <p className={`text-2xl font-extrabold tabular-nums leading-none ${valCls}`}>
              <AnimatedCounter value={value} />
            </p>
            <p className="text-[11px] font-semibold text-muted-foreground leading-tight">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
