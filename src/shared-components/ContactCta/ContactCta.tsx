import { MapPin, PhoneCall, Truck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
interface ContactCtaProps {
  title: string;
  description: string;
  primaryActionLabel: string;
  secondaryActionLabel: string;
  contactNumber: string;
  branchAddress: string;
  onPrimaryAction: () => void;
}

export function ContactCta({
  title,
  description,
  primaryActionLabel,
  secondaryActionLabel,
  contactNumber,
  branchAddress,
  onPrimaryAction,
}: ContactCtaProps): JSX.Element {
  return (
    <Card aria-labelledby="contact-cta-heading" className="rounded-none border-primary bg-primary text-primary-foreground shadow-none">
      <CardHeader className="space-y-3">
        <div className="inline-flex w-fit items-center gap-2 border border-primary-foreground/30 px-3 py-1 font-mono text-xs uppercase tracking-[0.18em]">
          <Truck className="size-3.5" />
          Pickup Service
        </div>
        <CardTitle id="contact-cta-heading" className="text-3xl font-black uppercase sm:text-4xl">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <p className="max-w-2xl text-primary-foreground/80">{description}</p>
        <div className="grid gap-3 text-sm text-primary-foreground/80 sm:grid-cols-2">
          <div className="flex items-start gap-2">
            <MapPin className="mt-0.5 size-4 shrink-0" />
            <span>{branchAddress}</span>
          </div>
          <div className="flex items-start gap-2">
            <PhoneCall className="mt-0.5 size-4 shrink-0" />
            <span>{contactNumber}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button
            type="button"
            variant="secondary"
            className="rounded-none bg-primary-foreground text-primary hover:bg-primary-foreground/90"
            onClick={onPrimaryAction}
          >
            {primaryActionLabel}
          </Button>
          <Button asChild variant="outline" className="rounded-none border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
            <a href={`tel:${contactNumber}`}>{secondaryActionLabel}</a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
