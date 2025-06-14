import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import ViewTableInfoContent from "./viewTableInfoContent";

export default function ViewTableInfo({
  children,
  title,
  object,
}: {
  children: React.ReactElement;
  title: string;
  object: Object;
}) {
  return (
    <Dialog>
      <DialogTrigger className="hover:text-primary/50">
        {children}
      </DialogTrigger>
      <ViewTableInfoContent
        title={title}
        rowData={object}
      ></ViewTableInfoContent>
    </Dialog>
  );
}
