/* eslint-disable react-hooks/rules-of-hooks */
"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Pelicula } from "../types"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { MovieForm } from "./MovieForm"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Pelicula>[] = [
  {
    accessorKey: "id_pelicula",
    header: "Id",
  },
  {
    accessorKey: "titulo",
    header: "Titulo",
  },
  {
    accessorKey: "sinopsis",
    header: "Sinopsis",
  },
  {
    accessorKey: "precio_alquiler",
    header: "Precio",
  },
  {
    accessorKey: "director",
    header: "Director",
  },
  {
    accessorKey: "anio_estreno",
    header: "Anio",
  },
  {
    accessorKey: "duracion",
    header: "Duracion",
  },
  {
    accessorKey: "imagen",
    header: "Imagen",
    cell: ({ row }) => {
      const pelicula = row.original;
      return (
        <img
          src={`${import.meta.env.VITE_API_URL}/img-movie/${pelicula.imagen}`}
          alt="Imagen"
          className="h-16 w-16 object-cover rounded-full"
        />
      );
    },
  },
  {
    accessorKey: "alquilado",
    header: "Alquilado",
  },
  {
    accessorKey: "id_genero",
    header: "Genero",
  },
  {
    accessorKey: "estado",
    id: "actions",
    cell: ({ row }) => {
      const pelicula = row.original;
      const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
      const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

      const handleDelete = async () => {
        try {
          console.log("Eliminando película con id:", pelicula.id_pelicula);
          const response = await fetch(`${import.meta.env.VITE_API_URL}/api/peliculas/${pelicula.id_pelicula}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          });
          console.log("Respuesta del servidor:", response);
          if (response.ok) {
            // Manejar éxito
            console.log("Película eliminada exitosamente");
            setIsDeleteDialogOpen(false);
            window.location.reload();
            // Aquí puedes actualizar la lista de películas en tu estado
            // Ejemplo: removeMovieFromState(pelicula.id_pelicula);
          } else {
            const result = await response.json();
            console.error("Error eliminando la película:", result);
          }
        } catch (error) {
          console.error("Error de red:", error);
        }
      };

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Acciones</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}>Editar</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)}>Eliminar</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Diálogo de edición */}
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Editar Película</DialogTitle>
              </DialogHeader>
              <DialogDescription asChild>
                <MovieForm pelicula={pelicula}></MovieForm>
              </DialogDescription>
              <DialogFooter>
                <Button onClick={() => setIsEditDialogOpen(false)}>Cancelar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Diálogo de eliminación */}
          <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>¿Estás seguro de eliminar la película {pelicula.titulo}?</DialogTitle>
                <DialogDescription>
                  Esta acción no se puede deshacer. ¿Estás seguro de que quieres eliminar esta película?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button onClick={() => setIsDeleteDialogOpen(false)}>Cancelar</Button>
                <Button onClick={handleDelete} >Confirmar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>
      );
    },
  },
];
