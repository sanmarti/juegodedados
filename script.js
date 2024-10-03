// Añadir evento al botón de lanzar dados
document.getElementById("lanzarDados").addEventListener("click", lanzarDados);

// Función que se ejecuta cuando se lanzan los dados
function lanzarDados() {
    let dados = [];
    for (let i = 0; i < 5; i++) {
        // Genera números aleatorios entre 1 y 6
        dados[i] = Math.floor(Math.random() * 6) + 1;
        // Actualiza la visualización de cada dado
        document.getElementById(`dado${i+1}`).innerText = dados[i];
    }

    // Calcula la puntuación y la muestra
    let puntuacion = calcularPuntuacion(dados);
    document.getElementById("puntuacion").innerText = puntuacion;
}

// Función para calcular la puntuación según los dados lanzados
function calcularPuntuacion(dados) {
    let puntos = 0;
    let contador = {};

    // Cuenta cuántas veces aparece cada número
    dados.forEach(dado => {
        contador[dado] = (contador[dado] || 0) + 1;
    });

    // Ejemplo de reglas de puntuación (puedes modificarlas)
    if (Object.values(contador).includes(5)) {
        puntos = 150;  // Generala (5 iguales)
    } else if (Object.values(contador).includes(4)) {
        puntos = 100;  // Póker (4 iguales)
    } else if (Object.values(contador).includes(3) && Object.values(contador).includes(2)) {
        puntos = 60;   // Full (3 iguales y 2 iguales)
    } else if (dados.sort().join('') === '12345' || dados.sort().join('') === '23456') {
        puntos = 50;   // Escalera
    } else if (Object.values(contador).includes(3)) {
        puntos = 30;   // Trío (3 iguales)
    } else if (Object.values(contador).filter(val => val === 2).length === 2) {
        puntos = 20;   // Dos pares
    } else if (Object.values(contador).includes(2)) {
        puntos = 10;   // Un par
    }

    return puntos;
}
