// Get the task form and the task log container
const taskForm = document.getElementById("task-form");
const taskLog = document.getElementById("task-log");

// Initialize an empty array to store tasks
let tasks = [];

// Function to handle form submission
taskForm.addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the form from refreshing the page

    // Get the values from the form
    const taskTitle = document.getElementById("task-title").value;
    const taskDescription = document.getElementById("task-description").value;
    const taskTime = parseFloat(document.getElementById("task-time").value);
    const taskPriority = document.getElementById("task-priority").value;
    const taskCategory = document.getElementById("task-category").value;

    // Create a new task object
    const task = {
        title: taskTitle,
        description: taskDescription,
        time: taskTime,
        priority: taskPriority,
        category: taskCategory
    };

    // Add the new task to the tasks array
    tasks.push(task);

    // Display the task in the task log
    displayTasks();

    // Reset the form
    taskForm.reset();
});

// Function to display tasks in the task log
function displayTasks() {
    // Clear the current task log
    taskLog.innerHTML = "";

    // Loop through the tasks array and create HTML for each task
    tasks.forEach(function(task, index) {
        const taskDiv = document.createElement("div");
        taskDiv.classList.add("task-item");

        // Create task content
        taskDiv.innerHTML = `
            <h3>${task.title}</h3>
            <p><strong>Description:</strong> ${task.description}</p>
            <p><strong>Time Spent:</strong> ${task.time} hours</p>
            <p><strong>Priority:</strong> ${task.priority}</p>
            <p><strong>Category:</strong> ${task.category}</p>
            <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
        `;

        // Append the task to the task log
        taskLog.appendChild(taskDiv);
    });
}

// Function to delete a task
function deleteTask(index) {
    tasks.splice(index, 1); // Remove the task from the tasks array
    displayTasks(); // Re-display the updated task log
}
