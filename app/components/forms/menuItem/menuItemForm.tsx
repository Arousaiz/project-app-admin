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
import type { Category } from "~/components/columns/categoryColumn";
import { Textarea } from "~/components/ui/textarea";
import type { MenuItem } from "~/components/columns/menuItemColumn";
import { MenuItemSchema } from "~/zodSchemas/menuItemSchema";
import type { clientLoader } from "~/routes/tables/menuItemTable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import DialogFooterButtons from "~/components/modals/dialogFooterButtons";
import { instance } from "~/api/api.config";
import { toast } from "sonner";

const formSchema = MenuItemSchema;

export default function MenuItemForm({
  menuItem,
  method,
  intent,
  children,
}: {
  menuItem?: MenuItem;
  method?: string;
  intent: string;
  children?: React.ReactNode | undefined;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: menuItem?.id,
      name: menuItem?.name,
      description: menuItem?.description,
      price: menuItem?.price,
      category: menuItem?.category,
    },
  });
  const fetcher = useFetcher();

  function onSubmit(values: z.infer<typeof formSchema>) {
    values.category = categories.data.find(
      (c: Category) => c.name === values.category.name
    );
    fetcher.submit(
      { ...values, intent: intent },
      {
        encType: "application/json",
        method: "POST",
      }
    );
  }

  const { categories } = useLoaderData<typeof clientLoader>();

  return (
    <Form {...form}>
      <fetcher.Form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="overflow-y-auto px-2 pb-3">
          <div className="mt-7">
            <h5 className="mb-5 text-lg font-medium lg:mb-6">Предмет меню</h5>
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
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Цена</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category.name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Категория</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      required={true}
                    >
                      <FormControl className="min-w-60">
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.data.map((obj: Category) => {
                          return MakeItem(obj.name);
                        })}
                      </SelectContent>
                    </Select>
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

export function MakeItem(name: string, value?: Category) {
  return <SelectItem value={name}>{name}</SelectItem>;
}

export const valueToString = (val: any) => {
  if (val === null) return "__null__";
  if (val === undefined) {
    console.error("option value cannot be undefined");
    return "__undefined__";
  }
  if (val === Infinity) return "__Infinity__";
  if (val === -Infinity) return "__-Infinity__";
  if (Number.isNaN(val)) return "__NaN__";
  if (typeof val === "symbol") return `__symbol__${val.description}`;
  return JSON.stringify(val);
};

export const stringToValue = (str: string) => {
  switch (str) {
    case "__null__":
      return null;
    case "__undefined__":
      return undefined;
    case "__Infinity__":
      return Infinity;
    case "__-Infinity__":
      return -Infinity;
    case "__NaN__":
      return NaN;
    default:
      if (str.startsWith("__symbol__")) {
        return Symbol(str.slice(10));
      }
      return JSON.parse(str);
  }
};
