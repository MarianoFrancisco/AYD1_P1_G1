import { useState, useEffect, useRef } from 'react'
import { RentalHistory } from '../components/RentalHistory'
import { ProfileEditor } from '../components/ProfileEditor'
import { MovieDetail } from '@/components/MovieDetail'

export function UserHome() {
  const [selectedOption, setSelectedOption] = useState('Catálogo de películas')
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const [hoverPeliflix, setHoverPeliflix] = useState(false)
  const [hoverMenu, setHoverMenu] = useState(false)

  const handleOptionClick = (option: string) => {
    setSelectedOption(option)
    setMenuOpen(false)
  }

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  const handlePeliflixHover = () => {
    if (!menuOpen) {
      setHoverPeliflix(true)
    }
  }

  const handlePeliflixLeave = () => {
    setHoverPeliflix(false)
  }

  const handleMenuHover = () => {
    if (!menuOpen) {
      setHoverMenu(true)
    }
  }

  const handleMenuLeave = () => {
    setHoverMenu(false)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false)
      }
    }

    document.title = 'User Home | Peliflix'
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const renderMovieCatalog = () => {
    return <>
      <MovieDetail />
      <MovieDetail />
      <MovieDetail />
    </>
  }

  const renderRentedMovies = () => {
    return <>
      <MovieDetail />
      <MovieDetail />
      <MovieDetail />
    </>
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <nav className="bg-gray-900 py-4 px-24 flex justify-between items-center text-white">
        <div
          className={`flex items-center space-x-4 ${hoverPeliflix ? 'text-gray-400' : 'text-white'
            }`}
          onMouseEnter={handlePeliflixHover}
          onMouseLeave={handlePeliflixLeave}
        >
          <div className={`text-xl font-bold mr-8 text-white`}>PELIFLIX</div>
          <button
            onClick={() => handleOptionClick('Catálogo de películas')}
            className={`transition-colors ${selectedOption === 'Catálogo de películas' ? 'text-white' : 'text-gray-400'}`}
          >
            Catálogo de películas
          </button>
          <button
            onClick={() => handleOptionClick('Películas alquiladas')}
            className={`transition-colors ${selectedOption === 'Películas alquiladas' ? 'text-white' : 'text-gray-400'}`}
          >
            Películas alquiladas
          </button>
        </div>
        <div className="relative" ref={menuRef} onMouseEnter={handleMenuHover} onMouseLeave={handleMenuLeave}>
          <button onClick={toggleMenu}>
            <span className={menuOpen || hoverMenu ? 'text-gray-400' : 'text-white'}>
              Nombre de usuario &#x25BE;
            </span>
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-md shadow-lg" style={{ zIndex: 9999 }}>
              <button
                onClick={() => handleOptionClick('RentalHistory')}
                className="block px-4 py-2 hover:bg-gray-700 w-full text-left text-white"
              >
                Historial de alquiler
              </button>
              <button
                onClick={() => handleOptionClick('ProfileEditor')}
                className="block px-4 py-2 hover:bg-gray-700 w-full text-left text-white"
              >
                Editar perfil
              </button>
              <button
                onClick={() => handleOptionClick('Cerrar sesión')}
                className="block px-4 py-2 hover:bg-gray-700 w-full text-left text-white"
              >
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </nav>
      <main className="p-0">
        {selectedOption === 'Catálogo de películas' && renderMovieCatalog()}
        {selectedOption === 'Películas alquiladas' && renderRentedMovies()}
        {selectedOption === 'RentalHistory' && <RentalHistory />}
        {selectedOption === 'ProfileEditor' && <ProfileEditor />}
      </main>
    </div>
  )
}
