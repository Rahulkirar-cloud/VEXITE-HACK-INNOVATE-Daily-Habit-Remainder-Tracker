// ==============================
// LOAD HABITS
// ==============================

let habits =
    JSON.parse(localStorage.getItem("habits")) || [];


// ==============================
// SAVE HABITS
// ==============================

function saveHabits() {

    localStorage.setItem(
        "habits",
        JSON.stringify(habits)
    );
}


// ==============================
// TODAY DATE
// ==============================

function showTodayDate() {

    const todayDate =
        document.getElementById("todayDate");

    if (!todayDate) return;

    const today = new Date();

    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    };

    todayDate.innerText =
        today.toLocaleDateString(
            "en-IN",
            options
        );
}

showTodayDate();


// ==============================
// DARK MODE
// ==============================

function toggleDarkMode() {

    document.body.classList.toggle(
        "dark-mode"
    );

    const darkMode =
        document.body.classList.contains(
            "dark-mode"
        );

    localStorage.setItem(
        "darkMode",
        darkMode
    );

    updateDarkModeButton();
}


function updateDarkModeButton() {

    const button =
        document.getElementById(
            "darkModeBtn"
        );

    if (!button) return;

    if (
        document.body.classList.contains(
            "dark-mode"
        )
    ) {

        button.innerText =
            "☀️ Light Mode";

    } else {

        button.innerText =
            "🌙 Dark Mode";
    }
}


const savedDarkMode =
    localStorage.getItem("darkMode");

if (savedDarkMode === "true") {

    document.body.classList.add(
        "dark-mode"
    );
}

updateDarkModeButton();