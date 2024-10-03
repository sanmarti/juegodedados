
// Inicializa las variables
let totalPuntuacion = 0;
let tiradas = []; // Array para guardar las puntuaciones de cada tirada
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
    tiradasRestantes--; // Reduce el contador de tiradas restantes

    // Actualiza el resultado en la interfaz
    document.getElementById("puntuacion").innerText = totalPuntuacion;

    // Si ya se han realizado 3 tiradas, muestra el popup
    if (tiradasRestantes <= 0) {
        mostrarPopup();
    }

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

// Función para mostrar el popup al finalizar las tiradas
function mostrarPopup() {
    const popup = document.createElement("div");
    popup.id = "popup";
    popup.innerHTML = `
        <div class="popup-content">
            <h2>Fin de la Partida</h2>
            <p>Puntuación Total: ${totalPuntuacion} puntos</p>
            <button id="jugarOtraPartida">Jugar otra Partida</button>
        </div>
    `;
    document.body.appendChild(popup);

    // Añadir evento al botón para reiniciar el juego
    document.getElementById("jugarOtraPartida").addEventListener("click", reiniciarJuego);
}

// Función para reiniciar el juego
function reiniciarJuego() {
    totalPuntuacion = 0;
    tiradas = [];
    tiradasRestantes = 3; // Reinicia el contador de tiradas restantes
    document.getElementById("puntuacion").innerText = totalPuntuacion;

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

    // Muestra las puntuaciones de las tiradas anteriores
    tiradas.forEach((puntuacion, index) => {
        historialElement.innerHTML += `<p>Tirada ${index + 1}: ${puntuacion} puntos</p>`;
    });

    // Muestra el total de puntos acumulados
    historialElement.innerHTML += `<p>Total Acumulado: ${totalPuntuacion} puntos</p>`;
}

let tiradas = [];
let puntuacionTotal = 0;
const maxTiradas = 3;

function lanzarDados() {
    if (tiradas.length < maxTiradas) {
        const dado1 = Math.floor(Math.random() * 6) + 1;
        const dado2 = Math.floor(Math.random() * 6) + 1;

        document.getElementById('dado1').textContent = dado1;
        document.getElementById('dado2').textContent = dado2;

        const suma = dado1 + dado2;
        tiradas.push(suma);
        puntuacionTotal += suma;

        if (tiradas.length === maxTiradas) {
            mostrarPopup();
        }
    }
}

function mostrarPopup() {
    document.getElementById('puntuacionFinal').textContent = `Tu puntuación total es: ${puntuacionTotal}`;
    document.getElementById('popup').style.display = 'flex'; // Muestra el pop-up
}

document.getElementById('jugarOtraPartida').addEventListener('click', () => {
    tiradas = []; // Reinicia las tiradas
    puntuacionTotal = 0; // Reinicia la puntuación
    document.getElementById('resultado').innerHTML = ''; // Limpia el resultado
    document.getElementById('popup').style.display = 'none'; // Oculta el pop-up
    // Reinicia los dados a cero
    document.getElementById('dado1').textContent = '🎲';
    document.getElementById('dado2').textContent = '🎲';
});

document.getElementById('closePopup').addEventListener('click', () => {
    document.getElementById('popup').style.display = 'none'; // Cierra el pop-up
});

// Llama a la función lanzarDados en el botón correspondiente
document.getElementById('lanzarDados').addEventListener('click', lanzarDados);

