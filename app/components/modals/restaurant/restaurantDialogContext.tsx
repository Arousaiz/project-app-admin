import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import CategoryForm from "~/components/forms/category/categoryForm";
import CloseSaveButtons from "../closeSaveButtons";
import type { Category } from "~/components/columns/category/categoryColumn";
import type { Restaurant } from "~/components/columns/restaurant/restaurantColumn";
import RestaurantForm from "~/components/forms/restaurant/restaurantForm";

export default function RestaurantDialogContext({
  intent,
  restaurant,
}: {
  intent: string;
  restaurant?: Restaurant;
}) {
  return (
    <DialogContent>
      <RestaurantForm intent={intent} restaurant={restaurant}>
        <DialogFooter>
          <CloseSaveButtons></CloseSaveButtons>
        </DialogFooter>
      </RestaurantForm>
    </DialogContent>
  );
}
