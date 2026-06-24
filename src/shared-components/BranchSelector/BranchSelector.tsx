import { Building2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { BranchOption, MachineType } from '../../features/dashboard/model/dashboard.model';

interface BranchSelectorProps {
  branches: BranchOption[];
  selectedLocationId: string;
  selectedMachineType: MachineType | 'all';
  onLocationChange: (locationId: string) => void;
  onMachineTypeChange: (machineType: MachineType | 'all') => void;
}

export function BranchSelector({
  branches,
  selectedLocationId,
  selectedMachineType,
  onLocationChange,
  onMachineTypeChange,
}: BranchSelectorProps): JSX.Element {
  return (
    <section aria-labelledby="branch-selector-heading" className="relative flex flex-col rounded-3xl border border-border/60 bg-gradient-to-b from-card to-muted/20 p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] h-full overflow-hidden">
      {/* Subtle decorative background blur */}
      <div className="absolute -right-6 -top-6 size-32 rounded-full bg-primary/5 blur-3xl pointer-events-none" />

      <div className="space-y-3 relative z-10">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary shadow-inner">
            <Building2 className="size-5" />
          </div>
          <h2 id="branch-selector-heading" className="text-2xl font-bold tracking-tight text-foreground">
            Choose a Branch
          </h2>
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground max-w-sm">
          Switch between laundromat locations and narrow the grid by machine type.
        </p>
      </div>

      {/* Grouped controls inside a subtle well to balance the vertical space and anchor the UI */}
      <div className="mt-auto flex flex-col gap-6 rounded-[1.25rem] border border-border/50 bg-slate-50/50 p-5 dark:bg-slate-900/20 relative z-10 backdrop-blur-sm">
        <div className="space-y-2.5">
          <p className="text-sm font-semibold text-foreground">Location</p>
          <Select value={selectedLocationId} onValueChange={onLocationChange}>
            <SelectTrigger className="h-12 w-full rounded-xl border-border bg-background px-4 text-sm shadow-sm transition-all hover:border-primary/40 hover:bg-muted/30 focus:ring-primary/20">
              <SelectValue placeholder="Select a branch" />
            </SelectTrigger>
            <SelectContent className="rounded-xl shadow-xl">
              {branches.map((branch) => (
                <SelectItem 
                  key={branch.id} 
                  value={branch.id} 
                  className={`py-3 transition-colors ${branch.id === 'branch-a' ? 'font-bold text-foreground' : ''}`}
                >
                  {branch.name}
                  {branch.id === 'branch-a' && (
                    <span className="ml-2 inline-flex items-center justify-center rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary">
                      Main
                    </span>
                  )}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2.5">
          <p className="text-sm font-semibold text-foreground">Machine Type</p>
          <Tabs value={selectedMachineType} onValueChange={(value) => onMachineTypeChange(value as MachineType | 'all')}>
            <TabsList className="grid h-12 w-full grid-cols-3 rounded-xl bg-muted/80 p-1 shadow-inner">
              <TabsTrigger value="all" className="rounded-lg text-sm font-medium transition-all data-[state=active]:bg-background data-[state=active]:shadow-sm">All</TabsTrigger>
              <TabsTrigger value="washer" className="rounded-lg text-sm font-medium transition-all data-[state=active]:bg-background data-[state=active]:shadow-sm">Washers</TabsTrigger>
              <TabsTrigger value="dryer" className="rounded-lg text-sm font-medium transition-all data-[state=active]:bg-background data-[state=active]:shadow-sm">Dryers</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
    </section>
  );
}