import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bell, Clock3, MapPin, PhoneCall, Quote, Star, Truck, User, WashingMachine, Wind } from "lucide-react";
import { Link } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import { AmbientBackground } from "../../../shared-components/AmbientBackground/AmbientBackground";
import { BranchScrollStack } from "../../../shared-components/BranchScrollStack/BranchScrollStack";
import { CardSwap, type CardSwapItem } from "../../../shared-components/CardSwap/CardSwap";
import { ContactCta } from "../../../shared-components/ContactCta/ContactCta";
import { MachineCard } from "../../../shared-components/MachineCard/MachineCard";
import { PricingTable } from "../../../shared-components/PricingTable/PricingTable";
import { PickupRequestModal } from "../../../shared-components/PickupRequestModal/PickupRequestModal";
import { Reveal, RevealGroup, RevealItem } from "../../../shared-components/Reveal/Reveal";
import { WashlineLogo } from "../../../shared-components/WashlineLogo/WashlineLogo";
import { useDashboardViewModel } from "../viewmodel/useDashboardViewModel";

const SERVICE_ICONS = [WashingMachine, Truck, Wind, Truck] as const;

export function DashboardView(): JSX.Element {
  const viewModel = useDashboardViewModel();
  const [notifOpen, setNotifOpen] = useState(false);
  const watchedMachines = viewModel.machineCards.filter((m) => m.notifyEnabled);

  return (
    <main id="top" className="relative min-h-screen bg-transparent text-foreground">
      <AmbientBackground />

      <div className="fixed left-1/2 top-4 z-50 w-[calc(100%-2rem)] max-w-5xl -translate-x-1/2">
        <div className="flex items-center justify-between gap-2 rounded-2xl border border-border/60 bg-white/80 px-3 py-2 shadow-lg shadow-black/[0.06] backdrop-blur-xl">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 rounded-xl bg-primary/8 px-3 py-2 text-sm font-extrabold tracking-tight text-foreground transition-all hover:bg-primary/14 active:scale-[0.97]"
          >
            <WashlineLogo size={28} />
          </Link>

          <nav aria-label="Main navigation" className="hidden items-center gap-1.5 md:flex">
            {[
              { href: "#pickup", label: "Pickup" },
              { href: "#services", label: "Services" },
              { href: "#status", label: "Status" },
              { href: "#pricing", label: "Pricing" },
              { href: "#contact", label: "Contact" },
            ].map(({ href, label }) => (
              <a
                key={label}
                href={href}
                className="rounded-xl border border-transparent px-3.5 py-1.5 text-sm font-medium text-muted-foreground transition-all hover:border-border hover:bg-muted/60 hover:text-foreground active:scale-[0.96]"
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="relative">
              <button
                type="button"
                aria-label="Notifications"
                onClick={() => setNotifOpen((v) => !v)}
                className="relative inline-flex size-9 items-center justify-center rounded-xl border border-border bg-white/70 text-muted-foreground transition-all hover:bg-muted/60 hover:text-foreground active:scale-[0.95]"
              >
                <Bell className="size-4" />
                {watchedMachines.length > 0 && (
                  <span className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-primary text-[9px] font-bold leading-none text-white">
                    {watchedMachines.length}
                  </span>
                )}
              </button>

              <AnimatePresence>
                {notifOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setNotifOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: -6, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -6, scale: 0.97 }}
                      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute right-0 top-11 z-50 w-72 overflow-hidden rounded-2xl border border-border bg-white/95 shadow-xl shadow-black/10 backdrop-blur-xl"
                    >
                      <div className="flex items-center justify-between border-b border-border px-4 py-3">
                        <p className="text-sm font-bold text-foreground">Watching</p>
                        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-bold text-primary">
                          {watchedMachines.length} machine{watchedMachines.length !== 1 ? "s" : ""}
                        </span>
                      </div>

                      {watchedMachines.length === 0 ? (
                        <div className="flex flex-col items-center gap-2 px-4 py-8 text-center">
                          <Bell className="size-8 text-muted-foreground/40" />
                          <p className="text-sm font-medium text-muted-foreground">No machines watched</p>
                          <p className="text-xs text-muted-foreground/70">
                            Tap the notify button on any machine card to get alerted when it&apos;s free.
                          </p>
                        </div>
                      ) : (
                        <ul className="max-h-64 divide-y divide-border overflow-y-auto">
                          {watchedMachines.map((machine) => {
                            const isWasher = machine.typeLabel.toLowerCase().includes("wash");
                            return (
                              <li key={machine.id} className="flex items-center gap-3 px-4 py-3">
                                <span className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                  {isWasher ? <WashingMachine className="size-4" /> : <Wind className="size-4" />}
                                </span>
                                <div className="min-w-0 flex-1">
                                  <p className="truncate text-sm font-semibold text-foreground">{machine.label}</p>
                                  <p className="text-[11px] text-muted-foreground">
                                    {machine.typeLabel} · {machine.statusLabel}
                                  </p>
                                </div>
                                <span className="relative flex size-2 shrink-0">
                                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                                  <span className="relative inline-flex size-2 rounded-full bg-primary" />
                                </span>
                              </li>
                            );
                          })}
                        </ul>
                      )}

                      <div className="border-t border-border bg-muted/30 px-4 py-2.5">
                        <p className="text-center text-[11px] text-muted-foreground">
                          You&apos;ll be notified when a watched machine becomes available.
                        </p>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            <button
              type="button"
              aria-label="Customer profile"
              className="inline-flex size-9 items-center justify-center rounded-xl border border-border bg-primary/10 text-primary transition-all hover:bg-primary/20 active:scale-[0.95]"
            >
              <User className="size-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="h-20" />

      <header className="border-b border-border/40 bg-white/40">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <Badge className="mb-5 inline-flex rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary shadow-none">
                Laundromat Management Platform
              </Badge>
              <h1 className="mb-6 text-5xl font-bold leading-tight text-foreground lg:text-6xl">
                Laundry operations with a <br className="hidden lg:block" />
                <span className="text-gradient">cleaner</span> customer experience.
              </h1>
              <p className="max-w-xl text-justify text-lg leading-8 text-foreground/90 lg:text-xl">
                Track branch activity, manage pickup requests, and keep service information easy to scan in a calmer, more readable dashboard built for everyday use.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  to="/signup"
                  className="rounded-full bg-primary px-7 py-3 font-semibold text-primary-foreground shadow-lg shadow-sky-200/50 transition-all hover:opacity-90 active:scale-[0.97]"
                >
                  Get Started Free
                </Link>
                <a
                  href="#status"
                  className="rounded-full border-2 border-slate-200 bg-white px-7 py-3 font-semibold text-foreground shadow-sm transition-all hover:border-primary/20 hover:bg-slate-50 active:scale-[0.97]"
                >
                  Check Branch Status
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="rounded-[2rem] border border-border bg-white/88 p-8 shadow-xl shadow-black/[0.06] backdrop-blur-sm">
                <p className="mb-6 text-xs font-bold uppercase tracking-wider text-muted-foreground">Trusted locally</p>

                <div className="mb-8 grid gap-3">
                  {viewModel.trustMetrics.map((metric, i) => (
                    <motion.div
                      key={metric.id}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                      className="flex items-center gap-4 rounded-2xl border border-transparent bg-gradient-to-r from-sky-50 via-white to-amber-50 px-5 py-4"
                    >
                      <p className="w-20 shrink-0 text-3xl font-bold tabular-nums text-primary">{metric.value}</p>
                      <div className="h-8 w-px bg-border" />
                      <p className="text-base font-medium leading-snug text-slate-700">{metric.label}</p>
                    </motion.div>
                  ))}
                </div>

                <div className="rounded-2xl border border-border/60 bg-white/70 p-5 pt-7">
                  <CardSwap
                    skewAmount={3}
                    pauseOnHover={true}
                    interval={3800}
                    items={viewModel.testimonials.slice(0, 3).map((t): CardSwapItem => ({
                      id: t.id,
                      content: (
                        <div className="relative select-none rounded-2xl border border-border bg-card p-6 pt-7 shadow-sm shadow-black/[0.04]">
                          <div className="absolute -top-3 left-5 flex size-7 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm">
                            <Quote className="size-3 fill-current" />
                          </div>
                          <div className="mb-4 flex gap-0.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star key={i} className="size-3 fill-primary text-primary" />
                            ))}
                          </div>
                          <p className="text-sm font-medium leading-7 text-foreground">&quot;{t.quote}&quot;</p>
                          <div className="mt-4 flex items-center gap-2.5 border-t border-border/60 pt-4">
                            <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                              {t.author.charAt(0)}
                            </div>
                            <div>
                              <p className="text-xs font-bold text-foreground">{t.author}</p>
                              <p className="text-[11px] text-muted-foreground">{t.context}</p>
                            </div>
                          </div>
                        </div>
                      ),
                    }))}
                  />
                </div>
              </div>

              <div className="absolute -right-3 -top-3 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1.5 text-xs font-bold text-emerald-700 shadow-sm">
                3 Active Branches
              </div>
            </motion.div>
          </div>
        </div>
      </header>

      <section id="pickup" aria-labelledby="pickup-heading" className="section-gap px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mx-auto max-w-2xl text-center">
            <Badge className="mb-4 inline-flex rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary shadow-none">
              How it Works
            </Badge>
            <h2 id="pickup-heading" className="font-bold">
              Pickup Flow
            </h2>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">Book, collect, clean, deliver.</p>
          </Reveal>

          <div className="mx-auto mt-10 max-w-6xl rounded-[2rem] border border-border bg-white/88 p-5 shadow-lg shadow-black/[0.04] sm:p-6">
            <RevealGroup className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {viewModel.processSteps.map((step, index) => (
                <RevealItem key={step.id}>
                  <article className="flex h-full flex-col rounded-[1.5rem] border border-border bg-white px-5 py-5 text-left shadow-sm">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex size-11 items-center justify-center rounded-full bg-primary/10 text-lg font-bold text-primary ring-4 ring-primary/5">
                        {String(index + 1).padStart(2, "0")}
                      </div>
                      <h3 className="text-lg font-bold">{step.title}</h3>
                    </div>
                    <p className="text-sm leading-7 text-muted-foreground">{step.description}</p>
                  </article>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </section>

      <section id="services" aria-labelledby="services-heading" className="section-gap px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-[2rem] bg-muted/35 p-8 md:p-10">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 id="services-heading" className="font-bold">
              Our Services
            </h2>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              Book, collect, clean, deliver across walk-in, drop-off, pickup, and business laundry.
            </p>
          </Reveal>

          <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {viewModel.serviceItems.map((service, index) => {
              const Icon = SERVICE_ICONS[index % SERVICE_ICONS.length];
              return (
                <RevealItem key={service.id}>
                  <article className="card-hover aspect-square flex flex-col justify-between rounded-[1.6rem] border border-border bg-card p-6 shadow-sm">
                    <div className="flex size-14 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
                      <Icon className="size-6" />
                    </div>
                    <div className="flex flex-1 flex-col justify-end">
                      <Badge
                        variant="outline"
                        className="mb-2 w-fit rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider"
                      >
                        {service.eyebrow}
                      </Badge>
                      <h3 className="mb-2 text-lg font-bold">{service.title}</h3>
                      <p className="line-clamp-4 text-justify text-sm leading-7 text-muted-foreground">
                        {service.description}
                      </p>
                    </div>
                  </article>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      <section id="status" aria-labelledby="machine-status-heading" className="section-gap px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-[2.25rem] border border-slate-200 bg-white/94 p-6 shadow-[0_24px_60px_rgba(15,23,42,0.06)] sm:p-8 lg:p-10">
          <Reveal className="mx-auto max-w-3xl text-center">
            <Badge className="rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary shadow-none">
              Choose your branch
            </Badge>
            <h2 id="machine-status-heading" className="mt-4 font-bold">
              Machine Status
            </h2>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              Check availability before you head out. Pick a branch, open its live panel, then use the cards below for detailed machine status and alerts.
            </p>
          </Reveal>

          <div className="mx-auto mt-8 max-w-5xl rounded-[1.75rem] border border-slate-200 bg-slate-50 p-4 sm:p-5">
            <BranchScrollStack
              branches={viewModel.branchOptions}
              machines={viewModel.allMachines}
              selectedLocationId={viewModel.selectedLocationId}
              onLocationChange={viewModel.onLocationChange}
            />
          </div>

          <div className="mx-auto mt-6 max-w-5xl rounded-2xl border border-sky-100 bg-sky-50/80 px-4 py-3 text-sm leading-7 text-sky-900">
            Tip: tap &quot;Notify me when free&quot; on a busy machine to keep an eye on it from the bell icon in the top bar.
          </div>

          <motion.div layout className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {viewModel.machineCards.map((machine) => (
                <MachineCard
                  key={machine.id}
                  id={machine.id}
                  label={machine.label}
                  typeLabel={machine.typeLabel}
                  status={machine.status}
                  statusLabel={machine.statusLabel}
                  loadSizeLabel={machine.loadSizeLabel}
                  etaLabel={machine.etaLabel}
                  notifyEnabled={machine.notifyEnabled}
                  onNotifyToggle={viewModel.onNotifyToggle}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <section id="pricing" className="section-gap px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-[2rem] bg-muted/45 p-8 md:p-10">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="font-bold">Pricing</h2>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              Simple, transparent pricing. Click any category to see the full breakdown.
            </p>
          </Reveal>
          <Reveal className="mx-auto mt-10 max-w-5xl" delay={0.1}>
            <PricingTable pricingItems={viewModel.pricingItems} />
          </Reveal>
        </div>
      </section>

      <section id="contact" className="section-gap px-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Contact</p>
            <h2 className="mt-4 font-bold leading-snug">Address, hours, and pickup booking.</h2>

            <div className="mt-10 space-y-7">
              {[
                {
                  Icon: MapPin,
                  label: "Address",
                  content: viewModel.selectedBranch.address,
                },
                {
                  Icon: PhoneCall,
                  label: "Phone",
                  content: viewModel.selectedBranch.contactNumber,
                },
                {
                  Icon: Clock3,
                  label: "Hours",
                  content: (
                    <>
                      <p>Mon - Fri: 8 am - 8 pm</p>
                      <p>Sat - Sun: 9 am - 8 pm</p>
                    </>
                  ),
                },
              ].map(({ Icon, label, content }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                    <Icon className="size-4" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">{label}</p>
                    <div className="mt-1 text-sm leading-7 text-muted-foreground">{content}</div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <ContactCta
              title={viewModel.contactPanel.title}
              description={viewModel.contactPanel.description}
              primaryActionLabel={viewModel.contactPanel.primaryActionLabel}
              secondaryActionLabel={viewModel.contactPanel.secondaryActionLabel}
              contactNumber={viewModel.selectedBranch.contactNumber}
              branchAddress={viewModel.selectedBranch.address}
              onPrimaryAction={viewModel.onOpenPickupModal}
            />
          </Reveal>
        </div>
      </section>

      <footer className="border-t border-border bg-card/90 px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Washline Laundromat. All rights reserved.</p>
          <a href="#top" className="text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground">
            Back to top ↑
          </a>
        </div>
      </footer>

      <PickupRequestModal
        isOpen={viewModel.isPickupModalOpen}
        values={viewModel.pickupFormValues}
        errors={viewModel.pickupFormErrors}
        isSubmitting={viewModel.isSubmittingPickupRequest}
        isSubmitSuccess={viewModel.isPickupSubmitSuccess}
        onClose={viewModel.onClosePickupModal}
        onFieldChange={viewModel.onPickupFieldChange}
        onSubmit={viewModel.onSubmitPickupRequest}
      />
    </main>
  );
}
