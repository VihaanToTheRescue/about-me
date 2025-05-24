// Typing effect
const text = "Hi, I'm Vihaan Sriram";
let index = 0;
const typingElement = document.getElementById("typingText");

function type() {
  if (index < text.length) {
    typingElement.innerHTML += text.charAt(index);
    index++;
    setTimeout(type, 100);
  }
}
type();

// Dark/Light Mode Toggle
const modeToggle = document.getElementById("modeToggle");
const body = document.body;

modeToggle.addEventListener("click", () => {
  body.classList.toggle("light-mode");
  body.classList.toggle("dark-mode");
});

// Default to dark mode
body.classList.add("dark-mode");
