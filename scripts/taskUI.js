// ui.js
import {
  Tasks,
  openAddTaskModal,
  openEditTaskModal,
  closeModal,
  saveNewTask,
  updateTask,
  deleteTask,
  init,
} from "./taskManager.js";

import { loadThemeFromLocalStorage, saveThemeToLocalStorage } from "./storage.js";

function clearTaskColumns() {
  document.querySelectorAll(".column").forEach(col => (col.innerHTML = ""));
}

function updateTaskCounts() {
  ["todo", "doing", "done"].forEach(status => {
    const colHeader = document.querySelector(`#${status}-column`).previousElementSibling.querySelector("h4");
    if (colHeader) {
      const count = Tasks.filter(t => t.status === status).length;
      colHeader.textContent = `${status.toUpperCase()} (${count})`;
    }
  });
}

export function updateTaskUI() {
  if (!Array.isArray(Tasks)) {
    console.error("❌ Tasks data invalid.");
    return;
  }
  clearTaskColumns();

  Tasks.forEach(task => {
    const taskEl = document.createElement("div");
    taskEl.className =
      "bg-white rounded-lg hover:bg-[#E4EBFA] hover:scale-101 transition-all duration-300 mb-5 py-4 px-4 font-bold shadow-md cursor-pointer";
    taskEl.textContent = task.title;
    taskEl.addEventListener("click", () => openEditTaskModal(task.id));

    const column = document.getElementById(`${task.status}-column`);
    if (column) column.appendChild(taskEl);
  });

  updateTaskCounts();
}

function setupTheme() {
  const themeBtn = document.querySelector(".theme-btn");
  if (!themeBtn) return;

  themeBtn.addEventListener("click", () => {
    const isDark = document.documentElement.classList.toggle("dark");
    saveThemeToLocalStorage(isDark ? "dark" : "light");
  });

  if (loadThemeFromLocalStorage() === "dark") {
    document.documentElement.classList.add("dark");
  }
}

function hideSidebar() {
  const sidebar = document.querySelector("nav");
  if (!sidebar) return console.error("Sidebar not found!");
  sidebar.style.display = "none";
}

function setupEventListeners() {
  document.querySelectorAll("[onclick='openAddTaskModal()']").forEach(btn => btn.addEventListener("click", openAddTaskModal));

  const saveNewBtn = document.getElementById("save-new-task-btn");
  const closeAddBtn = document.getElementById("close-add-modal-btn");
  const saveEditBtn = document.getElementById("save-task-btn") || document.getElementById("save-new-task-btn");
  const closeEditBtn = document.querySelector("#task-modal .close-modal");
  const deleteBtn = document.getElementById("deleteTaskBtn");
  const navToggle = document.querySelector("[onclick='toggleNavModal()']");

  if (saveNewBtn) saveNewBtn.addEventListener("click", e => {
    e.preventDefault();
    const title = document.getElementById("new-task-title").value.trim();
    const desc = document.getElementById("new-task-desc").value.trim();
    const status = document.getElementById("new-task-status").value;
    if (saveNewTask(title, desc, status)) {
      updateTaskUI();
      closeModal("add-task-modal");
    }
  });

  if (closeAddBtn) closeAddBtn.addEventListener("click", () => closeModal("add-task-modal"));

  if (saveEditBtn) saveEditBtn.addEventListener("click", e => {
    e.preventDefault();
    const modal = document.getElementById("task-modal");
    const taskId = parseInt(modal.dataset.taskId, 10);
    const title = document.getElementById("task-title").value.trim();
    const desc = document.getElementById("task-desc").value.trim();
    const status = document.getElementById("task-status").value;

    if (updateTask(taskId, title, desc, status)) {
      updateTaskUI();
      closeModal("task-modal");
    }
  });

  if (closeEditBtn) closeEditBtn.addEventListener("click", () => closeModal("task-modal"));

  if (deleteBtn) deleteBtn.addEventListener("click", e => {
    e.preventDefault();
    const modal = document.getElementById("task-modal");
    const taskId = parseInt(modal.dataset.taskId, 10);
    if (deleteTask(taskId)) {
      updateTaskUI();
      closeModal("task-modal");
    }
  });

  if (navToggle) navToggle.addEventListener("click", () => {
    const navModal = document.getElementById("nav-modal");
    if (!navModal) return console.error("❌ Navigation modal not found!");
    navModal.open ? navModal.close() : navModal.showModal();
  });

  setupTheme();
}

document.addEventListener("DOMContentLoaded", async () => {
  await init();
  updateTaskUI();
  setupEventListeners();
});

export { hideSidebar };
