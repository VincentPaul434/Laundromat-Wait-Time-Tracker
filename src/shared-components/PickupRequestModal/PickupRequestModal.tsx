import type { FormEvent } from "react";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface PickupRequestModalProps {
  isOpen: boolean;
  values: {
    name: string;
    phone: string;
    pickupDate: string;
    loadSize: string;
    address: string;
  };
  errors: {
    name: string;
    phone: string;
    pickupDate: string;
    loadSize: string;
    address: string;
  };
  isSubmitting: boolean;
  onClose: () => void;
  onFieldChange: (field: 'name' | 'phone' | 'pickupDate' | 'loadSize' | 'address', value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

const loadSizeOptions = [
  'Small (1 hamper)',
  'Medium (2 hampers)',
  'Large (3+ hampers)',
];

export function PickupRequestModal({
  isOpen,
  values,
  errors,
  isSubmitting,
  onClose,
  onFieldChange,
  onSubmit,
}: PickupRequestModalProps): JSX.Element | null {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 bg-primary/45 sm:flex sm:items-center sm:justify-center sm:px-4 sm:py-6">
      <div className="flex min-h-dvh w-full flex-col bg-primary text-primary-foreground shadow-[0_18px_60px_rgba(31,47,79,0.34)] sm:mx-auto sm:min-h-0 sm:max-w-[460px] sm:border sm:border-primary/30">
        <div className="flex items-start justify-between gap-4 px-4 pb-4 pt-5 sm:p-5">
          <div className="space-y-2 pr-2">
            <p className="text-[11px] font-light uppercase tracking-[0.3em] text-primary-foreground/72">
              Skip the trip entirely
            </p>
            <h2 className="text-[1.75rem] font-black uppercase leading-[0.92] tracking-normal sm:text-4xl">
              Book a laundry pickup.
            </h2>
            <p className="max-w-md text-sm leading-5 text-primary-foreground/80 sm:leading-6">
              Got a mountain of clothes? We&apos;ll pick it up, wash it, fold it, and bring it back, no trips needed.
            </p>
          </div>

          <Button
            type="button"
            variant="ghost"
            className="mt-1 size-9 shrink-0 rounded-none p-0 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            onClick={onClose}
            aria-label="Close pickup request modal"
          >
            <X className="size-4" />
          </Button>
        </div>

        <form className="flex flex-1 flex-col overflow-hidden" onSubmit={onSubmit}>
          <div className="flex-1 space-y-4 overflow-y-auto px-4 pb-4 sm:px-5">
            <div className="space-y-1.5">
            <label className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-primary-foreground/70">
              Name
            </label>
            <Input
              value={values.name}
              placeholder="Your Name...."
              onChange={(event) => onFieldChange('name', event.target.value)}
              className="h-12 rounded-lg border-primary-foreground/18 bg-slate-950/28 px-4 text-base text-primary-foreground placeholder:text-primary-foreground/45 sm:text-sm"
            />
            {errors.name ? <p className="text-xs text-[#f7d7d7]">{errors.name}</p> : null}
            </div>

            <div className="space-y-1.5">
            <label className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-primary-foreground/70">
              Phone
            </label>
            <Input
              value={values.phone}
              placeholder="(555) 000-0000"
              onChange={(event) => onFieldChange('phone', event.target.value)}
              className="h-12 rounded-lg border-primary-foreground/18 bg-slate-950/28 px-4 text-base text-primary-foreground placeholder:text-primary-foreground/45 sm:text-sm"
            />
            {errors.phone ? <p className="text-xs text-[#f7d7d7]">{errors.phone}</p> : null}
            </div>

            <div className="space-y-1.5">
            <label className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-primary-foreground/70">
              Pickup Date
            </label>
            <Input
              type="date"
              value={values.pickupDate}
              onChange={(event) => onFieldChange('pickupDate', event.target.value)}
              className="h-12 rounded-lg border-primary-foreground/18 bg-slate-950/28 px-4 text-base text-primary-foreground sm:text-sm"
            />
            {errors.pickupDate ? <p className="text-xs text-[#f7d7d7]">{errors.pickupDate}</p> : null}
            </div>

            <div className="space-y-1.5">
            <label className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-primary-foreground/70">
              Load Size
            </label>
            <select
              value={values.loadSize}
              onChange={(event) => onFieldChange('loadSize', event.target.value)}
              className="h-12 w-full rounded-lg border border-primary-foreground/18 bg-slate-950/28 px-4 text-base text-primary-foreground outline-none sm:text-sm"
            >
              {loadSizeOptions.map((option) => (
                <option key={option} value={option} className="text-slate-950">
                  {option}
                </option>
              ))}
            </select>
            {errors.loadSize ? <p className="text-xs text-[#f7d7d7]">{errors.loadSize}</p> : null}
            </div>

            <div className="space-y-1.5">
            <label className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-primary-foreground/70">
              Address
            </label>
            <textarea
              value={values.address}
              placeholder="Your address..."
              onChange={(event) => onFieldChange('address', event.target.value)}
              className="min-h-[112px] w-full resize-none rounded-lg border border-primary-foreground/18 bg-slate-950/28 px-4 py-3 text-base text-primary-foreground outline-none placeholder:text-primary-foreground/45 sm:min-h-[92px] sm:text-sm"
            />
            {errors.address ? <p className="text-xs text-[#f7d7d7]">{errors.address}</p> : null}
            </div>
          </div>

          <div className="border-t border-primary-foreground/12 bg-primary px-4 pb-5 pt-4 sm:px-5">
            <Button
              type="submit"
              className="mx-auto flex h-14 w-full rounded-full bg-[#efe7d7] px-8 text-sm font-black uppercase tracking-[0.08em] text-primary hover:bg-[#e9e0ce] sm:min-w-[234px] sm:w-auto sm:text-base sm:tracking-normal"
            >
              {isSubmitting ? 'Requesting Pickup...' : 'Request Pickup'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
