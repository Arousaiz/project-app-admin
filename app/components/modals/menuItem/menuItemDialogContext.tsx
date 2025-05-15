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
import type { MenuItem } from "~/components/columns/menuItem/menuItemColumn";
import MenuItemForm from "~/components/forms/menuItem/menuItemForm";

export default function MenuItemDialogContext({
  intent,
  menuItem,
}: {
  intent: string;
  menuItem?: MenuItem;
}) {
  return (
    <DialogContent>
      <MenuItemForm intent={intent} menuItem={menuItem}>
        <DialogFooter>
          <CloseSaveButtons></CloseSaveButtons>
        </DialogFooter>
      </MenuItemForm>
    </DialogContent>
  );
}
