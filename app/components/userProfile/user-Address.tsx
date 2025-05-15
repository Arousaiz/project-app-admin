import { Pencil } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "../ui/dialog";
import AddressForm from "@/components/forms/profile/addressForm";

export default function UserAddress({
  address,
}: {
  address?: {
    id: string;
    city: string;
    street: string;
    house: number;
  };
}) {
  return (
    <Card className="p-5  lg:p-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <CardHeader className="text-lg font-semibold lg:mb-6">
            <CardTitle>Address</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
              <div>
                <p className="mb-2 text-xs leading-normal text-muted-foreground">
                  City
                </p>
                <p className="text-sm font-medium ">{address?.city}</p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-muted-foreground">
                  Street
                </p>
                <p className="text-sm font-medium ">{address?.street}</p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-muted-foreground">
                  House
                </p>
                <p className="text-sm font-medium ">{address?.house}</p>
              </div>
            </div>
          </CardContent>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="rounded-2xl">
              <Pencil className="size-4" />
              Edit
            </Button>
          </DialogTrigger>
          <DialogContent>
            <AddressForm address={address} intent={"update-address"}>
              <DialogFooter>
                <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                  <DialogClose asChild>
                    <Button size="sm" variant="outline" onClick={() => {}}>
                      Close
                    </Button>
                  </DialogClose>
                  <Button size="sm" onClick={() => {}}>
                    Save Changes
                  </Button>
                </div>
              </DialogFooter>
            </AddressForm>
          </DialogContent>
        </Dialog>
      </div>
    </Card>
  );
}
