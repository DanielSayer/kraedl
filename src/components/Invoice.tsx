import { formatCurrency } from "@/lib/currencyUtils";
import { format } from "date-fns";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Separator } from "./ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

export const Invoice = () => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="grid grid-cols-2">
          <div>
            <h1 className="text-3xl font-semibold leading-tight">Invoice</h1>
            <p className="text-muted-foreground">Invoice Number</p>
            <p>{invoiceNumber}</p>
            <p className="text-muted-foreground">Issue Date</p>
            <p>{format(invoiceDate, "dd MMM yyyy")}</p>
          </div>
          <div className="flex flex-col items-end">
            <h2>{businessName}</h2>
            <p>{businessEmail}</p>
            <p>{businessPhone}</p>
            <p>{billerAddress}</p>
          </div>
        </div>
        <Separator className="my-4" />
        <div className="grid grid-cols-2">
          <div>
            <p className="text-muted-foreground">Client</p>
            <p>{clientName}</p>
            <p>{clientEmail}</p>
          </div>
          <Card className="flex flex-col items-center p-4">
            <p>Balance Due:</p>
            <h2 className="text-2xl font-bold">{formatCurrency(grandTotal)}</h2>
            <h3 className="font-semibold ">
              Due date: {format(dueDate, "dd MMM yyyy")}
            </h3>
          </Card>
        </div>
        <Separator className="my-4" />
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/2">Description</TableHead>
              <TableHead className="text-end">Quantity</TableHead>
              <TableHead className="text-end">Price per</TableHead>
              <TableHead className="text-end">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {lineItems.map((d) => (
              <TableRow key={d.id}>
                <TableCell>{d.description}</TableCell>
                <TableCell className="text-end">{d.quantity}</TableCell>
                <TableCell className="text-end">
                  {formatCurrency(d.pricePer)}
                </TableCell>
                <TableCell className="text-end">
                  {formatCurrency(d.total)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Separator className="my-2" />
        <div className="text-end text-lg font-bold">
          Total: {formatCurrency(grandTotal)}
        </div>
        <Separator className="mb-4 mt-2" />
        <div>
          <Card>
            <CardHeader className="space-y-0">
              <h3 className="font-semibold">Payment Information</h3>
              <p className="text-sm text-muted-foreground">
                Please pay in cash or direct deposit to the details below
              </p>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <div className="text-muted-foreground">
                  <p>Account Name:</p>
                  <p>BSB:</p>
                  <p>Account:</p>
                </div>
                <div>
                  <p>{businessName}</p>
                  <p>{paymentDetails.bsb}</p>
                  <p>{paymentDetails.account}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

const invoiceNumber = "INV-001";
const businessName = "Jim's Whorehouse";
const businessEmail = "kindasus@jims.com";
const businessPhone = "0469 420 069";
const billerAddress = "5 Epic Street, Springfield California";
const clientName = "Joe Due";
const clientEmail = "joe@due.com";
const invoiceDate = new Date(2024, 3, 20);
const dueDate = new Date(2024, 8, 11);
const grandTotal = "181.50";
const paymentDetails = {
  bsb: "000 000",
  account: "123 456",
};

const lineItems = [
  {
    id: "1",
    description: "Widget A",
    quantity: "2",
    pricePer: "25.00",
    total: "50.00",
  },
  {
    id: "2",
    description: "Service B",
    quantity: "1",
    pricePer: "100.00",
    total: "100.00",
  },
  {
    id: "3",
    description: "Accessory C",
    quantity: "3",
    pricePer: "10.50",
    total: "31.50",
  },
];
