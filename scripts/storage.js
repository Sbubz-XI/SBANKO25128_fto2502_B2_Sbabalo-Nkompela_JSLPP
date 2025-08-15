// SAVE TASKS TO LOCAL STORAGE LOGIC

export function saveTasksToLocalStorage(tasks) {
  try {

    localStorage.setItem("kanbanTasks", JSON.stringify(tasks));

  } catch (error) {

    console.error("Error saving tasks to Loacal Storage:", error)

  }

}

// load Tasks From Local Storage LOGIC

export function loadTasksFromLocalStorage() {
  try {

    const storedTasks = localStorage.getItem("kanbanTasks");

    return storedTasks ? JSON.parse(storedTasks) : [];

  } catch (error) {

    console.error("Error loading tasks from Local Storage:", error);
    
    return [];
  }

}

