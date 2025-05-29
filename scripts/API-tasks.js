import {
  saveTasksToLocalStorage,
  loadTasksFromLocalStorage,
} from "./taskStorage.js";
import { updateTaskUI } from "./taskUI.js";

export async function fetchTasks() {
  try {
    const response = await fetch("https://jsl-kanban-api.vercel.app/");
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const tasks = await response.json();
    console.log("Fetched API Tasks:", tasks);

    // ✅ Save fetched tasks for persistence
    saveTasksToLocalStorage(tasks);

    return tasks;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return loadTasksFromLocalStorage(); // ✅ Falls back to local storage
  }
}

// ✅ Updated function to handle API task storage & display
export async function displayTasks() {
  const tasks = await fetchTasks();
  updateTaskUI(tasks); // Load API tasks into the UI
}
