// Arreglo para almacenar movimientos
let movimientos = [];

// Selección de elementos del DOM
const formularioMovimiento = document.getElementById('movimiento-form');
const tipoMovimiento = document.getElementById('tipo-movimiento');
const descripcion = document.getElementById('descripcion');
const monto = document.getElementById('monto');
const fecha = document.getElementById('fecha');

// Evento de envío del formulario
formularioMovimiento.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validar campos
    if (!descripcion.value || !monto.value || !fecha.value) {
        alert('Por favor, completa todos los campos');
        return;
    }

    // Crear objeto de movimiento
    const nuevoMovimiento = {
        tipo: tipoMovimiento.value,
        descripcion: descripcion.value,
        monto: parseFloat(monto.value),
        fecha: fecha.value
    };

    // Agregar a array de movimientos
    movimientos.push(nuevoMovimiento);

    // Limpiar formulario
    descripcion.value = '';
    monto.value = '';
    fecha.value = '';

    // Actualizar gráficas
    actualizarGraficas();
});

// Función para actualizar gráficas
function actualizarGraficas() {
    const ingresos = movimientos
        .filter(mov => mov.tipo === 'ingreso')
        .reduce((total, mov) => total + mov.monto, 0);

    const egresos = movimientos
        .filter(mov => mov.tipo === 'egreso')
        .reduce((total, mov) => total + mov.monto, 0);

    // Calcular balance
    const balance = ingresos - egresos;

    // Actualizar elementos de gráficas
    const graficaIngresos = document.getElementById('grafica-ingresos');
    const graficaEgresos = document.getElementById('grafica-egresos');
    const graficaBalance = document.getElementById('grafica-balance');

    graficaIngresos.innerHTML = `
        <h4>Ingresos Totales</h4>
        <p>$${ingresos.toFixed(2)}</p>
    `;

    graficaEgresos.innerHTML = `
        <h4>Egresos Totales</h4>
        <p>$${egresos.toFixed(2)}</p>
    `;

    // Agregar sección de balance
    graficaBalance.innerHTML = `
        <h4>Balance</h4>
        <p class="${balance >= 0 ? 'balance-positivo' : 'balance-negativo'}">
            $${balance.toFixed(2)}
        </p>
    `;
}
