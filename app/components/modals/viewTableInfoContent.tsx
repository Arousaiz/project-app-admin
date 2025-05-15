import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function viewTableInfoContent({
  title,
  object,
}: {
  title: string;
  object: Object;
}) {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
      </DialogHeader>
      {Object.entries(object).map(([key, subject], i) => (
        <div className="flex flex-col my-2">
          <p className="font-light text-sm">{parseCamelCaseToLabel(key)}</p>
          <p className="">{subject}</p>
        </div>
      ))}
    </DialogContent>
  );
}

function parseCamelCaseToLabel(input: string): string {
  const withSpaces = input.replace(/([A-Z])/g, " $1");
  return withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1);
}
