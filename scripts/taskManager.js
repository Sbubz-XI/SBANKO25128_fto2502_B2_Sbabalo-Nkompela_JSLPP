import {
  saveTasksToLocalStorage,
  loadTasksFromLocalStorage,
} from "./taskStorage.js";
import { updateTaskUI } from "./taskUI.js";
import { openModal, closeModal } from "./taskModals.js";

let tasks = loadTasksFromLocalStorage();
let currentTaskId = tasks.length
  ? Math.max(...tasks.map((task) => task.id)) + 1
  : 1;

export function saveNewTask() {
  let title = document.getElementById("new-task-title").value.trim();
  let description = document.getElementById("new-task-desc").value.trim();
  let status = document.getElementById("new-task-status").value;

  if (!title || !description) {
    alert("Please enter both title and description.");
    return;
  }

  let task = { id: currentTaskId++, title, description, status };
  tasks.push(task);
  saveTasksToLocalStorage(tasks);
  updateTaskUI(tasks);
  closeModal("add-task-modal");
}

export function saveTask() {
  const modal = document.getElementById("task-modal");
  const taskId = parseInt(modal.dataset.taskId, 10);

  let task = tasks.find((t) => t.id === taskId);
  if (!task) return;

  const oldStatus = task.status; // Store old status
  task.title = document.getElementById("task-title").value;
  task.description = document.getElementById("task-desc").value;
  task.status = document.getElementById("task-status").value;

  saveTasksToLocalStorage(tasks);
  updateTaskUI(tasks); // Ensure it moves to the correct column
  closeModal("task-modal");

  // ✅ Log task movement
  if (task.status !== oldStatus) {
    console.log(`"${task.title}" has been moved to "${task.status}"`);
  }
}

export function openEditTaskModal(taskId) {
  const modal = document.getElementById("task-modal");
  if (!modal) return;

  const task = tasks.find((t) => t.id === taskId);
  if (!task) return;

  document.getElementById("task-title").value = task.title;
  document.getElementById("task-desc").value = task.description;
  document.getElementById("task-status").value = task.status;

  modal.dataset.taskId = taskId;
  modal.showModal();
}
