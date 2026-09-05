// ==============================
// REQUEST NOTIFICATION PERMISSION
// ==============================

function requestNotificationPermission() {

    if (!("Notification" in window)) {
        alert("This browser does not support notifications.");
        return;
    }

    if (Notification.permission === "default") {
        Notification.requestPermission();
    }
}

requestNotificationPermission();


// ==============================
// SHOW NOTIFICATION
// ==============================

function showNotification(habitName) {

    if (Notification.permission !== "granted") {
        return;
    }

    new Notification("🔔 Habit Reminder", {
        body: "Time to do: " + habitName
    });
}


// ==============================
// CHECK REMINDERS
// ==============================

function checkReminders() {

    const now = new Date();

    const hours =
        String(now.getHours()).padStart(2, "0");

    const minutes =
        String(now.getMinutes()).padStart(2, "0");

    const currentTime =
        hours + ":" + minutes;

    const today =
        now.toISOString().split("T")[0];


    habits.forEach(function(habit) {

        if (!habit.time) {
            return;
        }

        if (
            Array.isArray(habit.completedDates) &&
            habit.completedDates.includes(today)
        ) {
            return;
        }


        if (habit.time === currentTime) {

            const notificationId =
                habit.id + "-" + today;


            const alreadyNotified =
                localStorage.getItem(
                    notificationId
                );


            if (alreadyNotified) {
                return;
            }


            showNotification(habit.name);


            localStorage.setItem(
                notificationId,
                "true"
            );
        }

    });
}


// Check every 10 seconds

setInterval(
    checkReminders,
    2000
);