import {
  saveTasksToLocalStorage,
  loadTasksFromLocalStorage,
} from "./storage.js";
import { updateTaskUI } from "./taskUI.js";

export async function fetchTasks() {
  try {
    document.getElementById("loading-screen").style.display = "block"; // Show loader

    let storedTasks = loadTasksFromLocalStorage();
    if (storedTasks.length > 0) {
      document.getElementById("loading-screen").style.display = "none"; // Hide loader
      return storedTasks;
    }

    const response = await fetch("https://jsl-kanban-api.vercel.app/");
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const tasks = await response.json();
    console.log("Fetched API Tasks:", tasks);

    tasks.forEach((task) => (task.priority = task.priority || "medium")); // Default priority

    saveTasksToLocalStorage(tasks);
    document.getElementById("loading-screen").style.display = "none"; // Hide loader
    return tasks;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    document.getElementById("loading-screen").style.display = "none"; // Hide loader
    return loadTasksFromLocalStorage();
  }
}

const loadingScreen = document.getElementById("loading-screen");
if (loadingScreen) {
  loadingScreen.style.display = "block";
}

export async function displayTasks() {
  const tasks = await fetchTasks();
  updateTaskUI(tasks);
}
