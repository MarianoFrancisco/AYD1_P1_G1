/*
* @authors
* Mariano Camposeco {@literal (mariano1941@outlook.es)}
*/
const obtenerDiferenciaEnHoras = (fechaAlquiler, fechaDevolucion) => {
    const diferenciaEnMS = new Date(fechaDevolucion).getTime() - new Date(fechaAlquiler).getTime();
    return Math.ceil(diferenciaEnMS / (1000 * 60 * 60));
};

const calcularMulta = (diferenciaHoras) => {
    if (diferenciaHoras >= 48) {
        const horasExtra = diferenciaHoras - 48;
        const multa = Math.ceil(horasExtra / 24) * 5;
        return multa;
    } else {
        return 0;
    }
};

module.exports = {
    obtenerDiferenciaEnHoras,
    calcularMulta,
};