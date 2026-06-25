import { useEffect, useId, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Shirt, Sparkles, Truck, Wind, X } from "lucide-react";
import type { PricingItem } from "../../features/dashboard/model/dashboard.model";

interface PricingTableProps {
  pricingItems: PricingItem[];
}

const ORDERED_CATEGORIES = ["Wash & Fold", "Dry-Cleaning", "Ironing", "Pickup Service"] as const;

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  "Wash & Fold": Shirt,
  "Dry-Cleaning": Sparkles,
  Ironing: Wind,
  "Pickup Service": Truck,
};

const CARD_META: Record<
  string,
  {
    eyebrow: string;
    summary: string;
    accent: string;
    accentSoft: string;
    priceNote: string;
    ctaLabel: string;
  }
> = {
  "Wash & Fold": {
    eyebrow: "Most Popular",
    summary: "Drop off everyday laundry and get it back clean, folded, and ready to use.",
    accent: "text-sky-700",
    accentSoft: "bg-sky-500",
    priceNote: "per kilo",
    ctaLabel: "Browse Wash & Fold",
  },
  "Dry-Cleaning": {
    eyebrow: "For Formalwear",
    summary: "For structured garments, delicate fabrics, and clothing that needs extra care.",
    accent: "text-amber-700",
    accentSoft: "bg-amber-500",
    priceNote: "starting rate",
    ctaLabel: "Browse Dry-Cleaning",
  },
  Ironing: {
    eyebrow: "Walk-In Ready",
    summary: "Fast finishing for shirts, uniforms, trousers, and wrinkle-prone fabrics.",
    accent: "text-sky-700",
    accentSoft: "bg-sky-400",
    priceNote: "per kilo",
    ctaLabel: "Browse Ironing",
  },
  "Pickup Service": {
    eyebrow: "Doorstep Add-On",
    summary: "Let the branch handle collection and return when you want the most convenient option.",
    accent: "text-emerald-700",
    accentSoft: "bg-emerald-500",
    priceNote: "per trip",
    ctaLabel: "Book Pickup",
  },
};

const CATEGORY_SERVICE_TYPES: Record<
  string,
  { key: string; label: string; rate: number; description: string }[]
> = {
  "Wash & Fold": [
    { key: "regular", label: "Regular", rate: 65, description: "Everyday clothes and mixed household fabrics." },
    { key: "delicates", label: "Delicates", rate: 80, description: "Gentler care for soft, thin, or finer garments." },
    { key: "bulky", label: "Bulky Items", rate: 90, description: "Comforters, blankets, jackets, and heavier loads." },
  ],
  "Dry-Cleaning": [
    { key: "standard", label: "Standard Garments", rate: 120, description: "Shirts, blouses, and lightly structured pieces." },
    { key: "structured", label: "Structured Pieces", rate: 180, description: "Suits, jackets, and tailored formal wear." },
    { key: "heavy", label: "Heavy Garments", rate: 220, description: "Coats, embellished pieces, and thicker items." },
  ],
  Ironing: [
    { key: "light", label: "Light Fabrics", rate: 55, description: "Cotton shirts, linen, and lighter garments." },
    { key: "heavy", label: "Heavy Fabrics", rate: 70, description: "Denim, uniforms, and thicker everyday pieces." },
  ],
};

function getPriceDisplay(category: string, items: PricingItem[]): string {
  if (category === "Pickup Service") {
    return items[0]?.priceLabel.replace("From ", "") ?? "PHP 50";
  }

  const numeric = items
    .map((item) => Number(item.priceLabel.replace(/[^\d]/g, "")))
    .filter((value) => Number.isFinite(value) && value > 0);

  const min = numeric.length > 0 ? Math.min(...numeric) : 0;
  return `PHP ${min}`;
}

export function PricingTable({ pricingItems }: PricingTableProps): JSX.Element {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedTypes, setSelectedTypes] = useState<Record<string, string>>({});
  const [weights, setWeights] = useState<Record<string, number>>({});
  const modalRef = useRef<HTMLDivElement>(null);
  const id = useId();

  const grouped = useMemo(
    () =>
      ORDERED_CATEGORIES.map((category) => ({
        category,
        items: pricingItems.filter((item) => item.category === category),
      })).filter((group) => group.items.length > 0),
    [pricingItems],
  );

  const activeGroup = grouped.find((group) => group.category === activeCategory) ?? null;

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveCategory(null);
    };

    if (activeCategory) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeCategory]);

  useEffect(() => {
    if (!activeCategory) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setActiveCategory(null);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [activeCategory]);

  return (
    <>
      <div className="w-full space-y-6" aria-label="Pricing categories">
        <div className="max-w-4xl">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-sky-700">Transparent Pricing</p>
          <h3 className="mt-3 text-4xl font-bold leading-tight text-foreground sm:text-5xl">
            Pricing for Every Laundry Need
          </h3>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            From weekly wash loads to garment care and pickup convenience, choose the service that fits your routine.
          </p>
        </div>

        <div className="grid gap-5 xl:grid-cols-2">
          {grouped.map(({ category, items }, index) => {
            const meta = CARD_META[category];
            const Icon = CATEGORY_ICONS[category] ?? Shirt;
            const price = getPriceDisplay(category, items);

            return (
              <motion.button
                key={category}
                type="button"
                layoutId={`pricing-card-${category}-${id}`}
                onClick={() => setActiveCategory(category)}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.42, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white/96 p-7 text-left shadow-[0_14px_40px_rgba(15,23,42,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-[0_24px_65px_rgba(15,23,42,0.08)] sm:p-8"
              >
                <div className={`mb-6 h-2 w-full rounded-full ${meta.accentSoft}`} />

                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className={`flex size-12 shrink-0 items-center justify-center rounded-2xl bg-slate-50 ${meta.accent}`}>
                      <Icon className="size-5" />
                    </div>
                    <div>
                      <p className={`text-xs font-bold uppercase tracking-[0.22em] ${meta.accent}`}>{meta.eyebrow}</p>
                      <motion.h4 layoutId={`pricing-title-${category}-${id}`} className="mt-3 text-[2.2rem] font-bold leading-tight text-foreground">
                        {category}
                      </motion.h4>
                    </div>
                  </div>
                  <span className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-foreground">
                    {meta.ctaLabel}
                  </span>
                </div>

                <motion.p layoutId={`pricing-summary-${category}-${id}`} className="mt-6 text-base leading-7 text-slate-600">
                  {meta.summary}
                </motion.p>

                <div className="mt-6 flex flex-wrap items-end gap-2">
                  <p className="text-6xl font-extrabold leading-none text-foreground">{price}</p>
                  <span className="pb-1 text-base font-semibold text-muted-foreground">{meta.priceNote}</span>
                </div>

                <div className="mt-6 grid gap-3 md:grid-cols-3">
                  {items.slice(0, 3).map((item) => (
                    <div key={item.id} className="rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-4">
                      <p className="text-base font-semibold text-foreground">{item.serviceLabel}</p>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.description}</p>
                    </div>
                  ))}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {activeGroup && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-slate-950/30 backdrop-blur-sm"
            />

            <div className="fixed inset-0 z-50 grid place-items-center p-4 sm:p-6">
              <motion.div
                ref={modalRef}
                layoutId={`pricing-card-${activeGroup.category}-${id}`}
                className="flex h-full w-full max-w-5xl flex-col overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_30px_90px_rgba(15,23,42,0.18)] md:h-auto md:max-h-[90vh]"
              >
                <div className={`h-2 w-full ${CARD_META[activeGroup.category].accentSoft}`} />

                <div className="overflow-y-auto p-6 sm:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className={`flex size-12 shrink-0 items-center justify-center rounded-2xl bg-slate-50 ${CARD_META[activeGroup.category].accent}`}>
                        {(() => {
                          const Icon = CATEGORY_ICONS[activeGroup.category] ?? Shirt;
                          return <Icon className="size-5" />;
                        })()}
                      </div>
                      <div>
                        <p className={`text-xs font-bold uppercase tracking-[0.22em] ${CARD_META[activeGroup.category].accent}`}>
                          {CARD_META[activeGroup.category].eyebrow}
                        </p>
                        <motion.h4 layoutId={`pricing-title-${activeGroup.category}-${id}`} className="mt-3 text-[2.4rem] font-bold leading-tight text-foreground">
                          {activeGroup.category}
                        </motion.h4>
                        <motion.p layoutId={`pricing-summary-${activeGroup.category}-${id}`} className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
                          {CARD_META[activeGroup.category].summary}
                        </motion.p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setActiveCategory(null)}
                      className="flex size-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50"
                    >
                      <X className="size-5" />
                    </button>
                  </div>

                  {activeGroup.category !== "Pickup Service" ? (
                    <div className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
                      <div className="space-y-3">
                        {(CATEGORY_SERVICE_TYPES[activeGroup.category] ?? []).map((type) => {
                          const selectedKey = selectedTypes[activeGroup.category] ?? CATEGORY_SERVICE_TYPES[activeGroup.category][0]?.key;
                          const selected = selectedKey === type.key;
                          return (
                            <button
                              key={type.key}
                              type="button"
                              onClick={() =>
                                setSelectedTypes((current) => ({
                                  ...current,
                                  [activeGroup.category]: type.key,
                                }))
                              }
                              className={`w-full rounded-2xl border px-5 py-5 text-left transition-all ${
                                selected
                                  ? "border-primary bg-primary/8 shadow-sm shadow-primary/10"
                                  : "border-slate-200 bg-slate-50/85 hover:border-primary/20"
                              }`}
                            >
                              <div className="flex items-start justify-between gap-4">
                                <div>
                                  <p className={`text-lg font-bold ${selected ? "text-primary" : "text-foreground"}`}>{type.label}</p>
                                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{type.description}</p>
                                </div>
                                <div className="shrink-0 text-right">
                                  <p className={`text-3xl font-extrabold leading-none ${selected ? "text-primary" : "text-foreground"}`}>PHP {type.rate}</p>
                                  <p className="mt-1 text-sm text-muted-foreground">/kg</p>
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      {(() => {
                        const serviceTypes = CATEGORY_SERVICE_TYPES[activeGroup.category] ?? [];
                        const activeTypeKey = selectedTypes[activeGroup.category] ?? serviceTypes[0]?.key ?? "";
                        const activeType = serviceTypes.find((type) => type.key === activeTypeKey) ?? serviceTypes[0];
                        const activeWeight = weights[activeGroup.category] ?? 3;
                        const estimate = activeType ? Math.round(activeType.rate * activeWeight) : null;

                        if (!activeType) return null;

                        return (
                          <div className="rounded-[1.6rem] border border-primary/20 bg-primary/[0.06] p-5">
                            <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">Live estimate</p>
                            <div className="mt-5 flex items-end justify-between gap-4">
                              <div>
                                <p className="text-sm font-medium text-slate-700">Load weight</p>
                                <p className="mt-1 text-5xl font-extrabold tabular-nums text-foreground">{activeWeight} kg</p>
                              </div>
                              <div className="rounded-full border border-primary/15 bg-white/80 px-3 py-1.5 text-sm font-semibold text-primary">
                                {activeType.label}
                              </div>
                            </div>

                            <div className="mt-5">
                              <input
                                type="range"
                                min={1}
                                max={20}
                                step={0.5}
                                value={activeWeight}
                                onChange={(event) =>
                                  setWeights((current) => ({
                                    ...current,
                                    [activeGroup.category]: parseFloat(event.target.value),
                                  }))
                                }
                                className="h-2 w-full cursor-pointer rounded-full accent-primary"
                              />
                              <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                                <span>1 kg</span>
                                <span>20 kg</span>
                              </div>
                            </div>

                            <div className="mt-6 rounded-[1.5rem] border border-white/70 bg-white/90 p-4 shadow-sm">
                              <p className="text-sm font-medium text-slate-700">Estimated total</p>
                              <div className="mt-2 flex flex-wrap items-end gap-3">
                                <motion.p
                                  key={`${activeGroup.category}-${activeType.key}-${activeWeight}`}
                                  initial={{ opacity: 0, y: 8 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="text-5xl font-extrabold tabular-nums text-primary"
                                >
                                  PHP {estimate?.toLocaleString()}
                                </motion.p>
                                <span className="pb-1 text-sm text-muted-foreground">estimated</span>
                              </div>
                              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                                Based on {activeType.label} at PHP {activeType.rate}/kg. Final pricing may vary slightly after inspection.
                              </p>
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  ) : (
                    <div className="mt-8 rounded-[1.6rem] border border-emerald-100 bg-emerald-50/70 p-5">
                      <p className="text-lg font-bold text-foreground">{activeGroup.items[0]?.serviceLabel}</p>
                      <p className="mt-2 text-sm leading-7 text-muted-foreground">{activeGroup.items[0]?.description}</p>
                      <div className="mt-5 flex items-end gap-3">
                        <p className="text-4xl font-extrabold text-emerald-800">{activeGroup.items[0]?.priceLabel}</p>
                        <span className="pb-1 text-base text-emerald-700">{activeGroup.items[0]?.unit}</span>
                      </div>
                      <div className="mt-6 space-y-3">
                        {activeGroup.items.map((item) => (
                          <div key={item.id} className="flex items-start gap-3">
                            <span className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-white text-emerald-700">
                              <Check className="size-3 stroke-[3]" />
                            </span>
                            <div>
                              <p className="text-sm font-semibold text-foreground">{item.serviceLabel}</p>
                              <p className="mt-1 text-sm leading-6 text-muted-foreground">{item.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
