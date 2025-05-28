export function saveTasksToLocalStorage(tasks) {
  localStorage.setItem("kanban_tasks", JSON.stringify(tasks));
}

export function loadTasksFromLocalStorage() {
  return JSON.parse(localStorage.getItem("kanban_tasks")) || [];
}
