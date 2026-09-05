function generateDailyPlan() {
    const result = document.getElementById("aiPlanResult");

    if (habits.length === 0) {
        result.innerHTML = `
            <p>📝 First add some habits.</p>
        `;
        return;
    }

    // Habits ko time ke according sort karo
    const sortedHabits = [...habits].sort(function(a, b) {
        return (a.time || "23:59").localeCompare(b.time || "23:59");
    });

    let plan = "";

    sortedHabits.forEach(function(habit, index) {

        const completedToday =
            Array.isArray(habit.completedDates) &&
            habit.completedDates.includes(
                new Date().toISOString().split("T")[0]
            );

        plan += `
            <div class="ai-plan-item">
                <div>
                    <strong>${index + 1}. ${habit.time || "Anytime"}</strong>
                    <span>${habit.name}</span>
                </div>

                <div>
                    ${completedToday ? "✅ Done" : "⏳ Pending"}
                </div>
            </div>
        `;
    });

    result.innerHTML = `
        <h3>✨ Your Daily Plan</h3>

        ${plan}

        <p class="ai-tip">
            💡 Tip: Complete your habits according to their scheduled time.
        </p>
    `;
}