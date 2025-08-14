// taskManager.js
import { saveTasksToLocalStorage, loadTasksFromLocalStorage } from "./storage.js";



export let Tasks = [];

const generateUniqueId = () => Date.now() + Math.floor(Math.random() * 1000);

// fetch API tasks function
export async function fetchTasksFromAPI() {

  const loadingScreen = document.getElementById("loading-screen");

  if (loadingScreen) loadingScreen.style.display = "block";

  try {
    const response = await fetch("https://jsl-kanban-api.vercel.app/");

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const apiTasks = (await response.json()).map(task => ({
      ...task,
      id: task.id || generateUniqueId(),
    }));

    const storedTasks = loadTasksFromLocalStorage();

    // Merge and dedupe by id
    const mergedMap = new Map();

    [...storedTasks, ...apiTasks].forEach(task => mergedMap.set(task.id, task));

    Tasks = Array.from(mergedMap.values());

    saveTasksToLocalStorage(Tasks);

  } catch (error) {

    console.error("Error loading tasks:", error);

    Tasks = loadTasksFromLocalStorage();

  } finally {

    if (loadingScreen) loadingScreen.style.display = "none";
    
  }

}

export function saveTasks() {

  saveTasksToLocalStorage(Tasks);

}

export function saveNewTask(title, description, status) {

  if (!title || !description) {

    alert("Please enter both title and description.");

    return false;

  }
  const newTask = { id: generateUniqueId(), title, description, status };

  Tasks.push(newTask);

  saveTasks();
  console.log("Saved New Task")
  return true;

}

export function updateTask(taskId, title, description, status) {

  const task = Tasks.find(t => t.id === taskId);

  if (!task) {

    console.error(`Task with ID ${taskId} not found.`);

    return false;

  }

  task.title = title;

  task.description = description;

  task.status = status;

  saveTasks();

  return true;

}

export function deleteTask(taskId) {

  const index = Tasks.findIndex(t => t.id === taskId);

  if (index === -1) {

    console.error(`Task with ID ${taskId} not found.`);

    return false;

  }

  Tasks.splice(index, 1);

  saveTasks();

  return true;

}

export function openAddTaskModal() {
  const modal = document.getElementById("add-task-modal");
  if (modal) modal.showModal();
  else console.error("❌ Add Task Modal not found!");
}

export function openEditTaskModal(taskId) {
  const task = Tasks.find(t => t.id === taskId);
  if (!task) return;

  const modal = document.getElementById("task-modal");
  if (!modal) {
    console.error("❌ Edit Task Modal not found!");
    return;
  }

  document.getElementById("task-title").value = task.title;
  document.getElementById("task-desc").value = task.description;
  document.getElementById("task-status").value = task.status;

  modal.dataset.taskId = taskId;
  modal.showModal();
}

export function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.close();
  else console.error(`❌ Modal with ID '${modalId}' not found!`);
}

export async function init() {
  Tasks = loadTasksFromLocalStorage();
  if (Tasks.length === 0) {
    await fetchTasksFromAPI();
  }
}
