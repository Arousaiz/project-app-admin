import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useSubmit } from "react-router";
import { authSchema } from "~/zodSchemas/authSchema";

const formSchema = authSchema.pick({ username: true, password: true });

export default function registerForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const submit = useSubmit();

  function onSubmit(values: z.infer<typeof formSchema>) {
    submit(values, {
      encType: "application/json",
      method: "POST",
      action: "/register",
    });
  }

  return (
    <div>
      <Form {...form}>
        <form
          className="flex flex-col gap-6"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Имя пользователя</FormLabel>
                <FormControl>
                  <Input placeholder="username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Пароль</FormLabel>
                <FormControl>
                  <Input placeholder="password" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full" type="submit">
            Зарегистрироваться
          </Button>
          <div className="flex items-center justify-center">
            <p>Уже есть аккаунт?</p>
            <Link
              to="/login"
              className="ml-1 text-sm text-muted-foreground hover:text-foreground"
            >
              Войти
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
}
