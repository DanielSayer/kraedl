import { formatCurrency, getTotalPrice } from "@/lib/currencyUtils";
import { formatPhoneNumber } from "@/lib/phoneNumberUtils";
import type { api } from "@/trpc/server";
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

type InvoiceProps = {
  invoice: Awaited<ReturnType<typeof api.invoices.getById>>;
};

export const Invoice = ({ invoice }: InvoiceProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="grid grid-cols-2">
          <div>
            <h1 className="text-3xl font-semibold leading-tight">Invoice</h1>
            <p className="text-muted-foreground">Invoice Number</p>
            <p>{invoice.invoiceNumber}</p>
            <p className="text-muted-foreground">Issue Date</p>
            <p>To do</p>
            {/* <p>{format(, "dd MMM yyyy")}</p> */}
          </div>
          <div className="flex flex-col items-end">
            <h2>{invoice.business.name}</h2>
            <p>{businessEmail}</p>
            <p>{formatPhoneNumber(invoice.business.phoneNumber)}</p>
            <p>{billerAddress}</p>
          </div>
        </div>
        <Separator className="my-4" />
        <div className="grid grid-cols-2">
          <div>
            <p className="text-muted-foreground">Client</p>
            <p>{invoice.client.name}</p>
            <p>{invoice.client.email}</p>
          </div>
          <Card className="flex flex-col items-center p-4">
            <p>Balance Due:</p>
            <h2 className="text-2xl font-bold">
              {formatCurrency(invoice.total)}
            </h2>
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
            {invoice.lineItems.map((d) => (
              <TableRow key={d.id}>
                <TableCell>{d.name}</TableCell>
                <TableCell className="text-end">{d.quantity}</TableCell>
                <TableCell className="text-end">
                  {formatCurrency(d.pricePer)}
                </TableCell>
                <TableCell className="text-end">
                  {getTotalPrice(d.pricePer, d.quantity)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Separator className="my-2" />
        <div className="text-end text-lg font-bold">
          Total: {formatCurrency(invoice.total)}
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
                  <p>{invoice.business.bankAccount?.accountName}</p>
                  <p>{invoice.business.bankAccount?.bsb}</p>
                  <p>{invoice.business.bankAccount?.accountNumber}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

const businessEmail = "kindasus@jims.com";
const billerAddress = "5 Epic Street, Springfield California";
const dueDate = new Date(2024, 8, 11);
