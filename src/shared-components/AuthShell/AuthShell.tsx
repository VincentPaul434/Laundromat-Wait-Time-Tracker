import type { FormEvent, ReactNode } from 'react';
import { ArrowDown, Camera, Mail, PhoneCall } from 'lucide-react';
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
      <div className="bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.32em] sm:px-6 lg:px-8">
          <span>123 Aurora Blvd, Quezon City</span>
          <span>Mon - Sun 8AM - 8PM</span>
          <span>+63 912 345 6789</span>
        </div>
      </div>

      <div className="border-b border-border bg-muted">
        <div className="mx-auto grid max-w-7xl grid-cols-[1fr_auto] items-center gap-4 px-4 py-6 sm:px-6 md:grid-cols-[1fr_auto_1fr] lg:px-8">
          <Link
            to="/dashboard"
            className="text-sm font-light uppercase tracking-[0.46em] text-foreground md:justify-self-start"
          >
            LAUNDROMAT
          </Link>
          <nav className="hidden items-center justify-center gap-10 font-black uppercase tracking-wide md:flex">
            <Link to="/dashboard#services">Services</Link>
            <Link to="/dashboard#pricing">Pricing</Link>
            <Link to="/dashboard#contact">Contact</Link>
          </nav>
          <Button asChild className="justify-self-end rounded-none px-5 font-mono text-xs uppercase tracking-[0.18em]">
            <Link to="/dashboard#contact">Book Pickup</Link>
          </Button>
        </div>
      </div>

      <section className="mx-auto grid min-h-[calc(100vh-8.5rem)] max-w-7xl items-center gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_minmax(360px,520px)] lg:px-8">
        <div className="relative mx-auto flex aspect-square w-[min(78vw,560px)] items-center justify-center">
          <div className="absolute inset-0 rounded-full border-[clamp(0.75rem,2vw,1.25rem)] border-primary" />
          <div className="absolute inset-[8%] rounded-full bg-muted" />
          <div className="absolute left-[23%] top-[18%] h-[64%] w-[9%] border-x border-primary/10 bg-background/75 shadow-[0_0_22px_rgba(0,0,0,0.08)]" />
          <div className="relative z-10 grid place-items-center text-center">
            <p className="mb-6 text-xs font-light uppercase tracking-[0.46em] text-muted-foreground">
              Washline
            </p>
            <h1 className="max-w-[11ch] text-balance text-center text-5xl font-black uppercase leading-[0.8] tracking-tight sm:text-6xl lg:text-7xl">
              Laundromat
            </h1>
            <div className="mt-8 size-10 rounded-full border-[3px] border-primary" />
          </div>

          <Link
            to="/dashboard"
            aria-label="Go to dashboard"
            className="absolute bottom-[7%] inline-flex size-14 items-center justify-center text-primary"
          >
            <ArrowDown className="size-12 stroke-[4]" />
          </Link>

          <div className="absolute right-[-0.75rem] top-1/2 z-20 flex -translate-y-1/2 flex-col gap-4">
            {[PhoneCall, Mail, Camera].map((Icon, index) => (
              <a
                key={index}
                href={index === 0 ? 'tel:+639123456789' : index === 1 ? 'mailto:info@washline.test' : '#top'}
                aria-label={index === 0 ? 'Call branch' : index === 1 ? 'Email branch' : 'Social link'}
                className="inline-flex size-11 items-center justify-center rounded-full bg-primary text-primary-foreground"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="w-full border-t-2 border-primary pt-7">
          <div className="grid grid-cols-2 border border-primary">
            <Link
              to="/login"
              className={cn(
                'flex h-14 items-center justify-center font-black uppercase tracking-wide transition-colors',
                activeRoute === 'login'
                  ? 'bg-background text-primary'
                  : 'bg-primary text-primary-foreground',
              )}
            >
              Log-in
            </Link>
            <Link
              to="/signup"
              className={cn(
                'flex h-14 items-center justify-center font-black uppercase tracking-wide transition-colors',
                activeRoute === 'signup'
                  ? 'bg-background text-primary'
                  : 'bg-primary text-primary-foreground',
              )}
            >
              Sign-up
            </Link>
          </div>

          <div className="mt-8 space-y-3">
            <p className="text-xs font-light uppercase tracking-[0.34em] text-muted-foreground">
              Member access
            </p>
            <h2 className="text-4xl font-black uppercase leading-none tracking-normal sm:text-5xl">
              {formTitle}
            </h2>
            <p className="max-w-xl text-base font-light leading-7 text-muted-foreground">{formSubtitle}</p>
          </div>

          <form className="mt-8 space-y-4" onSubmit={onSubmit}>
            {children}

            <Button
              type="submit"
              disabled={submitDisabled}
              className="h-14 w-full rounded-none bg-primary text-xs font-bold uppercase tracking-[0.28em] text-primary-foreground hover:bg-primary/94"
            >
              {submitLabel}
            </Button>
          </form>

          <p className="mt-6 text-center text-xs font-light uppercase tracking-[0.22em] text-muted-foreground">
            {footerPrompt}{' '}
            <Link to={footerLinkTo} className="font-bold text-primary underline underline-offset-4">
              {footerLinkLabel}
            </Link>
          </p>
        </div>
      </section>

      <div className="bg-primary px-4 py-3 text-center font-mono text-[10px] uppercase tracking-[0.32em] text-primary-foreground sm:px-6 lg:px-8">
        123 Aurora Blvd, Quezon City
      </div>
    </main>
  );
}
