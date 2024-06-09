import { useState } from 'react'
import { useEffect } from 'react'

export function ProfileEditor() {
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  useEffect(() => {
    document.title = 'Editar Perfil | Peliflix'
  })

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-2 text-center">Editar Perfil</h2>
        <form>
          <div className="mb-2">
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="apellido" className="block text-sm font-medium text-gray-700 mb-1">Apellido</label>
            <input
              type="text"
              id="apellido"
              name="apellido"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Género</label>
            <div className="mt-2 space-y-2">
              <div className="flex items-center">
                <input
                  id="genero_m"
                  name="genero"
                  type="radio"
                  value="M"
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                  required
                />
                <label htmlFor="genero_m" className="ml-2 block text-sm font-medium text-gray-700">Masculino</label>
              </div>
              <div className="flex items-center">
                <input
                  id="genero_f"
                  name="genero"
                  type="radio"
                  value="F"
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                  required
                />
                <label htmlFor="genero_f" className="ml-2 block text-sm font-medium text-gray-700">Femenino</label>
              </div>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Dirección de correo electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              readOnly
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1 flex justify-between items-center">
              Contraseña
              <span onClick={togglePasswordVisibility} className="cursor-pointer">
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500 hover:text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 15h4" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 9h.01M9 12h.01M9 15h.01" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500 hover:text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </span>
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="fecha_nacimiento" className="block text-sm font-medium text-gray-700 mb-1">Fecha de nacimiento</label>
            <input
              type="date"
              id="fecha_nacimiento"
              name="fecha_nacimiento"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-4 py-2 bg-gray-800 text-white rounded-md shadow-sm hover:bg-gray-900"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
