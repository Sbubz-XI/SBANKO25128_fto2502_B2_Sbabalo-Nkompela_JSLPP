module.exports = {
  darkMode: "class",
  // Other configurations...
};

const themeButton = document.querySelector(".theme-btn");
themeButton.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");
  localStorage.setItem(
    "theme",
    document.documentElement.classList.contains("dark") ? "dark" : "light"
  );
});

// Persist Dark Mode Setting
if (localStorage.getItem("theme") === "dark") {
  document.documentElement.classList.add("dark");
}
