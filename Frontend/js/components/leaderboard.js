// leaderboard.js

// Select the element where we will display the leaderboard
const leaderboardList = document.getElementById('leaderboard-list');

// Function to render the leaderboard
function renderLeaderboard() {
    // Fetch tasks from localStorage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Create an object to store total time spent by each employee
    let employees = {};

    // Loop through tasks and sum time spent for each employee
    tasks.forEach((task) => {
        if (!employees[task.employeeName]) {
            employees[task.employeeName] = 0;
        }
        employees[task.employeeName] += task.timeSpent;
    });

    // Sort the employees by total time spent in descending order
    let sortedEmployees = Object.entries(employees)
        .sort((a, b) => b[1] - a[1])  // Sorting by time spent (highest first)
        .map(entry => ({ employeeName: entry[0], totalTimeSpent: entry[1] }));

    // Display the leaderboard
    leaderboardList.innerHTML = `
        <h3>Employee Productivity Leaderboard</h3>
        <ol>
            ${sortedEmployees.map((employee, index) => `
                <li>
                    <strong>${index + 1}. ${employee.employeeName}</strong> - ${employee.totalTimeSpent} hours
                </li>
            `).join('')}
        </ol>
    `;
}

// Call the function to render the leaderboard when the page loads
renderLeaderboard();
