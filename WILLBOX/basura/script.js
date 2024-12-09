// script.js

// Referencias al DOM
const taskForm = document.getElementById('taskForm'); // Obtiene el formulario donde se ingresan las tareas
const taskInput = document.getElementById('taskInput'); // Obtiene el campo de texto para ingresar nuevas tareas
const taskList = document.getElementById('taskList'); // Obtiene la lista donde se mostrarán las tareas

// Recuperar tareas del Local Storage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
// Intenta cargar las tareas guardadas en Local Storage; si no hay ninguna, inicializa un arreglo vacío

// Renderizar las tareas en la lista
function renderTasks() {
  taskList.innerHTML = ''; // Limpia la lista actual para evitar duplicados
  tasks.forEach((task, index) => { // Itera sobre cada tarea en el arreglo 'tasks'
    const li = document.createElement('li'); // Crea un elemento <li> para cada tarea
    li.className = task.completed ? 'completed' : '';
    // Asigna la clase 'completed' si la tarea está marcada como completada

    // Crear el checkbox
    const checkbox = document.createElement('input'); // Crea un elemento <input> tipo checkbox
    checkbox.type = 'checkbox'; // Define que es un checkbox
    checkbox.checked = task.completed; // Marca el checkbox si la tarea está completada
    checkbox.addEventListener('change', () => toggleTask(index));
    // Agrega un evento para alternar el estado de la tarea al hacer clic

    // Crear el texto de la tarea
    const span = document.createElement('span'); // Crea un elemento <span> para el texto de la tarea
    span.textContent = task.text; // Asigna el texto de la tarea al <span>

    // Crear botones de editar y eliminar
    const editButton = document.createElement('button'); // Crea un botón para editar
    editButton.innerHTML = `<i class="bi bi-pencil-square"></i>`;
    // Asigna un icono al botón de editar
    editButton.addEventListener('click', () => editTask(index));
    // Agrega un evento para editar la tarea al hacer clic

    const deleteButton = document.createElement('button'); // Crea un botón para eliminar
    deleteButton.innerHTML = `<i class="bi bi-trash"></i>`;
    // Asigna un icono al botón de eliminar
    deleteButton.addEventListener('click', () => deleteTask(index));
    // Agrega un evento para eliminar la tarea al hacer clic

    // Agregar elementos al <li>
    const buttonContainer = document.createElement('div'); // Crea un contenedor para los botones
    buttonContainer.appendChild(editButton); // Añade el botón de editar al contenedor
    buttonContainer.appendChild(deleteButton); // Añade el botón de eliminar al contenedor

    li.appendChild(checkbox); // Añade el checkbox al <li>
    li.appendChild(span); // Añade el texto de la tarea al <li>
    li.appendChild(buttonContainer); // Añade los botones al <li>

    // Agregar el <li> a la lista
    taskList.appendChild(li); // Inserta el <li> en la lista de tareas
  });
}

// Agregar una nueva tarea
taskForm.addEventListener('submit', (e) => {
  e.preventDefault(); // Evita que el formulario recargue la página al enviar
  const newTask = {
    text: taskInput.value, // Toma el texto ingresado en el campo de entrada
    completed: false // Marca la nueva tarea como incompleta por defecto
  };
  tasks.push(newTask); // Agrega la nueva tarea al arreglo 'tasks'
  taskInput.value = ''; // Limpia el campo de entrada
  saveTasks(); // Guarda las tareas actualizadas en Local Storage
  renderTasks(); // Vuelve a renderizar la lista de tareas
});

// Editar una tarea
function editTask(index) {
  const newText = prompt('Edita tu tarea:', tasks[index].text);
  // Abre un cuadro de diálogo para ingresar el nuevo texto de la tarea
  if (newText !== null) { // Verifica que el usuario no haya cancelado el cuadro de diálogo
    tasks[index].text = newText.trim(); // Actualiza el texto de la tarea y elimina espacios extra
    saveTasks(); // Guarda las tareas actualizadas en Local Storage
    renderTasks(); // Vuelve a renderizar la lista de tareas
  }
}

// Eliminar una tarea
function deleteTask(index) {
  tasks.splice(index, 1); // Elimina la tarea del arreglo usando su índice
  saveTasks(); // Guarda las tareas actualizadas en Local Storage
  renderTasks(); // Vuelve a renderizar la lista de tareas
}

// Marcar tarea como completada/incompleta
function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  // Alterna el estado de completada de la tarea
  saveTasks(); // Guarda las tareas actualizadas en Local Storage
  renderTasks(); // Vuelve a renderizar la lista de tareas
}

// Guardar tareas en Local Storage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
  // Convierte el arreglo 'tasks' a una cadena JSON y lo guarda en Local Storage
}

// Inicializar la lista de tareas
renderTasks(); // Llama a la función para mostrar las tareas al cargar la página
