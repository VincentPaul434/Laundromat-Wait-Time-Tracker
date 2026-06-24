import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { PricingItem } from '../../features/dashboard/model/dashboard.model';

interface PricingTableProps {
  pricingItems: PricingItem[];
}

export function PricingTable({ pricingItems }: PricingTableProps): JSX.Element {
  const categories = Array.from(new Set(pricingItems.map((pricingItem) => pricingItem.category)));

  return (
    <div aria-labelledby="pricing-heading" className="grid gap-8 lg:grid-cols-2">
      {categories.map((category) => (
        <section key={category} className="rounded-2xl border border-border bg-card/95 p-6 shadow-sm">
          <h3 className="mb-4 text-xl font-semibold">{category}</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Service</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pricingItems.filter((pricingItem) => pricingItem.category === category).map((pricingItem) => (
                <TableRow key={pricingItem.id}>
                  <TableCell className="font-medium text-foreground">{pricingItem.serviceLabel}</TableCell>
                  <TableCell className="text-muted-foreground">{pricingItem.description}</TableCell>
                  <TableCell className="text-right font-semibold text-foreground">{pricingItem.priceLabel}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>
      ))}
    </div>
  );
}
