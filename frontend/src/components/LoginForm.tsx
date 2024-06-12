"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import "@/index.css";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const FormSchema = z.object({
  correo: z.string().email("Debe ingresar un correo válido."),
  contrasenia: z.string().min(4, {
    message: "Debe ingresar una contraseña de al menos 6 caracteres.",
  }),
});

export function LoginForm({ onLogin }: { onLogin: (token: string) => void }) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      correo: "",
      contrasenia: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(import.meta.env.VITE_API_URL);
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const json = await response.json();
    if (json.error) {
      form.setError("correo", json.error.message);
      return;
    }
    onLogin(json.token);
  }

  return (
    <div className="flex justify-center w-96">
      <Card className="w-full space-y-6">
        <CardHeader>
          <CardTitle className="self-">Login</CardTitle>
        </CardHeader>
        <CardContent >
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              
            >
              <FormField
                control={form.control}
                name="correo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Correo</FormLabel>
                    <FormControl>
                      <Input placeholder="Correo" type="text" {...field} />
                    </FormControl>
                    <FormDescription>Correo de tu cuenta</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contrasenia"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Contraseña"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Esta es tu contraseña</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full mt-10 ">
                Login
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <div  className="self-center text-center w-max">No tienes cuenta? <a href="/register">Regístrate</a></div>
        </CardFooter>
      </Card>
    </div>
  );
}
