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
    <div className="fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-sm sm:flex sm:items-center sm:justify-center sm:px-4 sm:py-6">
      {/* Added overflow-hidden here to prevent the footer background from bleeding out of the rounded corners */}
      <div className="flex min-h-dvh w-full flex-col bg-card text-card-foreground shadow-[0_24px_80px_rgba(15,23,42,0.28)] sm:mx-auto sm:min-h-0 sm:max-w-[460px] sm:rounded-2xl sm:border sm:border-border overflow-hidden">
        <div className="flex items-start justify-between gap-4 px-4 pb-4 pt-5 sm:p-5">
          <div className="space-y-2 pr-2">
            <p className="text-sm font-medium text-muted-foreground">
              Skip the trip entirely
            </p>
            <h2 className="text-2xl font-semibold leading-tight sm:text-3xl">
              Book a laundry pickup.
            </h2>
            <p className="max-w-md text-sm leading-6 text-muted-foreground">
              Got a mountain of clothes? We&apos;ll pick it up, wash it, fold it, and bring it back, no trips needed.
            </p>
          </div>
          <Button
            type="button"
            variant="ghost"
            className="mt-1 size-9 shrink-0 rounded-full p-0 text-muted-foreground hover:bg-muted hover:text-foreground"
            onClick={onClose}
            aria-label="Close pickup request modal"
          >
            <X className="size-4" />
          </Button>
        </div>

        <form className="flex flex-1 flex-col overflow-hidden" onSubmit={onSubmit}>
          <div className="flex-1 space-y-4 overflow-y-auto px-4 pb-4 sm:px-5">
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-foreground">
                Name
              </label>
              <Input
                value={values.name}
                placeholder="Your name"
                onChange={(event) => onFieldChange('name', event.target.value)}
                className="h-11 rounded-lg border-input bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground"
              />
              {errors.name ? <p className="text-sm text-destructive">{errors.name}</p> : null}
            </div>

            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-foreground">
                Phone
              </label>
              <Input
                value={values.phone}
                placeholder="(555) 000-0000"
                onChange={(event) => onFieldChange('phone', event.target.value)}
                className="h-11 rounded-lg border-input bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground"
              />
              {errors.phone ? <p className="text-sm text-destructive">{errors.phone}</p> : null}
            </div>

            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-foreground">
                Pickup Date
              </label>
              <Input
                type="date"
                value={values.pickupDate}
                onChange={(event) => onFieldChange('pickupDate', event.target.value)}
                className="h-11 rounded-lg border-input bg-background px-4 text-sm text-foreground"
              />
              {errors.pickupDate ? <p className="text-sm text-destructive">{errors.pickupDate}</p> : null}
            </div>

            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-foreground">
                Load Size
              </label>
              <select
                value={values.loadSize}
                onChange={(event) => onFieldChange('loadSize', event.target.value)}
                className="h-11 w-full rounded-lg border border-input bg-background px-4 text-sm text-foreground outline-none focus:border-ring focus:ring-3 focus:ring-ring/20"
              >
                {loadSizeOptions.map((option) => (
                  <option key={option} value={option} className="text-slate-950">
                    {option}
                  </option>
                ))}
              </select>
              {errors.loadSize ? <p className="text-sm text-destructive">{errors.loadSize}</p> : null}
            </div>

            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-foreground">
                Address
              </label>
              <textarea
                value={values.address}
                placeholder="Your address..."
                onChange={(event) => onFieldChange('address', event.target.value)}
                className="min-h-[112px] w-full resize-none rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-ring focus:ring-3 focus:ring-ring/20 sm:min-h-[92px]"
              />
              {errors.address ? <p className="text-sm text-destructive">{errors.address}</p> : null}
            </div>
          </div>

          <div className="border-t border-border bg-muted/40 px-4 pb-5 pt-4 sm:px-5">
            <Button
              type="submit"
              className="mx-auto flex h-11 w-full rounded-lg bg-primary px-8 text-sm font-semibold text-primary-foreground hover:bg-primary/90 sm:min-w-[234px] sm:w-auto"
            >
              {isSubmitting ? 'Requesting Pickup...' : 'Request Pickup'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}