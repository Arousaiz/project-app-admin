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

export default function CategoryDialogContext({
  intent,
  category,
}: {
  intent: string;
  category?: Category;
}) {
  return (
    <DialogContent>
      <CategoryForm intent={intent} category={category}>
        <DialogFooter>
          <CloseSaveButtons></CloseSaveButtons>
        </DialogFooter>
      </CategoryForm>
    </DialogContent>
  );
}
