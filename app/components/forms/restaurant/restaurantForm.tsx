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
import { useFetcher, useLoaderData } from "react-router";
import type { Restaurant } from "~/components/columns/restaurantColumn";
import { RestaurantSchema } from "~/zodSchemas/restaurantSchema";
import { Separator } from "~/components/ui/separator";
import DialogFooterButtons from "~/components/modals/dialogFooterButtons";
import { FancyMultiSelect } from "~/components/ui/multi-select";
import type { clientLoader } from "~/routes/tables/restaurantTable";
import { instance } from "~/api/api.config";
import { toast } from "sonner";

const formSchema = RestaurantSchema;

export function formatTimeToHHMM(
  time: string | Date | undefined | null
): string | undefined {
  if (!time) return undefined;
  const date = typeof time === "string" ? new Date(`1970-01-01T${time}`) : time;
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

export default function RestaurantForm({
  restaurant,
  method,
  intent,
  isInDialog,
}: {
  restaurant?: Restaurant;
  method?: string;
  intent: string;
  isInDialog?: boolean;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: restaurant?.id,
      name: restaurant?.name,
      cuisines: restaurant?.cuisines,
      phone: restaurant?.phone,
      openTime: formatTimeToHHMM(restaurant?.openTime),
      closeTime: formatTimeToHHMM(restaurant?.closeTime),
      address: restaurant?.address,
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

  const { cuisines } = useLoaderData<typeof clientLoader>();

  return (
    <Form {...form}>
      <fetcher.Form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="overflow-y-auto px-2 pb-3">
          <div className="mt-7">
            <h5 className="mb-5 text-lg font-medium lg:mb-6">Ресторан</h5>
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
                name="img_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Изображение</FormLabel>
                    <FormControl>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;

                          try {
                            const response = await instance.post(
                              "/presigned-url",
                              {
                                type: "restaurant",
                                entityId: "Test",
                                fileName: file.name,
                                contentType: file.type,
                              }
                            );

                            const { key, url } = response.data;

                            const uploadResult = await fetch(url, {
                              method: "PUT",
                              headers: { "Content-Type": file.type },
                              body: file,
                            });

                            if (!uploadResult.ok) {
                              toast.error("Ошибка загрузки изображения");
                              return;
                            }

                            field.onChange(key);
                          } catch (error) {
                            toast.error(
                              "Ошибка при получении URL для загрузки"
                            );
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                    {field.value && (
                      <img
                        src={`https://pub-96480823ba5d4f44bb4d8cd67febd2f1.r2.dev/${field.value}`}
                        alt="Uploaded image"
                        className="mt-2 max-w-xs rounded"
                      />
                    )}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cuisines"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Категории/кухни</FormLabel>
                    <FormControl>
                      <FancyMultiSelect
                        value={field.value}
                        onChange={field.onChange}
                        cuisines={cuisines}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Телефон</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="openTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Закрыт до</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="closeTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Открыт до</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Separator></Separator>
              <p>Адрес</p>
              <Separator></Separator>
              <FormField
                control={form.control}
                name="address.city"
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
                name="address.street"
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
                name="address.house"
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
