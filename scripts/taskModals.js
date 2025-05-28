export function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.showModal();
}

export function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.close();
}
