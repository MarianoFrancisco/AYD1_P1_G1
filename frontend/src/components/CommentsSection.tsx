export function CommentsSection() {
  return (
    <div className="border-t border-gray-300 pt-4">
      <h3 className="text-lg font-semibold mb-4" style={{ fontWeight: 'bold' }}>Comentarios</h3>
      <div className="border-b border-gray-300 pb-4 mb-4 bg-gray-100 rounded-lg shadow-md p-4">
        <div>
          <p className="font-semibold">Usuario</p>
          <p className="text-sm text-gray-700">usuario@gmail.com</p>
        </div>
        <p>Este es el comentario de Usuario</p>
      </div>
      <div>
        <div>
          <p className="font-semibold">Mi nombre</p>
          <p className="text-sm text-gray-700">micorreo@gmail.com</p>
        </div>
        <textarea
          className="w-full h-24 p-4 mb-4 border rounded shadow-inner resize-none"
          placeholder="Agregar un comentario"
        />
        <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">
          Publicar
        </button>
      </div>
    </div>
  )
}
