/* Elementos */
const tasksList = document.querySelector("#tasks-list");
const newTaskBtn = document.querySelector("#new-task-btn");

/* Modal */
const taskModal = document.querySelector("#task-modal");
const closeModalBtn = document.querySelector("#close-modal");
const cancelTaskBtn = document.querySelector("#cancel-task");
const taskForm = document.querySelector("#task-form");

const taskTitleInput = document.querySelector("#task-title");
const taskCategoryInput = document.querySelector("#task-category");
const taskPriorityInput = document.querySelector("#task-priority");
const taskDateInput = document.querySelector("#task-date");

function openModal() {
  taskModal.classList.remove("hidden");
}

function closeModal() {
  taskModal.classList.add("hidden");
  taskForm.reset();
}

if (newTaskBtn) {
  newTaskBtn.addEventListener("click", openModal);
}

closeModalBtn?.addEventListener("click", closeModal);
cancelTaskBtn?.addEventListener("click", closeModal);

taskModal?.addEventListener("click", (event) => {
  if (event.target === taskModal) {
    closeModal();
  }
});

/* Tasks */
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

/* Salvar */
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

/* Helpers */
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

function getPriorityLabel(priority) {
  switch (priority) {
    case "high":
      return "Alta";
    case "medium":
      return "Média";
    case "low":
      return "Baixa";
    default:
      return "Baixa";
  }
}

/* CRUD */
function createTask(data) {
  const task = {
    id: Date.now(),
    title: data.title,
    category: data.category,
    priority: data.priority,
    dueDate: data.dueDate,
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

function editTask(id) {
  const task = tasks.find((task) => task.id === id);

  if (!task) return;

  const newTitle = prompt("Editar tarefa:", task.title);

  if (!newTitle) return;

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

/* Renderização */
function renderTasks() {
  tasksList.innerHTML = "";

  if (tasks.length === 0) {
    tasksList.innerHTML = `
      <div class="empty-state">
        <h3>Nenhuma tarefa cadastrada</h3>
        <p>Clique em "Nova Tarefa"</p>
      </div>
    `;
    return;
  }

  tasks.forEach((task) => {
    const card = document.createElement("article");

    card.className = task.completed ? "task-card completed" : "task-card";

    card.innerHTML = `
      <div class="task-check">
        <input type="checkbox" ${task.completed ? "checked" : ""} />
      </div>

      <div class="task-content">
        <h3>${task.title}</h3>
        <div class="task-meta">
          <span class="task-category ${task.category}">
            ${getCategoryLabel(task.category)}
          </span>
          <span class="task-priority ${task.priority}">
            ${getPriorityLabel(task.priority)}
          </span>
        </div>
        <p class="task-date">${task.dueDate || "Sem prazo"}</p>
      </div>

      <div class="task-actions">
        <button class="edit-btn">
          <i class="bi bi-pencil"></i>
        </button>
        <button class="delete-btn">
          <i class="bi bi-trash"></i>
        </button>
      </div>
    `;

    const checkbox = card.querySelector("input");

    checkbox.addEventListener("change", () => {
      toggleTask(task.id);
    });

    const editBtn = card.querySelector(".edit-btn");

    editBtn.addEventListener("click", () => {
      editTask(task.id);
    });

    const deleteBtn = card.querySelector(".delete-btn");

    deleteBtn.addEventListener("click", () => {
      deleteTask(task.id);
    });

    tasksList.appendChild(card);
  });
}

/* Formulário */
taskForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = taskTitleInput.value.trim();

  if (!title) return;

  createTask({
    title,
    category: taskCategoryInput.value,
    priority: taskPriorityInput.value,
    dueDate: taskDateInput.value,
  });

  closeModal();
});

renderTasks();
