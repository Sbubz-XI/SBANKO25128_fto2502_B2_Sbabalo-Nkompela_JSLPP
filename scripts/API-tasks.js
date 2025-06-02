import {
  saveTasksToLocalStorage,
  loadTasksFromLocalStorage,
} from "./storage.js";
import { updateTaskUI } from "./taskUI.js";

function generateUniqueId() {
  return Date.now() + Math.floor(Math.random() * 1000);
}

export async function fetchTasks() {
  const loadingScreen = document.getElementById("loading-screen");
  // Show loader
  if (loadingScreen) loadingScreen.style.display = "block";

  try {
    let storedTasks = loadTasksFromLocalStorage();
    if (storedTasks.length > 0) {
      console.log("✅ Loaded tasks from local storage:", storedTasks);
      if (loadingScreen) loadingScreen.style.display = "none";
      return storedTasks;
    }

    const response = await fetch("https://jsl-kanban-api.vercel.app/");
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const apiTasks = await response.json();
    console.log("✅ Fetched API tasks:", apiTasks);

    apiTasks.forEach((task) => {
      task.id = task.id || generateUniqueId();
    });

    saveTasksToLocalStorage(apiTasks);
    if (loadingScreen) loadingScreen.style.display = "none";
    return apiTasks;
  } catch (error) {
    console.error("❌ Error fetching tasks:", error);
    if (loadingScreen) loadingScreen.style.display = "none";
    return loadTasksFromLocalStorage();
  }
}

export async function displayTasks() {
  await fetchTasks();
  updateTaskUI();
}
