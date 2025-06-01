import {
  saveTasksToLocalStorage,
  loadTasksFromLocalStorage,
} from "./storage.js";
import { updateTaskUI } from "./taskUI.js";
import { closeModal } from "./taskModals.js";

let tasks = loadTasksFromLocalStorage();
let currentTaskId =
  tasks.length > 0 ? Math.max(...tasks.map((task) => task.id), 0) + 1 : 1;

export function saveNewTask() {
  let title = document.getElementById("new-task-title").value.trim();
  let description = document.getElementById("new-task-desc").value.trim();
  let status = document.getElementById("new-task-status").value;
  let priority = document.getElementById("task-priority").value;

  if (!title || !description) {
    alert("Please enter both title and description.");
    return;
  }

  let task = { id: currentTaskId++, title, description, status, priority };
  tasks.push(task);
  saveTasksToLocalStorage(tasks);
  updateTaskUI(tasks);
  closeModal("add-task-modal");
}

export function openEditTaskModal(taskId) {
  const modal = document.getElementById("task-modal");
  if (!modal) return;

  const task = tasks.find((t) => t.id === taskId);
  if (!task) return;

  document.getElementById("task-title").value = task.title;
  document.getElementById("task-desc").value = task.description;
  document.getElementById("task-status").value = task.status;
  document.getElementById("task-priority").value = task.priority; // ✅ Added Priority

  modal.dataset.taskId = taskId;
  modal.showModal();
}

export function saveTask() {
  const modal = document.getElementById("task-modal");
  const taskId = parseInt(modal.dataset.taskId, 10);

  let task = tasks.find((t) => t.id === taskId);
  if (!task) return;

  task.title = document.getElementById("task-title").value.trim();
  task.description = document.getElementById("task-desc").value.trim();
  task.status = document.getElementById("task-status").value;
  task.priority = document.getElementById("task-priority").value;

  saveTasksToLocalStorage(tasks);
  updateTaskUI(tasks);
  closeModal("task-modal");
}

window.saveTask = saveTask;

export function deleteTask(taskId) {
  tasks = tasks.filter((task) => task.id !== taskId);
  saveTasksToLocalStorage(tasks);
  updateTaskUI(tasks);
}

window.saveTask = saveTask;
