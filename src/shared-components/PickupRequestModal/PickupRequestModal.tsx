import type { FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, X } from "lucide-react";
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
  isSubmitSuccess: boolean;
  onClose: () => void;
  onFieldChange: (field: 'name' | 'phone' | 'pickupDate' | 'loadSize' | 'address', value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

const loadSizeOptions = [
  'Small (1 hamper)',
  'Medium (2 hampers)',
  'Large (3+ hampers)',
];

const sheetTransition = { duration: 0.32, ease: [0.22, 1, 0.36, 1] as const };

export function PickupRequestModal({
  isOpen,
  values,
  errors,
  isSubmitting,
  isSubmitSuccess,
  onClose,
  onFieldChange,
  onSubmit,
}: PickupRequestModalProps): JSX.Element {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-sm sm:flex sm:items-center sm:justify-center sm:px-4 sm:py-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="pickup-modal-title"
            className="flex min-h-dvh w-full flex-col bg-card text-card-foreground shadow-[0_24px_80px_rgba(15,23,42,0.28)] sm:mx-auto sm:min-h-0 sm:max-w-[460px] sm:rounded-2xl sm:border sm:border-border overflow-hidden"
            initial={{ opacity: 0, y: 28, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.97 }}
            transition={sheetTransition}
          >
            <AnimatePresence mode="wait">
              {isSubmitSuccess ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="flex flex-1 flex-col items-center justify-center gap-4 px-8 py-16 text-center"
                >
                  <motion.div
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 320, damping: 18, delay: 0.05 }}
                    className="flex size-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"
                  >
                    <CheckCircle2 className="size-8" />
                  </motion.div>
                  <h2 className="text-2xl font-semibold">Pickup requested!</h2>
                  <p className="max-w-xs text-sm leading-6 text-muted-foreground">
                    We&apos;ll text you a confirmation shortly with the pickup window.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-1 flex-col overflow-hidden"
                >
                  <div className="flex items-start justify-between gap-4 px-4 pb-4 pt-5 sm:p-5">
                    <div className="space-y-2 pr-2">
                      <p className="text-sm font-medium text-muted-foreground">
                        Skip the trip entirely
                      </p>
                      <h2 id="pickup-modal-title" className="text-2xl font-semibold leading-tight sm:text-3xl">
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
                          className="h-11 rounded-lg border-input bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground transition-shadow focus-visible:shadow-[0_0_0_3px_rgba(14,165,233,0.15)]"
                        />
                        <AnimatePresence>
                          {errors.name && (
                            <motion.p
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="text-sm text-destructive"
                            >
                              {errors.name}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-sm font-medium text-foreground">
                          Phone
                        </label>
                        <Input
                          value={values.phone}
                          placeholder="(555) 000-0000"
                          onChange={(event) => onFieldChange('phone', event.target.value)}
                          className="h-11 rounded-lg border-input bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground transition-shadow focus-visible:shadow-[0_0_0_3px_rgba(14,165,233,0.15)]"
                        />
                        <AnimatePresence>
                          {errors.phone && (
                            <motion.p
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="text-sm text-destructive"
                            >
                              {errors.phone}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-sm font-medium text-foreground">
                          Pickup Date
                        </label>
                        <Input
                          type="date"
                          value={values.pickupDate}
                          onChange={(event) => onFieldChange('pickupDate', event.target.value)}
                          className="h-11 rounded-lg border-input bg-background px-4 text-sm text-foreground transition-shadow focus-visible:shadow-[0_0_0_3px_rgba(14,165,233,0.15)]"
                        />
                        <AnimatePresence>
                          {errors.pickupDate && (
                            <motion.p
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="text-sm text-destructive"
                            >
                              {errors.pickupDate}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-sm font-medium text-foreground">
                          Load Size
                        </label>
                        <select
                          value={values.loadSize}
                          onChange={(event) => onFieldChange('loadSize', event.target.value)}
                          className="h-11 w-full rounded-lg border border-input bg-background px-4 text-sm text-foreground outline-none transition-shadow focus:border-ring focus:ring-3 focus:ring-ring/20"
                        >
                          {loadSizeOptions.map((option) => (
                            <option key={option} value={option} className="text-slate-950">
                              {option}
                            </option>
                          ))}
                        </select>
                        <AnimatePresence>
                          {errors.loadSize && (
                            <motion.p
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="text-sm text-destructive"
                            >
                              {errors.loadSize}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-sm font-medium text-foreground">
                          Address
                        </label>
                        <textarea
                          value={values.address}
                          placeholder="Your address..."
                          onChange={(event) => onFieldChange('address', event.target.value)}
                          className="min-h-[112px] w-full resize-none rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground transition-shadow focus:border-ring focus:ring-3 focus:ring-ring/20 sm:min-h-[92px]"
                        />
                        <AnimatePresence>
                          {errors.address && (
                            <motion.p
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="text-sm text-destructive"
                            >
                              {errors.address}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    <div className="border-t border-border bg-muted/40 px-4 pb-5 pt-4 sm:px-5">
                      <motion.div whileTap={{ scale: 0.98 }} className="mx-auto sm:w-auto">
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="flex h-11 w-full rounded-lg bg-primary px-8 text-sm font-semibold text-primary-foreground hover:bg-primary/90 sm:min-w-[234px] sm:w-auto"
                        >
                          {isSubmitting ? (
                            <span className="inline-flex items-center gap-2">
                              <motion.span
                                className="size-3.5 rounded-full border-2 border-primary-foreground/40 border-t-primary-foreground"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }}
                              />
                              Requesting Pickup...
                            </span>
                          ) : (
                            'Request Pickup'
                          )}
                        </Button>
                      </motion.div>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
