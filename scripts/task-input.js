import { updateTaskUI } from "./taskUI.js";
import { loadTasksFromLocalStorage } from "./taskStorage.js";
import { openModal, closeModal } from "./taskModals.js";
import { saveNewTask, saveTask } from "./taskManager.js";
import { openEditTaskModal } from "./taskManager.js";
window.openEditTaskModal = openEditTaskModal;

let tasks = loadTasksFromLocalStorage();
updateTaskUI(tasks);

document.addEventListener("DOMContentLoaded", () => {
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
});

// Expose functions globally if needed
window.openModal = openModal;
window.closeModal = closeModal;
window.saveNewTask = saveNewTask;
window.saveTask = saveTask;
