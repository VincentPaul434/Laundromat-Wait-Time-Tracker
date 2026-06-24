import {
  Camera,
  Clock3,
  Mail,
  MapPin,
  PhoneCall,
  Shirt,
  Sparkles,
  Truck,
  WashingMachine,
} from "lucide-react";
import { Link } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { BranchSelector } from "../../../shared-components/BranchSelector/BranchSelector";
import { ContactCta } from "../../../shared-components/ContactCta/ContactCta";
import { MachineCard } from "../../../shared-components/MachineCard/MachineCard";
import { PricingTable } from "../../../shared-components/PricingTable/PricingTable";
import { PickupRequestModal } from "../../../shared-components/PickupRequestModal/PickupRequestModal";
import { StatusSummary } from "../../../shared-components/StatusSummary/StatusSummary";
import { useDashboardViewModel } from "../viewmodel/useDashboardViewModel";

const SERVICE_ICONS = [WashingMachine, Shirt, Truck, Sparkles] as const;

export function DashboardView(): JSX.Element {
  const viewModel = useDashboardViewModel();

  return (
    <main id="top" className="relative min-h-screen bg-background text-foreground">
      {/* Navbar - Cleaned up to match QuickFold aesthetic */}
      <div className="sticky top-0 z-50 border-b border-border/60 nav-glass">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 text-xl font-extrabold tracking-tight text-foreground transition-opacity hover:opacity-90"
          >
            <span className="inline-flex size-9 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Sparkles className="size-4" />
            </span>
            Washline
          </Link>

          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-1 md:flex"
          >
            {[
              { href: "#services", label: "Services" },
              { href: "#status", label: "Status" },
              { href: "#pricing", label: "Pricing" },
              { href: "#contact", label: "Contact" },
              { href: "#contact", label: "Book Pickup" },
            ].map(({ href, label }) => (
              <a
                key={label}
                href={href}
                className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-all hover:bg-accent hover:text-accent-foreground"
              >
                {label}
              </a>
            ))}
          </nav>

          <a
            href="#contact"
            className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-all hover:bg-accent hover:text-accent-foreground md:hidden"
          >
            Book Pickup
          </a>
        </div>
      </div>

      <header className="border-b border-border/40 bg-white/40">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          
          <div className="flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-24 mb-16">
            <div className="max-w-4xl">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6 text-foreground">
                Laundry operations with a <br className="hidden lg:block"/>
                <span className="text-gradient">cleaner</span> customer experience.
              </h1>
              <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-2xl">
                Track branch activity, manage pickup requests, and keep essential service information easy to access with a bright, calm, premium interface.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 lg:pt-4 shrink-0">
              <Link 
                to="/login" 
                className="px-8 py-3 rounded-full text-foreground font-semibold border-2 border-border hover:border-primary/20 hover:bg-slate-50 transition-all text-center"
              >
                Log in
              </Link>
              <Link 
                to="/signup" 
                className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-all shadow-lg shadow-sky-200/50 text-center"
              >
                Sign up
              </Link>
            </div>
          </div>

          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-16">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {viewModel.trustMetrics.map((metric) => (
                <div
                  key={metric.id}
                  className="card-hover metric-stripe rounded-[1.6rem] border border-border bg-card/90 px-5 py-6 shadow-sm"
                >
                  <p className="text-4xl font-bold text-foreground">
                    {metric.value}
                  </p>
                  <p className="mt-2 text-sm font-medium leading-6 text-muted-foreground">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="hero-surface rounded-[2rem] p-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                    Main featured branch
                  </p>
                  <h2 className="mt-2 text-2xl font-bold">
                    {viewModel.selectedBranch.name}
                  </h2>
                  <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
                    {viewModel.selectedBranch.address}
                  </p>
                </div>
                <Badge className="shrink-0 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400">
                  Open today
                </Badge>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                {[
                  { label: "Available", value: viewModel.summary.available, cls: "status-available" },
                  { label: "In use", value: viewModel.summary.inUse, cls: "status-in-use" },
                  { label: "Finishing soon", value: viewModel.summary.finishingSoon, cls: "status-finishing" },
                ].map(({ label, value, cls }) => (
                  <div key={label} className={`rounded-[1.3rem] p-4 ${cls}`}>
                    <p className="text-xs font-semibold uppercase tracking-wide opacity-75">
                      {label}
                    </p>
                    <p className="mt-2 text-4xl font-bold">{value}</p>
                  </div>
                ))}
              </div>

              <Separator className="my-6" />

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.3rem] border border-border bg-white/80 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Hours
                  </p>
                  <p className="mt-2 text-sm leading-6 text-foreground">
                    Mon - Fri: 8 am - 8 pm
                  </p>
                  <p className="text-sm leading-6 text-foreground">
                    Sat - Sun: 9 am - 8 pm
                  </p>
                </div>
                <div className="rounded-[1.3rem] border border-border bg-white/80 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Contact
                  </p>
                  <p className="mt-2 text-sm leading-6 text-foreground">
                    {viewModel.selectedBranch.contactNumber}
                  </p>
                  <div className="mt-3 flex items-center gap-2">
                    {(
                      [
                        { Icon: PhoneCall, href: `tel:${viewModel.selectedBranch.contactNumber}`, label: "Call branch" },
                        { Icon: Mail, href: "mailto:info@washline.test", label: "Email branch" },
                        { Icon: Camera, href: "#contact", label: "Instagram" },
                      ] as const
                    ).map(({ Icon, href, label }) => (
                      <a
                        key={label}
                        href={href}
                        aria-label={label}
                        className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-muted text-foreground transition-colors hover:border-primary hover:bg-accent hover:text-primary"
                      >
                        <Icon className="size-4" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section
        id="services"
        aria-labelledby="services-heading"
        className="section-gap px-4 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-7xl rounded-[2rem] bg-muted/35 p-8 md:p-10">
          <div className="mx-auto max-w-2xl text-center">
            <h2 id="services-heading" className="font-bold">
              Our Services
            </h2>
            <p className="mt-4 text-base leading-8 text-muted-foreground">
              Walk-in, drop-off, pickup, and business laundry - all under one
              roof.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {viewModel.serviceItems.map((service, index) => {
              const Icon = SERVICE_ICONS[index % 4];
              return (
                <article
                  key={service.id}
                  className="card-hover space-y-5 rounded-[1.6rem] border border-border bg-card p-6 shadow-sm"
                >
                  <div className="flex size-14 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
                    <Icon className="size-6" />
                  </div>
                  <div>
                    <Badge
                      variant="outline"
                      className="rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider"
                    >
                      {service.eyebrow}
                    </Badge>
                    <h3 className="mt-3 font-bold">{service.title}</h3>
                  </div>
                  <p className="text-sm leading-7 text-muted-foreground">
                    {service.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="status"
        aria-labelledby="machine-status-heading"
        className="section-gap bg-background px-4 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-7xl space-y-10">
          <div className="mx-auto max-w-2xl text-center">
            <Badge className="rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary shadow-none">
              Choose your branch
            </Badge>
            <h2 id="machine-status-heading" className="mt-4 font-bold">
              Machine Status
            </h2>
            <p className="mt-4 text-base leading-8 text-muted-foreground">
              Select a branch and check machine availability before you head
              out.
            </p>
          </div>

          {/* Grid Layout to place these side by side */}
          <div className="grid gap-6 lg:grid-cols-2 items-stretch">
            <BranchSelector
              branches={viewModel.branchOptions}
              selectedLocationId={viewModel.selectedLocationId}
              selectedMachineType={viewModel.selectedMachineType}
              onLocationChange={viewModel.onLocationChange}
              onMachineTypeChange={viewModel.onMachineTypeChange}
            />

            <StatusSummary
              branchName={viewModel.selectedBranch.name}
              total={viewModel.summary.total}
              available={viewModel.summary.available}
              inUse={viewModel.summary.inUse}
              finishingSoon={viewModel.summary.finishingSoon}
            />
          </div>

          <Separator />

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
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
          </div>
        </div>
      </section>

      <section
        id="pricing"
        className="section-gap px-4 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-7xl rounded-[2rem] bg-muted/35 p-8 md:p-10">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-bold">Pricing</h2>
            <p className="mt-4 text-base leading-8 text-muted-foreground">
              Simple, transparent pricing - no surprises.
            </p>
          </div>
          <div className="mt-10">
            <PricingTable pricingItems={viewModel.pricingItems} />
          </div>
        </div>
      </section>

      <section
        id="process"
        className="section-gap bg-background px-4 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-bold">Pickup Flow</h2>
            <p className="mt-4 text-base leading-8 text-muted-foreground">
              You order, we collect, clean, and deliver.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {viewModel.processSteps.map((step, index) => (
              <article
                key={step.id}
                className="card-hover rounded-[1.6rem] border border-border bg-card p-6 shadow-sm"
              >
                <p className="text-xs font-bold uppercase tracking-widest text-primary">
                  Step 0{index + 1}
                </p>
                <h3 className="mt-3 font-bold">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-gap px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="section-shell rounded-[2rem] p-8 lg:grid lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Trusted locally
              </p>
              <h2 className="mt-4 font-bold leading-snug">
                Built for families, rentals, and neighbourhood businesses.
              </h2>
              <p className="mt-4 max-w-md text-base leading-8 text-muted-foreground">
                Everyday self-service, recurring household laundry, and reliable
                pickup coordination for higher-volume customers.
              </p>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-3 lg:mt-0">
              {viewModel.trustMetrics.map((metric) => (
                <div
                  key={metric.id}
                  className="metric-stripe rounded-[1.4rem] border border-border bg-white/70 px-5 py-6"
                >
                  <p className="text-4xl font-bold text-foreground">
                    {metric.value}
                  </p>
                  <p className="mt-2 text-sm font-medium leading-6 text-muted-foreground">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="section-gap bg-background px-4 sm:px-6 lg:px-8"
      >
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
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
          </div>

          <ContactCta
            title={viewModel.contactPanel.title}
            description={viewModel.contactPanel.description}
            primaryActionLabel={viewModel.contactPanel.primaryActionLabel}
            secondaryActionLabel={viewModel.contactPanel.secondaryActionLabel}
            contactNumber={viewModel.selectedBranch.contactNumber}
            branchAddress={viewModel.selectedBranch.address}
            onPrimaryAction={viewModel.onOpenPickupModal}
          />
        </div>
      </section>

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
        onClose={viewModel.onClosePickupModal}
        onFieldChange={viewModel.onPickupFieldChange}
        onSubmit={viewModel.onSubmitPickupRequest}
      />
    </main>
  );
}