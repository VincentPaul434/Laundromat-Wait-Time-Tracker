import { useEffect, useMemo, useState, type FormEvent } from 'react';

import {
  DASHBOARD_BRANCHES,
  DASHBOARD_CONTACT_PANEL,
  DASHBOARD_MACHINES,
  DASHBOARD_PROCESS_STEPS,
  DASHBOARD_PRICING,
  DASHBOARD_SERVICES,
  DASHBOARD_TESTIMONIALS,
  DASHBOARD_TRUST_METRICS,
  DEFAULT_PICKUP_REQUEST_FIELD_ERRORS,
  DEFAULT_PICKUP_REQUEST_FORM_VALUES,
  DEFAULT_DASHBOARD_VIEW_STATE,
  type BranchOption,
  type ContactPanelContent,
  type MachineItem,
  type MachineStatus,
  type MachineType,
  type ProcessStep,
  type PickupRequestFieldErrors,
  type PickupRequestFormValues,
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
  isPickupModalOpen: boolean;
  pickupFormValues: PickupRequestFormValues;
  pickupFormErrors: PickupRequestFieldErrors;
  isSubmittingPickupRequest: boolean;
  summary: {
    total: number;
    available: number;
    inUse: number;
    finishingSoon: number;
  };
  onLocationChange: (locationId: string) => void;
  onMachineTypeChange: (machineType: MachineType | 'all') => void;
  onNotifyToggle: (machineId: string) => void;
  onOpenPickupModal: () => void;
  onClosePickupModal: () => void;
  onPickupFieldChange: (field: keyof PickupRequestFormValues, value: string) => void;
  onSubmitPickupRequest: (event: FormEvent<HTMLFormElement>) => void;
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
  const [isPickupModalOpen, setIsPickupModalOpen] = useState<boolean>(false);
  const [pickupFormValues, setPickupFormValues] = useState<PickupRequestFormValues>(
    DEFAULT_PICKUP_REQUEST_FORM_VALUES,
  );
  const [pickupFormErrors, setPickupFormErrors] = useState<PickupRequestFieldErrors>(
    DEFAULT_PICKUP_REQUEST_FIELD_ERRORS,
  );
  const [isSubmittingPickupRequest, setIsSubmittingPickupRequest] = useState<boolean>(false);

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

  const onOpenPickupModal = (): void => {
    setIsPickupModalOpen(true);
  };

  const onClosePickupModal = (): void => {
    setIsPickupModalOpen(false);
    setIsSubmittingPickupRequest(false);
    setPickupFormErrors(DEFAULT_PICKUP_REQUEST_FIELD_ERRORS);
  };

  const onPickupFieldChange = (field: keyof PickupRequestFormValues, value: string): void => {
    setPickupFormValues((currentValues) => ({
      ...currentValues,
      [field]: value,
    }));

    setPickupFormErrors((currentErrors) => ({
      ...currentErrors,
      [field]: '',
    }));
  };

  const onSubmitPickupRequest = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const nextErrors: PickupRequestFieldErrors = {
      name: pickupFormValues.name.trim() ? '' : 'Please enter your name.',
      phone: pickupFormValues.phone.trim().length >= 7 ? '' : 'Please enter a valid phone number.',
      pickupDate: pickupFormValues.pickupDate.trim() ? '' : 'Please choose a pickup date.',
      loadSize: pickupFormValues.loadSize.trim() ? '' : 'Please select a load size.',
      address: pickupFormValues.address.trim() ? '' : 'Please enter your pickup address.',
    };

    setPickupFormErrors(nextErrors);

    if (Object.values(nextErrors).some(Boolean)) {
      return;
    }

    setIsSubmittingPickupRequest(true);

    window.setTimeout(() => {
      setIsSubmittingPickupRequest(false);
      setIsPickupModalOpen(false);
      setPickupFormValues(DEFAULT_PICKUP_REQUEST_FORM_VALUES);
      setPickupFormErrors(DEFAULT_PICKUP_REQUEST_FIELD_ERRORS);
    }, 500);
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
    isPickupModalOpen,
    pickupFormValues,
    pickupFormErrors,
    isSubmittingPickupRequest,
    summary,
    onLocationChange,
    onMachineTypeChange,
    onNotifyToggle,
    onOpenPickupModal,
    onClosePickupModal,
    onPickupFieldChange,
    onSubmitPickupRequest,
  };
}
