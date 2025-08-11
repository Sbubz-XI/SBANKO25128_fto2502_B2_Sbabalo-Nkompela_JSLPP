// storage.js
export function saveTasksToLocalStorage(tasks) {
  localStorage.setItem("kanbanTasks", JSON.stringify(tasks));
}

export function loadTasksFromLocalStorage() {
  const storedTasks = localStorage.getItem("kanbanTasks");
  try {
    return storedTasks ? JSON.parse(storedTasks) : [];
  } catch (error) {
    console.error("Error parsing tasks from localStorage:", error);
    return [];
  }
}

export function saveThemeToLocalStorage(theme) {
  localStorage.setItem("theme", theme);
}

export function loadThemeFromLocalStorage() {
  return localStorage.getItem("theme") || "light";
}
