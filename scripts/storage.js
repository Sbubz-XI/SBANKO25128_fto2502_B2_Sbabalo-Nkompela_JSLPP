export function saveTasksToLocalStorage(tasks) {
  localStorage.setItem("kanbanTasks", JSON.stringify(tasks));
}

export function loadTasksFromLocalStorage() {
  return JSON.parse(localStorage.getItem("kanbanTasks")) || [];
}
