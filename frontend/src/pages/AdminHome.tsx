import { columns } from "../components/columns";
import { Pelicula } from "@/types";
import { DataTable } from "../components/data-table";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

// Función para obtener datos
async function getData(): Promise<Pelicula[]> {
  try {
    const result = await fetch(`${import.meta.env.VITE_API_URL}/api/peliculas`);
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
  const [data, setData] = useState<Pelicula[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const json = await getData();
      console.log(json);
      setData(json);
    };
    fetchData();
  }, []);


  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center"><h1 className="text-3xl font-bold">Administrador</h1> <Button onClick={onLogout}>Cerrar sesión</Button></div>
      <h2 className="text-2xl font-bold">Peliculas</h2>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
