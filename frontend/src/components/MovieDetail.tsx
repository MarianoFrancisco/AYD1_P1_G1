import React, { useState, useEffect } from 'react'
import { CommentsSection } from './CommentsSection'
import Swal from 'sweetalert2'

interface MovieDetailProps {
  id_user: number
  alquilado: boolean
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
  alquilado: number
  genero?: string
  fecha_alquiler?: string
  multa?: string
  id_alquiler?: number
}

export const MovieDetail: React.FC<MovieDetailProps> = ({ id_user, alquilado }) => {
  const [movieData, setMovieData] = useState<MovieData[]>([])
  const [loading, setLoading] = useState(true)
  const [showCommentsForMovie, setShowCommentsForMovie] = useState<number | null>(null)
  const [rentingMovies, setRentingMovies] = useState<number[]>([])

  const showSweetAlert = (message: string) => {
    Swal.fire({
      title: 'Operación completada',
      text: message,
      icon: 'success',
      confirmButtonText: 'OK'
    })
  }

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        let movies: MovieData[] = []
        if (alquilado) {
          const rentedResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/alquileres/${id_user}/0`)
          const rentedMovies = await rentedResponse.json();
          const rentedMovieIds = rentedMovies.map((rental: { id_pelicula: number }) => rental.id_pelicula)

          const moviePromises = rentedMovieIds.map((movieId: number) =>
            fetch(`${import.meta.env.VITE_API_URL}/api/peliculas/${movieId}`).then(res => res.json())
          )

          const moviesData = await Promise.all(moviePromises);

          movies = moviesData.map(movie => {
            const rentalInfo = rentedMovies.find((rental: { id_pelicula: number }) => rental.id_pelicula === movie.id_pelicula)
            return {
              ...movie,
              fecha_alquiler: rentalInfo?.fecha_alquiler,
              multa: rentalInfo?.multa,
              id_alquiler: rentalInfo?.id_alquiler,
            }
          })
        } else {
          const movieResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/peliculas`)
          const allMovies = await movieResponse.json()
          movies = allMovies.filter((movie: MovieData) => movie.alquilado === 0)
        }

        const genrePromises = movies.map(movie =>
          fetch(`${import.meta.env.VITE_API_URL}/api/generos/${movie.id_genero}`).then(res => res.json())
        )

        const genres = await Promise.all(genrePromises);
        const moviesWithGenres = movies.map((movie, index) => ({
          ...movie,
          genero: genres[index].nombre,
        }))

        setMovieData(moviesWithGenres);
      } catch (error) {
        console.error("Error fetching movie data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchMovieData();
  }, [id_user, alquilado])

  useEffect(() => {
    const hasMoviesWithZeroDelay = () => {
      return movieData.some(movie => calculateDaysOverdue(movie.fecha_alquiler!) > 0);
    }

    if (!loading && alquilado && hasMoviesWithZeroDelay()) {
      Swal.fire({
        title: 'Alerta de Películas',
        text: 'Hay películas con retraso en la devolución.',
        icon: 'warning',
        confirmButtonText: 'OK'
      })
    }
  }, [loading, alquilado, movieData])

  const calculateDaysOverdue = (fecha_alquiler: string) => {
    const rentalDate = new Date(fecha_alquiler)
    const currentDate = new Date()
    const diffTime = currentDate.getTime() - rentalDate.getTime()
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
    return Math.max(0, diffDays - 2)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)

    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()

    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    const seconds = String(date.getSeconds()).padStart(2, '0')

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`
  }

  const toggleComments = (movieId: number) => {
    setShowCommentsForMovie(showCommentsForMovie === movieId ? null : movieId)
  }

  const handleAlquilar = async (movieId: number) => {
    try {
      setRentingMovies(prevRenting => [...prevRenting, movieId])

      const today = new Date()

      const year = today.getFullYear()
      const month = String(today.getMonth() + 1).padStart(2, '0')
      const day = String(today.getDate()).padStart(2, '0')
      const hours = String(today.getHours()).padStart(2, '0')
      const minutes = String(today.getMinutes()).padStart(2, '0')
      const seconds = String(today.getSeconds()).padStart(2, '0')

      const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/alquileres`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fecha_alquiler: formattedDate,
          id_user: id_user,
          id_pelicula: movieId,
        }),
      })

      if (response.ok) {
        setMovieData(prevMovies => prevMovies.filter(movie => movie.id_pelicula !== movieId))
        showSweetAlert('La película se alquiló con éxito.')
      } else {
        throw new Error('Error al alquilar la película.')
      }
    } catch (error) {
      console.error('Error al alquilar la película:', error);
      alert('Ocurrió un error al alquilar la película. Por favor, intenta nuevamente.')
    } finally {
      setRentingMovies(prevRenting => prevRenting.filter(id => id !== movieId))
    }
  }

  const handleDevolver = async (movieId: number) => {
    try {
      setRentingMovies(prevRenting => [...prevRenting, movieId])

      const alquilerId = movieData.find(movie => movie.id_pelicula === movieId)?.id_alquiler

      if (!alquilerId) {
        throw new Error('No se encontró el id_alquiler de la película.')
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/alquileres/${alquilerId}/devuelto`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        setMovieData(prevMovies => prevMovies.filter(movie => movie.id_pelicula !== movieId))
        showSweetAlert('La película se devolvió con éxito.')
      } else {
        throw new Error('Error al devolver la película.')
      }
    } catch (error) {
      console.error('Error al devolver la película:', error)
      alert('Ocurrió un error al devolver la película. Por favor, intenta nuevamente.')
    } finally {
      setRentingMovies(prevRenting => prevRenting.filter(id => id !== movieId))
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (movieData.length === 0) {
    return <div className="flex justify-center items-center h-screen text-2xl text-gray-500">No hay películas disponibles.</div>
  }

  return (
    <div>
      {movieData.map(movie => (
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
                {alquilado ? (
                  <>
                    <p className="text-base"><strong>Precio:</strong> Q{movie.precio_alquiler}</p>
                    <p className="text-base"><strong>Fecha de Alquiler:</strong> {formatDate(movie.fecha_alquiler!)}</p>
                    <p className="text-base"><strong>Días de Retraso:</strong> {calculateDaysOverdue(movie.fecha_alquiler!)}</p>
                    <p className="text-base"><strong>Multa:</strong> Q{movie.multa}</p>
                  </>
                ) : (
                  <>
                    <p className="text-base"><strong>Precio:</strong> Q{movie.precio_alquiler}</p>
                    <p className="text-base"><strong>Director:</strong> {movie.director}</p>
                    <p className="text-base"><strong>Año de Estreno:</strong> {movie.anio_estreno}</p>
                    <p className="text-base"><strong>Duración:</strong> {movie.duracion}</p>
                    <p className="text-base"><strong>Género:</strong> {movie.genero}</p>
                  </>
                )}
                <div className="flex">
                  {!alquilado ? (
                    <button
                      className="mt-3 mr-2 px-4 py-2 text-sm bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-all"
                      onClick={() => handleAlquilar(movie.id_pelicula)}
                      disabled={rentingMovies.includes(movie.id_pelicula)}
                    >
                      {rentingMovies.includes(movie.id_pelicula) ? 'Alquilando...' : 'Alquilar'}
                    </button>
                  ) : (
                    <button
                      className="mt-3 mr-2 px-4 py-2 text-sm bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-all"
                      onClick={() => handleDevolver(movie.id_pelicula)}
                      disabled={rentingMovies.includes(movie.id_pelicula)}
                    >
                      {rentingMovies.includes(movie.id_pelicula) ? 'Devolviendo...' : 'Devolver'}
                    </button>
                  )}
                  <button
                    className="mt-3 px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all"
                    onClick={() => toggleComments(movie.id_pelicula)}
                  >
                    Ver Comentarios
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      {showCommentsForMovie !== null && (
        <div className="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-black bg-opacity-50" style={{ zIndex: 9999 }}>
          <div className="bg-white max-w-6xl p-4 rounded-lg shadow-lg" style={{ height: '70vh', overflowY: 'auto', width: '50vw', position: 'relative' }}>
            <div style={{ position: 'sticky', top: '0', right: '0', textAlign: 'right' }}>
              <button className="text-gray-600" onClick={() => setShowCommentsForMovie(null)}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <CommentsSection id_user={id_user} id_pelicula={showCommentsForMovie} />
          </div>
        </div>
      )}
    </div>
  )
}
