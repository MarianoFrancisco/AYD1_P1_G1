import React, { useState, useEffect } from 'react'

interface RentalHistoryProps {
  id_user: number
}

interface MovieData {
  id_pelicula: number
  titulo: string
  sinopsis: string
  precio_alquiler: string
  director: string
  anio_estreno: number
  duracion: string
  imagen: string
  id_genero: number
  fecha_alquiler: string
  multa: string
  id_alquiler: number
  devuelta: boolean
  fecha_devolucion?: string
  dias_retraso?: number
}

export const RentalHistory: React.FC<RentalHistoryProps> = ({ id_user }) => {
  const [rentedMoviesNotReturned, setRentedMoviesNotReturned] = useState<MovieData[]>([])
  const [rentedMoviesReturned, setRentedMoviesReturned] = useState<MovieData[]>([])
  const [loading, setLoading] = useState(true)

  const fetchRentedMovies = async () => {
    try {
      const responseNotReturned = await fetch(`${import.meta.env.VITE_API_URL}/api/alquileres/${id_user}/0`)
      const responseReturned = await fetch(`${import.meta.env.VITE_API_URL}/api/alquileres/${id_user}/1`)

      if (!responseNotReturned.ok || !responseReturned.ok) {
        throw new Error('Error al obtener los datos de alquileres.')
      }

      const dataNotReturned = await responseNotReturned.json()
      const dataReturned = await responseReturned.json()

      const moviePromisesNotReturned = dataNotReturned.map((rental: any) =>
        fetch(`${import.meta.env.VITE_API_URL}/api/peliculas/${rental.id_pelicula}`).then(res => res.json())
      )

      const moviePromisesReturned = dataReturned.map((rental: any) =>
        fetch(`${import.meta.env.VITE_API_URL}/api/peliculas/${rental.id_pelicula}`).then(res => res.json())
      )

      const moviesDataNotReturned = await Promise.all(moviePromisesNotReturned)
      const moviesDataReturned = await Promise.all(moviePromisesReturned)

      const moviesWithRentalInfoNotReturned = moviesDataNotReturned.map((movie, index) => ({
        ...movie,
        fecha_alquiler: dataNotReturned[index].fecha_alquiler,
        multa: dataNotReturned[index].multa,
        id_alquiler: dataNotReturned[index].id_alquiler,
        devuelta: false,
        fecha_devolucion: undefined,
        dias_retraso: calculateDaysOverdue(dataNotReturned[index].fecha_alquiler)
      }))

      const moviesWithRentalInfoReturned = moviesDataReturned.map((movie, index) => ({
        ...movie,
        fecha_alquiler: dataReturned[index].fecha_alquiler,
        multa: dataReturned[index].multa,
        id_alquiler: dataReturned[index].id_alquiler,
        devuelta: true,
        fecha_devolucion: dataReturned[index].fecha_devolucion,
        dias_retraso: calculateDaysOverdue(dataReturned[index].fecha_alquiler)
      }))

      setRentedMoviesNotReturned(moviesWithRentalInfoNotReturned)
      setRentedMoviesReturned(moviesWithRentalInfoReturned)
    } catch (error) {
      console.error('Error fetching rented movies:', error)
      alert('Ocurrió un error al obtener los datos de alquileres.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRentedMovies()
  }, [id_user])

  const calculateDaysOverdue = (fecha_alquiler: string) => {
    const rentalDate = new Date(fecha_alquiler)
    const currentDate = new Date()
    const diffTime = currentDate.getTime() - rentalDate.getTime()
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
    return Math.max(0, diffDays - 2)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const formattedDate = date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
    return formattedDate
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (rentedMoviesNotReturned.length === 0 && rentedMoviesReturned.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen text-2xl text-gray-500">
        No hay películas alquiladas.
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-3xl font-bold text-center my-4">Historial de Alquiler</h2>
      {rentedMoviesNotReturned.map(movie => (
        <div key={movie.id_pelicula} className="flex justify-center bg-gray-50 mb-4" style={{ margin: '10px' }}>
          <div className="max-w-5xl w-full p-4 rounded-lg shadow-md relative">
            <div className="flex mb-2">
              <img
                src={`${import.meta.env.VITE_API_URL}/img-movie/${movie.imagen}`}
                alt="Movie"
                className="w-48 h-auto rounded-lg shadow-lg mr-4 mb-4"
                style={{ margin: '0 1rem 0 0', padding: '0.5rem', borderRadius: '16px' }}
              />
              <div className="flex-1 p-4 bg-white rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold mb-2" style={{ fontWeight: 'bold' }}>{movie.titulo}</h2>
                <p className="text-base"><strong>Sinopsis:</strong> {movie.sinopsis}</p>
                <p className="text-base"><strong>Precio:</strong> Q{movie.precio_alquiler}</p>
                <p className="text-base"><strong>Fecha de Alquiler:</strong> {formatDate(movie.fecha_alquiler)}</p>
                <p className="text-base"><strong>Días de Retraso:</strong> {movie.dias_retraso}</p>
                <p className="text-base"><strong>Multa:</strong> Q{movie.multa}</p>
                <div className="mt-2">
                  <span className="px-2 py-1 bg-red-500 text-white rounded-md">Sin devolver</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {rentedMoviesReturned.map(movie => (
        <div key={movie.id_pelicula} className="flex justify-center bg-gray-50 mb-4" style={{ margin: '10px' }}>
          <div className="max-w-5xl w-full p-4 rounded-lg shadow-md relative">
            <div className="flex mb-2">
              <img
                src={`${import.meta.env.VITE_API_URL}/img-movie/${movie.imagen}`}
                alt="Movie"
                className="w-48 h-auto rounded-lg shadow-lg mr-4 mb-4"
                style={{ margin: '0 1rem 0 0', padding: '0.5rem', borderRadius: '16px' }}
              />
              <div className="flex-1 p-4 bg-white rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold mb-2" style={{ fontWeight: 'bold' }}>{movie.titulo}</h2>
                <p className="text-base"><strong>Sinopsis:</strong> {movie.sinopsis}</p>
                <p className="text-base"><strong>Precio:</strong> Q{movie.precio_alquiler}</p>
                <p className="text-base"><strong>Fecha de Alquiler:</strong> {formatDate(movie.fecha_alquiler)}</p>
                <p className="text-base"><strong>Fecha de Devolución:</strong> {formatDate(movie.fecha_devolucion!)}</p>
                <p className="text-base"><strong>Días de Retraso:</strong> {movie.dias_retraso}</p>
                <p className="text-base"><strong>Multa:</strong> Q{movie.multa}</p>
                <div className="mt-2">
                  <span className="px-2 py-1 bg-green-500 text-white rounded-md">Devuelta</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
