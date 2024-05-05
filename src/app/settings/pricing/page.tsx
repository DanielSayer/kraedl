import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

export default function Page() {
  return (
    <div>
      <Card className="mt-4">
        <CardHeader>
          <div className="flex items-center justify-between font-semibold">
            Personal Information
            <Button variant="outline" className="flex rounded-3xl">
              <Icons.edit className="me-2 h-4 w-4" />
              Edit
            </Button>
          </div>
        </CardHeader>
        <CardContent className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="text-sm text-muted-foreground">Name</p>
            <p className="mt-2">Johnny</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Email</p>
            <p className="mt-2">johhny@email.ocm</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Phone Number</p>
            <p className="mt-2">911</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
