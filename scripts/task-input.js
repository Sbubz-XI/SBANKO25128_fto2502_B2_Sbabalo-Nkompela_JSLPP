import { updateTaskUI } from "./taskUI.js";
import { loadTasksFromLocalStorage } from "./storage.js";
import { openModal, closeModal, openAddTaskModal } from "./taskModals.js";
import { saveNewTask, saveTask, openEditTaskModal } from "./taskManager.js";
import { displayTasks } from "./API-tasks.js";

// ✅ Ensure functions are accessible globally for `onclick=""`
window.openAddTaskModal = openAddTaskModal;
window.openEditTaskModal = openEditTaskModal;

document.addEventListener("DOMContentLoaded", async () => {
  let tasks = loadTasksFromLocalStorage();
  updateTaskUI(tasks);
  await displayTasks(); // Fetch API tasks

  document
    .getElementById("save-new-task-btn")
    ?.addEventListener("click", saveNewTask);

  document
    .getElementById("close-add-modal-btn")
    ?.addEventListener("click", () => closeModal("add-task-modal"));

  document.getElementById("save-task-btn")?.addEventListener("click", saveTask);

  document
    .getElementById("close-modal-btn")
    ?.addEventListener("click", () => closeModal("task-modal"));

  // ✅ Ensure add-task button triggers the correct function
  document
    .getElementById("open-add-task-btn")
    ?.addEventListener("click", openAddTaskModal);
});

window.openModal = openModal;
window.closeModal = closeModal;
window.saveNewTask = saveNewTask;
window.saveTask = saveTask;
