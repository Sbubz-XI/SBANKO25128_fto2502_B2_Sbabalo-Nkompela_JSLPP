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

export function openAddTaskModal() {
  const modal = document.getElementById("add-task-modal");
  if (modal) {
    modal.showModal();
  } else {
    console.error(`❌ Add Task Modal not found!`);
  }
}
