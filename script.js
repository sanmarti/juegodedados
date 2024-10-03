let totalPuntuacionJugador = 0;
let totalPuntuacionComputadora = 0;
let tiradasJugador = [];
let tiradasComputadora = [];
let tiradasRestantes = 3;

// Añadir evento al botón de lanzar dados
document.getElementById("lanzarDados").addEventListener("click", lanzarDados);

// Función que se ejecuta cuando el juego comienza
function iniciarJuego() {
    // Primero, la computadora hace sus tiradas
    for (let i = 0; i < 3; i++) {
        let dadosComputadora = tirarDados();
        let puntuacionComputadora = calcularPuntuacion(dadosComputadora);
        totalPuntuacionComputadora += puntuacionComputadora;
        tiradasComputadora.push(puntuacionComputadora);
    }

    // Mostrar el resultado de la computadora (puedes agregar efectos si prefieres no mostrarlo inmediatamente)
    console.log(`Puntuación Computadora: ${totalPuntuacionComputadora}`);
    tiradasRestantes = 3; // Resetear las tiradas para el jugador
}

// Función que se ejecuta cuando el jugador lanza los dados
function lanzarDados() {
    if (tiradasRestantes <= 0) {
        return;
    }

    // Jugador tira los dados
    let dadosJugador = tirarDados();
    let puntuacionJugador = calcularPuntuacion(dadosJugador);
    totalPuntuacionJugador += puntuacionJugador;
    tiradasJugador.push(puntuacionJugador);

    tiradasRestantes--;

    // Actualiza la visualización de los dados del jugador
    for (let i = 0; i < 5; i++) {
        document.getElementById(`dado${i + 1}`).innerText = dadosJugador[i];
    }

    // Actualiza el resultado en la interfaz
    document.getElementById("puntuacion").innerText = totalPuntuacionJugador;

    // Si ya se han realizado las 3 tiradas del jugador, muestra el popup
    if (tiradasRestantes <= 0) {
        mostrarPopup();
    }

    actualizarHistorial();
}

// Función para tirar los dados
function tirarDados() {
    let dados = [];
    for (let i = 0; i < 5; i++) {
        dados[i] = Math.floor(Math.random() * 6) + 1; // Genera números aleatorios entre 1 y 6
    }
    return dados;
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

// Función para mostrar el popup al finalizar las tiradas
function mostrarPopup() {
    const popup = document.getElementById("popup");
    let resultadoFinal = "";
    let diferenciaPuntos = Math.abs(totalPuntuacionJugador - totalPuntuacionComputadora);

    // Determina el ganador y muestra por cuántos puntos
    if (totalPuntuacionJugador > totalPuntuacionComputadora) {
        resultadoFinal = `¡Has ganado por ${diferenciaPuntos} puntos!`;
    } else if (totalPuntuacionJugador < totalPuntuacionComputadora) {
        resultadoFinal = `La computadora ha ganado por ${diferenciaPuntos} puntos.`;
    } else {
        resultadoFinal = "¡Es un empate!";
    }

    // Muestra el resultado en el popup
    document.getElementById("puntuacionJugador").innerText = totalPuntuacionJugador;
    document.getElementById("puntuacionComputadora").innerText = totalPuntuacionComputadora;
    document.getElementById("resultadoFinal").innerText = resultadoFinal;

    popup.style.display = "block"; // Muestra el popup
}

// Función para reiniciar el juego
function reiniciarJuego() {
    totalPuntuacionJugador = 0;
    totalPuntuacionComputadora = 0;
    tiradasJugador = [];
    tiradasComputadora = [];
    tiradasRestantes = 3;

    document.getElementById("puntuacion").innerText = totalPuntuacionJugador;

    // Limpia los dados
    for (let i = 1; i <= 5; i++) {
        document.getElementById(`dado${i}`).innerText = 0;
    }

    // Limpia el historial
    actualizarHistorial();

    // Cierra el popup
    document.getElementById("popup").style.display = "none";

    // Inicia el juego nuevamente, la computadora juega primero
    iniciarJuego();
}

// Función para actualizar el historial de tiradas
function actualizarHistorial() {
    const historialElement = document.getElementById("historial");
    historialElement.innerHTML = ""; // Limpia el historial actual

    // Muestra las puntuaciones de las tiradas anteriores del jugador
    historialElement.innerHTML += "<h3>Jugador:</h3>";
    tiradasJugador.forEach((puntuacion, index) => {
        historialElement.innerHTML += `<p>Tirada ${index + 1}: ${puntuacion} puntos</p>`;
    });

    // Muestra las puntuaciones de las tiradas anteriores de la computadora
    historialElement.innerHTML += "<h3>Computadora:</h3>";
    tiradasComputadora.forEach((puntuacion, index) => {
        historialElement.innerHTML += `<p>Tirada ${index + 1}: ${puntuacion} puntos</p>`;
    });

    // Muestra el total de puntos acumulados
    historialElement.innerHTML += `<p>Total Jugador: ${totalPuntuacionJugador} puntos</p>`;
    historialElement.innerHTML += `<p>Total Computadora: ${totalPuntuacionComputadora} puntos</p>`;
}

// Inicializar el juego (la computadora juega primero)
iniciarJuego();

// Añadir evento al botón "Jugar otra Partida" para reiniciar el juego
document.getElementById("jugarOtraPartida").addEventListener("click", reiniciarJuego);
