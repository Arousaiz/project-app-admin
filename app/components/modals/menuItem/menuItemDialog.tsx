import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import AddButton from "~/components/buttons/addButton";
import type { Restaurant } from "~/components/columns/restaurant/restaurantColumn";
import MenuItemDialogContext from "./menuItemDialogContext";
import type { MenuItem } from "~/components/columns/menuItem/menuItemColumn";

export default function MenuItemDialog({
  intent,
  menuItem,
}: {
  intent: string;
  menuItem?: MenuItem;
}) {
  return (
    <Dialog>
      <DialogTrigger>
        <AddButton />
      </DialogTrigger>
      <MenuItemDialogContext
        intent={intent}
        menuItem={menuItem}
      ></MenuItemDialogContext>
    </Dialog>
  );
}
