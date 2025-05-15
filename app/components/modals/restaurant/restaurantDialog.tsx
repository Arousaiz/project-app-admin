import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import AddButton from "~/components/buttons/addButton";
import RestaurantDialogContext from "./restaurantDialogContext";
import type { Restaurant } from "~/components/columns/restaurant/restaurantColumn";

export default function RestaurantDialog({
  intent,
  restaurant,
}: {
  intent: string;
  restaurant?: Restaurant;
}) {
  return (
    <Dialog>
      <DialogTrigger>
        <AddButton />
      </DialogTrigger>
      <RestaurantDialogContext
        intent={intent}
        restaurant={restaurant}
      ></RestaurantDialogContext>
    </Dialog>
  );
}
