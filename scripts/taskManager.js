import {
  saveTasksToLocalStorage,
  loadTasksFromLocalStorage,
} from "./storage.js";
import { updateTaskUI } from "./taskUI.js";
import { closeModal } from "./taskModals.js";

export let Tasks = loadTasksFromLocalStorage();

let currentTaskId =
  Tasks.length > 0 ? Math.max(...Tasks.map((task) => task.id)) + 1 : 1;

function generateUniqueId() {
  return Date.now() + Math.floor(Math.random() * 1000);
}

export async function fetchTasksFromAPI() {
  try {
    const response = await fetch("https://jsl-kanban-api.vercel.app/");
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const apiTasks = await response.json();
    console.log("✅ Fetched API Tasks:", apiTasks);

    // Assign unique IDs and default priority
    apiTasks.forEach((task) => {
      task.id = task.id || generateUniqueId();
      task.priority = task.priority || "medium";
    });

    // Merge fetched tasks with stored tasks
    const storedTasks = loadTasksFromLocalStorage();
    const mergedTasks = [...storedTasks, ...apiTasks];

    // Update global Tasks and persist them
    Tasks.splice(0, Tasks.length, ...mergedTasks);
    saveTasksToLocalStorage(Tasks);
    updateTaskUI();
    return Tasks;
  } catch (error) {
    console.error("❌ Error fetching tasks from API:", error);
    return loadTasksFromLocalStorage();
  }
}

export function saveNewTask() {
  let title = document.getElementById("new-task-title").value.trim();
  let description = document.getElementById("new-task-desc").value.trim();
  let status = document.getElementById("new-task-status").value;

  if (!title || !description) {
    alert("Please enter both title and description.");
    return;
  }

  let newTask = {
    id: generateUniqueId(),
    title,
    description,
    status,
  };
  Tasks.push(newTask);
  saveTasksToLocalStorage(Tasks);
  updateTaskUI();
  closeModal("add-task-modal");
}

// Function to open the Edit Task Modal
export function openEditTaskModal(taskId) {
  const modal = document.getElementById("task-modal");
  if (!modal) return;

  const task = Tasks.find((t) => t.id === taskId);
  if (!task) return;

  document.getElementById("task-title").value = task.title;
  document.getElementById("task-desc").value = task.description;
  document.getElementById("task-status").value = task.status;

  modal.dataset.taskId = taskId;
  modal.showModal();
}

export function saveTask() {
  const modal = document.getElementById("task-modal");
  if (!modal) return;

  const taskId = parseInt(modal.dataset.taskId, 10);
  let task = Tasks.find((t) => t.id === taskId);
  if (!task) {
    console.error(`❌ Error: Task with ID ${taskId} not found.`);
    return;
  }

  let titleInput = document.getElementById("task-title").value.trim();
  let descInput = document.getElementById("task-desc").value.trim();
  let statusInput = document.getElementById("task-status").value;

  task.title = titleInput;
  task.description = descInput;
  task.status = statusInput;

  saveTasksToLocalStorage(Tasks);
  updateTaskUI();
  closeModal("task-modal");
}
window.saveTask = saveTask;

export function deleteTask(taskId) {
  const taskIndex = Tasks.findIndex((task) => task.id === taskId);

  if (taskIndex !== -1) {
    Tasks = [...Tasks.slice(0, taskIndex), ...Tasks.slice(taskIndex + 1)];

    // Update LocalStorage to persist the change
    saveTasksToLocalStorage(Tasks);

    updateTaskUI();
  } else {
    console.error(`❌ Task with ID ${taskId} not found.`);
  }
}
