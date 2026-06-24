import type { FormEvent, ReactNode } from 'react';
import { Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AuthShellProps {
  activeRoute: 'login' | 'signup';
  formTitle: string;
  formSubtitle: string;
  submitLabel: string;
  submitDisabled: boolean;
  footerPrompt: string;
  footerLinkLabel: string;
  footerLinkTo: string;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
}

export function AuthShell({
  activeRoute,
  formTitle,
  formSubtitle,
  submitLabel,
  submitDisabled,
  footerPrompt,
  footerLinkLabel,
  footerLinkTo,
  onSubmit,
  children,
}: AuthShellProps): JSX.Element {
  return (
    <main id="top" className="min-h-screen bg-background text-foreground">
      <div className="border-b border-border/70 nav-glass">
        <div className="mx-auto grid max-w-7xl grid-cols-[auto_1fr] items-center gap-4 px-4 py-5 sm:px-6 lg:px-8">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 text-xl font-extrabold tracking-tight text-foreground"
          >
            <span className="inline-flex size-9 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Sparkles className="size-4" />
            </span>
            Washline
          </Link>

          <nav className="hidden items-center justify-end gap-1 md:flex">
            {[
              { to: '/dashboard#services', label: 'Services' },
              { to: '/dashboard#status', label: 'Status' },
              { to: '/dashboard#pricing', label: 'Pricing' },
              { to: '/dashboard#contact', label: 'Contact' },
              { to: '/dashboard#contact', label: 'Book Pickup' },
            ].map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-all hover:bg-accent hover:text-accent-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Link
            to="/dashboard#contact"
            className="justify-self-end rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-all hover:bg-accent hover:text-accent-foreground md:hidden"
          >
            Book Pickup
          </Link>
        </div>
      </div>

      <section className="mx-auto grid min-h-[calc(100vh-8.5rem)] max-w-7xl items-center gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1.08fr)_minmax(360px,470px)] lg:px-8 lg:py-16">
        <div className="space-y-8">
          <div className="space-y-5">
            {/* UPDATED: Changed background to bg-primary and text to text-primary-foreground */}
            <p className="inline-flex items-center rounded-full bg-primary px-4 py-1.5 text-sm font-semibold text-primary-foreground">
              Fresh laundry, better flow
            </p>
            <h1 className="max-w-[12ch] text-balance font-bold leading-tight text-gradient">
              Laundry operations with a cleaner customer experience.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
              Track branch activity, manage pickup requests, and keep essential
              service information easy to access with a bright, calm, premium
              interface.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="card-hover rounded-[1.5rem] border border-border bg-card/90 p-5 shadow-sm">
              <p className="text-3xl font-semibold">3 branches</p>
              <p className="mt-2 text-base leading-7 text-muted-foreground">
                Quick access to branch availability and contact details.
              </p>
            </div>
            <div className="card-hover rounded-[1.5rem] border border-border bg-card/90 p-5 shadow-sm">
              <p className="text-3xl font-semibold">Live status</p>
              <p className="mt-2 text-base leading-7 text-muted-foreground">
                Machine usage and summary counts surfaced clearly.
              </p>
            </div>
            <div className="card-hover rounded-[1.5rem] border border-border bg-card/90 p-5 shadow-sm">
              <p className="text-3xl font-semibold">Pickup ready</p>
              <p className="mt-2 text-base leading-7 text-muted-foreground">
                Booking requests and service details in one smooth flow.
              </p>
            </div>
          </div>

          <div className="section-shell grid gap-4 rounded-[2rem] p-6 sm:grid-cols-2">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Hours</p>
              <p className="mt-2 text-sm leading-6 text-foreground">Mon - Sun 8AM - 8PM</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Support</p>
              <p className="mt-2 text-sm leading-6 text-foreground">+63 912 345 6789</p>
            </div>
          </div>
        </div>

        <div className="hero-surface w-full rounded-[2rem] p-6 sm:p-8">
          <div className="grid grid-cols-2 rounded-2xl bg-muted/80 p-1.5">
            <Link
              to="/login"
              className={cn(
                'flex h-11 items-center justify-center rounded-xl text-sm font-semibold transition-colors',
                activeRoute === 'login'
                  ? 'bg-white text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              Log in
            </Link>
            <Link
              to="/signup"
              className={cn(
                'flex h-11 items-center justify-center rounded-xl text-sm font-semibold transition-colors',
                activeRoute === 'signup'
                  ? 'bg-white text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              Sign up
            </Link>
          </div>

          <div className="mt-8 space-y-3">
            <p className="text-sm font-medium text-primary">Member access</p>
            <h2 className="text-3xl font-semibold leading-tight sm:text-4xl">
              {formTitle}
            </h2>
            <p className="max-w-xl text-base leading-7 text-muted-foreground">
              {formSubtitle}
            </p>
          </div>

          <form className="mt-8 space-y-4" onSubmit={onSubmit}>
            {children}

            <Button
              type="submit"
              disabled={submitDisabled}
              className="h-12 w-full rounded-xl bg-primary text-sm font-semibold text-primary-foreground shadow-[0_12px_30px_rgba(14,165,233,0.25)] hover:bg-primary/90"
            >
              {submitLabel}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            {footerPrompt}{' '}
            <Link to={footerLinkTo} className="font-semibold text-primary underline underline-offset-4">
              {footerLinkLabel}
            </Link>
          </p>
        </div>
      </section>

      <div className="bg-primary px-4 py-3 text-center text-sm text-primary-foreground sm:px-6 lg:px-8">
        123 Aurora Blvd, Quezon City
      </div>
    </main>
  );
}