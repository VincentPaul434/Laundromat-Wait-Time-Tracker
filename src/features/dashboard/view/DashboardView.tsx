import { ArrowDown, Camera, Clock3, Mail, MapPin, PhoneCall, Shirt, Sparkles, Truck, WashingMachine } from "lucide-react";
import { Link } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { BranchSelector } from '../../../shared-components/BranchSelector/BranchSelector';
import { ContactCta } from '../../../shared-components/ContactCta/ContactCta';
import { MachineCard } from '../../../shared-components/MachineCard/MachineCard';
import { PricingTable } from '../../../shared-components/PricingTable/PricingTable';
import { StatusSummary } from '../../../shared-components/StatusSummary/StatusSummary';
import { useDashboardViewModel } from '../viewmodel/useDashboardViewModel';

export function DashboardView(): JSX.Element {
  // View layer: renders UI only and delegates all behavior to the ViewModel.
  const viewModel = useDashboardViewModel();

  return (
    <main id="top" className="min-h-screen bg-background text-foreground">
      <div className="bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.32em] sm:px-6 lg:px-8">
          <span>{viewModel.selectedBranch.address}</span>
          <span>Mon - Sun 8AM - 8PM</span>
          <span>{viewModel.selectedBranch.contactNumber}</span>
        </div>
      </div>

      <div className="border-b border-border bg-muted">
        <div className="mx-auto grid max-w-7xl grid-cols-[1fr_auto] items-center gap-4 px-4 py-6 sm:px-6 md:grid-cols-[1fr_auto_1fr] lg:px-8">
          <Link to="/dashboard" className="font-mono text-sm uppercase tracking-[0.46em] text-foreground md:justify-self-start">
            ○ LAUNDRY○SHOP○
          </Link>
          <nav className="hidden items-center justify-center gap-10 font-black uppercase tracking-wide md:flex">
            <a href="#services">Services</a>
            <a href="#pricing">Pricing</a>
            <a href="#contact">Contact</a>
          </nav>
          <Button asChild className="justify-self-end rounded-none px-5 font-mono text-xs uppercase tracking-[0.18em]">
            <a href="#contact">Book Pickup</a>
          </Button>
        </div>
      </div>

      <header className="relative overflow-hidden bg-card">
        <div className="mx-auto grid min-h-[calc(100vh-8.5rem)] max-w-7xl place-items-center px-4 py-10 sm:px-6 lg:px-8">
          <div className="relative flex aspect-square w-[min(78vw,620px)] items-center justify-center">
            <div className="absolute inset-0 rounded-full border-[clamp(0.75rem,2.1vw,1.4rem)] border-primary" />
            <div className="absolute inset-[8%] rounded-full bg-muted" />
            <div className="absolute left-[23%] top-[18%] h-[64%] w-[9%] border-x border-primary/10 bg-background/75 shadow-[0_0_22px_rgba(0,0,0,0.08)]" />
            <div className="relative z-10 grid place-items-center text-center">
              <p className="mb-6 font-mono text-xs uppercase tracking-[0.46em] text-muted-foreground">
                Washline
              </p>
              <h1 className="max-w-[11ch] text-balance text-center text-5xl font-black uppercase leading-[0.8] tracking-tight sm:text-6xl lg:text-7xl">
                Laundromat
              </h1>
              <div className="mt-8 size-10 rounded-full border-[3px] border-primary" />
            </div>

            <a
              href="#services"
              aria-label="Scroll to services"
              className="absolute bottom-[7%] inline-flex size-14 items-center justify-center text-primary"
            >
              <ArrowDown className="size-12 stroke-[4]" />
            </a>

            <div className="absolute right-[-0.75rem] top-1/2 z-20 flex -translate-y-1/2 flex-col gap-4">
              {[PhoneCall, Mail, Camera].map((Icon, index) => (
                <a
                  key={index}
                  href={index === 0 ? `tel:${viewModel.selectedBranch.contactNumber}` : index === 1 ? "mailto:info@washline.test" : "#contact"}
                  aria-label={index === 0 ? "Call branch" : index === 1 ? "Email branch" : "Instagram"}
                  className="inline-flex size-11 items-center justify-center rounded-full bg-primary text-primary-foreground"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </header>

      <div className="bg-primary px-4 py-3 text-center font-mono text-[10px] uppercase tracking-[0.32em] text-primary-foreground sm:px-6 lg:px-8">
        {viewModel.selectedBranch.address}
      </div>

      <div className="border-b border-border bg-muted">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-4 px-4 py-5 text-center sm:px-6 md:grid-cols-3 lg:px-8">
          <p className="font-mono text-sm uppercase tracking-[0.44em]">○LAUNDRY○SHOP○</p>
          <a href="#services" className="text-xl font-black uppercase">Our Services</a>
          <a href="#pricing" className="text-xl font-black uppercase">Pricelist</a>
        </div>
      </div>

      <div className="flex flex-col">
        <section id="services" aria-labelledby="services-heading" className="bg-card px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <h2 id="services-heading" className="text-4xl font-black uppercase tracking-normal sm:text-5xl">
                Our Services
              </h2>
              <p className="mt-6 text-base leading-7 text-muted-foreground">
                A calm laundromat experience for walk-ins, drop-offs, pickups, and local businesses.
              </p>
            </div>

            <div className="mt-16 grid gap-x-10 gap-y-14 md:grid-cols-2 xl:grid-cols-4">
              {viewModel.serviceItems.map((service, index) => (
                <article key={service.id} className="space-y-5 text-center md:text-left">
                  <div className="mx-auto flex size-16 items-center justify-center rounded-full border-2 border-primary md:mx-0">
                    {index % 4 === 0 ? (
                      <WashingMachine className="size-7" />
                    ) : index % 4 === 1 ? (
                      <Shirt className="size-7" />
                    ) : index % 4 === 2 ? (
                      <Truck className="size-7" />
                    ) : (
                      <Sparkles className="size-7" />
                    )}
                  </div>
                  <div>
                    <Badge variant="outline" className="rounded-none font-mono text-[10px] uppercase tracking-[0.24em]">
                      {service.eyebrow}
                    </Badge>
                    <h3 className="mt-4 text-xl font-black uppercase">{service.title}</h3>
                  </div>
                  <p className="text-sm leading-7 text-muted-foreground">{service.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section aria-labelledby="machine-status-heading" className="bg-muted px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl space-y-12">
            <div className="mx-auto max-w-3xl text-center">
              <h2 id="machine-status-heading" className="text-4xl font-black uppercase tracking-normal sm:text-5xl">
                Machine Status
              </h2>
              <p className="mt-6 text-base leading-7 text-muted-foreground">
                Select a branch and check machine availability before you head out.
              </p>
            </div>

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

        <section id="pricing" className="bg-card px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl space-y-12">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-4xl font-black uppercase tracking-normal sm:text-5xl">Pricelist</h2>
              <p className="mt-6 text-base leading-7 text-muted-foreground">
                Simple pricing for garments, loads, and scheduled pickup.
              </p>
            </div>
            <PricingTable pricingItems={viewModel.pricingItems} />
          </div>
        </section>

        <section id="process" className="bg-muted px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-4xl font-black uppercase tracking-normal sm:text-5xl">Pickup Flow</h2>
              <p className="mt-6 text-base leading-7 text-muted-foreground">
                You order, we collect, we clean, we deliver.
              </p>
            </div>
            <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {viewModel.processSteps.map((step, index) => (
                <article key={step.id} className="border-t-2 border-primary pt-6">
                  <p className="font-mono text-xs uppercase tracking-[0.28em] text-muted-foreground">0{index + 1}</p>
                  <h3 className="mt-4 text-2xl font-black uppercase">{step.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-muted-foreground">{step.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-card px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.34em] text-muted-foreground">Trusted locally</p>
              <h2 className="mt-4 text-4xl font-black uppercase leading-tight sm:text-5xl">
                Built for families, rentals, and neighborhood businesses.
              </h2>
            </div>
            <div className="grid gap-5 sm:grid-cols-3">
              {viewModel.trustMetrics.map((metric) => (
                <div key={metric.id} className="border-l-2 border-primary pl-5">
                  <p className="text-4xl font-black">{metric.value}</p>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{metric.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="bg-muted px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.34em] text-muted-foreground">Contact</p>
              <h2 className="mt-4 text-4xl font-black uppercase leading-tight sm:text-5xl">
                Address, hours, and pickup booking.
              </h2>
              <div className="mt-10 grid gap-6 text-base leading-7 text-muted-foreground">
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 size-4 shrink-0 text-foreground" />
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.22em] text-foreground">Address</p>
                  <p>{viewModel.selectedBranch.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <PhoneCall className="mt-1 size-4 shrink-0 text-foreground" />
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.22em] text-foreground">Phone</p>
                  <p>{viewModel.selectedBranch.contactNumber}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock3 className="mt-1 size-4 shrink-0 text-foreground" />
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.22em] text-foreground">Hours</p>
                  <p>Mon - Fri: 8am - 8pm</p>
                  <p>Sat - Sun: 9am - 8pm</p>
                </div>
              </div>
              </div>
            </div>

            <ContactCta
              title={viewModel.contactPanel.title}
              description={viewModel.contactPanel.description}
              primaryActionLabel={viewModel.contactPanel.primaryActionLabel}
              secondaryActionLabel={viewModel.contactPanel.secondaryActionLabel}
              contactNumber={viewModel.selectedBranch.contactNumber}
              branchAddress={viewModel.selectedBranch.address}
            />
          </div>
        </section>

        <footer className="bg-card px-4 py-10 text-center sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-7xl flex-col items-center gap-5">
            <a href="#top" className="inline-flex flex-col items-center gap-2 text-2xl font-black uppercase">
              <ArrowDown className="size-10 rotate-180 stroke-[4]" />
              Back To Top
            </a>
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-muted-foreground">© 2035 by Washline Laundromat</p>
          </div>
        </footer>
      </div>
    </main>
  );
}
