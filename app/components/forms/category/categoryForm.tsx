import { useForm, type Control, type FieldValues } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFetcher, useSubmit } from "react-router";
import { CategorySchema } from "~/zodSchemas/categorySchema";
import type { Category } from "~/components/columns/categoryColumn";
import { Textarea } from "~/components/ui/textarea";
import DialogFooterButtons from "~/components/modals/dialogFooterButtons";

const formSchema = CategorySchema;

export default function CategoryForm({
  category,
  method,
  intent,
  children,
}: {
  category?: Category;
  method?: string;
  intent: string;
  children?: React.ReactNode | undefined;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: category?.id,
      name: category?.name,
      description: category?.description,
    },
  });
  const fetcher = useFetcher();

  function onSubmit(values: z.infer<typeof formSchema>) {
    fetcher.submit(
      { ...values, intent: intent },
      {
        encType: "application/json",
        method: "POST",
      }
    );
  }

  return (
    <Form {...form}>
      <fetcher.Form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="overflow-y-auto px-2 pb-3">
          <div className="mt-7">
            <h5 className="mb-5 text-lg font-medium lg:mb-6">Категория</h5>
            <div className="grid grid-cols-1 gap-x-6 gap-y-5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Название</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Описание</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooterButtons
              formState={fetcher.state}
              isDirty={form.formState.isDirty}
            ></DialogFooterButtons>
          </div>
        </div>
      </fetcher.Form>
    </Form>
  );
}
