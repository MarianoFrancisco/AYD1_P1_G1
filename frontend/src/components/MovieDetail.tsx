import { useState } from 'react'
import { CommentsSection } from './CommentsSection'

export function MovieDetail() {
  const [showComments, setShowComments] = useState(false)

  const toggleComments = () => {
    setShowComments(!showComments)
  };

  const closeComments = () => {
    setShowComments(false)
  };

  return (
    <div className="flex justify-center bg-gray-50" style={{ margin: '10px' }}>
      <div className="max-w-5xl w-full p-4 rounded-lg shadow-md relative">
        <div className="flex mb-2">
          <img
            src="https://cdn.pixabay.com/photo/2019/04/24/21/55/cinema-4153289_640.jpg"
            alt="Movie"
            className="w-48 h-auto rounded-lg shadow-lg mr-4 mb-4"
            style={{ margin: '0 1rem 0 0', padding: '0.5rem', borderRadius: '16px' }}
          />
          <div className="flex-1 p-4 bg-white rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-2" style={{ fontWeight: 'bold' }}>Ejemplo de Título</h2>
            <p className="text-base"><strong>Sinopsis:</strong> Ejemplo de Sinopsis</p>
            <p className="text-base"><strong>Precio de Alquiler:</strong> Q10</p>
            <p className="text-base"><strong>Director:</strong> Ejemplo de Director</p>
            <p className="text-base"><strong>Año de Estreno:</strong> 2021</p>
            <p className="text-base"><strong>Duración:</strong> 120 minutos</p>
            <p className="text-base"><strong>Género:</strong> Ejemplo de Género</p>
            <div className="flex">
              <button className="mt-3 mr-2 px-4 py-2 text-sm bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-all">
                Alquilar
              </button>
              <button className="mt-3 px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all" onClick={toggleComments}>
                Ver Comentarios
              </button>
            </div>
          </div>
        </div>
        {showComments && (
          <div className="fixed top-0 right-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50" style={{ zIndex: 9999 }}>
            <div className="bg-white max-w-6xl p-4 rounded-lg shadow-lg" style={{ height: '70vh', overflowY: 'auto', width: '50vw', position: 'relative' }}>
              <div style={{ position: 'sticky', top: '0', right: '0', textAlign: 'right' }}>
                <button className="text-gray-600" onClick={closeComments}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              <CommentsSection />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
