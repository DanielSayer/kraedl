import { Card, CardHeader, CardContent } from "@/components/ui/card";

type BankDetailsProps = {
  bankDetails?: {
    bsb: string;
    accountNumber: string;
    accountName: string;
  };
};

export const BankDetails = ({ bankDetails }: BankDetailsProps) => {
  return (
    <Card>
      <CardHeader className="space-y-0">
        <h3 className="font-semibold">Payment Information</h3>
        <p className="text-sm text-muted-foreground">
          Please pay in cash or direct deposit to the details below
        </p>
      </CardHeader>
      <CardContent>
        {!!bankDetails ? (
          <div className="flex gap-2">
            <div className="text-muted-foreground">
              <p>Account Name:</p>
              <p>BSB:</p>
              <p>Account:</p>
            </div>
            <div>
              <p>{bankDetails.accountName}</p>
              <p>{bankDetails.bsb}</p>
              <p>{bankDetails.accountNumber}</p>
            </div>
          </div>
        ) : (
          <div>
            Bank details have not been assigned, assign them in settings
          </div>
        )}
      </CardContent>
    </Card>
  );
};
