// Arreglo para almacenar movimientos
let movimientos = [];

// Selección de elementos del DOM
const formularioMovimiento = document.getElementById('movimiento-form');
const tipoMovimiento = document.getElementById('tipo-movimiento');
const descripcion = document.getElementById('descripcion');
const monto = document.getElementById('monto');
const listaIngresos = document.getElementById('lista-ingresos');
const listaEgresos = document.getElementById('lista-egresos');

// Selección de los elementos de las gráficas
const ctxIngresos = document.getElementById('grafica-ingresos-canvas').getContext('2d');
const ctxEgresos = document.getElementById('grafica-egresos-canvas').getContext('2d');
const ctxBalance = document.getElementById('grafica-balance-canvas').getContext('2d');

// Inicialización de los gráficos (vacíos inicialmente)
let graficaIngresos = new Chart(ctxIngresos, {
    type: 'pie',
    data: {
        labels: [],
        datasets: [{
            data: [],
            backgroundColor: ['#36a2eb', '#ff6384', '#ffcd56', '#4bc0c0', '#ff9f40'],
        }]
    }
});

let graficaEgresos = new Chart(ctxEgresos, {
    type: 'pie',
    data: {
        labels: [],
        datasets: [{
            data: [],
            backgroundColor: ['#36a2eb', '#ff6384', '#ffcd56', '#4bc0c0', '#ff9f40'],
        }]
    }
});

let graficaBalance = new Chart(ctxBalance, {
    type: 'bar',
    data: {
        labels: ['Ingresos', 'Egresos'],
        datasets: [{
            label: 'Total',
            data: [0, 0],
            backgroundColor: ['#36a2eb', '#ff6384'],
        }]
    }
});

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
    // Filtrar ingresos y egresos
    const ingresosData = movimientos.filter(mov => mov.tipo === 'ingreso');
    const egresosData = movimientos.filter(mov => mov.tipo === 'egreso');

    // Actualizar gráfico de ingresos
    const ingresosLabels = ingresosData.map(mov => mov.descripcion);
    const ingresosValues = ingresosData.map(mov => mov.monto);
    graficaIngresos.data.labels = ingresosLabels;
    graficaIngresos.data.datasets[0].data = ingresosValues;
    graficaIngresos.update();

    // Actualizar gráfico de egresos
    const egresosLabels = egresosData.map(mov => mov.descripcion);
    const egresosValues = egresosData.map(mov => mov.monto);
    graficaEgresos.data.labels = egresosLabels;
    graficaEgresos.data.datasets[0].data = egresosValues;
    graficaEgresos.update();

    // Calcular balance
    const totalIngresos = ingresosData.reduce((total, mov) => total + mov.monto, 0);
    const totalEgresos = egresosData.reduce((total, mov) => total + mov.monto, 0);
    const balance = totalIngresos - totalEgresos;

    // Actualizar gráfico de balance
    graficaBalance.data.datasets[0].data = [totalIngresos, totalEgresos];
    graficaBalance.update();

    // Actualizar balance en el HTML
    const graficaBalanceDiv = document.getElementById('grafica-balance');
    graficaBalanceDiv.innerHTML = `
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
