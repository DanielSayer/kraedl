import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Combobox from "@/components/ui/combobox";
import { IconInput } from "@/components/ui/icon-input";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatCurrency, getTotalPrice } from "@/lib/currencyUtils";
import type { DropdownOption } from "@/types/components/dropdownItem";
import type { PricingLine } from "./PricingBuilder";

type PricingLineProps = {
  priceForItem: string;
  pricingLine: PricingLine;
  pricingOptions: DropdownOption[];
  updatePricingLines: <T extends keyof PricingLine>(
    id: string,
    key: T,
    value: PricingLine[T],
  ) => void;
  removePricingLine: (id: string) => void;
};

export const PricingLineRow = ({
  priceForItem,
  pricingLine,
  pricingOptions,
  updatePricingLines,
  removePricingLine,
}: PricingLineProps) => {
  return (
    <Card>
      <CardContent className="flex items-end justify-between p-6">
        <div className="grid w-11/12 grid-cols-6 gap-4">
          <div className="col-span-3 space-y-1">
            <Label htmlFor="pricing">Pricing Name</Label>
            <Combobox
              id="pricing"
              onChange={(e) =>
                updatePricingLines(pricingLine.id, "pricingNameId", e.value)
              }
              options={pricingOptions}
              value={pricingLine.pricingNameId}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              type="number"
              step={0.5}
              min={0}
              value={pricingLine.quantity}
              onChange={(e) =>
                updatePricingLines(pricingLine.id, "quantity", e.target.value)
              }
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="price_per">Price per</Label>
            <IconInput
              startIcon={Icons.money}
              id="price_per"
              readOnly
              disabled
              value={formatCurrency(priceForItem)}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="total">Total Price</Label>
            <IconInput
              startIcon={Icons.money}
              id="total"
              readOnly
              disabled
              value={getTotalPrice(pricingLine.quantity, priceForItem)}
            />
          </div>
        </div>
        <div className="me-4">
          <Button
            className="hover:bg-destructive hover:text-background"
            variant="outline"
            size="icon"
            onClick={() => removePricingLine(pricingLine.id)}
          >
            <Icons.delete className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
