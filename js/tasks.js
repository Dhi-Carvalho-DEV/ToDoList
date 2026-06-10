/* Elementos */
const tasksList = document.querySelector("#tasks-list");
const newTaskBtn = document.querySelector("#new-task-btn");

/* Tasks */
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

/* Salvar */
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

/* Renderizar */
function renderTasks() {
  tasksList.innerHTML = "";

  if (tasks.length === 0) {
    tasksList.innerHTML = `
      <div class="empty-state">
        <h3>Nenhuma tarefa cadastrada</h3>
        <p>Clique em "Nova Tarefa".</p>
      </div>
    `;
    return;
  }

  tasks.forEach((task) => {
    const card = document.createElement("article");

    card.className = task.completed ? "task-card completed" : "task-card";
    card.innerHTML = `
    <div class="task-check">
      <input type="checkbox" ${task.completed ? "checked" : ""}>
    </div>
    <div class="task-content">
      <h3>${task.title}</h3>

      <div class="task-meta">
        <span class="task-category ${task.category}">
          ${getCategoryLabel(task.category)}
        </span>
      </div>
    </div>

    <div class="task-actions">
      <button class="delete-btn">
        <i class="bi bi-trash"></i>
      </button>
    </div>
  `;

    const checkbox = card.querySelector("input");

    checkbox.addEventListener("change", () => {
      toggleTask(task.id);
    });

    const deleteBtn = card.querySelector(".delete-btn");

    deleteBtn.addEventListener("click", () => {
      deleteTask(task.id);
    });

    tasksList.appendChild(card);
  });
}

function getCategoryLabel(category) {
  switch (category) {
    case "study":
      return "Estudos";

    case "work":
      return "Trabalho";

    case "home":
      return "Casa";

    case "finance":
      return "Finanças";

    default:
      return "Outros";
  }
}

function createTask() {
  const title = prompt("Nome da tarefa:");

  if (!title) return;

  const task = {
    id: Date.now(),
    title,
    category: "study",
    completed: false,
    createdAt: new Date().toISOString(),
  };

  tasks.push(task);

  saveTasks();

  renderTasks();
}

function toggleTask(id) {
  tasks = tasks.map((task) => {
    if (task.id === id) {
      task.completed = !task.completed;
    }

    return task;
  });

  saveTasks();

  renderTasks();
}

function deleteTask(id) {
  const confirmDelete = confirm("Excluir tarefa?");

  if (!confirmDelete) return;

  tasks = tasks.filter((task) => task.id !== id);

  saveTasks();

  renderTasks();
}

if (newTaskBtn) {
  newTaskBtn.addEventListener("click", createTask);
}

renderTasks();
