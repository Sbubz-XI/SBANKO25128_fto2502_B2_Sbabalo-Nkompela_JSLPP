import { fetchTasks } from "./API-tasks.js"; // ✅ Fix import

const STORAGE_KEY = "kanban_tasks";

// ✅ Load tasks from API if local storage is empty
async function initializeTasks() {
  let storedTasks = localStorage.getItem(STORAGE_KEY);
  if (!storedTasks) {
    const apiTasks = await fetchTasks(); // ✅ Fetch from API
    localStorage.setItem(STORAGE_KEY, JSON.stringify(apiTasks)); // ✅ Store API tasks
  }
}

// ✅ Local storage functions
export function saveTasksToLocalStorage(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

export function loadTasksFromLocalStorage() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

// ✅ Ensure API tasks are fetched on first load
initializeTasks();
