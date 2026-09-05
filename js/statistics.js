// ==============================
// UPDATE STATISTICS
// ==============================

function updateProgress() {

    const progress =
        document.getElementById(
            "progress"
        );

    const progressText =
        document.getElementById(
            "progressText"
        );


    const total =
        habits.length;


    const today =
        new Date()
            .toISOString()
            .split("T")[0];


    const completed =
        habits.filter(
            function(habit) {

                return Array.isArray(
                    habit.completedDates
                )
                &&
                habit.completedDates
                    .includes(today);
            }
        ).length;


    const pending =
        total - completed;


    document.getElementById(
        "totalHabits"
    ).innerText = total;


    document.getElementById(
        "completedHabits"
    ).innerText = completed;


    document.getElementById(
        "pendingHabits"
    ).innerText = pending;


    if (total === 0) {

        progress.style.width = "0%";

        progressText.innerText =
            "0% Completed";

        return;
    }


    const percentage =
        (completed / total) * 100;


    progress.style.width =
        percentage + "%";


    progressText.innerText =
        Math.round(percentage) +
        "% Completed";
}


// ==============================
// STREAK
// ==============================

function updateStreak() {

    const streakCount =
        document.getElementById(
            "streakCount"
        );


    const completedDates =
        new Set();


    habits.forEach(
        function(habit) {

            if (
                Array.isArray(
                    habit.completedDates
                )
            ) {

                habit.completedDates
                    .forEach(
                        function(date) {

                            completedDates.add(
                                date
                            );
                        }
                    );
            }
        }
    );


    let streak = 0;

    const date = new Date();


    while (true) {

        const currentDate =
            date.toISOString()
                .split("T")[0];


        if (
            completedDates.has(
                currentDate
            )
        ) {

            streak++;

            date.setDate(
                date.getDate() - 1
            );

        } else {

            break;
        }
    }


    streakCount.innerText =
        streak;
}


// ==============================
// WEEKLY CALENDAR
// ==============================

function updateWeeklyCalendar() {

    const calendar =
        document.getElementById(
            "weekCalendar"
        );


    calendar.innerHTML = "";


    const today = new Date();

    const dayOfWeek =
        today.getDay();


    const monday =
        new Date(today);


    const difference =
        dayOfWeek === 0
            ? -6
            : 1 - dayOfWeek;


    monday.setDate(
        today.getDate() +
        difference
    );


    const dayNames = [
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
        "Sun"
    ];


    const todayString =
        today.toISOString()
            .split("T")[0];


    for (
        let i = 0;
        i < 7;
        i++
    ) {

        const currentDay =
            new Date(monday);


        currentDay.setDate(
            monday.getDate() + i
        );


        const dateString =
            currentDay.toISOString()
                .split("T")[0];


        const completed =
            habits.some(
                function(habit) {

                    return Array.isArray(
                        habit.completedDates
                    )
                    &&
                    habit.completedDates
                        .includes(
                            dateString
                        );
                }
            );


        const isToday =
            dateString ===
            todayString;


        const card =
            document.createElement(
                "div"
            );


        card.className =
            "day-card";


        if (completed) {

            card.classList.add(
                "completed-day"
            );
        }


        if (isToday) {

            card.classList.add(
                "today"
            );
        }


        card.innerHTML = `

            <div class="day-name">
                ${dayNames[i]}
            </div>

            <div class="day-date">
                ${currentDay.getDate()}
            </div>

            <div class="day-status">
                ${completed
                    ? "✅"
                    : "⬜"}
            </div>

        `;


        calendar.appendChild(card);
    }
}


// ==============================
// START
// ==============================

updateProgress();
updateStreak();

if (document.getElementById("weekCalendar")) {
    updateWeeklyCalendar();
}