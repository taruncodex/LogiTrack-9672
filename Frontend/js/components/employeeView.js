// Select the elements we'll be working with
const taskForm = document.getElementById('task-form');
const taskLog = document.getElementById('task-log');

// Array to store logged tasks
let tasks = [];

// Function to handle task form submission
taskForm.addEventListener('submit', function (event) {
    event.preventDefault();

    // Get values from the form inputs
    const taskTitle = document.getElementById('task-title').value;
    const taskDescription = document.getElementById('task-description').value;
    const taskTime = document.getElementById('task-time').value;
    const taskPriority = document.getElementById('task-priority').value;
    const taskCategory = document.getElementById('task-category').value;

    // Create a task object
    const task = {
        title: taskTitle,
        description: taskDescription,
        timeSpent: taskTime,
        priority: taskPriority,
        category: taskCategory,
    };

    // Add the task to the tasks array
    tasks.push(task);

    // Clear the form
    taskForm.reset();

    // Update the task log with the new task
    updateTaskLog();
});

// Function to update the task log display
function updateTaskLog() {
    // Clear the current task log
    taskLog.innerHTML = '';

    // Loop through tasks and display each one
    tasks.forEach(function (task, index) {
        // Create a task item element
        const taskItem = document.createElement('div');
        taskItem.classList.add('task-item');
        
        // Add content to the task item
        taskItem.innerHTML = `
            <h3>${task.title}</h3>
            <p><strong>Description:</strong> ${task.description}</p>
            <p><strong>Time Spent:</strong> ${task.timeSpent} hours</p>
            <p><strong>Priority:</strong> ${task.priority}</p>
            <p><strong>Category:</strong> ${task.category}</p>
            <button class="delete-btn" data-index="${index}">Delete</button>
        `;
        
        // Append task item to the task log
        taskLog.appendChild(taskItem);

        // Add event listener for deleting a task
        const deleteBtn = taskItem.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', function () {
            deleteTask(index);
        });
    });
}

// Function to delete a task
function deleteTask(index) {
    tasks.splice(index, 1); // Remove the task from the tasks array
    updateTaskLog(); // Update the task log display
}
