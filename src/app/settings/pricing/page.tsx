import { Icons } from "@/components/Icons";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency } from "@/lib/currencyUtils";
import NewPricingPackageButton from "./NewPricingPackageButton";

export default function Page() {
  return (
    <div>
      <div className="text-xl">Let&apos;s look into your pricing strategy!</div>
      <RadioGroup defaultValue="set" className="mt-4 flex items-center gap-16">
        <div className="flex items-center space-x-2">
          <Icons.info className="h-4 w-4 text-muted-foreground" />
          <RadioGroupItem value="set" id="set" />
          <Label htmlFor="set" className="text-xl">
            Set
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <Icons.info className="h-4 w-4 text-muted-foreground" />
          <RadioGroupItem value="value" id="value" />
          <Label htmlFor="value" className="text-xl">
            Value Based
          </Label>
        </div>
      </RadioGroup>
      <Separator className="my-4" />
      <h3 className="flex items-center justify-between text-2xl font-medium">
        Set Pricing Packages
        <NewPricingPackageButton />
      </h3>
      <p className="mt-2 text-muted-foreground">
        The packages below are just examples, once you add one of your own these
        will disappear
      </p>

      <Table className="mt-4">
        <TableHeader>
          <TableRow>
            <TableHead>Label</TableHead>
            <TableHead>Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {defaultSetPrices.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.label}</TableCell>
              <TableCell>{formatCurrency(item.price)}</TableCell>
              <TableCell>Edit</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

const defaultSetPrices = [
  {
    id: 1,
    label: "30min Session",
    price: 50,
  },
  {
    id: 2,
    label: "1hr Session",
    price: 80,
  },
  {
    id: 3,
    label: "All day Session",
    price: 300,
  },
];
