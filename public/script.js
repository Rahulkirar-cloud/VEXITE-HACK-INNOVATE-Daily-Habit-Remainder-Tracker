let habits = [];


// Add Habit
function addHabit() {

    const habitInput = document.getElementById("habitInput");
    const timeInput = document.getElementById("timeInput");

    const habitName = habitInput.value.trim();
    const habitTime = timeInput.value;

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

    habitInput.value = "";
    timeInput.value = "";

    displayHabits();
    updateProgress();
}


// Display Habits
function displayHabits() {

    const habitList = document.getElementById("habitList");

    habitList.innerHTML = "";

    habits.forEach(function(habit) {

        const habitItem = document.createElement("div");

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

            <button 
                class="delete-btn"
                onclick="deleteHabit(${habit.id})">
                Delete
            </button>

        `;

        habitList.appendChild(habitItem);

    });
}


// Complete / Uncomplete Habit
function toggleHabit(id) {

    habits.forEach(function(habit) {

        if (habit.id === id) {
            habit.completed = !habit.completed;
        }

    });

    displayHabits();
    updateProgress();
}


// Delete Habit
function deleteHabit(id) {

    habits = habits.filter(function(habit) {
        return habit.id !== id;
    });

    displayHabits();
    updateProgress();
}


// Update Progress
function updateProgress() {

    const progress = document.getElementById("progress");
    const progressText = document.getElementById("progressText");

    if (habits.length === 0) {

        progress.style.width = "0%";
        progressText.innerText = "0% Completed";

        return;
    }

    const completedHabits = habits.filter(function(habit) {
        return habit.completed;
    });

    const percentage =
        (completedHabits.length / habits.length) * 100;

    progress.style.width = percentage + "%";

    progressText.innerText =
        Math.round(percentage) + "% Completed";
}