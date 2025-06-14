import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import Spinner from "../ui/loading-spinner";

export default function CloseSaveButtons({
  formState,
  isDirty,
}: {
  formState?: string;
  isDirty?: boolean;
}) {
  const isSubmitting = formState === "submitting";

  return (
    <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
      <DialogClose asChild>
        <Button size="sm" variant="outline">
          Закрыть
        </Button>
      </DialogClose>
      <Button size="sm" type="submit" disabled={isSubmitting || isDirty}>
        {isSubmitting ? <Spinner className=""></Spinner> : "Сохранить"}
      </Button>
    </div>
  );
}
