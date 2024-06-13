import React, { useState, useEffect } from 'react'
import { CommentsSection } from './CommentsSection'

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
}

export const MovieDetail: React.FC<MovieDetailProps> = ({ id_user, alquilado }) => {
  const [movieData, setMovieData] = useState<MovieData[]>([])
  const [loading, setLoading] = useState(true)
  const [showCommentsForMovie, setShowCommentsForMovie] = useState<number | null>(null) // State to track which movie's comments to show
  const [rentingMovies, setRentingMovies] = useState<number[]>([]) // State to track movies being rented

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        let movies: MovieData[] = []
        if (alquilado) {
          const rentedResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/alquileres/${id_user}/0`)
          const rentedMovies = await rentedResponse.json()
          const rentedMovieIds = rentedMovies.map((rental: { id_pelicula: number }) => rental.id_pelicula)

          const moviePromises = rentedMovieIds.map((movieId: number) =>
            fetch(`${import.meta.env.VITE_API_URL}/api/peliculas/${movieId}`).then(res => res.json())
          )

          movies = await Promise.all(moviePromises)
        } else {
          const movieResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/peliculas`)
          const allMovies = await movieResponse.json()
          movies = allMovies.filter((movie: MovieData) => movie.alquilado === 0)
        }

        const genrePromises = movies.map(movie =>
          fetch(`${import.meta.env.VITE_API_URL}/api/generos/${movie.id_genero}`).then(res => res.json())
        )

        const genres = await Promise.all(genrePromises)
        const moviesWithGenres = movies.map((movie, index) => ({
          ...movie,
          genero: genres[index].nombre,
        }))

        setMovieData(moviesWithGenres)
      } catch (error) {
        console.error("Error fetching movie data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchMovieData()
  }, [id_user, alquilado])

  const toggleComments = (movieId: number) => {
    setShowCommentsForMovie(showCommentsForMovie === movieId ? null : movieId) // Toggle the comments for the clicked movie
  }

  const handleAlquilar = async (movieId: number) => {
    try {
      setRentingMovies(prevRenting => [...prevRenting, movieId]) // Mark the movie as renting

      const today = new Date()
      const formattedDate = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`

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
        alert(`La película se alquiló con éxito. Debe ser devuelta en 48 horas desde la fecha de alquiler.`)
      } else {
        throw new Error('Error al alquilar la película.')
      }
    } catch (error) {
      console.error('Error al alquilar la película:', error)
      alert('Ocurrió un error al alquilar la película. Por favor, intenta nuevamente.')
    } finally {
      setRentingMovies(prevRenting => prevRenting.filter(id => id !== movieId)) // Remove movie from renting state
    }
  }

  const handleDevolver = () => {
    alert('Devolver')
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
                <p className="text-base"><strong>Precio de Alquiler:</strong> Q{movie.precio_alquiler}</p>
                <p className="text-base"><strong>Director:</strong> {movie.director}</p>
                <p className="text-base"><strong>Año de Estreno:</strong> {movie.anio_estreno}</p>
                <p className="text-base"><strong>Duración:</strong> {movie.duracion}</p>
                <p className="text-base"><strong>Género:</strong> {movie.genero}</p>
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
                      onClick={handleDevolver}
                    >
                      Devolver
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
