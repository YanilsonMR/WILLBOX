function registrarse() {
    const username = document.getElementById('registro-username').value;
    const email = document.getElementById('registro-email').value;
    const password = document.getElementById('registro-password').value;
    const confirmPassword = document.getElementById('registro-confirm-password').value;
    const mensajeDiv = document.getElementById('mensaje');

    // Validaciones
    if (!username || !password) {
        mensajeDiv.textContent = 'Por favor, complete todos los campos';
        return;
    }

    if (password !== confirmPassword) {
        mensajeDiv.textContent = 'Las contraseñas no coinciden';
        return;
    }

    // Verificar si el usuario ya existe
    if (localStorage.getItem(username)) {
        mensajeDiv.textContent = 'El nombre de usuario ya existe';
        return;
    }
    
    // Verificando el email
    if(localStorage.getItem(email)){
        mensajeDiv.textContent = 'El correo ya esta en uso'
        return;
    }

    // Guardar el usuario en localStorage
    localStorage.setItem(username, password, email);
    mensajeDiv.textContent = 'Registro exitoso. Ahora puedes iniciar sesión.';
    
    // Limpiar campos
    document.getElementById('registro-username').value = '';
    document.getElementById('registro-email').value = '';
    document.getElementById('registro-password').value = '';
    document.getElementById('registro-confirm-password').value = '';
}

function iniciarSesion() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    const mensajeDiv = document.getElementById('mensaje');

    // Verificar credenciales
    const storedPassword = localStorage.getItem(username);

    if (storedPassword === password) {
        mensajeDiv.textContent = 'Inicio de sesión exitoso';
        localStorage.setItem('usuarioActual', username);
        window.location.href = 'identidad.html'; 
        // Aquí podrías redirigir a otra página
    } else {
        mensajeDiv.textContent = 'Nombre de usuario o contraseña incorrectos';
    }
}

// Funciones para cambiar entre formularios
function mostrarRegistro() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('registro-form').style.display = 'block';
}

function mostrarLogin() {
    document.getElementById('registro-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
}

function cerrarSesion() {
    // Eliminar usuario actual
    localStorage.removeItem('usuarioActual');
    // Redirigir al login
    window.location.href = 'Login.html';
}