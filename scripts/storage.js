const STORAGE_KEY = "kanban_tasks";

// Default initial tasks
const initialTasks = [
  {
    id: 1,
    title: "Launch Epic Career 🚀",
    description: "Create a killer Resume",
    status: "todo",
  },
  {
    id: 2,
    title: "Master JavaScript 💛",
    description: "Get comfortable with the fundamentals",
    status: "doing",
  },
  {
    id: 3,
    title: "Keep on Going 🏆",
    description: "You're almost there",
    status: "doing",
  },
  {
    id: 11,
    title: "Learn Data Structures and Algorithms 📚",
    description: "Solve coding problems efficiently",
    status: "todo",
  },
  {
    id: 12,
    title: "Contribute to Open Source 🌐",
    description: "Gain practical experience and collaborate",
    status: "done",
  },
  {
    id: 13,
    title: "Build Portfolio Projects 🛠️",
    description: "Showcase skills to potential employers",
    status: "done",
  },
];

// Ensure local storage initializes with default tasks if empty
if (!localStorage.getItem(STORAGE_KEY)) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initialTasks));
}

// Function to save tasks to local storage
export function saveTasksToLocalStorage(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

// Function to load tasks from local storage
export function loadTasksFromLocalStorage() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || initialTasks;
}
