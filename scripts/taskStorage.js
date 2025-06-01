export function saveTasksToLocalStorage(tasks) {
  localStorage.setItem("kanbanTasks", JSON.stringify(tasks));
}

export function loadTasksFromLocalStorage() {
  const storedTasks = localStorage.getItem("kanbanTasks");
  return storedTasks ? JSON.parse(storedTasks) : [];
}
