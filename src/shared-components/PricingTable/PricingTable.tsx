// ============================================================
// MODIFIED: PricingTable — Selectable service type rows for
// Wash & Fold, Dry-Cleaning, and Ironing with dynamic calculator
// ============================================================
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronDown, Shirt, Wind, Sparkles, Truck } from "lucide-react";
import type { PricingItem } from "../../features/dashboard/model/dashboard.model";

interface PricingTableProps {
  pricingItems: PricingItem[];
}

// Map category → icon
const CATEGORY_ICONS: Record<string, React.ElementType> = {
  "Wash & Fold": Shirt,
  "Dry-Cleaning": Sparkles,
  "Ironing": Wind,
  "Pickup Service": Truck,
};

// Selectable service types per category — drives both the radio cards
// and the price calculator. Rate is parsed from priceLabel at runtime.
const CATEGORY_SERVICE_TYPES: Record<
  string,
  { key: string; label: string; rate: number; description: string }[]
> = {
  "Wash & Fold": [
    { key: "regular",   label: "Regular",     rate: 65, description: "Everyday clothes & fabrics" },
    { key: "delicates", label: "Delicates",   rate: 80, description: "Silk, lace & fine garments" },
    { key: "bulky",     label: "Bulky Items", rate: 90, description: "Comforters, blankets & jackets" },
  ],
  "Dry-Cleaning": [
    { key: "standard",   label: "Standard Garments",  rate: 120, description: "Shirts, blouses & everyday formal pieces" },
    { key: "structured", label: "Structured Pieces",  rate: 180, description: "Suits, jackets & tailored clothing" },
    { key: "heavy",      label: "Heavy Garments",     rate: 220, description: "Coats, thick dresses & embellished items" },
  ],
  "Ironing": [
    { key: "light", label: "Light Fabrics", rate: 55, description: "Cotton shirts, linen & lightweight pieces" },
    { key: "heavy", label: "Heavy Fabrics", rate: 70, description: "Denim, uniforms & thicker garments" },
  ],
};

// Clothing weight guide per category
const KG_GUIDE: Record<string, { label: string; kg: string }[]> = {
  "Wash & Fold": [
    { label: "T-shirt",           kg: "≈ 0.2 kg" },
    { label: "Jeans",             kg: "≈ 0.6 kg" },
    { label: "Towel (bath)",      kg: "≈ 0.5 kg" },
    { label: "Bedsheet (double)", kg: "≈ 1.2 kg" },
    { label: "Hoodie",            kg: "≈ 0.7 kg" },
  ],
  "Dry-Cleaning": [
    { label: "Dress shirt",   kg: "≈ 0.3 kg" },
    { label: "Blazer/Jacket", kg: "≈ 0.8 kg" },
    { label: "Suit (2-piece)",kg: "≈ 1.4 kg" },
    { label: "Winter coat",   kg: "≈ 1.8 kg" },
  ],
  "Ironing": [
    { label: "Polo shirt",      kg: "≈ 0.25 kg" },
    { label: "Dress trousers",  kg: "≈ 0.45 kg" },
    { label: "Uniform set",     kg: "≈ 0.8 kg"  },
    { label: "Denim jeans",     kg: "≈ 0.65 kg" },
  ],
  "Pickup Service": [],
};

interface CategoryAccordionProps {
  category: string;
  items: PricingItem[];
  isOpen: boolean;
  onToggle: () => void;
}

function CategoryAccordion({ category, items, isOpen, onToggle }: CategoryAccordionProps) {
  const Icon = CATEGORY_ICONS[category] ?? Shirt;
  const guide = KG_GUIDE[category] ?? [];
  const serviceTypes = CATEGORY_SERVICE_TYPES[category] ?? null;
  const hasServiceTypes = serviceTypes !== null && serviceTypes.length > 0;

  // Slider weight state
  const [kg, setKg] = useState(3);

  // Selected service type — default to first option
  const [selectedKey, setSelectedKey] = useState<string>(
    hasServiceTypes ? serviceTypes[0].key : ""
  );

  const activeType = hasServiceTypes
    ? serviceTypes.find((s) => s.key === selectedKey) ?? serviceTypes[0]
    : null;

  const estimatedPrice = activeType ? Math.round(activeType.rate * kg) : null;

  return (
    <div
      className={`rounded-2xl border transition-all duration-300 ${
        isOpen
          ? "border-primary/30 bg-card shadow-md shadow-primary/5"
          : "border-border bg-card/80 hover:border-primary/20 hover:shadow-sm"
      }`}
    >
      {/* Category header — always visible */}
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 p-6 text-left"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-4">
          <div
            className={`flex size-12 items-center justify-center rounded-xl transition-colors ${
              isOpen ? "bg-primary/10 text-primary" : "bg-accent text-accent-foreground"
            }`}
          >
            <Icon className="size-5" />
          </div>
          <div>
            <p className="font-bold text-foreground text-base">{category}</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {items.length} {items.length === 1 ? "service" : "services"} · from{" "}
              {items[0]?.priceLabel ?? "—"}
            </p>
          </div>
        </div>

        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          <ChevronDown className="size-5 text-muted-foreground" />
        </motion.div>
      </button>

      {/* Expandable detail panel */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 space-y-5">
              {/* Divider */}
              <div className="h-px bg-border" />

              {/* Service rows — only shown for categories without selectable types
                  (i.e. Pickup Service), since the radio cards below replace them */}
              {!hasServiceTypes && (
                <div className="space-y-2">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-start justify-between gap-4 rounded-xl bg-muted/40 px-4 py-3.5"
                    >
                      <div className="min-w-0">
                        <p className="font-semibold text-sm text-foreground">{item.serviceLabel}</p>
                        <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                      <div className="shrink-0 text-right">
                        <span className="font-bold text-foreground text-sm whitespace-nowrap">
                          {item.priceLabel}
                        </span>
                        <span className="ml-1 text-xs text-muted-foreground">{item.unit}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Weight guide */}
              {guide.length > 0 && (
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
                    Typical clothing weights
                  </p>
                  <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3">
                    {guide.map(({ label, kg: kgLabel }) => (
                      <div
                        key={label}
                        className="rounded-lg border border-border/70 bg-white/60 px-3 py-2"
                      >
                        <p className="text-xs font-semibold text-foreground">{label}</p>
                        <p className="text-[11px] text-muted-foreground">{kgLabel}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Price calculator — shown for all kg-based categories */}
              {hasServiceTypes && activeType && (
                <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-primary mb-3">
                    Price calculator
                  </p>

                  {/* Selectable service type cards */}
                  <div className="space-y-2 mb-4">
                    <p className="text-xs font-semibold text-muted-foreground mb-1.5">
                      Service type
                    </p>
                    {serviceTypes.map((type) => {
                      const isSelected = selectedKey === type.key;
                      return (
                        <button
                          key={type.key}
                          type="button"
                          onClick={() => setSelectedKey(type.key)}
                          className={`w-full flex items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left transition-all duration-200 ${
                            isSelected
                              ? "border-primary bg-primary/10 shadow-sm shadow-primary/10"
                              : "border-border bg-white/60 hover:border-primary/30 hover:bg-primary/5"
                          }`}
                          aria-pressed={isSelected}
                        >
                          <div className="flex items-center gap-3">
                            <span
                              className={`flex size-4 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                                isSelected
                                  ? "border-primary bg-primary"
                                  : "border-muted-foreground/30 bg-white"
                              }`}
                            >
                              {isSelected && (
                                <Check className="size-2.5 text-white stroke-[3]" />
                              )}
                            </span>
                            <div>
                              <p
                                className={`text-sm font-semibold leading-tight ${
                                  isSelected ? "text-primary" : "text-foreground"
                                }`}
                              >
                                {type.label}
                              </p>
                              <p className="text-[11px] text-muted-foreground mt-0.5">
                                {type.description}
                              </p>
                            </div>
                          </div>
                          <span
                            className={`shrink-0 text-sm font-bold tabular-nums ${
                              isSelected ? "text-primary" : "text-foreground"
                            }`}
                          >
                            PHP {type.rate}/kg
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Weight slider */}
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-foreground">Load weight</label>
                    <span className="text-sm font-bold text-foreground tabular-nums">{kg} kg</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={20}
                    step={0.5}
                    value={kg}
                    onChange={(e) => setKg(parseFloat(e.target.value))}
                    className="w-full accent-primary h-2 rounded-full cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-muted-foreground mt-1 mb-3">
                    <span>1 kg</span>
                    <span>20 kg</span>
                  </div>

                  {/* Estimated total */}
                  <div className="flex items-baseline gap-2">
                    <motion.span
                      key={estimatedPrice}
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-2xl font-bold text-primary tabular-nums"
                    >
                      PHP {estimatedPrice?.toLocaleString()}
                    </motion.span>
                    <span className="text-sm text-muted-foreground">estimated total</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-1">
                    Based on {activeType.label} rate of PHP {activeType.rate}/kg. Final price may vary.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function PricingTable({ pricingItems }: PricingTableProps): JSX.Element {
  const ORDERED_CATEGORIES = ["Wash & Fold", "Dry-Cleaning", "Ironing", "Pickup Service"];

  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const toggle = (cat: string) => {
    setOpenCategory((prev) => (prev === cat ? null : cat));
  };

  return (
    <div className="space-y-3" aria-label="Pricing categories">
      {ORDERED_CATEGORIES.map((category) => {
        const items = pricingItems.filter((item) => item.category === category);
        if (items.length === 0) return null;
        return (
          <CategoryAccordion
            key={category}
            category={category}
            items={items}
            isOpen={openCategory === category}
            onToggle={() => toggle(category)}
          />
        );
      })}
    </div>
  );
}
