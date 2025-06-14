import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function ViewTableInfoContent({
  title,
  children,
  rowData,
}: {
  title: string;
  rowData: any;
  children?: React.ReactNode | undefined;
}) {
  return (
    <DialogContent className="max-w-screen-md max-h-screen overflow-y-auto p-6 sm:rounded-lg">
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
      </DialogHeader>
      <div className="flex flex-col my-2">
        {children ||
          Object.entries(rowData).map(([key, value]) => (
            <div key={key}>
              <strong className="capitalize">{key}:</strong> {String(value)}
            </div>
          ))}
      </div>
    </DialogContent>
  );
}

function parseCamelCaseToLabel(input: string): string {
  const withSpaces = input.replace(/([A-Z])/g, " $1");
  return withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1);
}
