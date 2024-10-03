let totalPuntuacionJugador = 0;
let totalPuntuacionComputadora = 0;
let tiradasJugador = []; // Array para guardar las puntuaciones del jugador
let tiradasComputadora = []; // Array para guardar las puntuaciones de la computadora
let tiradasRestantes = 3; // Contador de tiradas restantes

// Añadir evento al botón de lanzar dados
document.getElementById("lanzarDados").addEventListener("click", lanzarDados);

// Función que se ejecuta cuando se lanzan los dados
function lanzarDados() {
    // Solo permite hasta 3 tiradas
    if (tiradasRestantes <= 0) {
        alert("Ya has realizado 3 tiradas. Haz clic en 'Jugar otra partida' para empezar de nuevo.");
        return;
    }

    // Jugador tira los dados
    let dadosJugador = tirarDados();
    let puntuacionJugador = calcularPuntuacion(dadosJugador);
    totalPuntuacionJugador += puntuacionJugador; // Suma la puntuación total del jugador
    tiradasJugador.push(puntuacionJugador); // Guarda la puntuación de la tirada actual del jugador

    // Computadora tira los dados
    let dadosComputadora = tirarDados();
    let puntuacionComputadora = calcularPuntuacion(dadosComputadora);
    totalPuntuacionComputadora += puntuacionComputadora; // Suma la puntuación total de la computadora
    tiradasComputadora.push(puntuacionComputadora); // Guarda la puntuación de la tirada actual de la computadora

    tiradasRestantes--; // Reduce el contador de tiradas restantes

    // Actualiza la visualización de los dados del jugador
    for (let i = 0; i < 5; i++) {
        document.getElementById(`dado${i + 1}`).innerText = dadosJugador[i];
    }

    // Actualiza el resultado en la interfaz
    document.getElementById("puntuacion").innerText = `Jugador: ${totalPuntuacionJugador} puntos`;

    // Si ya se han realizado 3 tiradas, muestra el popup
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
    const popup = document.createElement("div");
    popup.id = "popup";
    let resultadoFinal = "";

    // Determina el ganador
    if (totalPuntuacionJugador > totalPuntuacionComputadora) {
        resultadoFinal = "¡Has ganado!";
    } else if (totalPuntuacionJugador < totalPuntuacionComputadora) {
        resultadoFinal = "La computadora ha ganado.";
    } else {
        resultadoFinal = "¡Es un empate!";
    }

    popup.innerHTML = `
        <div class="popup-content">
            <h2>Fin de la Partida</h2>
            <p>Puntuación Total Jugador: ${totalPuntuacionJugador} puntos</p>
            <p>Puntuación Total Computadora: ${totalPuntuacionComputadora} puntos</p>
            <p>${resultadoFinal}</p>
            <button id="jugarOtraPartida">Jugar otra Partida</button>
        </div>
    `;
    document.body.appendChild(popup);

    // Añadir evento al botón para reiniciar el juego
    document.getElementById("jugarOtraPartida").addEventListener("click", reiniciarJuego);
}

// Función para reiniciar el juego
function reiniciarJuego() {
    totalPuntuacionJugador = 0;
    totalPuntuacionComputadora = 0;
    tiradasJugador = [];
    tiradasComputadora = [];
    tiradasRestantes = 3; // Reinicia el contador de tiradas restantes
    document.getElementById("puntuacion").innerText = `Jugador: ${totalPuntuacionJugador} puntos`;

    // Limpia los dados
    for (let i = 1; i <= 5; i++) {
        document.getElementById(`dado${i}`).innerText = 0;
    }

    // Limpia el historial
    actualizarHistorial();

    // Cierra el popup
    document.getElementById("popup").remove();
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
