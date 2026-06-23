import { useEffect, useMemo, useState } from 'react';

import {
  DASHBOARD_BRANCHES,
  DASHBOARD_CONTACT_PANEL,
  DASHBOARD_MACHINES,
  DASHBOARD_PROCESS_STEPS,
  DASHBOARD_PRICING,
  DASHBOARD_SERVICES,
  DASHBOARD_TESTIMONIALS,
  DASHBOARD_TRUST_METRICS,
  DEFAULT_DASHBOARD_VIEW_STATE,
  type BranchOption,
  type ContactPanelContent,
  type MachineItem,
  type MachineStatus,
  type MachineType,
  type ProcessStep,
  type PricingItem,
  type ServiceItem,
  type TestimonialItem,
  type TrustMetric,
} from '../model/dashboard.model';

export interface MachineCardViewData {
  id: string;
  label: string;
  typeLabel: string;
  status: MachineStatus;
  statusLabel: string;
  loadSizeLabel: string;
  etaLabel: string;
  notifyEnabled: boolean;
}

export interface DashboardViewModel {
  pageTitle: string;
  pageSubtitle: string;
  branchOptions: BranchOption[];
  selectedLocationId: string;
  selectedMachineType: MachineType | 'all';
  selectedBranch: BranchOption;
  machineCards: MachineCardViewData[];
  pricingItems: PricingItem[];
  contactPanel: ContactPanelContent;
  serviceItems: ServiceItem[];
  processSteps: ProcessStep[];
  trustMetrics: TrustMetric[];
  testimonials: TestimonialItem[];
  summary: {
    total: number;
    available: number;
    inUse: number;
    finishingSoon: number;
  };
  onLocationChange: (locationId: string) => void;
  onMachineTypeChange: (machineType: MachineType | 'all') => void;
  onNotifyToggle: (machineId: string) => void;
}

const STATUS_LABELS: Record<MachineStatus, string> = {
  available: 'Available',
  'in-use': 'In Use',
  'finishing-soon': 'Finishing Soon',
};

const MACHINE_TYPE_LABELS: Record<MachineType, string> = {
  washer: 'Washer',
  dryer: 'Dryer',
};

const LOAD_SIZE_LABELS: Record<MachineItem['loadSize'], string> = {
  small: 'Small Load',
  medium: 'Medium Load',
  large: 'Large Load',
};

export function useDashboardViewModel(): DashboardViewModel {
  // ViewModel layer: owns UI state and interaction logic.
  const [selectedLocationId, setSelectedLocationId] = useState<string>(
    DEFAULT_DASHBOARD_VIEW_STATE.selectedLocationId,
  );
  const [selectedMachineType, setSelectedMachineType] = useState<MachineType | 'all'>(
    DEFAULT_DASHBOARD_VIEW_STATE.selectedMachineType,
  );
  const [machines, setMachines] = useState<MachineItem[]>(DASHBOARD_MACHINES);

  useEffect(() => {
    // ViewModel layer: simulates live-feeling status refresh from local/mock data.
    const intervalId = window.setInterval(() => {
      setMachines((currentMachines) =>
        currentMachines.map((machine) => {
          if (machine.status === 'in-use') {
            return { ...machine, status: 'finishing-soon' };
          }

          if (machine.status === 'finishing-soon') {
            return { ...machine, status: 'available', etaLabel: null };
          }

          return machine;
        }),
      );
    }, 30000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  const selectedBranch = useMemo<BranchOption>(() => {
    return (
      DASHBOARD_BRANCHES.find((branch) => branch.id === selectedLocationId) ?? DASHBOARD_BRANCHES[0]
    );
  }, [selectedLocationId]);

  const filteredMachines = useMemo<MachineItem[]>(() => {
    return machines.filter((machine) => {
      const matchesLocation = machine.locationId === selectedLocationId;
      const matchesType = selectedMachineType === 'all' || machine.type === selectedMachineType;

      return matchesLocation && matchesType;
    });
  }, [machines, selectedLocationId, selectedMachineType]);

  const summary = useMemo(() => {
    return {
      total: filteredMachines.length,
      available: filteredMachines.filter((machine) => machine.status === 'available').length,
      inUse: filteredMachines.filter((machine) => machine.status === 'in-use').length,
      finishingSoon: filteredMachines.filter((machine) => machine.status === 'finishing-soon').length,
    };
  }, [filteredMachines]);

  const machineCards = useMemo<MachineCardViewData[]>(() => {
    return filteredMachines.map((machine) => ({
      id: machine.id,
      label: machine.label,
      typeLabel: MACHINE_TYPE_LABELS[machine.type],
      status: machine.status,
      statusLabel: STATUS_LABELS[machine.status],
      loadSizeLabel: LOAD_SIZE_LABELS[machine.loadSize],
      etaLabel: machine.etaLabel ?? 'Ready now',
      notifyEnabled: machine.notifyEnabled,
    }));
  }, [filteredMachines]);

  const onLocationChange = (locationId: string): void => {
    setSelectedLocationId(locationId);
  };

  const onMachineTypeChange = (machineType: MachineType | 'all'): void => {
    setSelectedMachineType(machineType);
  };

  const onNotifyToggle = (machineId: string): void => {
    setMachines((currentMachines) =>
      currentMachines.map((machine) =>
        machine.id === machineId
          ? { ...machine, notifyEnabled: !machine.notifyEnabled }
          : machine,
      ),
    );
  };

  return {
    pageTitle: 'Laundromat Wait-Time Tracker',
    pageSubtitle:
      'Check branch availability, compare machine status, and plan your laundry trip before leaving home.',
    branchOptions: DASHBOARD_BRANCHES,
    selectedLocationId,
    selectedMachineType,
    selectedBranch,
    machineCards,
    pricingItems: DASHBOARD_PRICING,
    contactPanel: DASHBOARD_CONTACT_PANEL,
    serviceItems: DASHBOARD_SERVICES,
    processSteps: DASHBOARD_PROCESS_STEPS,
    trustMetrics: DASHBOARD_TRUST_METRICS,
    testimonials: DASHBOARD_TESTIMONIALS,
    summary,
    onLocationChange,
    onMachineTypeChange,
    onNotifyToggle,
  };
}
