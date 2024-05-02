import { Icons } from "@/components/Icons";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPhoneNumber } from "@/lib/phoneNumberUtils";
import { cn } from "@/lib/utils";
import type { Client } from "@/types/clients";
import Link from "next/link";

type ClientPreviewProps = {
  client: Client | null;
};
type ClientInfoProps = {
  client: Client;
};

const ClientPreview = ({ client }: ClientPreviewProps) => {
  return (
    <Card className="relative mt-4 hidden w-1/4 bg-muted lg:block">
      {!client ? (
        <div className="h-full">
          <div className="grid h-full place-items-center">
            <div className="flex flex-col">
              <Icons.ghost className="mx-auto mb-4 text-muted-foreground" />
              Select a user to quick view their profile
            </div>
          </div>
        </div>
      ) : (
        <ClientInfo client={client} />
      )}
    </Card>
  );
};

const ClientInfo = ({ client }: ClientInfoProps) => {
  return (
    <>
      <Link
        href={`/clients/${client.id}`}
        className={cn(
          buttonVariants({
            variant: "outline",
            className:
              "absolute right-4 mt-4 aspect-square px-2 text-muted-foreground",
          }),
          "rounded-full",
        )}
      >
        <Icons.edit className="h-5 w-5" />
      </Link>
      <CardHeader>
        <CardTitle className="text mt-16 flex flex-col gap-4 text-center">
          <Icons.sun className="mx-auto" />
          {client.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <hr />
        <p className="mt-8 text-lg font-semibold">Contact Info</p>
        <hr className="my-4" />
        <span className="ms-4 flex items-center text-muted-foreground">
          <Icons.mail className="me-2" />
          {client.email}
        </span>
        <hr className="my-4" />
        <span className="ms-4 flex items-center text-muted-foreground">
          <Icons.phone className="me-2" />
          {formatPhoneNumber(client?.phoneNumber)}
        </span>
        <hr className="my-4" />
        <span className="ms-4 flex items-center text-muted-foreground">
          <Icons.location className="me-2" />
          10 Epic Ave, Oakland
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
    </>
  );
};

export default ClientPreview;
