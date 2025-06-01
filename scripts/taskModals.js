export function openAddTaskModal() {
  const modal = document.getElementById("add-task-modal");
  if (modal) {
    modal.showModal();
  } else {
    console.error("❌ Add Task Modal not found!");
  }
}
window.openAddTaskModal = openAddTaskModal;

export function openEditTaskModal() {
  const modal = document.getElementById("task-modal");
  if (modal) {
    modal.showModal();
  } else {
    console.error("❌ Edit Task Modal not found!");
  }
}
window.openEditTaskModal = openEditTaskModal;

export function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.showModal();
  } else {
    console.error(`❌ Modal with ID '${modalId}' not found!`);
  }
}

export function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.close();
  } else {
    console.error(`❌ Modal with ID '${modalId}' not found!`);
  }
}

export function toggleNavModal() {
  console.log("✅ Mobile logo clicked!");
  const modal = document.getElementById("nav-modal");
  if (modal) {
    if (modal.open) {
      modal.close();
    } else {
      modal.showModal();
    }
  } else {
    console.error("❌ Navigation modal not found!");
  }
}
window.toggleNavModal = toggleNavModal;

document.addEventListener("DOMContentLoaded", () => {
  const closeAddModalBtn = document.getElementById("close-add-modal-btn");
  const closeTaskModalBtn = document.querySelector(".close-modal"); // For edit task modal
  const deleteTaskBtn = document.getElementById("deleteTaskBtn");

  if (closeAddModalBtn) {
    closeAddModalBtn.addEventListener("click", () => {
      closeModal("add-task-modal");
    });
  } else {
    console.error("❌ Close button for Add Task Modal not found!");
  }

  if (closeTaskModalBtn) {
    closeTaskModalBtn.addEventListener("click", () => {
      closeModal("task-modal");
    });
  } else {
    console.error("❌ Close button for Edit Task Modal not found!");
  }

  if (deleteTaskBtn) {
    deleteTaskBtn.addEventListener("click", () => {
      console.log("✅ Task deleted");
    });
  }
});
