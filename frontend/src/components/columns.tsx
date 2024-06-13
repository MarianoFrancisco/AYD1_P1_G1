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
  DialogTrigger,
} from "@/components/ui/dialog"
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
              <DialogDescription>
                {/* Agregar formulario luego */}
                <p>Edita los detalles de la película {pelicula.titulo}.</p>
              </DialogDescription>
              <DialogFooter>
                <Button onClick={() => setIsEditDialogOpen(false)}>Cancelar</Button>
                <Button type="submit">Guardar Cambios</Button>
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
                <Button type="submit">Confirmar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>
      );
    },
  },
];
