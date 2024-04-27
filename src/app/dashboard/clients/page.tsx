import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { customerData } from "./tempData";
import { formatLocation } from "@/lib/locationUtils";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import DialogButton from "@/components/DialogButton";
import AddClientModalContent from "./AddClientModal";

export default function Page() {
  const demoGuy = customerData[0];

  return (
    <div className="mt-4">
      <div className="mx-40 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Clients</h1>
        <DialogButton
          buttonContent={
            <>
              <Icons.add className="me-2 h-4 w-4" /> Add Client
            </>
          }
        >
          <AddClientModalContent />
        </DialogButton>
      </div>
      <div className="mt-6 grid grid-cols-4">
        <div className="col-span-3 w-full">
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
              {customerData.map((client) => (
                <TableRow key={client.id}>
                  <TableCell className="font-medium">{client.name}</TableCell>
                  <TableCell>{client.email}</TableCell>
                  <TableCell>{client.phoneNumber}</TableCell>
                  <TableCell>{client.suburb}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <Card className="relative mt-4 bg-muted">
          <Button
            variant="outline"
            className="absolute right-4 mt-4 aspect-square rounded-full px-2 text-muted-foreground"
          >
            <Icons.edit className="h-5 w-5" />
          </Button>
          <CardHeader>
            <CardTitle className="text mt-16 flex flex-col gap-4 text-center">
              <Icons.sun className="mx-auto" />
              {demoGuy?.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <hr />
            <p className="mt-8 text-lg font-semibold">Contact Info</p>
            <hr className="my-4" />
            <span className="ms-4 flex items-center text-muted-foreground">
              <Icons.mail className="me-2" />
              {demoGuy?.email}
            </span>
            <hr className="my-4" />
            <span className="ms-4 flex items-center text-muted-foreground">
              <Icons.phone className="me-2" />
              {demoGuy?.phoneNumber}
            </span>
            <hr className="my-4" />
            <span className="ms-4 flex items-center text-muted-foreground">
              <Icons.location className="me-2" />
              {formatLocation(
                demoGuy?.streetAddress ?? "",
                demoGuy?.suburb ?? "",
              )}
            </span>
            <hr className="my-4" />

            <Link
              href={"/dashboard/transactions"}
              className="mt-8 flex items-center text-lg font-semibold"
            >
              Past Transactions <Icons.arrowRight className="ms-2" />
            </Link>
            <hr className="mb-3 mt-4" />
            <span className="ms-4 flex items-center justify-between text-muted-foreground">
              $50 (24 Apr 2024)
              <Badge variant="secondary">PENDING</Badge>
            </span>
            <hr className="my-3" />
            <span className="ms-4 flex items-center justify-between text-muted-foreground">
              $50 (17 Apr 2024)
              <Badge>PAID</Badge>
            </span>
            <hr className="my-3" />
            <span className="ms-4 flex items-center justify-between text-muted-foreground">
              $50 (10 Apr 2024)
              <Badge>PAID</Badge>
            </span>
            <hr className="my-3" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
