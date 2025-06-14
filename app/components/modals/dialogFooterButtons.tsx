import { DialogFooter } from "../ui/dialog";
import CloseSaveButtons from "./closeSaveButtons";

export default function DialogFooterButtons({
  formState,
  isDirty,
}: {
  formState?: string;
  isDirty?: boolean;
}) {
  return (
    <DialogFooter>
      <CloseSaveButtons formState={formState}></CloseSaveButtons>
    </DialogFooter>
  );
}
