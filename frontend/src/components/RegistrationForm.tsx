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
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { CalendarIcon, CheckIcon } from "lucide-react";
import { Calendar } from "./ui/calendar";
import { format } from "date-fns"

const FormSchema = z
  .object({
    nombre: z.string().min(1, {
      message: "Debes ingresar un nombre.",
    }),
    apellido: z.string(),
    genero: z.string(),
    correo: z.string().email("Debes ingresar un correo válido."),
    contrasenia: z.string().min(4, {
      message: "Debe ingresar una contraseña de al menos 4 caracteres.",
    }),
    validar_contrasenia: z.string().min(4, {
      message: "Debe ingresar una contraseña de al menos 4 caracteres.",
    }),
    fecha_nacimiento: z.date(),
  })
  .superRefine(({ contrasenia, validar_contrasenia }, ctx) => {
    if (contrasenia !== validar_contrasenia) {
      return ctx.addIssue({
        code: "custom",
        message: "Las contraseñas no coinciden",
        path: ["validar_contrasenia"],
      });
    }
  });

export function RegistrationForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      nombre: "",
      apellido: "",
      genero: "",
      correo: "",
      contrasenia: "",
      validar_contrasenia: "",
      fecha_nacimiento: new Date( new Date().getFullYear() - 18, 0, 1),
    },
  });
  const [popoverOpen, setPopoverOpen] = useState(false);
  const generos = [
    { label: "Masculino", value: "M" },
    { label: "Femenino", value: "F" },
  ];
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(import.meta.env.VITE_API_URL);
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/usuarios`, {
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
    //redirect to login page
    window.location.href = "/login";
  }

  return (
    <div className="flex justify-center w-96">
      <Card className="w-full space-y-6">
        <CardHeader>
          <CardTitle className="self-">Registro</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="correo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Correo</FormLabel>
                    <FormControl>
                      <Input placeholder="Correo" type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="nombre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input placeholder="Nombre" type="text" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="apellido"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Apellido</FormLabel>
                    <FormControl>
                      <Input placeholder="Apellido" type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="genero"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Genero</FormLabel>
                    <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? generos.find(
                                  (genero) => genero.value === field.value
                                )?.label
                              : "Selecciona un género"}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="p-0">
                        <Command>
                          <CommandList>
                            <CommandGroup>
                              {generos.map((genero) => (
                                <CommandItem
                                  value={genero.label}
                                  key={genero.value}
                                  onSelect={() => {
                                    form.setValue("genero", genero.value);
                                    setPopoverOpen(false);
                                  }}
                                >
                                  {genero.label}
                                  <CheckIcon
                                    className={cn(
                                      "ml-auto h-4 w-4",
                                      genero.value === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
          control={form.control}
          name="fecha_nacimiento"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date of birth</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        " pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Your date of birth is used to calculate your age.
              </FormDescription>
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
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="validar_contrasenia"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmar contraseña</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Contraseña"
                        type="password"
                        {...field}
                      />
                    </FormControl>
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
      </Card>
    </div>
  );
}
