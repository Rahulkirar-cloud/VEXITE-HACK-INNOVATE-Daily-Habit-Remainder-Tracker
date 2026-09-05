// ==============================
// ADD HABIT
// ==============================

function addHabit() {

    const habitInput =
        document.getElementById(
            "habitInput"
        );

    const timeInput =
        document.getElementById(
            "timeInput"
        );

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

        completed: false,

        completedDates: []
    };


    habits.push(habit);

    saveHabits();

    habitInput.value = "";

    timeInput.value = "";

    displayHabits();
}


// ==============================
// DISPLAY HABITS
// ==============================

function displayHabits() {

    const habitList =
        document.getElementById(
            "habitList"
        );

    let filteredHabits =
        [...habits];


    // SEARCH

    const searchInput =
        document.getElementById(
            "searchHabit"
        );

    const searchText =
        searchInput
            ? searchInput.value
                .toLowerCase()
                .trim()
            : "";


    if (searchText !== "") {

        filteredHabits =
            filteredHabits.filter(
                function(habit) {

                    return habit.name
                        .toLowerCase()
                        .includes(searchText);
                }
            );
    }


    // FILTER

    const filter =
        document.getElementById(
            "filterHabit"
        ).value;


    const today =
        new Date()
            .toISOString()
            .split("T")[0];


    filteredHabits =
        filteredHabits.filter(
            function(habit) {

                if (
                    !Array.isArray(
                        habit.completedDates
                    )
                ) {

                    habit.completedDates = [];
                }


                const completedToday =
                    habit.completedDates
                        .includes(today);


                if (filter === "completed") {

                    return completedToday;
                }

                if (filter === "pending") {

                    return !completedToday;
                }

                return true;
            }
        );


    // SORT

    const sort =
        document.getElementById(
            "sortHabit"
        ).value;


    if (sort === "name") {

        filteredHabits.sort(
            function(a, b) {

                return a.name.localeCompare(
                    b.name
                );
            }
        );
    }


    if (sort === "time") {

        filteredHabits.sort(
            function(a, b) {

                return (a.time || "")
                    .localeCompare(
                        b.time || ""
                    );
            }
        );
    }


    habitList.innerHTML = "";


    if (filteredHabits.length === 0) {

        habitList.innerHTML =
            `<p class="no-habits">
                No habits found 🔍
            </p>`;

        return;
    }


    // CREATE HABITS

    filteredHabits.forEach(
        function(habit) {

            const completedToday =
                habit.completedDates
                    .includes(today);


            const habitItem =
                document.createElement("div");


            habitItem.className =
                "habit-item";


            habitItem.innerHTML = `

                <div class="habit-left">

                    <input
                        type="checkbox"
                        ${completedToday
                            ? "checked"
                            : ""}
                        onchange="
                            toggleHabit(
                                ${habit.id}
                            )
                        "
                    >

                    <div>

                        <div class="
                            habit-name
                            ${completedToday
                                ? "completed"
                                : ""}
                        ">
                            ${habit.name}
                        </div>

                        <div class="habit-time">
                            ⏰
                            ${habit.time ||
                                "No time set"}
                        </div>

                    </div>

                </div>


                <div class="buttons">

                    <button
                        class="edit-btn"
                        onclick="
                            editHabit(
                                ${habit.id}
                            )
                        "
                    >
                        Edit
                    </button>


                    <button
                        class="delete-btn"
                        onclick="
                            deleteHabit(
                                ${habit.id}
                            )
                        "
                    >
                        Delete
                    </button>

                </div>
            `;


            habitList.appendChild(
                habitItem
            );
        }
    );
}


// ==============================
// TOGGLE HABIT
// ==============================

function toggleHabit(id) {

    const today =
        new Date()
            .toISOString()
            .split("T")[0];


    habits.forEach(
        function(habit) {

            if (habit.id === id) {

                if (
                    !Array.isArray(
                        habit.completedDates
                    )
                ) {

                    habit.completedDates = [];
                }


                const index =
                    habit.completedDates
                        .indexOf(today);


                if (index !== -1) {

                    habit.completedDates
                        .splice(index, 1);

                } else {

                    habit.completedDates
                        .push(today);
                }
            }
        }
    );


    saveHabits();

    displayHabits();
}


// ==============================
// EDIT
// ==============================

function editHabit(id) {

    const habit =
        habits.find(
            function(habit) {

                return habit.id === id;
            }
        );


    if (!habit) return;


    const newName =
        prompt(
            "Enter new habit name:",
            habit.name
        );


    if (newName === null) return;


    if (newName.trim() === "") {

        alert(
            "Habit name cannot be empty!"
        );

        return;
    }


    habit.name =
        newName.trim();


    saveHabits();

    displayHabits();
}


// ==============================
// DELETE
// ==============================

function deleteHabit(id) {

    habits =
        habits.filter(
            function(habit) {

                return habit.id !== id;
            }
        );


    saveHabits();

    displayHabits();
}


// ==============================
// CLEAR ALL
// ==============================

function clearAllHabits() {

    if (habits.length === 0) {

        alert(
            "No habits available!"
        );

        return;
    }


    const confirmDelete =
        confirm(
            "Are you sure you want to delete all habits?"
        );


    if (!confirmDelete) return;


    habits = [];

    saveHabits();

    displayHabits();
}


// ==============================
// START
// ==============================

displayHabits();