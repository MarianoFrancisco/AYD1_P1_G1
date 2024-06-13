  import { columns as peliculasColumns } from "../components/columns"; // Importa las columnas para películas
  import { columns as usuariosColumns } from "../components/columnsUsuario"; // Importa las columnas para usuarios
  import { Pelicula, Usuario } from "@/types"; // Asegúrate de importar los tipos adecuados
  import { DataTable } from "../components/data-table";
  import { useEffect, useState } from "react";
  import { Button } from "@/components/ui/button";

  // Tipo de unión para datos de películas y usuarios
  type DataType = Pelicula[] | Usuario[];

  // Función para obtener datos
  async function getData(tipo: 'peliculas' | 'usuarios'): Promise<DataType> {
    try {
      const result = await fetch(`${import.meta.env.VITE_API_URL}/api/${tipo}`);
      if (!result.ok) {
        throw new Error("Error al obtener los datos");
      }
      const data = await result.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  }

  // Componente funcional AdminHome
  export function AdminHome({ onLogout }: { onLogout: () => void }) {
    const [data, setData] = useState<DataType>([]); // Estado para almacenar datos de películas o usuarios
    const [tipoTabla, setTipoTabla] = useState<'peliculas' | 'usuarios'>('peliculas'); // Estado para controlar el tipo de tabla a mostrar

    useEffect(() => {
      const fetchData = async () => {
        const json = await getData(tipoTabla); // Obtener datos según el tipo de tabla seleccionada
        setData(json);
      };
      fetchData();
    }, [tipoTabla]); // Ejecutar efecto cada vez que cambie tipoTabla

    const handleTabChange = (tipo: 'peliculas' | 'usuarios') => {
      setTipoTabla(tipo); // Cambiar el tipo de tabla
    };

    return (
      <div className="container mx-auto py-10">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Administrador</h1>
          <div className="space-x-4">
            <Button onClick={() => handleTabChange('peliculas')}>Peliculas</Button>
            <Button onClick={() => handleTabChange('usuarios')}>Usuarios</Button>
            <Button onClick={onLogout}>Cerrar sesión</Button>
          </div>
        </div>
        <h2 className="text-2xl font-bold">{tipoTabla === 'peliculas' ? 'Peliculas' : 'Usuarios'}</h2>
        <DataTable columns={tipoTabla === 'peliculas' ? peliculasColumns : usuariosColumns} data={data} />
      </div>
    );
  }
