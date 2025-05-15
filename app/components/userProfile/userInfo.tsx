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
import InfoForm from "@/components/forms/profile/infoForm";
import UserMetaCard from "./userMetaCard";

export default function UserInfo({
  person,
}: {
  person?: {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    contactNumber: string;
  };
}) {
  return (
    <div>
      <UserMetaCard username={person?.username}></UserMetaCard>
      <Card className="p-5  lg:p-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <CardHeader className="text-lg font-semibold lg:mb-6">
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
                <div>
                  <p className="mb-2 text-xs leading-normal text-muted-foreground">
                    First Name
                  </p>
                  <p className="text-sm font-medium ">{person?.firstName}</p>
                </div>

                <div>
                  <p className="mb-2 text-xs leading-normal text-muted-foreground">
                    Last Name
                  </p>
                  <p className="text-sm font-medium ">{person?.lastName}</p>
                </div>

                <div>
                  <p className="mb-2 text-xs leading-normal text-muted-foreground">
                    Email address
                  </p>
                  <p className="text-sm font-medium ">{person?.email}</p>
                </div>

                <div>
                  <p className="mb-2 text-xs leading-normal text-muted-foreground">
                    Phone
                  </p>
                  <p className="text-sm font-medium">{person?.contactNumber}</p>
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
              <InfoForm person={person} intent="update-info">
                <DialogFooter>
                  <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                    <DialogClose asChild>
                      <Button size="sm" variant="outline">
                        Close
                      </Button>
                    </DialogClose>
                    <Button size="sm" type="submit">
                      Save Changes
                    </Button>
                  </div>
                </DialogFooter>
              </InfoForm>
            </DialogContent>
          </Dialog>
        </div>
      </Card>
    </div>
  );
}
