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
    <Card aria-labelledby="contact-cta-heading" className="rounded-[2rem] border-border bg-card/95 text-card-foreground shadow-lg shadow-black/[0.05]">
      <CardHeader className="space-y-4 pb-3">
        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700">
          <Truck className="size-3.5" />
          Pickup Service
        </div>
        <CardTitle id="contact-cta-heading" className="text-3xl font-semibold leading-tight sm:text-4xl">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <p className="max-w-3xl text-base leading-8 text-muted-foreground">{description}</p>
        <div className="grid gap-3 text-base text-muted-foreground">
          <div className="flex items-start gap-3 rounded-2xl border border-sky-100 bg-sky-50/70 p-4">
            <MapPin className="mt-1 size-4 shrink-0 text-sky-700" />
            <span className="leading-7">{branchAddress}</span>
          </div>
          <div className="flex items-start gap-3 rounded-2xl border border-amber-100 bg-amber-50/70 p-4">
            <PhoneCall className="mt-1 size-4 shrink-0 text-amber-700" />
            <span className="leading-7">{contactNumber}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button
            type="button"
            className="rounded-xl px-5"
            onClick={onPrimaryAction}
          >
            {primaryActionLabel}
          </Button>
          <Button asChild variant="outline" className="rounded-xl px-5">
            <a href={`tel:${contactNumber}`}>{secondaryActionLabel}</a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
