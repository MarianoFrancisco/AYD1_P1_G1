import React, { useState } from 'react'
import Swal from 'sweetalert2'

interface User {
  id: number
  nombre: string
  apellido: string
  genero: string
  correo: string
  fecha_nacimiento: string
}

interface ProfileEditorProps {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>
}

export const ProfileEditor: React.FC<ProfileEditorProps> = ({ user, setUser }) => {
  const [showPassword, setShowPassword] = useState(false)

  const showSweetAlert = (message: string) => {
    Swal.fire({
      title: 'Operación completada',
      text: message,
      icon: 'success',
      confirmButtonText: 'OK'
    })
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }

  const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setUser({ ...user, genero: value })
  }

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const formDataObject: any = {}

    formData.forEach((value, key) => {
      formDataObject[key] = value
    });

    if (!formDataObject['password']) {
      delete formDataObject['password'];
    }
    console.log(JSON.stringify(formDataObject))

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/usuarios/${user.id}`, {
        method: 'PUT',
        body: JSON.stringify(formDataObject),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error('Error al guardar los cambios')
      }

      const { contrasenia, id_user, ...updatedUser } = await response.json()
      const modifiedUser = { ...updatedUser, id: id_user }
      setUser(modifiedUser)

      showSweetAlert('Los cambios se guardaron correctamente.')
    } catch (error: any) {
      alert(error.message)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-4 rounded-lg shadow-md max-w-lg w-full mt-4 mb-4">
        <h2 className="text-3xl font-bold mb-4 text-center">Editar Perfil</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-2">
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              defaultValue={user.nombre}
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
              defaultValue={user.apellido}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Género</label>
            <div className="flex items-center">
              <label className="mr-4">
                <input
                  type="radio"
                  name="genero"
                  value="M"
                  checked={user.genero === 'M'}
                  onChange={handleGenderChange}
                  className="mr-2"
                />
                Masculino
              </label>
              <label>
                <input
                  type="radio"
                  name="genero"
                  value="F"
                  checked={user.genero === 'F'}
                  onChange={handleGenderChange}
                  className="mr-2"
                />
                Femenino
              </label>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="correo" className="block text-sm font-medium text-gray-700 mb-1">Dirección de correo electrónico</label>
            <input
              type="email"
              id="correo"
              name="correo"
              defaultValue={user.correo}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-gray-200 cursor-not-allowed"
              required
              readOnly
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1 flex justify-between items-center">
              Contraseña (Opcional) <span className="text-gray-500 text-xs"></span>
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
              name="contrasenia"
              placeholder="Ingrese una nueva contraseña"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="fecha_nacimiento" className="block text-sm font-medium text-gray-700 mb-1">Fecha de nacimiento</label>
            <input
              type="date"
              id="fecha_nacimiento"
              name="fecha_nacimiento"
              defaultValue={user.fecha_nacimiento}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-gray-200 cursor-not-allowed"
              required
              readOnly
            />
          </div>
          <div className="flex justify-center mt-4">
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
