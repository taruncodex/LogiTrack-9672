// Select the elements we'll be working with
const productivityInsights = document.getElementById('productivity-insights');
const leaderboardList = document.getElementById('leaderboard-list');

// Sample data representing tasks logged by employees (from previous code)
const employeeData = [
    {
        name: 'John Doe',
        tasks: [
            { title: 'Task 1', timeSpent: 2, category: 'BAU' },
            { title: 'Task 2', timeSpent: 1, category: 'Ad Hoc' },
            { title: 'Task 3', timeSpent: 3, category: 'Project-Based' }
        ]
    },
    {
        name: 'Jane Smith',
        tasks: [
            { title: 'Task 4', timeSpent: 1.5, category: 'BAU' },
            { title: 'Task 5', timeSpent: 2.5, category: 'Ad Hoc' }
        ]
    }
];

// Sample data representing employee productivity for leaderboard (from previous code)
const leaderboardData = [
    {
        name: 'John Doe',
        tasks: [
            { title: 'Task 1', timeSpent: 2, category: 'BAU' },
            { title: 'Task 2', timeSpent: 1, category: 'Ad Hoc' },
            { title: 'Task 3', timeSpent: 3, category: 'Project-Based' }
        ]
    },
    {
        name: 'Jane Smith',
        tasks: [
            { title: 'Task 4', timeSpent: 1.5, category: 'BAU' },
            { title: 'Task 5', timeSpent: 2.5, category: 'Ad Hoc' }
        ]
    },
    {
        name: 'Sam Brown',
        tasks: [
            { title: 'Task 6', timeSpent: 1, category: 'BAU' },
            { title: 'Task 7', timeSpent: 3, category: 'Project-Based' },
            { title: 'Task 8', timeSpent: 2, category: 'Ad Hoc' }
        ]
    }
];

// Function to calculate total time spent by an employee (from previous code)
function calculateTotalTime(tasks) {
    return tasks.reduce((total, task) => total + task.timeSpent, 0);
}

// Function to render productivity insights (same as before)
function renderProductivityInsights() {
    // Clear previous insights
    productivityInsights.innerHTML = '';

    // Loop through each employee to display their productivity insights
    employeeData.forEach(employee => {
        const totalTime = calculateTotalTime(employee.tasks);
        
        const employeeInsight = document.createElement('div');
        employeeInsight.classList.add('employee-insight');
        
        // Display the employee's name and total time spent on tasks
        employeeInsight.innerHTML = `
            <h3>${employee.name}</h3>
            <p><strong>Total Time Spent:</strong> ${totalTime} hours</p>
            <p><strong>Total Tasks Logged:</strong> ${employee.tasks.length} tasks</p>
        `;
        
        // Append the employee's insights to the productivity insights section
        productivityInsights.appendChild(employeeInsight);
    });
}

// Function to sort employees by total time spent (for leaderboard ranking)
function sortByProductivity(data) {
    return data.sort((a, b) => calculateTotalTime(b.tasks) - calculateTotalTime(a.tasks));
}

// Function to render the leaderboard (newly added)
function renderLeaderboard() {
    // Clear previous leaderboard data
    leaderboardList.innerHTML = '';

    // Sort the leaderboard data by total time spent
    const sortedData = sortByProductivity(leaderboardData);

    // Loop through the sorted data to create a list of leaderboard entries
    sortedData.forEach((employee, index) => {
        const employeeRank = document.createElement('div');
        employeeRank.classList.add('leaderboard-entry');
        
        // Display the rank, name, and total time spent
        employeeRank.innerHTML = `
            <p><strong>Rank ${index + 1}:</strong> ${employee.name}</p>
            <p>Total Time Spent: ${calculateTotalTime(employee.tasks)} hours</p>
            <p>Total Tasks: ${employee.tasks.length} tasks</p>
        `;

        // Append the entry to the leaderboard list
        leaderboardList.appendChild(employeeRank);
    });
}

// Call the functions to render both productivity insights and leaderboard
renderProductivityInsights();
renderLeaderboard();
