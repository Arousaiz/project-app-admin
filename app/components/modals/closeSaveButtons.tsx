import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";

export default function CloseSaveButtons() {
  return (
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
  );
}
