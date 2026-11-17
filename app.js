document.querySelectorAll(".no").forEach((button) => {
  button.addEventListener("click", () => {
    button.textContent = "TRY YES!";
    button.style.transform = "translate(" + (Math.random() * 34 - 17) + "px, " + (Math.random() * 16 - 8) + "px)";
  });
});