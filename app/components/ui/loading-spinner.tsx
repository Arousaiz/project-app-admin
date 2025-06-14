import { CircleIcon, LoaderCircle } from "lucide-react";

export default function Spinner({ className }: { className?: string }) {
  return (
    <div role="status">
      <LoaderCircle className={`w-8 h-8 animate-spin ${className}`} />
      <span className="sr-only">Loading...</span>
    </div>
  );
}
