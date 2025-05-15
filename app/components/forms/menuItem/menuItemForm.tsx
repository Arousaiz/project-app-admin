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
import type { MenuItem } from "~/components/columns/menuItem/menuItemColumn";
import { MenuItemSchema } from "~/zodSchemas/menuItemSchema";
import type { loader } from "~/routes/tables/menuItem/menuItemTable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

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
      intent: intent,
    },
  });
  const submit = useSubmit();

  function onSubmit(values: z.infer<typeof formSchema>) {
    values.category = categories.data.find(
      (c: Category) => c.name === values.category.name
    );
    console.log(values);
    submit(values, {
      encType: "application/json",
      method: "POST",
    });
  }

  const { categories } = useLoaderData<typeof loader>();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="overflow-y-auto px-2 pb-3">
          <div className="mt-7">
            <h5 className="mb-5 text-lg font-medium lg:mb-6">Category</h5>
            <div className="grid grid-cols-1 gap-x-6 gap-y-5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
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
                    <FormLabel>Description</FormLabel>
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
                    <FormLabel>Price</FormLabel>
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
                    <FormLabel>Category</FormLabel>
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
                name="intent"
                render={({ field }) => (
                  <FormItem className="hidden">
                    <FormControl>
                      <Input className="" placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {children}
          </div>
        </div>
      </form>
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
