"use client";

import { Icons } from "@/components/Icons";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatPhoneNumber } from "@/lib/phoneNumberUtils";
import type { ClientWithAddress } from "@/types/clients";
import Link from "next/link";
import { useState } from "react";
import ClientPreview from "./ClientPreview";

type ClientViewProps = {
  clients: ClientWithAddress[];
};

const ClientView = ({ clients }: ClientViewProps) => {
  const [selectedClient, setSelectedClient] =
    useState<ClientWithAddress | null>(null);
  return (
    <div className="mt-6 flex flex-1">
      <MobileClientsView clients={clients} />
      <div className="hidden h-full w-full md:block lg:w-3/4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone Number</TableHead>
              <TableHead className="hidden lg:table-cell">Suburb</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clients.map((client) => (
              <TableRow
                className="cursor-pointer"
                key={client.id}
                onClick={() => setSelectedClient(client)}
              >
                <TableCell className="font-medium">{client.name}</TableCell>
                <TableCell>{client.email}</TableCell>
                <TableCell>{formatPhoneNumber(client.phoneNumber)}</TableCell>
                <TableCell>
                  <span className="hidden lg:inline">
                    {client.clientAddresses?.suburb ?? "Not set up"}
                  </span>
                  <Link
                    href={`/clients/${client.id}`}
                    className="inline lg:hidden"
                  >
                    <span className="flex items-center">
                      <Icons.edit className="me-2 h-4 w-4" /> View/Edit
                    </span>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <ClientPreview client={selectedClient} />
    </div>
  );
};

const MobileClientsView = ({ clients }: ClientViewProps) => {
  return (
    <div className="flex w-full flex-col gap-2 px-6 md:hidden">
      {clients.map((client) => (
        <Card
          key={client.id}
          className=" flex items-center justify-between p-2 px-4"
        >
          <div className="truncate">
            <h2>{client.name}</h2>
            <div className="text-sm text-muted-foreground">
              <div>{client.email}</div>
              <div>Ph: {formatPhoneNumber(client.phoneNumber)}</div>
              <div>Address coming soon!</div>
            </div>
          </div>
          <Link
            className={buttonVariants({ variant: "outline" })}
            href={`/clients/${client.id}`}
          >
            <Icons.arrowRight className="h-6 w-6" />
          </Link>
        </Card>
      ))}
    </div>
  );
};

export default ClientView;
