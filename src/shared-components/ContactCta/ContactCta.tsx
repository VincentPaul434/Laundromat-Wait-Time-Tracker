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
    <Card aria-labelledby="contact-cta-heading" className="rounded-3xl border-border bg-card text-card-foreground shadow-sm">
      <CardHeader className="space-y-3">
        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
          <Truck className="size-3.5" />
          Pickup Service
        </div>
        <CardTitle id="contact-cta-heading" className="text-2xl font-semibold sm:text-3xl">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <p className="max-w-2xl text-sm leading-7 text-muted-foreground">{description}</p>
        <div className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
          <div className="flex items-start gap-2 rounded-2xl bg-muted/60 p-4">
            <MapPin className="mt-0.5 size-4 shrink-0 text-foreground" />
            <span>{branchAddress}</span>
          </div>
          <div className="flex items-start gap-2 rounded-2xl bg-muted/60 p-4">
            <PhoneCall className="mt-0.5 size-4 shrink-0 text-foreground" />
            <span>{contactNumber}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button
            type="button"
            className="rounded-lg"
            onClick={onPrimaryAction}
          >
            {primaryActionLabel}
          </Button>
          <Button asChild variant="outline" className="rounded-lg">
            <a href={`tel:${contactNumber}`}>{secondaryActionLabel}</a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
