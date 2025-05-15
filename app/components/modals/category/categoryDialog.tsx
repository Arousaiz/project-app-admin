import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddButton from "~/components/buttons/addButton";
import CategoryForm from "~/components/forms/category/categoryForm";
import CloseSaveButtons from "@/components/modals/closeSaveButtons";
import type { Category } from "~/components/columns/category/categoryColumn";
import CategoryDialogContext from "./categoryDialogContent";

export default function CategoryDialog({
  intent,
  category,
}: {
  intent: string;
  category?: Category;
}) {
  return (
    <Dialog>
      <DialogTrigger>
        <AddButton />
      </DialogTrigger>
      <CategoryDialogContext
        intent={intent}
        category={category}
      ></CategoryDialogContext>
    </Dialog>
  );
}
