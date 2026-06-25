// ============================================================
// REDESIGNED: BranchScrollStack — "Choose a Branch" selector
// Visual overhaul: card-style selector with rich preview panels,
// cleaner status readout, and a more spatial/premium feel.
// ============================================================

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  ChevronRight,
  Clock,
  MapPin,
  Phone,
  Truck,
  WashingMachine,
  Wind,
} from "lucide-react";
import type { BranchOption, MachineItem } from "../../features/dashboard/model/dashboard.model";

interface BranchSummary {
  total: number;
  available: number;
  inUse: number;
  finishingSoon: number;
  washers: number;
  dryers: number;
}

interface BranchScrollStackProps {
  branches: BranchOption[];
  machines: MachineItem[];
  selectedLocationId: string;
  onLocationChange: (locationId: string) => void;
}

function getBranchSummary(machines: MachineItem[], locationId: string): BranchSummary {
  const bm = machines.filter((m) => m.locationId === locationId);
  return {
    total: bm.length,
    available: bm.filter((m) => m.status === "available").length,
    inUse: bm.filter((m) => m.status === "in-use").length,
    finishingSoon: bm.filter((m) => m.status === "finishing-soon").length,
    washers: bm.filter((m) => m.type === "washer").length,
    dryers: bm.filter((m) => m.type === "dryer").length,
  };
}

// Each branch gets a distinct accent palette
const BRANCH_THEMES = [
  {
    light: "bg-sky-50",
    border: "border-sky-200",
    activeBorder: "border-sky-400",
    ring: "ring-sky-300/40",
    accent: "bg-sky-500",
    text: "text-sky-700",
    badge: "bg-sky-100 text-sky-700 border-sky-200",
    indicator: "bg-sky-500",
    dot: "bg-sky-400",
  },
  {
    light: "bg-violet-50",
    border: "border-violet-200",
    activeBorder: "border-violet-400",
    ring: "ring-violet-300/40",
    accent: "bg-violet-500",
    text: "text-violet-700",
    badge: "bg-violet-100 text-violet-700 border-violet-200",
    indicator: "bg-violet-500",
    dot: "bg-violet-400",
  },
  {
    light: "bg-emerald-50",
    border: "border-emerald-200",
    activeBorder: "border-emerald-400",
    ring: "ring-emerald-300/40",
    accent: "bg-emerald-500",
    text: "text-emerald-700",
    badge: "bg-emerald-100 text-emerald-700 border-emerald-200",
    indicator: "bg-emerald-500",
    dot: "bg-emerald-400",
  },
];

function MachineStatusRow({
  machine,
}: {
  machine: MachineItem;
}) {
  const meta = {
    available: { dot: "bg-emerald-500", label: "Ready", cls: "text-emerald-700" },
    "in-use": { dot: "bg-amber-500", label: machine.etaLabel ?? "In use", cls: "text-amber-700" },
    "finishing-soon": { dot: "bg-sky-400", label: machine.etaLabel ?? "Finishing", cls: "text-sky-700" },
  }[machine.status];

  return (
    <div className="flex items-center justify-between py-2 px-3 rounded-xl bg-white/70 border border-white/80">
      <div className="flex items-center gap-2.5">
        {machine.type === "washer" ? (
          <WashingMachine className="size-3.5 text-muted-foreground shrink-0" />
        ) : (
          <Wind className="size-3.5 text-muted-foreground shrink-0" />
        )}
        <div>
          <p className="text-xs font-semibold text-foreground leading-none">{machine.label}</p>
          <p className="text-[10px] text-muted-foreground capitalize mt-0.5">{machine.loadSize} load</p>
        </div>
      </div>
      <div className="flex items-center gap-1.5 shrink-0">
        <span className={`size-1.5 rounded-full ${meta.dot}`} />
        <span className={`text-[11px] font-semibold ${meta.cls}`}>{meta.label}</span>
      </div>
    </div>
  );
}

export function BranchScrollStack({
  branches,
  machines,
  selectedLocationId,
  onLocationChange,
}: BranchScrollStackProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const stackRef = useRef<HTMLDivElement>(null);

  const handleSelect = (branchId: string) => {
    const isExpanding = expandedId !== branchId;
    setExpandedId(isExpanding ? branchId : null);
    onLocationChange(branchId);
  };

  return (
    <div className="w-full space-y-5">

      {/* Section label */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
            Choose a branch
          </p>
          <p className="mt-0.5 text-sm font-medium text-foreground">
            Select to view live machine status
          </p>
        </div>
        <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-100 px-2.5 py-1 text-[11px] font-bold text-emerald-700">
          <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
          {branches.length} open
        </span>
      </div>

      {/* Branch cards */}
      <div ref={stackRef} className="space-y-2.5">
        {branches.map((branch, index) => {
          const theme = BRANCH_THEMES[index % BRANCH_THEMES.length];
          const summary = getBranchSummary(machines, branch.id);
          const isSelected = selectedLocationId === branch.id;
          const isExpanded = expandedId === branch.id;
          const availPct = summary.total > 0 ? Math.round((summary.available / summary.total) * 100) : 0;
          const branchMachines = machines.filter((m) => m.locationId === branch.id);

          return (
            <motion.div
              key={branch.id}
              layout
              transition={{ type: "spring", stiffness: 340, damping: 30 }}
            >
              {/* ── Branch selector card ── */}
              <button
                type="button"
                onClick={() => handleSelect(branch.id)}
                className={`
                  w-full text-left rounded-2xl border transition-all duration-200
                  ${isSelected
                    ? `${theme.light} ${theme.activeBorder} shadow-md ring-2 ${theme.ring}`
                    : `bg-card border-border hover:${theme.light} hover:${theme.border} hover:shadow-sm`
                  }
                `}
              >
                <div className="p-4">
                  <div className="flex items-start gap-3">
                    {/* Color accent strip */}
                    <div className={`mt-1 w-1 rounded-full shrink-0 self-stretch min-h-[2.5rem] ${theme.accent}`} />

                    {/* Branch info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="font-bold text-sm text-foreground leading-snug truncate">
                            {branch.name}
                          </p>
                          <p className="flex items-center gap-1 text-[11px] text-muted-foreground mt-0.5 truncate">
                            <MapPin className="size-3 shrink-0" />
                            {branch.address}
                          </p>
                        </div>

                        {/* Availability count + chevron */}
                        <div className="flex items-center gap-2 shrink-0">
                          <div className="text-right">
                            <p className={`text-lg font-extrabold leading-none tabular-nums ${theme.text}`}>
                              {summary.available}
                              <span className="text-xs font-medium text-muted-foreground">/{summary.total}</span>
                            </p>
                            <p className="text-[10px] text-muted-foreground font-medium">free</p>
                          </div>
                          <motion.div
                            animate={{ rotate: isExpanded ? 90 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronRight className="size-4 text-muted-foreground" />
                          </motion.div>
                        </div>
                      </div>

                      {/* Availability bar */}
                      <div className="mt-3 space-y-1">
                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-black/8">
                          <motion.div
                            className={`h-full rounded-full ${theme.accent}`}
                            initial={{ width: 0 }}
                            animate={{ width: `${availPct}%` }}
                            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: index * 0.05 }}
                          />
                        </div>
                        <div className="flex items-center justify-between text-[10px] text-muted-foreground font-medium">
                          <div className="flex items-center gap-3">
                            <span className="flex items-center gap-1">
                              <WashingMachine className="size-3" />{summary.washers}
                            </span>
                            <span className="flex items-center gap-1">
                              <Wind className="size-3" />{summary.dryers}
                            </span>
                          </div>
                          <span>{availPct}% available</span>
                        </div>
                      </div>

                      {/* Tags row */}
                      {isSelected && !isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-3 flex items-center gap-1.5"
                        >
                          <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${theme.badge}`}>
                            <CheckCircle2 className="size-3" /> Viewing below ↓
                          </span>
                          {branch.supportsBulkPickup && (
                            <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${theme.badge}`}>
                              <Truck className="size-3" /> Bulk pickup
                            </span>
                          )}
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>
              </button>

              {/* ── Expanded live panel ── */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    key="panel"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ type: "spring", stiffness: 280, damping: 28 }}
                    className="overflow-hidden"
                  >
                    <div className={`mt-1.5 rounded-2xl border p-4 ${theme.light} ${theme.border}`}>

                      {/* Panel header */}
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                          Live machines — {branch.name}
                        </p>
                        <div className="flex items-center gap-3">
                          {branch.supportsBulkPickup && (
                            <span className={`flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${theme.badge}`}>
                              <Truck className="size-3" /> Bulk pickup
                            </span>
                          )}
                          <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
                            <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live
                          </span>
                        </div>
                      </div>

                      {/* Status summary chips */}
                      <div className="grid grid-cols-3 gap-2 mb-3">
                        {[
                          { label: "Available", value: summary.available, cls: "bg-emerald-100 text-emerald-700 border-emerald-200" },
                          { label: "In Use", value: summary.inUse, cls: "bg-amber-100 text-amber-700 border-amber-200" },
                          { label: "Finishing", value: summary.finishingSoon, cls: "bg-sky-100 text-sky-700 border-sky-200" },
                        ].map(({ label, value, cls }) => (
                          <div key={label} className={`rounded-xl border text-center p-2.5 ${cls}`}>
                            <p className="text-xl font-extrabold tabular-nums leading-none">{value}</p>
                            <p className="text-[10px] font-semibold mt-1 opacity-80">{label}</p>
                          </div>
                        ))}
                      </div>

                      {/* Machine list */}
                      <div className="space-y-1">
                        {branchMachines.map((machine) => (
                          <MachineStatusRow key={machine.id} machine={machine} />
                        ))}
                      </div>

                      {/* Contact footer */}
                      <div className="mt-3 pt-3 border-t border-black/8 flex items-center gap-4">
                        <a
                          href={`tel:${branch.contactNumber}`}
                          className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <Phone className="size-3.5" />
                          {branch.contactNumber}
                        </a>
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                          <Clock className="size-3.5" />
                          8am – 8pm
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
