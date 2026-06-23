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
    <section aria-labelledby="branch-selector-heading" className="grid gap-6 border-y border-border bg-card p-5 lg:grid-cols-[minmax(0,320px)_1fr]">
      <div className="space-y-3">
        <h2 id="branch-selector-heading" className="font-mono text-xs uppercase tracking-[0.3em]">
          Choose a Branch
        </h2>
        <p className="text-sm text-muted-foreground">
          Switch between laundromat locations and narrow the grid by machine type.
        </p>
      </div>

      <div className="grid gap-4">
        <div className="space-y-2">
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-foreground">Location</p>
          <Select value={selectedLocationId} onValueChange={onLocationChange}>
            <SelectTrigger className="w-full rounded-none border-primary/40 bg-background font-mono text-xs uppercase tracking-[0.14em]">
              <SelectValue placeholder="Select a branch" />
            </SelectTrigger>
            <SelectContent>
              {branches.map((branch) => (
                <SelectItem key={branch.id} value={branch.id}>
                  {branch.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-foreground">Machine Type</p>
          <Tabs value={selectedMachineType} onValueChange={(value) => onMachineTypeChange(value as MachineType | 'all')}>
            <TabsList className="grid w-full grid-cols-3 rounded-none">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="washer">Washers</TabsTrigger>
              <TabsTrigger value="dryer">Dryers</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
