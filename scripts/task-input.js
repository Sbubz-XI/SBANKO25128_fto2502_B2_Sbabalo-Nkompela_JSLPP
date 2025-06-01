import {
  Tasks,
  fetchTasksFromAPI,
  saveNewTask,
  deleteTask,
  openEditTaskModal,
  saveTask,
} from "./taskManager.js";
import { updateTaskUI } from "./taskUI.js";
import {
  openModal,
  closeModal,
  openAddTaskModal,
  toggleNavModal,
} from "./taskModals.js";
import { displayTasks } from "./API-tasks.js";
import {
  saveTasksToLocalStorage,
  loadTasksFromLocalStorage,
} from "./storage.js";

// Attach functions to window for inline HTML usage
window.openAddTaskModal = openAddTaskModal;
window.openEditTaskModal = openEditTaskModal;
window.deleteTask = deleteTask;
window.saveNewTask = saveNewTask;
window.saveTask = saveTask;
window.toggleNavModal = toggleNavModal;

document.addEventListener("DOMContentLoaded", () => {
  // Initialize global Tasks from local storage (if any)
  const storedTasks = loadTasksFromLocalStorage();
  if (storedTasks.length > 0) {
    // Update the global Tasks array (clearing and splicing preserves references)
    Tasks.splice(0, Tasks.length, ...storedTasks);
  } else {
    // If no tasks available, fetch from API
    fetchTasksFromAPI().then(() => {
      updateTaskUI();
    });
  }

  updateTaskUI();
  console.log("All Current Tasks:", Tasks);

  // Ensure buttons receive proper event listeners
  const saveTaskBtn = document.getElementById("save-new-task-btn");
  const closeAddModalBtn = document.getElementById("close-add-modal-btn");
  const saveEditedTaskBtn = document.getElementById("save-task-btn");
  const closeEditModalBtn = document.getElementById("close-modal-btn");

  if (saveTaskBtn) {
    saveTaskBtn.addEventListener("click", saveNewTask);
  }
  if (closeAddModalBtn) {
    closeAddModalBtn.addEventListener("click", () =>
      closeModal("add-task-modal")
    );
  }
  if (saveEditedTaskBtn) {
    saveEditedTaskBtn.addEventListener("click", saveTask);
  }
  if (closeEditModalBtn) {
    closeEditModalBtn.addEventListener("click", () => closeModal("task-modal"));
  }
});
