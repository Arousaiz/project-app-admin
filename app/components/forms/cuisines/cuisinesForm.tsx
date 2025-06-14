import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFetcher } from "react-router";
import { Textarea } from "~/components/ui/textarea";
import DialogFooterButtons from "~/components/modals/dialogFooterButtons";
import type { Cuisines } from "~/components/columns/cuisinesColumn";
import { CuisinesSchema } from "~/zodSchemas/cuisinesSchema";

const formSchema = CuisinesSchema;

export default function CuisinesForm({
  cuisine,
  method,
  intent,
  children,
}: {
  cuisine?: Cuisines;
  method?: string;
  intent: string;
  children?: React.ReactNode | undefined;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: cuisine?.id,
      name: cuisine?.name,
      description: cuisine?.description,
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
            <h5 className="mb-5 text-lg font-medium lg:mb-6">Тип кухни</h5>
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
