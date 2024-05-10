import { formatCurrency } from "@/lib/currencyUtils";
import { Card, CardContent } from "./ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { format } from "date-fns";
import { Separator } from "./ui/separator";

export const Invoice = () => {
  return (
    <Card>
      <CardContent>
        <div className="grid grid-cols-2">
          <div>
            <h1>Invoice</h1>
            <p className="text-muted-foreground">Invoice Number</p>
            <p>{invoiceNumber}</p>
            <p className="text-muted-foreground">Issue Date</p>
            <p>{format(invoiceDate, "dd MMM yyyy")}</p>
          </div>
          <div>
            <h2>{businessName}</h2>
            <p>{businessEmail}</p>
            <p>{businessPhone}</p>
            <p>{billerAddress}</p>
          </div>
        </div>
        <Separator />
        <div className="grid grid-cols-2">
          <div>
            <p className="text-muted-foreground">Client</p>
            <p>{clientName}</p>
            <p>{clientEmail}</p>
          </div>
          <div>
            <p>Balance Due</p>
            <h2>{grandTotal}</h2>
            <h3>Due date: {format(dueDate, "dd MMM yyyy")}</h3>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Description</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Price per</TableHead>
              <TableHead>Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {lineItems.map((d) => (
              <TableRow key={d.id}>
                <TableCell>{d.description}</TableCell>
                <TableCell>{d.quantity}</TableCell>
                <TableCell>{formatCurrency(d.pricePer)}</TableCell>
                <TableCell>{formatCurrency(d.total)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Separator />
        <div>Total: {grandTotal}</div>
        <Separator />
        <div>
          <p>PaymentDetails</p>
          <p>BSB: {paymentDetails.bsb}</p>
          <p>Account: {paymentDetails.account}</p>
        </div>
      </CardContent>
    </Card>
  );
};

const invoiceNumber = "INV-001";
const businessName = "Jims Whorehouse";
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
