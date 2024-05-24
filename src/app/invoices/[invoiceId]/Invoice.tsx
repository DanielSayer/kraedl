import { Card, CardContent, CardFooter } from "@/components/ui/card";
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
import { formatInvoiceNumber } from "@/lib/invoiceUtils";
import { formatPhoneNumber } from "@/lib/phoneNumberUtils";
import type { Business, Client, Invoice } from "@/types/invoices";
import { format } from "date-fns";
import type { RefObject } from "react";
import { BankDetails } from "./BankDetails";

type InvoiceProps = {
  printRef: RefObject<HTMLDivElement>;
  invoice: Invoice;
  business: Business;
  client: Client;
};

export const InvoicePreview = ({
  printRef,
  invoice,
  client,
  business,
}: InvoiceProps) => {
  return (
    <div ref={printRef}>
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-2">
            <div>
              <h1 className="text-3xl font-semibold leading-tight">Invoice</h1>
              <p className="text-muted-foreground">Invoice Number</p>
              <p>{formatInvoiceNumber(invoice.invoiceNumber)}</p>
              <p className="text-muted-foreground">Issue Date</p>
              <p>{format(invoice.issueDate, "dd MMM yyyy")}</p>
            </div>
            <div className="flex flex-col items-end">
              <h2>{business.name}</h2>
              <p>{formatPhoneNumber(business.phoneNumber)}</p>
              <div className="flex flex-col items-end -space-y-0.5 tracking-tight">
                <p>{business.address}</p>
                <p>
                  {business.suburb}, {business.postcode}
                </p>
                <p>
                  {business.city} - {business.state}
                </p>
              </div>
            </div>
          </div>
          <Separator className="my-4" />
          <div className="grid grid-cols-2">
            <div>
              <p className="text-muted-foreground">Client</p>
              <p>{client.name}</p>
              <p>{client.email}</p>
              {client.clientAddress && (
                <div className="flex flex-col -space-y-0.5 tracking-tight">
                  <p>{client.clientAddress.streetAddress}</p>
                  <p>
                    {client.clientAddress.suburb},{" "}
                    {client.clientAddress.postcode}
                  </p>
                  <p>
                    {client.clientAddress.city} - {client.clientAddress.state}
                  </p>
                </div>
              )}
            </div>
            <Card className="flex flex-col items-center p-4">
              <p>Balance Due:</p>
              <h2 className="text-2xl font-bold">
                {formatCurrency(invoice.total)}
              </h2>
              <h3 className="font-semibold ">
                Due date: {format(invoice.dueDate, "dd MMM yyyy")}
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
                    {formatCurrency(d.totalPrice)}
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
          <BankDetails bankDetails={business.bankAccount} />
        </CardContent>
        <Separator className="mb-4" />
        <CardFooter className="justify-end pb-4">
          <p className="text-sm text-muted-foreground">POWERED BY KRAEDL</p>
        </CardFooter>
      </Card>
    </div>
  );
};
