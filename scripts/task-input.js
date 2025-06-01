import { updateTaskUI } from "./taskUI.js";
import { loadTasksFromLocalStorage } from "./storage.js";
import { openModal, closeModal, openAddTaskModal } from "./taskModals.js";
import { saveNewTask, deleteTask, openEditTaskModal } from "./taskManager.js";
import { displayTasks } from "./API-tasks.js";

window.openAddTaskModal = openAddTaskModal;
window.openEditTaskModal = openEditTaskModal;
window.deleteTask = deleteTask;

let selectedTaskId = null;

document.addEventListener("DOMContentLoaded", () => {
  const deleteTaskBtn = document.getElementById("deleteTaskBtn");

  if (deleteTaskBtn) {
    deleteTaskBtn.addEventListener("click", () => {
      if (!selectedTaskId) {
        console.error("No task selected for deletion.");
        return;
      }

      deleteTask(selectedTaskId);
      selectedTaskId = null; // Reset after deletion
    });
  } else {
    console.warn("Delete Task Button not found in the DOM.");
  }
});

document.addEventListener("DOMContentLoaded", async () => {
  let tasks = loadTasksFromLocalStorage();
  updateTaskUI(tasks);
  await displayTasks();

  document
    .getElementById("save-new-task-btn")
    ?.addEventListener("click", saveNewTask);
});
