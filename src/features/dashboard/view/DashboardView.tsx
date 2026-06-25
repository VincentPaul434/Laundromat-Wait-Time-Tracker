// ============================================================
// MODIFIED: DashboardView — Full layout update per design checklist
// Changes:
//   #1  Navbar: Login/Signup → top-right; Brand → far-left w/ icon
//   #2  Hero: headline left + Credibility card right; removed "Main Featured Branch"
//   #3  Scroll order: Pickup Flow → Our Services (below hero)
//   #4  Machine section: auth-guard blur/overlay if not logged in
//   #6  Bottom credibility section removed (moved to hero)
// ============================================================

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bell,
  Camera,
  Clock3,
  Mail,
  MapPin,
  PhoneCall,
  Quote,
  Shirt,
  Sparkles,
  Star,
  Truck,
  User,
  WashingMachine,
  Wind,
} from "lucide-react";
import { Link } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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

const SERVICE_ICONS = [WashingMachine, Shirt, Truck, Sparkles] as const;

export function DashboardView(): JSX.Element {
  const viewModel = useDashboardViewModel();
  const [notifOpen, setNotifOpen] = useState(false);

  // Machines the customer has toggled notify on
  const watchedMachines = viewModel.machineCards.filter((m) => m.notifyEnabled);

  return (
    <main id="top" className="relative min-h-screen bg-transparent text-foreground">
      <AmbientBackground />

      {/* ================================================================
          #1 — NAVBAR: Brand far-left · Nav center · Login+Signup top-right
          ================================================================ */}
      <div className="fixed top-4 left-1/2 z-50 -translate-x-1/2 w-[calc(100%-2rem)] max-w-5xl">
        <div className="flex items-center justify-between gap-2 rounded-2xl border border-border/60 bg-white/80 px-3 py-2 shadow-lg shadow-black/[0.06] backdrop-blur-xl">

          {/* MODIFIED: Brand — far-left, hamburger/menu icon removed (no functionality) */}
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 rounded-xl bg-primary/8 px-3 py-2 text-sm font-extrabold tracking-tight text-foreground transition-all hover:bg-primary/14 active:scale-[0.97]"
          >
            <WashlineLogo size={28} />
          </Link>

          {/* Nav links — center */}
          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-1.5 md:flex"
          >
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

          {/* Notification bell + Profile avatar */}
          <div className="flex items-center gap-2">

            {/* ── Notification bell ── */}
            <div className="relative">
              <button
                type="button"
                aria-label="Notifications"
                onClick={() => setNotifOpen((v) => !v)}
                className="relative inline-flex size-9 items-center justify-center rounded-xl border border-border bg-white/70 text-muted-foreground transition-all hover:bg-muted/60 hover:text-foreground active:scale-[0.95]"
              >
                <Bell className="size-4" />
                {watchedMachines.length > 0 && (
                  <span className="absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-white leading-none">
                    {watchedMachines.length}
                  </span>
                )}
              </button>

              {/* Notification dropdown */}
              <AnimatePresence>
                {notifOpen && (
                  <>
                    {/* Click-outside backdrop */}
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setNotifOpen(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: -6, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -6, scale: 0.97 }}
                      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute right-0 top-11 z-50 w-72 rounded-2xl border border-border bg-white/95 shadow-xl shadow-black/10 backdrop-blur-xl overflow-hidden"
                    >
                      {/* Header */}
                      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                        <p className="text-sm font-bold text-foreground">Watching</p>
                        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-bold text-primary">
                          {watchedMachines.length} machine{watchedMachines.length !== 1 ? "s" : ""}
                        </span>
                      </div>

                      {/* Machine list */}
                      {watchedMachines.length === 0 ? (
                        <div className="flex flex-col items-center gap-2 py-8 text-center px-4">
                          <Bell className="size-8 text-muted-foreground/40" />
                          <p className="text-sm font-medium text-muted-foreground">No machines watched</p>
                          <p className="text-xs text-muted-foreground/70">
                            Tap the notify button on any machine card to get alerted when it's free.
                          </p>
                        </div>
                      ) : (
                        <ul className="divide-y divide-border max-h-64 overflow-y-auto">
                          {watchedMachines.map((machine) => {
                            const isWasher = machine.typeLabel?.toLowerCase().includes("wash");
                            return (
                              <li key={machine.id} className="flex items-center gap-3 px-4 py-3">
                                <span className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                  {isWasher
                                    ? <WashingMachine className="size-4" />
                                    : <Wind className="size-4" />}
                                </span>
                                <div className="min-w-0 flex-1">
                                  <p className="text-sm font-semibold text-foreground truncate">{machine.label}</p>
                                  <p className="text-[11px] text-muted-foreground">{machine.typeLabel} · {machine.statusLabel}</p>
                                </div>
                                {/* Live pulse */}
                                <span className="relative flex size-2 shrink-0">
                                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                                  <span className="relative inline-flex size-2 rounded-full bg-primary" />
                                </span>
                              </li>
                            );
                          })}
                        </ul>
                      )}

                      {/* Footer hint */}
                      <div className="px-4 py-2.5 border-t border-border bg-muted/30">
                        <p className="text-[11px] text-muted-foreground text-center">
                          You'll be notified when a watched machine becomes available.
                        </p>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* ── Profile avatar ── */}
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

      {/* Spacer for fixed navbar */}
      <div className="h-20" />

      {/* ================================================================
          #2 — HERO: Headline left + Credibility card right
          "Main Featured Branch" card REMOVED
          Bottom credibility section content MOVED HERE (#6)
          ================================================================ */}
      <header className="border-b border-border/40 bg-white/40">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">

          {/* Two-column hero: headline + credibility card */}
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">

            {/* LEFT: Headline copy */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <Badge className="rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary shadow-none mb-5 inline-flex">
                Laundromat Management Platform
              </Badge>
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6 text-foreground">
                Laundry operations with a{" "}
                <br className="hidden lg:block" />
                <span className="text-gradient">cleaner</span> customer experience.
              </h1>
              <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-xl">
                Track branch activity, manage pickup requests, and keep essential service
                information easy to access — bright, calm, and built for everyday use.
              </p>

              {/* CTA row */}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  to="/signup"
                  className="px-7 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:opacity-90 active:scale-[0.97] transition-all shadow-lg shadow-sky-200/50"
                >
                  Get Started Free
                </Link>
                <a
                  href="#status"
                  className="px-7 py-3 rounded-full text-foreground font-semibold border-2 border-border hover:border-primary/20 hover:bg-slate-50 active:scale-[0.97] transition-all"
                >
                  Check Branch Status
                </a>
              </div>
            </motion.div>

            {/* RIGHT: Credibility card (MOVED from bottom section, #6) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              {/* Main credibility card */}
              <div className="rounded-[2rem] border border-border bg-white/80 p-8 shadow-xl shadow-black/[0.06] backdrop-blur-sm">
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-6">
                  Trusted locally
                </p>

                {/* Trust metric pills */}
                <div className="space-y-3 mb-8">
                  {viewModel.trustMetrics.map((metric, i) => (
                    <motion.div
                      key={metric.id}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                      className="flex items-center gap-4 rounded-2xl border border-border bg-white/70 px-5 py-4"
                    >
                      <p className="text-3xl font-bold text-primary shrink-0 w-20 tabular-nums">
                        {metric.value}
                      </p>
                      <div className="h-8 w-px bg-border" />
                      <p className="text-sm font-medium text-muted-foreground leading-snug">
                        {metric.label}
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* Testimonial preview — CardSwap */}
                <div className="rounded-2xl border border-border/60 bg-white/70 p-5 pt-7">
                  <CardSwap
                    skewAmount={3}
                    pauseOnHover={true}
                    interval={3800}
                    items={viewModel.testimonials.slice(0, 3).map((t): CardSwapItem => ({
                      id: t.id,
                      content: (
                        <div className="relative rounded-2xl border border-border bg-card p-6 pt-7 shadow-sm shadow-black/[0.04] select-none">
                          <div className="absolute -top-3 left-5 flex size-7 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm">
                            <Quote className="size-3 fill-current" />
                          </div>
                          <div className="flex gap-0.5 mb-4">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star key={i} className="size-3 fill-primary text-primary" />
                            ))}
                          </div>
                          <p className="text-sm leading-7 text-foreground font-medium">
                            "{t.quote}"
                          </p>
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

              {/* Floating accent badge */}
              <div className="absolute -top-3 -right-3 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1.5 text-xs font-bold text-emerald-700 shadow-sm">
                3 Active Branches
              </div>
            </motion.div>
          </div>
        </div>
      </header>

      {/* ================================================================
          #3 — SCROLL ORDER: Pickup Flow FIRST
          ================================================================ */}
      <section
        id="pickup"
        aria-labelledby="pickup-heading"
        className="section-gap px-4 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal className="mx-auto max-w-2xl text-center">
            <Badge className="rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary shadow-none mb-4 inline-flex">
              How it Works
            </Badge>
            <h2 id="pickup-heading" className="font-bold">
              Pickup Flow
            </h2>
            <p className="mt-4 text-base leading-8 text-muted-foreground">
              You order, we collect, clean, and deliver — hassle-free.
            </p>
          </Reveal>

          {/* MODIFIED #3: New feature design for Pickup Flow — numbered horizontal timeline */}
          <div className="mt-12 relative">
            {/* Connecting line (desktop only) */}
            <div className="hidden xl:block absolute top-12 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

            <RevealGroup className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {viewModel.processSteps.map((step, index) => (
                <RevealItem key={step.id}>
                  <article className="relative flex flex-col items-center text-center rounded-[1.6rem] border border-border bg-card p-6 shadow-sm h-full card-hover">
                    {/* Step number bubble */}
                    <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-lg mb-5 shrink-0 ring-4 ring-primary/5">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <h3 className="font-bold text-base mb-2">{step.title}</h3>
                    <p className="text-sm leading-7 text-muted-foreground">
                      {step.description}
                    </p>
                    {/* Connector dot */}
                    {index < 3 && (
                      <div className="hidden xl:flex absolute -right-3 top-12 size-6 items-center justify-center">
                        <div className="size-2 rounded-full bg-primary/40" />
                      </div>
                    )}
                  </article>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </section>

      {/* ================================================================
          #3 — SCROLL ORDER: Our Services SECOND (below Pickup Flow)
          #3 Design: Cards are now strict SQUARES
          ================================================================ */}
      <section
        id="services"
        aria-labelledby="services-heading"
        className="section-gap px-4 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-7xl rounded-[2rem] bg-muted/35 p-8 md:p-10">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 id="services-heading" className="font-bold">
              Our Services
            </h2>
            <p className="mt-4 text-base leading-8 text-muted-foreground">
              Walk-in, drop-off, pickup, and business laundry — all under one roof.
            </p>
          </Reveal>

          {/* MODIFIED #3: Square card layout — aspect-square enforced */}
          <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {viewModel.serviceItems.map((service, index) => {
              const Icon = SERVICE_ICONS[index % 4];
              return (
                <RevealItem key={service.id}>
                  {/* aspect-square makes every card a perfect square */}
                  <article className="card-hover aspect-square flex flex-col justify-between rounded-[1.6rem] border border-border bg-card p-6 shadow-sm">
                    <div className="flex size-14 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
                      <Icon className="size-6" />
                    </div>
                    <div className="flex-1 flex flex-col justify-end">
                      <Badge
                        variant="outline"
                        className="rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider mb-2 w-fit"
                      >
                        {service.eyebrow}
                      </Badge>
                      <h3 className="font-bold text-base mb-2">{service.title}</h3>
                      <p className="text-sm leading-7 text-muted-foreground line-clamp-3">
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

      {/* ================================================================
          #4 — MACHINE STATUS: Branch selector + live machine grid
          ================================================================ */}
      <section
        id="status"
        aria-labelledby="machine-status-heading"
        className="section-gap px-4 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-7xl space-y-10">
          <Reveal className="mx-auto max-w-2xl text-center">
            <Badge className="rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary shadow-none">
              Choose your branch
            </Badge>
            <h2 id="machine-status-heading" className="mt-4 font-bold">
              Machine Status
            </h2>
            <p className="mt-4 text-base leading-8 text-muted-foreground">
              Select a branch and check machine availability before you head out.
            </p>
          </Reveal>

          {/* Branch selector — always visible. StatusSummary panel removed:
              BranchScrollStack already reveals live status per-branch on click. */}
          <div className="mx-auto max-w-2xl">
            <BranchScrollStack
              branches={viewModel.branchOptions}
              machines={viewModel.allMachines}
              selectedLocationId={viewModel.selectedLocationId}
              onLocationChange={viewModel.onLocationChange}
            />
          </div>

          <Separator />

          {/* Machine cards — auth guard removed; dashboard implies a logged-in user */}
          <motion.div
            layout
            className="grid gap-5 md:grid-cols-2 xl:grid-cols-3"
          >
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

      {/* ================================================================
          PRICING — Expandable accordion (PricingTable handles this)
          ================================================================ */}
      <section
        id="pricing"
        className="section-gap px-4 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-7xl rounded-[2rem] bg-muted/35 p-8 md:p-10">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="font-bold">Pricing</h2>
            <p className="mt-4 text-base leading-8 text-muted-foreground">
              Simple, transparent pricing — click any category to see the full breakdown.
            </p>
          </Reveal>
          <Reveal className="mt-10 max-w-3xl mx-auto" delay={0.1}>
            <PricingTable pricingItems={viewModel.pricingItems} />
          </Reveal>
        </div>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        className="section-gap px-4 sm:px-6 lg:px-8"
      >
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Contact
            </p>
            <h2 className="mt-4 font-bold leading-snug">
              Address, hours, and pickup booking.
            </h2>

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
                    <div className="mt-1 text-sm leading-7 text-muted-foreground">
                      {content}
                    </div>
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

      {/* ================================================================
          #6 — BOTTOM CREDIBILITY SECTION REMOVED (content moved to hero)
          The old "Built for families" section with CardSwap + trust metrics
          is gone. Testimonials are now in the hero credibility card above.
          ================================================================ */}

      {/* FOOTER */}
      <footer className="border-t border-border bg-card/90 px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Washline Laundromat. All rights reserved.
          </p>
          <a
            href="#top"
            className="text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
          >
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
