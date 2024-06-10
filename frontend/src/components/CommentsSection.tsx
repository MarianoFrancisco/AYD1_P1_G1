export function CommentsSection() {
  return (
    <div className="border-t border-gray-300 pt-4">
      <h3 className="text-lg font-semibold mb-4" style={{ fontWeight: 'bold' }}>Comentarios</h3>
      <div className="border-b border-gray-300 pb-4 mb-4 bg-gray-100 rounded-lg shadow-md p-4">
        <div>
          <p className="font-semibold text-base">Usuario</p>
          <p className="text-sm text-gray-700 mb-2">usuario@gmail.com</p>
        </div>
        <p className="text-sm">Este es el comentario del Usuario</p>
      </div>
      <div>
        <div>
          <p className="font-semibold text-base">Mi nombre</p>
          <p className="text-sm text-gray-700 mb-2">micorreo@gmail.com</p>
        </div>
        <textarea
          className="w-full h-24 p-2 mb-2 border rounded shadow-inner resize-none text-sm"
          placeholder="Agregar un comentario"
        />
        <button className="px-3 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition mt-0 text-sm"> {/* Cambiado el color del botón a un tono de negro más suave y ajustado el margen superior */}
          Publicar
        </button>
      </div>
    </div>
  )
}
