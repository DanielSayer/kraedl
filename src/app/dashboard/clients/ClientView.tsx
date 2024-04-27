"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatPhoneNumber } from "@/lib/phoneNumberUtils";
import type { Client } from "@/types/clients";
import { useState } from "react";
import ClientPreview from "./ClientPreview";

type ClientViewProps = {
  clients: Client[];
};

const ClientView = ({ clients }: ClientViewProps) => {
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  return (
    <div className="mt-6 flex flex-1">
      <div className="h-full w-3/4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone Number</TableHead>
              <TableHead>Suburb</TableHead>
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
                <TableCell>Coming soon!</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <ClientPreview client={selectedClient} />
    </div>
  );
};

export default ClientView;
