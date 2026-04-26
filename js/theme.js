/* theme.js */
const toggleTheme = () => {
  const htmlElement = document.documentElement;
  const toggle = document.getElementById("themeToggle");
  
  // Toggle the 'dark' class
  htmlElement.classList.toggle("dark");
  
  // Check if it worked
  const isDark = htmlElement.classList.contains("dark");
  console.log("Dark mode is now:", isDark);

  // Save the preference
  localStorage.setItem("theme", isDark ? "dark" : "light");
  
  // Update the button icon
  if (toggle) {
    toggle.textContent = isDark ? "☀️" : "🌙";
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById("themeToggle");
  if (toggle) {
    // Set initial icon based on the class already present
    const isDark = document.documentElement.classList.contains("dark");
    toggle.textContent = isDark ? "☀️" : "🌙";
    
    // Attach the click event
    toggle.addEventListener("click", toggleTheme);
  } else {
    console.error("Could not find element with ID 'themeToggle'");
  }
});