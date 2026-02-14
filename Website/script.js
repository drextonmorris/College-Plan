// script.js

document.addEventListener("DOMContentLoaded", () => {
  // THEME TOGGLE
  const themeToggle = document.getElementById("themeSwitch");
  const savedTheme = localStorage.getItem("theme") || "dark";

  if (savedTheme === "light") {
    document.body.classList.add("light");
    if (themeToggle) themeToggle.checked = true;
  }

  if (themeToggle) {
    themeToggle.addEventListener("change", () => {
      if (themeToggle.checked) {
        document.body.classList.add("light");
        localStorage.setItem("theme", "light");
      } else {
        document.body.classList.remove("light");
        localStorage.setItem("theme", "dark");
      }
    });
  }

  // GENERIC INPUT + TEXTAREA SAVING
  const textInputs = document.querySelectorAll("input[type='text'], textarea");
  textInputs.forEach((input) => {
    const key = input.id || input.name;
    if (!key) return;

    const savedValue = localStorage.getItem("field_" + key);
    if (savedValue !== null) {
      input.value = savedValue;
    }

    input.addEventListener("input", () => {
      localStorage.setItem("field_" + key, input.value);
    });
  });

  // CHECKBOX SAVING
  const checkboxes = document.querySelectorAll("input[type='checkbox'].save-check");
  checkboxes.forEach((box) => {
    const key = box.id || box.name;
    if (!key) return;

    const saved = localStorage.getItem("check_" + key);
    if (saved !== null) {
      box.checked = saved === "true";
    }

    box.addEventListener("change", () => {
      localStorage.setItem("check_" + key, box.checked.toString());
    });
  });

  // HOURS PROGRESS BAR (optional, on trackers page)
  const progressInput = document.getElementById("hoursProgressInput");
  const progressBar = document.getElementById("hoursProgressBar");

  if (progressInput && progressBar) {
    const savedPercent = localStorage.getItem("hoursProgressPercent");
    if (savedPercent !== null) {
      progressInput.value = savedPercent;
      updateProgressBar(savedPercent, progressBar);
    }

    progressInput.addEventListener("input", () => {
      const val = progressInput.value.trim();
      localStorage.setItem("hoursProgressPercent", val);
      updateProgressBar(val, progressBar);
    });
  }

  function updateProgressBar(value, bar) {
    let num = parseFloat(value);
    if (isNaN(num) || num < 0) num = 0;
    if (num > 100) num = 100;
    bar.style.width = num + "%";
    bar.textContent = num + "%";
  }
});
