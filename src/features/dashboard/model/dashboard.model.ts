export type MachineStatus = 'available' | 'in-use' | 'finishing-soon';

export type MachineType = 'washer' | 'dryer';

export interface BranchOption {
  id: string;
  name: string;
  address: string;
  contactNumber: string;
  supportsBulkPickup: boolean;
}

export interface MachineItem {
  id: string;
  label: string;
  type: MachineType;
  status: MachineStatus;
  locationId: string;
  loadSize: 'small' | 'medium' | 'large';
  etaLabel: string | null;
  notifyEnabled: boolean;
}

export interface PricingItem {
  id: string;
  category: string;
  serviceLabel: string;
  description: string;
  priceLabel: string;
}

export interface ContactPanelContent {
  title: string;
  description: string;
  primaryActionLabel: string;
  secondaryActionLabel: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  eyebrow: string;
  description: string;
}

export interface ProcessStep {
  id: string;
  title: string;
  description: string;
}

export interface TrustMetric {
  id: string;
  label: string;
  value: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  context: string;
}

export interface DashboardViewState {
  selectedLocationId: string;
  selectedMachineType: MachineType | 'all';
  activeNotifyMachineIds: string[];
}

export const DASHBOARD_BRANCHES: BranchOption[] = [
  {
    id: 'branch-a',
    name: 'AlphaExplora - Branch A',
    address: '123 Aurora Blvd, Quezon City',
    contactNumber: '+63 912 345 6789',
    supportsBulkPickup: true,
  },
  {
    id: 'branch-b',
    name: 'AlphaExplora - Branch B',
    address: '45 Katipunan Ave, Quezon City',
    contactNumber: '+63 917 555 0198',
    supportsBulkPickup: true,
  },
  {
    id: 'branch-c',
    name: 'AlphaExplora - Branch C',
    address: '78 Taft Ave, Manila',
    contactNumber: '+63 998 110 2233',
    supportsBulkPickup: false,
  },
];

export const DASHBOARD_MACHINES: MachineItem[] = [
  {
    id: 'washer-01',
    label: 'Washer 01',
    type: 'washer',
    status: 'available',
    locationId: 'branch-a',
    loadSize: 'medium',
    etaLabel: null,
    notifyEnabled: false,
  },
  {
    id: 'washer-02',
    label: 'Washer 02',
    type: 'washer',
    status: 'in-use',
    locationId: 'branch-a',
    loadSize: 'large',
    etaLabel: '22 min remaining',
    notifyEnabled: false,
  },
  {
    id: 'dryer-01',
    label: 'Dryer 01',
    type: 'dryer',
    status: 'finishing-soon',
    locationId: 'branch-a',
    loadSize: 'large',
    etaLabel: '5 min remaining',
    notifyEnabled: false,
  },
  {
    id: 'washer-03',
    label: 'Washer 03',
    type: 'washer',
    status: 'available',
    locationId: 'branch-b',
    loadSize: 'small',
    etaLabel: null,
    notifyEnabled: false,
  },
  {
    id: 'dryer-02',
    label: 'Dryer 02',
    type: 'dryer',
    status: 'in-use',
    locationId: 'branch-b',
    loadSize: 'medium',
    etaLabel: '14 min remaining',
    notifyEnabled: false,
  },
  {
    id: 'washer-04',
    label: 'Washer 04',
    type: 'washer',
    status: 'finishing-soon',
    locationId: 'branch-c',
    loadSize: 'large',
    etaLabel: '8 min remaining',
    notifyEnabled: false,
  },
];

export const DASHBOARD_PRICING: PricingItem[] = [
  {
    id: 'wash-shirts',
    category: 'Wash & Fold',
    serviceLabel: 'Shirts',
    description: 'Everyday garments, sorted and folded.',
    priceLabel: 'PHP 80',
  },
  {
    id: 'wash-medium',
    category: 'Wash & Fold',
    serviceLabel: 'Medium Load',
    description: 'Mixed garments, towels, and daily laundry.',
    priceLabel: 'PHP 120',
  },
  {
    id: 'wash-large',
    category: 'Wash & Fold',
    serviceLabel: 'Large Load',
    description: 'Beddings, bulk garments, and heavy items.',
    priceLabel: 'PHP 160',
  },
  {
    id: 'dry-clean-shirt',
    category: 'Dry-Cleaning',
    serviceLabel: 'Shirt',
    description: 'Pressed and finished for formal wear.',
    priceLabel: 'PHP 95',
  },
  {
    id: 'dry-clean-jacket',
    category: 'Dry-Cleaning',
    serviceLabel: 'Suit Jacket',
    description: 'Careful handling for lined garments.',
    priceLabel: 'PHP 240',
  },
  {
    id: 'dry-clean-dress',
    category: 'Dry-Cleaning',
    serviceLabel: 'Dress',
    description: 'Delicate garment cleaning and finishing.',
    priceLabel: 'PHP 260',
  },
  {
    id: 'iron-shirt',
    category: 'Ironing',
    serviceLabel: 'Shirt',
    description: 'Pressed and hanger-ready.',
    priceLabel: 'PHP 45',
  },
  {
    id: 'iron-pants',
    category: 'Ironing',
    serviceLabel: 'Pants',
    description: 'Crisp finish for daily wear.',
    priceLabel: 'PHP 55',
  },
  {
    id: 'pickup-service',
    category: 'Pickup Service',
    serviceLabel: 'Scheduled Pickup',
    description: 'Branch-coordinated pickup and return.',
    priceLabel: 'From PHP 120',
  },
];

export const DASHBOARD_CONTACT_PANEL: ContactPanelContent = {
  title: 'Book a bulk laundry pickup',
  description:
    'Reach the branch team for pickup scheduling, commercial loads, or large-batch laundry coordination.',
  primaryActionLabel: 'Book pickup',
  secondaryActionLabel: 'Call branch',
};

export const DASHBOARD_SERVICES: ServiceItem[] = [
  {
    id: 'self-service',
    eyebrow: 'In-Store',
    title: 'Self Service',
    description:
      'Walk in, claim an open machine, and finish your laundry in a calm, well-managed branch environment.',
  },
  {
    id: 'wash-fold',
    eyebrow: 'Popular',
    title: 'Wash & Fold',
    description:
      'Drop off your garments and let the staff handle sorting, washing, drying, and folding for you.',
  },
  {
    id: 'pickup-delivery',
    eyebrow: 'Doorstep',
    title: 'Pickup & Delivery',
    description:
      'Schedule collection from home or work and get fresh laundry returned on your preferred time slot.',
  },
  {
    id: 'commercial',
    eyebrow: 'Business',
    title: 'Commercial Laundry',
    description:
      'Consistent high-volume care for cafés, salons, rentals, and neighborhood businesses that need fast turnover.',
  },
];

export const DASHBOARD_PROCESS_STEPS: ProcessStep[] = [
  {
    id: 'book',
    title: 'Book',
    description: 'Choose a branch, select a service, and reserve a pickup or arrival window in seconds.',
  },
  {
    id: 'collect',
    title: 'We Collect',
    description: 'Our team confirms your request and handles pickup coordination when delivery is needed.',
  },
  {
    id: 'clean',
    title: 'We Clean',
    description: 'Laundry is processed with careful sorting, load handling, and service-specific finishing.',
  },
  {
    id: 'deliver',
    title: 'We Deliver',
    description: 'Get your fresh laundry back on time, folded and ready for your next day.',
  },
];

export const DASHBOARD_TRUST_METRICS: TrustMetric[] = [
  {
    id: 'families',
    label: 'Local families served weekly',
    value: '180+',
  },
  {
    id: 'turnaround',
    label: 'Same-day turnaround slots',
    value: '24',
  },
  {
    id: 'pickup',
    label: 'Pickup coverage across branches',
    value: '3 Zones',
  },
];

export const DASHBOARD_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'testimonial-1',
    quote:
      'The branch status view saves me the commute guesswork. I check the machines, drop off when it is quiet, and I am out fast.',
    author: 'Mara S.',
    context: 'Weekly customer, Branch A',
  },
];

export const DEFAULT_DASHBOARD_VIEW_STATE: DashboardViewState = {
  selectedLocationId: DASHBOARD_BRANCHES[0].id,
  selectedMachineType: 'all',
  activeNotifyMachineIds: [],
};
