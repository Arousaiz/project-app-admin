import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useFetcher, useSubmit } from "react-router";

export default function DeleteConfirmation({ id }: { id: string }) {
  const fetcher = useFetcher();
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Вы уверены?</AlertDialogTitle>
        <AlertDialogDescription>
          Это действие невозможно отменить. Данные будут утеряны навсегда.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Отмена</AlertDialogCancel>
        <AlertDialogAction
          onClick={() => {
            fetcher.submit(
              { id: id, intent: "delete" },
              {
                encType: "application/json",
                method: "POST",
              }
            );
          }}
        >
          Продолжить
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}
