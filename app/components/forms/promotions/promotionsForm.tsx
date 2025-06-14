import { useForm, type Control, type FieldValues } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFetcher, useLoaderData, useSubmit } from "react-router";
import { CategorySchema } from "~/zodSchemas/categorySchema";
import type { Category } from "~/components/columns/category/categoryColumn";
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
import { PromotionsSchema } from "~/zodSchemas/promotionsSchema";
import {
  PromotionType,
  type Promotions,
} from "~/components/columns/promotionsColumn";
import { Checkbox } from "~/components/ui/checkbox";
import { format, parseISO } from "date-fns";

const formSchema = PromotionsSchema;

const isoToDateInputValue = (isoString?: string): string | undefined => {
  if (!isoString) return undefined;
  const date = new Date(isoString);
  if (isNaN(date.getTime())) return undefined;
  return format(parseISO(isoString), "yyyy-MM-dd");
};

export default function PromotionForm({
  promo,
  method,
  intent,
  children,
}: {
  promo?: Promotions;
  method?: string;
  intent: string;
  children?: React.ReactNode | undefined;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: promo?.id,
      title: promo?.title,
      description: promo?.description,
      discount: promo?.discount,
      menuItem: promo?.menuItem,
      startDate: isoToDateInputValue(promo?.startDate.toString()),
      endDate: isoToDateInputValue(promo?.endDate.toString()),
      promotionType: promo?.promotionType,
      requiredCount: promo?.requiredCount,
      isActive: promo?.isActive,
    },
  });
  const fetcher = useFetcher();

  function onSubmit(values: z.infer<typeof formSchema>) {
    values.menuItem = categories.data.find(
      (c: MenuItem) => c.name === values.menuItem.name
    );
    fetcher.submit(
      { ...values, intent: intent },
      {
        encType: "application/json",
        method: "POST",
      }
    );
  }

  const type = form.watch("promotionType");

  const { categories } = useLoaderData<typeof clientLoader>();

  return (
    <Form {...form}>
      <fetcher.Form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="overflow-y-auto px-2 pb-3">
          <div className="mt-7">
            <h5 className="mb-5 text-lg font-medium lg:mb-6">Акция</h5>
            <div className="grid grid-cols-1 gap-x-6 gap-y-5">
              <FormField
                control={form.control}
                name="title"
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
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Начало</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Конец</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="promotionType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Тип акции</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      required={true}
                    >
                      <FormControl className="min-w-60">
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите тип акции" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={PromotionType.DISCOUNT}>
                          Скидка
                        </SelectItem>
                        <SelectItem value={PromotionType.FREE_ITEM}>
                          Бесплатное блюдо
                        </SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
              {type === "discount" && (
                <FormField
                  control={form.control}
                  name="discount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Скидка</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              {type === "free item" && (
                <FormField
                  control={form.control}
                  name="requiredCount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Количество товара</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="menuItem.name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>акционный товар</FormLabel>
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
              <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Активен</FormLabel>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
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

export function MakeItem(name: string, value?: Category) {
  return <SelectItem value={name}>{name}</SelectItem>;
}
