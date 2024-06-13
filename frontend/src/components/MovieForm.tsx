import * as React from "react"


import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"

import { Pelicula } from "@/types"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from "react-hook-form"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"

interface MovieFormProps {
  pelicula: Pelicula;
}

const FormSchema = z
  .object({
    id_pelicula: z.number(),
    titulo: z.string().min(1, {
      message: "Debes ingresar un nombre.",
    }),
    sinopsis: z.string().min(1, {
      message: "Debes ingresar un nombre.",
    }),
    precio_alquiler: z.string().min(1, {
      message: "Debes ingresar un nombre.",
    }),
    director: z.string(),
    anio_estreno: z.number(),
    duracion: z.string().min(1, {
      message: "Debes ingresar un nombre.",
    }),
    imagen: z.string().min(1, {
      message: "Debes ingresar un nombre.",
    }),
    alquilado: z.number(),
    id_genero: z.number(),
    
  });


export function MovieForm({ pelicula }: MovieFormProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      id_pelicula: pelicula.id_pelicula,
      titulo: pelicula.titulo,
      sinopsis: pelicula.sinopsis,
      precio_alquiler: pelicula.precio_alquiler,
      director: pelicula.director,
      anio_estreno: pelicula.anio_estreno,
      duracion: pelicula.duracion,
      imagen: pelicula.imagen,
      alquilado: pelicula.alquilado,
      id_genero: pelicula.id_genero,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      console.log('data', data)
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/peliculas/${pelicula.id_pelicula}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        // Manejar éxito
        console.log("Película actualizada exitosamente", result);
      } else {
        // Manejar errores del servidor
        console.error("Error actualizando la película:", result);
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
    //reload page
    window.location.reload();
  }
  return (
    <FormProvider {...form}>
    <div className="flex justify-center w-full">
      <Card  className="w-full space-y-6">
        <CardHeader>
          <CardTitle className="">Editar</CardTitle>
        </CardHeader>
        <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="titulo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Titulo</FormLabel>
                    <FormControl>
                      <Input placeholder="Titulo" type="text" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sinopsis"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sinopsis</FormLabel>
                    <FormControl>
                      <Input placeholder="Sinopsis" type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="precio_alquiler"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Precio</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Precio"
                        type="number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="director"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Director</FormLabel>
                    <FormControl>
                      <Input placeholder="Director" type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="anio_estreno"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Anio</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Anio"
                        type="number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="duracion"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duracion</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Duracion"
                        type="number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="imagen"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Imagen</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Imagen"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField

                control={form.control}
                name="id_genero"
                render={({ field }) => (  
                  <FormItem>
                    <FormLabel>Genero</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Genero"
                        type="number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}  
              />

              <Button type="submit" className="w-full mt-10 ">
                Guardar
              </Button>
            </form>
        </CardContent>
      </Card>
    </div>
    </FormProvider>
  )
}
