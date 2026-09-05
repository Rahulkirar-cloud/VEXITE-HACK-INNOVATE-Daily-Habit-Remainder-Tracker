// Saved habits load karo

let habits = JSON.parse(localStorage.getItem("habits")) || [];

displayHabits();
updateProgress();


// ADD HABIT

function addHabit() {

    const habitInput =
        document.getElementById("habitInput");

    const timeInput =
        document.getElementById("timeInput");


    const habitName =
        habitInput.value.trim();

    const habitTime =
        timeInput.value;


    if (habitName === "") {

        alert("Please enter a habit!");

        return;
    }


    const habit = {

        id: Date.now(),

        name: habitName,

        time: habitTime,

        completed: false
    };


    habits.push(habit);

    saveHabits();


    habitInput.value = "";

    timeInput.value = "";


    displayHabits();

    updateProgress();
}



// SAVE HABITS

function saveHabits() {

    localStorage.setItem(
        "habits",
        JSON.stringify(habits)
    );
}



// DISPLAY HABITS

function displayHabits() {

    const habitList =
        document.getElementById("habitList");

    habitList.innerHTML = "";


    habits.forEach(function(habit) {

        const habitItem =
            document.createElement("div");


        habitItem.className = "habit-item";


        habitItem.innerHTML = `
        
            <div class="habit-left">

                <input
                    type="checkbox"
                    ${habit.completed ? "checked" : ""}
                    onchange="toggleHabit(${habit.id})"
                >

                <div>

                    <div class="habit-name
                        ${habit.completed ? "completed" : ""}">
                        ${habit.name}
                    </div>

                    <div class="habit-time">
                        ⏰ ${habit.time || "No time set"}
                    </div>

                </div>

            </div>


            <div class="buttons">

                <button
                    class="edit-btn"
                    onclick="editHabit(${habit.id})">
                    Edit
                </button>

                <button
                    class="delete-btn"
                    onclick="deleteHabit(${habit.id})">
                    Delete
                </button>

            </div>
        `;


        habitList.appendChild(habitItem);

    });
}



// COMPLETE / UNCOMPLETE

function toggleHabit(id) {

    habits.forEach(function(habit) {

        if (habit.id === id) {

            habit.completed =
                !habit.completed;
        }

    });


    saveHabits();

    displayHabits();

    updateProgress();
}



// DELETE HABIT

function deleteHabit(id) {

    habits = habits.filter(function(habit) {

        return habit.id !== id;

    });


    saveHabits();

    displayHabits();

    updateProgress();
}



// EDIT HABIT

function editHabit(id) {

    const habit =
        habits.find(function(habit) {

            return habit.id === id;

        });


    if (!habit) {
        return;
    }


    const newName =
        prompt(
            "Enter new habit name:",
            habit.name
        );


    if (newName === null) {
        return;
    }


    if (newName.trim() === "") {

        alert("Habit name cannot be empty!");

        return;
    }


    habit.name =
        newName.trim();


    saveHabits();

    displayHabits();

    updateProgress();
}



// CLEAR ALL HABITS

function clearAllHabits() {

    if (habits.length === 0) {

        alert("No habits available!");

        return;
    }


    const confirmDelete =
        confirm(
            "Are you sure you want to delete all habits?"
        );


    if (!confirmDelete) {
        return;
    }


    habits = [];

    saveHabits();

    displayHabits();

    updateProgress();
}



// UPDATE PROGRESS

function updateProgress() {

    const progress =
        document.getElementById("progress");


    const progressText =
        document.getElementById("progressText");


    if (habits.length === 0) {

        progress.style.width = "0%";

        progressText.innerText =
            "0% Completed";

        return;
    }


    const completedHabits =
        habits.filter(function(habit) {

            return habit.completed;

        });


    const percentage =
        (completedHabits.length / habits.length) * 100;


    progress.style.width =
        percentage + "%";


    progressText.innerText =
        Math.round(percentage) +
        "% Completed";
}

// REQUEST NOTIFICATION PERMISSION

if ("Notification" in window) {

    Notification.requestPermission();

}
function checkReminders() {

    const now = new Date();

    const currentHours =
        String(now.getHours()).padStart(2, "0");

    const currentMinutes =
        String(now.getMinutes()).padStart(2, "0");

    const currentTime =
        currentHours + ":" + currentMinutes;


    habits.forEach(function(habit) {

        if (
            habit.time === currentTime &&
            !habit.completed
        ) {

            showNotification(habit.name);

        }

    });
}
// SHOW NOTIFICATION

function showNotification(habitName) {

    if (Notification.permission === "granted") {

        new Notification("🔔 Habit Reminder", {

            body: "Time to do: " + habitName,

        });

    }

}
// CHECK REMINDER EVERY MINUTE

setInterval(checkReminders, 60000);