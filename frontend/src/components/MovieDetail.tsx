import { CommentsSection } from './CommentsSection'

export function MovieDetail() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-5xl w-full p-4 rounded-lg shadow-md">
        <div className="flex mb-4">
          <img
            src="https://cdn.pixabay.com/photo/2019/04/24/21/55/cinema-4153289_640.jpg"
            alt="Movie"
            className="w-48 h-auto rounded-lg shadow-lg mr-4"
          />
          <div className="flex-1 p-4 bg-white rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-2" style={{ fontWeight: 'bold' }}>Ejemplo de Título</h2>
            <p><strong>Sinopsis:</strong> Ejemplo de Sinopsis</p>
            <p><strong>Precio de Alquiler:</strong> Q10</p>
            <p><strong>Director:</strong> Ejemplo de Director</p>
            <p><strong>Año de Estreno:</strong> 2021</p>
            <p><strong>Duración:</strong> 120 minutos</p>
            <p><strong>Género:</strong> Ejemplo de Género</p>
            <div className="text-sm text-yellow-800 font-semibold flex items-center mt-2">
              <svg className="w-4 h-4 mr-1 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M10 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zM9 9h2v5H9V9zm0-2h2V7H9v.001zM9 6h2V5H9v1z" />
              </svg>
              La devolución de la película debe ser en 48 horas desde la fecha de alquiler.
            </div>
            <button className="mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
              Alquilar
            </button>
          </div>
        </div>
        <CommentsSection />
      </div>
    </div>
  )
}
