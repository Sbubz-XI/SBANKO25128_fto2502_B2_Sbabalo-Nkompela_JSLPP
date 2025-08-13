// storage.js
export function saveTasksToLocalStorage(tasks) {
  try {

    localStorage.setItem("kanbanTasks", JSON.stringify(tasks));

  } catch (error) {

    console.error("Error saving tasks to Loacal Storage:", error)

  }
}

export function loadTasksFromLocalStorage() {
  try {

    const storedTasks = localStorage.getItem("kanbanTasks");

    return storedTasks ? JSON.parse(storedTasks) : [];

  } catch (error) {

    console.error("Error loading tasks from local Storage:", error);

    return [];
    
  }
}

export function saveThemeToLocalStorage(theme) {
  localStorage.setItem("theme", theme);
}

export function loadThemeFromLocalStorage() {
  return localStorage.getItem("theme") || "light";
}
