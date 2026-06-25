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
  unit: string;
}

export interface ContactPanelContent {
  title: string;
  description: string;
  primaryActionLabel: string;
  secondaryActionLabel: string;
}

export interface PickupRequestFormValues {
  name: string;
  phone: string;
  pickupDate: string;
  loadSize: string;
  address: string;
}

export interface PickupRequestFieldErrors {
  name: string;
  phone: string;
  pickupDate: string;
  loadSize: string;
  address: string;
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
    id: 'wash-regular',
    category: 'Wash & Fold',
    serviceLabel: 'Regular',
    description: 'Everyday clothes, towels, and mixed garments.',
    priceLabel: 'PHP 65',
    unit: '/kg',
  },
  {
    id: 'wash-delicates',
    category: 'Wash & Fold',
    serviceLabel: 'Delicates',
    description: 'Gentle cycle for undergarments and thin fabrics.',
    priceLabel: 'PHP 80',
    unit: '/kg',
  },
  {
    id: 'wash-bulky',
    category: 'Wash & Fold',
    serviceLabel: 'Bulky Items',
    description: 'Beddings, duvets, curtains, and heavy loads.',
    priceLabel: 'PHP 90',
    unit: '/kg',
  },
  {
    id: 'dry-clean-standard',
    category: 'Dry-Cleaning',
    serviceLabel: 'Standard Garments',
    description: 'Shirts, blouses, and everyday formal pieces.',
    priceLabel: 'PHP 120',
    unit: '/kg',
  },
  {
    id: 'dry-clean-structured',
    category: 'Dry-Cleaning',
    serviceLabel: 'Structured Pieces',
    description: 'Suits, jackets, and lined or tailored clothing.',
    priceLabel: 'PHP 180',
    unit: '/kg',
  },
  {
    id: 'dry-clean-heavy',
    category: 'Dry-Cleaning',
    serviceLabel: 'Heavy Garments',
    description: 'Coats, thick dresses, and embellished items.',
    priceLabel: 'PHP 220',
    unit: '/kg',
  },
  {
    id: 'iron-light',
    category: 'Ironing',
    serviceLabel: 'Light Fabrics',
    description: 'Cotton shirts, linen, and lightweight pieces.',
    priceLabel: 'PHP 55',
    unit: '/kg',
  },
  {
    id: 'iron-heavy',
    category: 'Ironing',
    serviceLabel: 'Heavy Fabrics',
    description: 'Denim, uniforms, and thicker garments.',
    priceLabel: 'PHP 70',
    unit: '/kg',
  },
  {
    id: 'pickup-service',
    category: 'Pickup Service',
    serviceLabel: 'Scheduled Pickup',
    description: 'Branch-coordinated collection and return. Pricing applies on top of service rate.',
    priceLabel: 'From PHP 50',
    unit: '/trip',
  },
];

export const DASHBOARD_CONTACT_PANEL: ContactPanelContent = {
  title: 'Book a bulk laundry pickup',
  description:
    'Reach the branch team for pickup scheduling, commercial loads, or large-batch laundry coordination in one quick request.',
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
    description: 'Choose your branch and lock in a pickup or visit time in minutes.',
  },
  {
    id: 'collect',
    title: 'Collect',
    description: 'We confirm the request and handle collection details when pickup is needed.',
  },
  {
    id: 'clean',
    title: 'Clean',
    description: 'Your laundry is sorted, washed, dried, and finished with care.',
  },
  {
    id: 'deliver',
    title: 'Deliver',
    description: 'Fresh laundry comes back on time, folded and ready to go.',
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
  {
    id: 'testimonial-2',
    quote:
      'We run a small bed-and-breakfast and Washline handles all our linen pickups. The coordination is smooth — one call, confirmed slot, done.',
    author: 'Rodel T.',
    context: 'B&B owner, Katipunan',
  },
  {
    id: 'testimonial-3',
    quote:
      'Three kids, full-time job. I drop off a big load on Saturday morning and pick it up folded in the afternoon. It genuinely changed my weekends.',
    author: 'Jen A.',
    context: 'Wash & Fold regular, Branch B',
  },
  {
    id: 'testimonial-4',
    quote:
      'I appreciate that the prices are listed upfront. No surprises at pickup. That transparency is why I keep coming back.',
    author: 'Carlo M.',
    context: 'Monthly customer, Branch C',
  },
];

export const DEFAULT_DASHBOARD_VIEW_STATE: DashboardViewState = {
  selectedLocationId: DASHBOARD_BRANCHES[0].id,
  selectedMachineType: 'all',
  activeNotifyMachineIds: [],
};

export const DEFAULT_PICKUP_REQUEST_FORM_VALUES: PickupRequestFormValues = {
  name: '',
  phone: '',
  pickupDate: '',
  loadSize: 'Large (3+ hampers)',
  address: '',
};

export const DEFAULT_PICKUP_REQUEST_FIELD_ERRORS: PickupRequestFieldErrors = {
  name: '',
  phone: '',
  pickupDate: '',
  loadSize: '',
  address: '',
};
