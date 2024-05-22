//Note these are all in the context of an invoice
import type { api } from "@/trpc/server";
import type { BankAccount } from "./bankAccounts";
import type { State } from "./misc";

export type InvoiceFromApi = Awaited<ReturnType<typeof api.invoices.getById>>;

export type Business = {
  name: string;
  address: string;
  suburb: string;
  city: string;
  postcode: string;
  state: State;
  phoneNumber: string;
  bankAccount: BankAccount | undefined;
};

export type Client = {
  id: string;
  name: string;
  phoneNumber: string;
  businessId: string;
  email: string;
  clientAddress: ClientAddress | undefined;
};

type ClientAddress = {
  state: "ACT" | "NSW" | "NT" | "QLD" | "SA" | "TAS" | "WA";
  streetAddress: string;
  suburb: string;
  city: string;
  postcode: string;
  clientId: string;
};

export type Invoice = {
  id: string;
  clientId: string;
  invoiceNumber: number;
  total: string;
  issueDate: string;
  invoicedAt: Date | null;
  dueDate: string;
  lineItems: LineItem[];
};

type LineItem = {
  id: string;
  name: string;
  quantity: string;
  pricePer: string;
};

export type InvoiceStatus = "DRAFT" | "PAID" | "OVERDUE" | "INVOICED";
