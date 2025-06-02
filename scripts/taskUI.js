import { Tasks } from "./taskManager.js";
import { openEditTaskModal } from "./taskManager.js";

export function updateTaskUI() {
  if (!Array.isArray(Tasks)) {
    console.error("❌ Error: Tasks is not an array or is undefined.");
    return;
  }

  // Clear all columns so tasks can be re-rendered
  document
    .querySelectorAll(".column")
    .forEach((column) => (column.innerHTML = ""));

  Tasks.forEach((task) => {
    let taskElement = document.createElement("div");
    taskElement.className =
      "bg-white rounded-lg hover:bg-[#E4EBFA] hover:scale-101 transition-all duration-300 mb-5 py-4 px-4 font-bold shadow-md cursor-pointer";
    taskElement.innerHTML = `<h2>${task.title}</h2>`;

    taskElement.addEventListener("click", () => openEditTaskModal(task.id));

    let column = document.getElementById(`${task.status}-column`);
    if (column) {
      column.appendChild(taskElement);
    }
  });
}

document.getElementById("deleteTaskBtn").addEventListener("click", () => {
  const modal = document.getElementById("task-modal");
  const taskId = parseInt(modal.dataset.taskId, 10);

  deleteTask(taskId);
  closeModal("task-modal");
});

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

function hideSidebar() {
  const sidebar = document.querySelector("nav");
  if (sidebar) {
    sidebar.style.display = "none";
  } else {
    console.error("Sidebar not found!");
  }
}
