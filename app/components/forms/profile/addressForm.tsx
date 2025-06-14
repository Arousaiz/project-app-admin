import { useForm } from "react-hook-form";
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
import { addressSchema } from "~/zodSchemas/profileSchema";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFetcher, useSubmit } from "react-router";
import Spinner from "~/components/ui/loading-spinner";

const formSchema = addressSchema;

export default function AddressForm({
  address,
  intent,
  children,
}: React.PropsWithChildren<{
  address?: {
    id: string;
    city: string;
    street: string;
    house: number;
  };
  intent: string;
}>) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      city: address?.city,
      street: address?.street,
      house: address?.house,
    },
  });
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";

  function onSubmit(values: z.infer<typeof formSchema>) {
    fetcher.submit(
      { ...values, intent: intent },
      {
        encType: "application/json",
        method: "PUT",
      }
    );
  }

  return (
    <Form {...form}>
      <fetcher.Form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="overflow-y-auto px-2 pb-3">
          <div className="mt-7">
            <div className="grid grid-cols-1 gap-x-6 gap-y-5 ">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Город</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="street"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Улица</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="house"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Дом</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              size="sm"
              type="submit"
              className="my-4"
              disabled={isSubmitting || form.formState.isDirty}
            >
              {isSubmitting ? <Spinner className=""></Spinner> : "Сохранить"}
            </Button>
          </div>
        </div>
      </fetcher.Form>
    </Form>
  );
}
