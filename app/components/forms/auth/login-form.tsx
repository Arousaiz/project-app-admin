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

export default function LoginForm() {
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
      action: "/login",
    });
  }

  return (
    <div>
      <Form {...form}>
        <form
          method="post"
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
                  <Input
                    placeholder="username"
                    autoComplete="username"
                    {...field}
                  />
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
                <div className="flex items-center">
                  <FormLabel>Пароль</FormLabel>
                  <Link
                    to={"/restore-pass"}
                    className="ml-auto text-sm text-muted-foreground hover:text-foreground"
                  >
                    Забыли пароль?
                  </Link>
                </div>
                <FormControl>
                  <Input
                    placeholder="password"
                    type="password"
                    autoComplete="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full" type="submit">
            Войти в систему
          </Button>
          <div className="flex items-center justify-center">
            <p>Ещё нет аккаунта?</p>
            <Link
              to="/register"
              className="ml-1 text-sm text-muted-foreground hover:text-foreground"
            >
              Зарегистрироваться
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
}
