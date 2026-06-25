import type { FormEvent, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { AmbientBackground } from '../AmbientBackground/AmbientBackground';
import { WashlineLogo } from '../WashlineLogo/WashlineLogo';

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
    <main id="top" className="min-h-screen bg-transparent text-foreground">
      <AmbientBackground />

      {/* ================================================================
          Header — brand mark pinned to the top-left, matching the
          Dashboard navbar's spacing, radius, and surface treatment.
          ================================================================ */}
      <div className="fixed left-4 top-4 z-50 sm:left-6 lg:left-8">
        <Link
          to="/"
          aria-label="Washline home"
          className="inline-flex items-center rounded-2xl border border-border/60 bg-white/80 px-3 py-2 shadow-lg shadow-black/[0.06] backdrop-blur-xl transition-all hover:bg-white/95 active:scale-[0.98]"
        >
          <WashlineLogo size={28} className="sm:[&_span:last-child]:text-base" />
        </Link>
      </div>

      <section className="mx-auto grid min-h-screen max-w-7xl items-center gap-10 px-4 pb-10 pt-20 sm:px-6 sm:pt-24 lg:grid-cols-[minmax(0,1.08fr)_minmax(360px,470px)] lg:px-8 lg:pb-16 lg:pt-24">
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="space-y-5">
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
        </motion.div>

        <motion.div
          className="hero-surface w-full rounded-[2rem] p-6 sm:p-8"
          initial={{ opacity: 0, y: 18, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative grid grid-cols-2 rounded-2xl bg-muted/80 p-1.5">
            <motion.div
              layout
              transition={{ type: 'spring', stiffness: 380, damping: 32 }}
              className={cn(
                'absolute inset-y-1.5 w-[calc(50%-0.1875rem)] rounded-xl bg-white shadow-sm',
                activeRoute === 'signup' ? 'left-[calc(50%+0.1875rem)]' : 'left-1.5',
              )}
            />
            <Link
              to="/login"
              className={cn(
                'relative z-10 flex h-11 items-center justify-center rounded-xl text-sm font-semibold transition-colors',
                activeRoute === 'login' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
              )}
            >
              Log in
            </Link>
            <Link
              to="/signup"
              className={cn(
                'relative z-10 flex h-11 items-center justify-center rounded-xl text-sm font-semibold transition-colors',
                activeRoute === 'signup' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
              )}
            >
              Sign up
            </Link>
          </div>

          <motion.div
            key={activeRoute}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 space-y-3"
          >
            <p className="text-sm font-medium text-primary">Member access</p>
            <h2 className="text-3xl font-semibold leading-tight sm:text-4xl">
              {formTitle}
            </h2>
            <p className="max-w-xl text-base leading-7 text-muted-foreground">
              {formSubtitle}
            </p>
          </motion.div>

          <motion.form
            key={`${activeRoute}-form`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.05 }}
            className="mt-8 space-y-4"
            onSubmit={onSubmit}
          >
            {children}

            <motion.div whileTap={{ scale: 0.98 }}>
              <Button
                type="submit"
                disabled={submitDisabled}
                className="h-12 w-full rounded-xl bg-primary text-sm font-semibold text-primary-foreground shadow-[0_12px_30px_rgba(14,165,233,0.25)] hover:bg-primary/90 disabled:opacity-60"
              >
                {submitLabel}
              </Button>
            </motion.div>
          </motion.form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            {footerPrompt}{' '}
            <Link to={footerLinkTo} className="font-semibold text-primary underline underline-offset-4">
              {footerLinkLabel}
            </Link>
          </p>
        </motion.div>
      </section>

      <div className="bg-primary px-4 py-3 text-center text-sm text-primary-foreground sm:px-6 lg:px-8">
        123 Aurora Blvd, Quezon City
      </div>
    </main>
  );
}
