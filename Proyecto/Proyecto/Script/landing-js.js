// Arreglo para almacenar movimientos
let movimientos = [];

// Selección de elementos del DOM
const formularioMovimiento = document.getElementById('movimiento-form');
const tipoMovimiento = document.getElementById('tipo-movimiento');
const descripcion = document.getElementById('descripcion');
const monto = document.getElementById('monto');
const listaIngresos = document.getElementById('lista-ingresos');
const listaEgresos = document.getElementById('lista-egresos');

// Evento de envío del formulario
formularioMovimiento.addEventListener('submit', function (e) {
    e.preventDefault();

    // Validar campos
    if (!descripcion.value || !monto.value) {
        alert('Por favor, completa todos los campos');
        return;
    }

    // Crear objeto de movimiento
    const nuevoMovimiento = {
        tipo: tipoMovimiento.value,
        descripcion: descripcion.value,
        monto: parseFloat(monto.value),
    };

    // Agregar a array de movimientos
    movimientos.push(nuevoMovimiento);

    // Limpiar formulario
    descripcion.value = '';
    monto.value = '';

    // Actualizar lista de movimientos y gráficas
    mostrarLista();
    actualizarGraficas();
});

// Función para mostrar la lista de movimientos
function mostrarLista() {
    // Limpiar listas
    listaIngresos.innerHTML = '';
    listaEgresos.innerHTML = '';

    // Agregar movimientos a las listas correspondientes
    movimientos.forEach((movimiento) => {
        const li = document.createElement('li');
        li.textContent = `${movimiento.descripcion}: $${movimiento.monto.toFixed(2)}`;

        if (movimiento.tipo === 'ingreso') {
            listaIngresos.appendChild(li);
        } else {
            listaEgresos.appendChild(li);
        }
    });
}

// Función para actualizar gráficas
function actualizarGraficas() {
    const ingresos = movimientos
        .filter((mov) => mov.tipo === 'ingreso')
        .reduce((total, mov) => total + mov.monto, 0);

    const egresos = movimientos
        .filter((mov) => mov.tipo === 'egreso')
        .reduce((total, mov) => total + mov.monto, 0);

    // Calcular balance
    const balance = ingresos - egresos;

    // Actualizar elementos de gráficas
    const graficaBalance = document.getElementById('grafica-balance');
    graficaBalance.innerHTML = `
        <h4>Balance</h4>
        <p class="${balance >= 0 ? 'balance-positivo' : 'balance-negativo'}">
            $${balance.toFixed(2)}
        </p>
    `;
}

// Cargar nombre de usuario al cargar la página
document.addEventListener('DOMContentLoaded', function () {
    const username = localStorage.getItem('usuarioActual');
    if (!username) {
        // Si no hay usuario, redirigir al login
        window.location.href = 'login-sistema-responsivo.html';
    }

    // Mostrar nombre de usuario en la bienvenida
    const bienvenidaElement = document.getElementById('bienvenida');
    bienvenidaElement.textContent = `Bienvenido/a ${username}`;
});
