import { openEditTaskModal } from "./taskManager.js";

export function updateTaskUI(tasks) {
  ["todo-column", "doing-column", "done-column"].forEach((columnId) => {
    const column = document.getElementById(columnId);
    if (column) column.innerHTML = ""; // Clear previous content
  });

  tasks.forEach((task) => {
    let taskElement = document.createElement("div");
    taskElement.className =
      "bg-white rounded-lg hover:bg-[#E4EBFA] hover:scale-101 transition-all duration-300 mb-5 py-4 px-4 font-bold shadow-md cursor-pointer";
    taskElement.innerHTML = `<h2 class="text-lg">${task.title}</h2><p class="text-md text-gray-800">${task.description}</p>`;

    let column = document.getElementById(`${task.status}-column`);
    if (column) column.appendChild(taskElement);

    taskElement.addEventListener("click", () => openEditTaskModal(task.id));
  });
}
