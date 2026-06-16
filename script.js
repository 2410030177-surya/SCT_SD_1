const tempInput = document.getElementById("temp");
const fromUnit = document.getElementById("fromUnit");
const toUnit = document.getElementById("toUnit");
const resultBox = document.getElementById("result");
const themeToggle = document.getElementById("themeToggle");
const swapButton = document.getElementById("swapUnits");

function toCelsius(value, unit) {
    if (unit === "C") {
        return value;
    }

    if (unit === "F") {
        return (value - 32) * 5 / 9;
    }

    return value - 273.15;
}

function fromCelsius(value, unit) {
    if (unit === "C") {
        return value;
    }

    if (unit === "F") {
        return (value * 9 / 5) + 32;
    }

    return value + 273.15;
}

function formatUnit(unit) {
    return {
        C: "Celsius",
        F: "Fahrenheit",
        K: "Kelvin"
    }[unit];
}

function convertTemp() {
    const temp = parseFloat(tempInput.value);
    const sourceUnit = fromUnit.value;
    const targetUnit = toUnit.value;

    if (Number.isNaN(temp)) {
        resultBox.innerHTML = "Please enter a valid number.";
        return;
    }

    const celsiusValue = toCelsius(temp, sourceUnit);
    const convertedValue = fromCelsius(celsiusValue, targetUnit);

    resultBox.innerHTML = `
        <strong>${temp.toFixed(2)} ${sourceUnit}</strong> equals <strong>${convertedValue.toFixed(2)} ${targetUnit}</strong><br>
        <span>${formatUnit(sourceUnit)} to ${formatUnit(targetUnit)}</span>
    `;
}

function setTheme(theme) {
    document.documentElement.dataset.theme = theme;
    themeToggle.textContent = theme === "dark" ? "☀️" : "🌙";
    themeToggle.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
}

const savedTheme = localStorage.getItem("temp-converter-theme");
const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

setTheme(savedTheme || (prefersDark ? "dark" : "light"));

themeToggle.addEventListener("click", () => {
    const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    localStorage.setItem("temp-converter-theme", nextTheme);
    setTheme(nextTheme);
});

swapButton.addEventListener("click", () => {
    const currentFrom = fromUnit.value;
    fromUnit.value = toUnit.value;
    toUnit.value = currentFrom;
    convertTemp();
});

tempInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        convertTemp();
    }
});