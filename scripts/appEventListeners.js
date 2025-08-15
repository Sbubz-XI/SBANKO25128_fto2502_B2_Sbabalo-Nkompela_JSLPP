// appEventListeners.js
import {
  openAddTaskModal,
  closeModal,
  saveNewTask,
  deleteTask,
  openEditTaskModal,
  updateTask,
} from './taskManager.js';

import { updateTaskUI } from './taskUI.js';

document.addEventListener('DOMContentLoaded', () => {
  // Open Add Task Modal
  document.getElementById('add-task-button')?.addEventListener('click', openAddTaskModal);
  document.getElementById('add-task-button-mobile')?.addEventListener('click', openAddTaskModal);

  // Save New Task
  document.getElementById('save-new-task-btn')?.addEventListener('click', () => {
    const title = document.getElementById('new-task-title').value.trim();
    const description = document.getElementById('new-task-desc').value.trim();
    const status = document.getElementById('new-task-status').value;

    if (saveNewTask(title, description, status)) {
      closeModal('add-task-modal');
      updateTaskUI();

      // Clear form
      document.getElementById('new-task-title').value = '';
      document.getElementById('new-task-desc').value = '';
      document.getElementById('new-task-status').value = 'todo';
    }
  });

  // Close Modals
  document.getElementById('close-add-modal-btn')?.addEventListener('click', () => closeModal('add-task-modal'));
  document.getElementById('close-task-modal-btn')?.addEventListener('click', () => closeModal('task-modal'));

  // Save Edited Task
  document.getElementById('save-task-btn')?.addEventListener('click', () => {
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

  // Delete Task
  document.getElementById('deleteTaskBtn')?.addEventListener('click', () => {
    const modal = document.getElementById('task-modal');
    const taskId = Number(modal.dataset.taskId);

    if (deleteTask(taskId)) {
      closeModal('task-modal');
      updateTaskUI();
    }
  });
});