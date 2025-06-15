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
import { profileSchema } from "~/zodSchemas/profileSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { useFetcher, useSubmit } from "react-router";
import Spinner from "~/components/ui/loading-spinner";

const formSchema = profileSchema;

export default function InfoForm({
  person,
  intent,
  children,
}: React.PropsWithChildren<{
  person?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    contactNumber: string;
  };
  intent: string;
}>) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: person?.id,
      firstName: person?.firstName,
      lastName: person?.lastName,
      email: person?.email,
      contactNumber: person?.contactNumber,
    },
  });

  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";

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
            <div className="grid grid-cols-1 gap-x-6 gap-y-5">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Имя</FormLabel>
                    <FormControl>
                      <Input placeholder="Иван" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Фамилия</FormLabel>
                    <FormControl>
                      <Input placeholder="Иванов" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Почта</FormLabel>
                    <FormControl>
                      <Input placeholder="example@gmail.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contactNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Телефон (в формате +375291133369)</FormLabel>
                    <FormControl>
                      <Input placeholder="+375291133369" {...field} />
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
              disabled={isSubmitting}
            >
              {isSubmitting ? <Spinner className=""></Spinner> : "Сохранить"}
            </Button>
          </div>
        </div>
      </fetcher.Form>
    </Form>
  );
}
