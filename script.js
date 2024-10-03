// Inicializa las variables
let totalPuntuacion = 0;
let tiradas = []; // Array para guardar las puntuaciones de cada tirada

// Añadir evento al botón de lanzar dados
document.getElementById("lanzarDados").addEventListener("click", lanzarDados);

// Función que se ejecuta cuando se lanzan los dados
function lanzarDados() {
    // Solo permite hasta 3 tiradas
    if (tiradas.length >= 3) {
        alert("Ya has realizado 3 tiradas. Reinicia el juego para empezar de nuevo.");
        return;
    }

    let dados = [];
    for (let i = 0; i < 5; i++) {
        // Genera números aleatorios entre 1 y 6
        dados[i] = Math.floor(Math.random() * 6) + 1;
        // Actualiza la visualización de cada dado
        document.getElementById(`dado${i + 1}`).innerText = dados[i];
    }

    // Calcula la puntuación y la muestra
    let puntuacion = calcularPuntuacion(dados);
    totalPuntuacion += puntuacion; // Suma la puntuación total
    tiradas.push(puntuacion); // Guarda la puntuación de la tirada actual

    // Actualiza el resultado en la interfaz
    document.getElementById("puntuacion").innerText = totalPuntuacion;
    actualizarHistorial();
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

// Función para actualizar el historial de tiradas
function actualizarHistorial() {
    const historialElement = document.getElementById("historial");
    historialElement.innerHTML = ""; // Limpia el historial actual

    // Muestra las puntuaciones de las tiradas anteriores
    tiradas.forEach((puntuacion, index) => {
        historialElement.innerHTML += `<p>Tirada ${index + 1}: ${puntuacion} puntos</p>`;
    });

    // Muestra el total de puntos acumulados
    historialElement.innerHTML += `<p>Total Acumulado: ${totalPuntuacion} puntos</p>`;
}
