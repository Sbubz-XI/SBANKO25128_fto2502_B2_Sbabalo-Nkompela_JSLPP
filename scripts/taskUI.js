import { openEditTaskModal } from "./taskManager.js";

export function updateTaskUI(tasks) {
  ["todo-column", "doing-column", "done-column"].forEach((columnId) => {
    const column = document.getElementById(columnId);
    if (column) column.innerHTML = "";
  });

  tasks.sort((a, b) => {
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    return priorityOrder[b.priority] - priorityOrder[a.priority];
  });

  tasks.forEach((task) => {
    let taskElement = document.createElement("div");
    taskElement.className =
      "bg-white rounded-lg hover:bg-[#E4EBFA] hover:scale-101 transition-all duration-300 mb-5 py-4 px-4 font-bold shadow-md cursor-pointer";
    taskElement.innerHTML = `
      <h2 class="text-lg">${task.title}</h2>
      <p class="text-md text-gray-800">
      <span class="priority-indicator" style="background-color: ${getPriorityColor(
        task.priority
      )};"></span>
    `;

    let column = document.getElementById(`${task.status}-column`);
    if (column) {
      column.appendChild(taskElement);
    } else {
      console.error("Column not found for status:", task.status);
    }

    taskElement.addEventListener("click", () => openEditTaskModal(task.id));
  });
}

const themeButton = document.querySelector(".theme-btn");
if (themeButton) {
  themeButton.addEventListener("click", () => {
    document.documentElement.classList.toggle("dark");
    localStorage.setItem(
      "theme",
      document.documentElement.classList.contains("dark") ? "dark" : "light"
    );
  });

  if (localStorage.getItem("theme") === "dark") {
    document.documentElement.classList.add("dark");
  }
}

function getPriorityColor(priority) {
  return priority === "high"
    ? "red"
    : priority === "medium"
    ? "orange"
    : "green";
}
