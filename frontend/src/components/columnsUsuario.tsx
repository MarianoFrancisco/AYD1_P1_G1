/* eslint-disable react-hooks/rules-of-hooks */
"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Usuario } from "../types"
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

// Este tipo define la forma de nuestros datos para usuarios.
export const columns: ColumnDef<Usuario>[] = [
  {
    accessorKey: "id_user",
    header: "ID",
  },
  {
    accessorKey: "nombre",
    header: "Nombre",
  },
  {
    accessorKey: "apellido",
    header: "Apellido",
  },
  {
    accessorKey: "genero",
    header: "Género",
  },
  {
    accessorKey: "correo",
    header: "Correo",
  },
  {
    accessorKey: "fecha_nacimiento",
    header: "Fecha de Nacimiento",
  },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      const usuario = row.original;
      const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

      const handleDelete = async () => {
        try {
          console.log("Eliminando usuario con ID:", usuario.id_user);
          const response = await fetch(`${import.meta.env.VITE_API_URL}/api/usuarios/${usuario.id_user}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          });
          console.log("Respuesta del servidor:", response);
          if (response.ok) {
            console.log("Usuario eliminado exitosamente");
            setIsDeleteDialogOpen(false);
            window.location.reload();
          } else {
            const result = await response.json();
            console.error("Error eliminando usuario:", result);
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
                <span className="sr-only">Abrir menú</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Acciones</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)}>Eliminar</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Diálogo de eliminación */}
          <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>¿Estás seguro de eliminar al usuario {usuario.nombre}?</DialogTitle>
                <DialogDescription>
                  Esta acción no se puede deshacer. ¿Estás seguro de que quieres eliminar este usuario?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button onClick={() => setIsDeleteDialogOpen(false)}>Cancelar</Button>
                <Button onClick={handleDelete}>Confirmar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>
      );
    },
  },
];
