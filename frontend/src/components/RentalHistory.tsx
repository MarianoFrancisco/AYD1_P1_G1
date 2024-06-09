import { useEffect } from 'react'

export function RentalHistory() {
  useEffect(() => {
    document.title = 'Historial | Peliflix'
  })

  return (
    <div className="flex justify-center bg-gray-100 py-6">
      <div className="mx-2 w-4/5">
        <h1 className="text-3xl font-bold mt-2 mb-8 text-center text-gray-800">Historial de Alquiler</h1>

        <div className="border border-gray-300 rounded-xl p-6 mb-6 flex items-center shadow-lg bg-white hover:shadow-2xl transition-shadow duration-300">
          <div className="border border-gray-400 rounded-lg overflow-hidden mr-4">
            <img
              src="https://cdn.pixabay.com/photo/2019/04/24/21/55/cinema-4153289_640.jpg"
              alt="Póster de Película"
              className="w-32 h-40 rounded-lg shadow-md"
            />
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Película 1</h2>
            <div className="flex flex-wrap mb-2">
              <p className="mr-4">
                <span className="text-gray-600">Precio: </span>
                <span className="font-semibold">Q9.99</span>
              </p>
              <p className="mr-4">
                <span className="text-gray-600">Fecha de Alquiler: </span>
                <span className="font-semibold">10/05/2024 10:00</span>
              </p>
              <p className="mr-4">
                <span className="text-gray-600">Fecha de Devolución: </span>
                <span className="font-semibold">15/05/2024 21:00</span>
              </p>
            </div>
            <div className="flex flex-wrap">
              <p className="mr-4">
                <span className="text-gray-600">Días de Retraso: </span>
                <span className="font-semibold">0</span>
              </p>
              <p className="mr-4">
                <span className="text-gray-600">Multa Asociada: </span>
                <span className="font-semibold">Q0</span>
              </p>
              <p className="mr-4">
                <span className="text-gray-600">Total: </span>
                <span className="font-semibold">Q9.99</span>
              </p>
            </div>
            <div className="inline-block bg-green-500 text-white px-3 py-1 rounded-md font-semibold mt-2">
              Devuelta a tiempo
            </div>
          </div>
        </div>

        <div className="border border-gray-300 rounded-xl p-6 mb-6 flex items-center shadow-lg bg-white hover:shadow-2xl transition-shadow duration-300">
          <div className="border border-gray-400 rounded-lg overflow-hidden mr-4">
            <img
              src="https://cdn.pixabay.com/photo/2019/04/24/21/55/cinema-4153289_640.jpg"
              alt="Póster de Película"
              className="w-32 h-40 rounded-lg shadow-md"
            />
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Película 2</h2>
            <div className="flex flex-wrap mb-2">
              <p className="mr-4">
                <span className="text-gray-600">Precio: </span>
                <span className="font-semibold">Q9.99</span>
              </p>
              <p className="mr-4">
                <span className="text-gray-600">Fecha de Alquiler: </span>
                <span className="font-semibold">10/05/2024 10:00</span>
              </p>
              <p className="mr-4">
                <span className="text-gray-600">Fecha de Devolución: </span>
                <span className="font-semibold">15/05/2024 21:00</span>
              </p>
            </div>
            <div className="flex flex-wrap">
              <p className="mr-4">
                <span className="text-gray-600">Días de Retraso: </span>
                <span className="font-semibold">3</span>
              </p>
              <p className="mr-4">
                <span className="text-gray-600">Multa Asociada: </span>
                <span className="font-semibold">Q22.00</span>
              </p>
              <p className="mr-4">
                <span className="text-gray-600">Total: </span>
                <span className="font-semibold">Q31.99</span>
              </p>
            </div>
            <div className="inline-block bg-red-500 text-white px-3 py-1 rounded-md font-semibold mt-2">
              Sin devolver
            </div>
          </div>
        </div>

        <div className="border border-gray-300 rounded-xl p-6 mb-6 flex items-center shadow-lg bg-white hover:shadow-2xl transition-shadow duration-300">
          <div className="border border-gray-400 rounded-lg overflow-hidden mr-4">
            <img
              src="https://cdn.pixabay.com/photo/2019/04/24/21/55/cinema-4153289_640.jpg"
              alt="Póster de Película"
              className="w-32 h-40 rounded-lg shadow-md"
            />
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Película 3</h2>
            <div className="flex flex-wrap mb-2">
              <p className="mr-4">
                <span className="text-gray-600">Precio: </span>
                <span className="font-semibold">Q9.99</span>
              </p>
              <p className="mr-4">
                <span className="text-gray-600">Fecha de Alquiler: </span>
                <span className="font-semibold">10/05/2024 10:00</span>
              </p>
              <p className="mr-4">
                <span className="text-gray-600">Fecha de Devolución: </span>
                <span className="font-semibold">15/05/2024 21:00</span>
              </p>
            </div>
            <div className="flex flex-wrap">
              <p className="mr-4">
                <span className="text-gray-600">Días de Retraso: </span>
                <span className="font-semibold">3</span>
              </p>
              <p className="mr-4">
                <span className="text-gray-600">Multa Asociada: </span>
                <span className="font-semibold">Q2.00</span>
              </p>
              <p className="mr-4">
                <span className="text-gray-600">Total: </span>
                <span className="font-semibold">Q11.99</span>
              </p>
            </div>
            <div className="inline-block bg-yellow-500 text-white px-3 py-1 rounded-md font-semibold mt-2">
              Devuelta con retraso
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
