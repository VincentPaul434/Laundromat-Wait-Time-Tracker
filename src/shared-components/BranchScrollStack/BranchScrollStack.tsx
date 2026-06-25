import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, ChevronRight, Clock, MapPin, Phone, Truck, WashingMachine, Wind } from "lucide-react";
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
  const branchMachines = machines.filter((m) => m.locationId === locationId);
  return {
    total: branchMachines.length,
    available: branchMachines.filter((m) => m.status === "available").length,
    inUse: branchMachines.filter((m) => m.status === "in-use").length,
    finishingSoon: branchMachines.filter((m) => m.status === "finishing-soon").length,
    washers: branchMachines.filter((m) => m.type === "washer").length,
    dryers: branchMachines.filter((m) => m.type === "dryer").length,
  };
}

const BRANCH_THEMES = [
  {
    activeBorder: "border-sky-300",
    ring: "ring-sky-200/70",
    accent: "bg-sky-500",
    text: "text-sky-700",
    badge: "bg-sky-100 text-sky-700 border-sky-200",
  },
  {
    activeBorder: "border-amber-300",
    ring: "ring-amber-200/70",
    accent: "bg-amber-500",
    text: "text-amber-700",
    badge: "bg-amber-100 text-amber-700 border-amber-200",
  },
  {
    activeBorder: "border-emerald-300",
    ring: "ring-emerald-200/70",
    accent: "bg-emerald-500",
    text: "text-emerald-700",
    badge: "bg-emerald-100 text-emerald-700 border-emerald-200",
  },
] as const;

function MachineStatusRow({ machine }: { machine: MachineItem }) {
  const meta = {
    available: { dot: "bg-emerald-500", label: "Ready now", cls: "text-emerald-700" },
    "in-use": { dot: "bg-amber-500", label: machine.etaLabel ?? "In use", cls: "text-amber-700" },
    "finishing-soon": { dot: "bg-sky-500", label: machine.etaLabel ?? "Almost done", cls: "text-sky-700" },
  }[machine.status];

  return (
    <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm shadow-slate-200/40">
      <div className="flex items-center gap-2.5">
        {machine.type === "washer" ? (
          <WashingMachine className="size-4 shrink-0 text-slate-500" />
        ) : (
          <Wind className="size-4 shrink-0 text-slate-500" />
        )}
        <div>
          <p className="text-sm font-semibold leading-none text-foreground">{machine.label}</p>
          <p className="mt-1 text-xs capitalize text-muted-foreground">{machine.loadSize} load</p>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <span className={`size-2 rounded-full ${meta.dot}`} />
        <span className={`text-xs font-semibold ${meta.cls}`}>{meta.label}</span>
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
  const [expandedId, setExpandedId] = useState<string | null>(selectedLocationId);

  const handleSelect = (branchId: string) => {
    setExpandedId((current) => (current === branchId ? null : branchId));
    onLocationChange(branchId);
  };

  return (
    <div className="w-full space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Choose a branch</p>
          <p className="mt-1 text-sm leading-6 text-slate-700">
            Open a branch card to see the quick guide, live counts, and machine list.
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-100 bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700">
          <span className="size-1.5 animate-pulse rounded-full bg-emerald-500" />
          {branches.length} open
        </span>
      </div>

      <div className="space-y-3">
        {branches.map((branch, index) => {
          const theme = BRANCH_THEMES[index % BRANCH_THEMES.length];
          const summary = getBranchSummary(machines, branch.id);
          const isSelected = selectedLocationId === branch.id;
          const isExpanded = expandedId === branch.id;
          const availPct = summary.total > 0 ? Math.round((summary.available / summary.total) * 100) : 0;
          const branchMachines = machines.filter((m) => m.locationId === branch.id);

          return (
            <motion.div key={branch.id} layout transition={{ type: "spring", stiffness: 340, damping: 30 }}>
              <button
                type="button"
                onClick={() => handleSelect(branch.id)}
                className={`w-full rounded-2xl border bg-white p-4 text-left transition-all duration-200 ${
                  isSelected ? `${theme.activeBorder} shadow-md ring-2 ${theme.ring}` : "border-slate-200 hover:border-slate-300 hover:shadow-sm"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`mt-1 min-h-[2.75rem] w-1 shrink-0 self-stretch rounded-full ${theme.accent}`} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold leading-snug text-foreground">{branch.name}</p>
                        <p className="mt-1 flex items-center gap-1 text-[11px] text-muted-foreground">
                          <MapPin className="size-3 shrink-0" />
                          <span className="truncate">{branch.address}</span>
                        </p>
                      </div>

                      <div className="flex shrink-0 items-center gap-2">
                        <div className="text-right">
                          <p className={`text-lg font-extrabold leading-none tabular-nums ${theme.text}`}>
                            {summary.available}
                            <span className="text-xs font-medium text-muted-foreground">/{summary.total}</span>
                          </p>
                          <p className="text-[10px] font-medium text-muted-foreground">free</p>
                        </div>
                        <motion.div animate={{ rotate: isExpanded ? 90 : 0 }} transition={{ duration: 0.2 }}>
                          <ChevronRight className="size-4 text-muted-foreground" />
                        </motion.div>
                      </div>
                    </div>

                    <div className="mt-3 space-y-1.5">
                      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
                        <motion.div
                          className={`h-full rounded-full ${theme.accent}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${availPct}%` }}
                          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: index * 0.05 }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-[11px] font-medium text-muted-foreground">
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1">
                            <WashingMachine className="size-3" />
                            {summary.washers}
                          </span>
                          <span className="flex items-center gap-1">
                            <Wind className="size-3" />
                            {summary.dryers}
                          </span>
                        </div>
                        <span>{availPct}% available</span>
                      </div>
                    </div>

                    {isSelected && !isExpanded && (
                      <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className="mt-3 flex flex-wrap items-center gap-1.5">
                        <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${theme.badge}`}>
                          <CheckCircle2 className="size-3" />
                          Viewing below
                        </span>
                        {branch.supportsBulkPickup && (
                          <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${theme.badge}`}>
                            <Truck className="size-3" />
                            Bulk pickup
                          </span>
                        )}
                      </motion.div>
                    )}
                  </div>
                </div>
              </button>

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
                    <div className="mt-2 rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5">
                      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                        <div className="space-y-1">
                          <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                            Live machines - {branch.name}
                          </p>
                          <p className="text-sm leading-6 text-slate-600">
                            Green means ready now, amber means currently running, and blue means almost done.
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          {branch.supportsBulkPickup && (
                            <span className={`flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${theme.badge}`}>
                              <Truck className="size-3" />
                              Bulk pickup
                            </span>
                          )}
                          <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
                            <span className="size-1.5 animate-pulse rounded-full bg-emerald-500" />
                            Live
                          </span>
                        </div>
                      </div>

                      <div className="mb-4 grid gap-2 sm:grid-cols-3">
                        {[
                          { label: "Available", value: summary.available, cls: "border-emerald-200 bg-emerald-100 text-emerald-700" },
                          { label: "In Use", value: summary.inUse, cls: "border-amber-200 bg-amber-100 text-amber-700" },
                          { label: "Finishing", value: summary.finishingSoon, cls: "border-sky-200 bg-sky-100 text-sky-700" },
                        ].map(({ label, value, cls }) => (
                          <div key={label} className={`rounded-2xl border p-3 text-center ${cls}`}>
                            <p className="text-xl font-extrabold leading-none tabular-nums">{value}</p>
                            <p className="mt-1 text-[11px] font-semibold opacity-80">{label}</p>
                          </div>
                        ))}
                      </div>

                      <div className="space-y-2">
                        {branchMachines.map((machine) => (
                          <MachineStatusRow key={machine.id} machine={machine} />
                        ))}
                      </div>

                      <div className="mt-4 flex flex-col gap-2 border-t border-slate-200 pt-4 sm:flex-row sm:items-center sm:gap-4">
                        <a
                          href={`tel:${branch.contactNumber}`}
                          className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground"
                        >
                          <Phone className="size-3.5" />
                          {branch.contactNumber}
                        </a>
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                          <Clock className="size-3.5" />
                          8am - 8pm
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
