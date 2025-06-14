import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddButton from "~/components/buttons/addButton";

export default function EntityCreateDialog({
  children,
}: {
  children?: React.ReactNode | undefined;
}) {
  return (
    <Dialog>
      <DialogTrigger>
        <AddButton />
      </DialogTrigger>
      <DialogHeader className="sr-only">
        <DialogTitle className="sr-only">Создать новый объект</DialogTitle>
      </DialogHeader>
      <DialogContent className="max-w-screen-md max-h-screen overflow-y-auto p-6 sm:rounded-lg">
        {children}
      </DialogContent>
    </Dialog>
  );
}
