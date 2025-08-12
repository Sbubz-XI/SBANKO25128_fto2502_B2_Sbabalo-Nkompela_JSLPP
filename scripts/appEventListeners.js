// appEventListeners.js
import {
  openAddTaskModal,
  closeModal,
  saveNewTask,
  deleteTask,
  openEditTaskModal,
  updateTask,
  Tasks,
} from './taskManager.js';

import { updateTaskUI } from './taskUI.js';

document.addEventListener('DOMContentLoaded', () => {
  // Add New Task buttons (desktop + mobile)
  const addTaskBtn = document.getElementById('add-task-button');
  const addTaskBtnMobile = document.getElementById('add-task-button-mobile');

  if (addTaskBtn) addTaskBtn.addEventListener('click', openAddTaskModal);
  if (addTaskBtnMobile) addTaskBtnMobile.addEventListener('click', openAddTaskModal);

  // Save New Task button
  const saveNewTaskBtn = document.getElementById('save-new-task-btn');
  if (saveNewTaskBtn) {
    saveNewTaskBtn.addEventListener('click', () => {
      const title = document.getElementById('new-task-title').value.trim();
      const description = document.getElementById('new-task-desc').value.trim();
      const status = document.getElementById('new-task-status').value;

      if (saveNewTask(title, description, status)) {
        closeModal('add-task-modal');
        updateTaskUI();
        // Clear inputs after saving
        document.getElementById('new-task-title').value = '';
        document.getElementById('new-task-desc').value = '';
        document.getElementById('new-task-status').value = 'todo';
      }
    });
  }

  // Close Add Task Modal button
  const closeAddModalBtn = document.getElementById('close-add-modal-btn');
  if (closeAddModalBtn) {
    closeAddModalBtn.addEventListener('click', () => closeModal('add-task-modal'));
  }

  // Close Edit Task Modal button
  const closeTaskModalBtn = document.getElementById('close-task-modal-btn');
  if (closeTaskModalBtn) {
    closeTaskModalBtn.addEventListener('click', () => closeModal('task-modal'));
  }

  // Save Edited Task button
  const saveTaskBtn = document.getElementById('save-task-btn');
  if (saveTaskBtn) {
    saveTaskBtn.addEventListener('click', () => {
      const modal = document.getElementById('task-modal');
      const taskId = Number(modal.dataset.taskId);
      const title = document.getElementById('task-title').value.trim();
      const description = document.getElementById('task-desc').value.trim();
      const status = document.getElementById('task-status').value;

      if (updateTask(taskId, title, description, status)) {
        closeModal('task-modal');
        updateTaskUI();
      }
    });
  }

  // Delete Task button
  const deleteTaskBtn = document.getElementById('deleteTaskBtn');
  if (deleteTaskBtn) {
    deleteTaskBtn.addEventListener('click', () => {
      const modal = document.getElementById('task-modal');
      const taskId = Number(modal.dataset.taskId);

      if (deleteTask(taskId)) {
        closeModal('task-modal');
        updateTaskUI();
      }
    });
  }

  // Mobile Logo click to toggle nav modal
  const mobileLogo = document.getElementById('mobile-logo');
  if (mobileLogo) {
    mobileLogo.addEventListener('click', () => {
      const navModal = document.getElementById('nav-modal');
      if (navModal) {
        if (navModal.open) navModal.close();
        else navModal.showModal();
      }
    });
  }

  // Close Nav Modal button
  const closeNavModalBtn = document.getElementById('close-nav-modal-btn');
  if (closeNavModalBtn) {
    closeNavModalBtn.addEventListener('click', () => closeModal('nav-modal'));
  }

  // Dark mode toggle buttons
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  const darkModeToggle2 = document.getElementById('dark-mode-toggle-2');
  function toggleDarkMode() {
    document.documentElement.classList.toggle('dark');
    localStorage.setItem(
      'theme',
      document.documentElement.classList.contains('dark') ? 'dark' : 'light'
    );
  }
  if (darkModeToggle) darkModeToggle.addEventListener('click', toggleDarkMode);
  if (darkModeToggle2) darkModeToggle2.addEventListener('click', toggleDarkMode);

  // On page load, set theme from localStorage
  if (localStorage.getItem('theme') === 'dark') {
    document.documentElement.classList.add('dark');
  }

  // Hide sidebar button
  const hideSidebarBtn = document.getElementById("hide-sidebar-btn");
  const revealSidebarBtn = document.getElementById("reveal-sidebar-btn");

  if (hideSidebarBtn && revealSidebarBtn) {
    hideSidebarBtn.addEventListener("click", () => {
      hideSidebar();
      hideSidebarBtn.style.display = "none";
      revealSidebarBtn.style.display = "block";
    });

    revealSidebarBtn.addEventListener("click", () => {
      revealSidebar();
      hideSidebarBtn.style.display = "block";
      revealSidebarBtn.style.display = "none";
    });
  }
});
