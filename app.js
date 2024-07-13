// app.js

const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const pendingTasksList = document.getElementById('pending-tasks');
const completedTasksList = document.getElementById('completed-tasks');

// Event listener for adding a task
todoForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const taskText = todoInput.value.trim();

    if (taskText !== '') {
        addTask(taskText);
        todoInput.value = '';
    }
});

// Function to add a new task
function addTask(taskText) {
    const li = document.createElement('li');
    li.textContent = taskText;

    const completeButton = document.createElement('button');
    completeButton.textContent = 'Complete';
    completeButton.addEventListener('click', function() {
        completeTask(li);
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function() {
        deleteTask(li);
    });

    li.appendChild(completeButton);
    li.appendChild(deleteButton);
    pendingTasksList.appendChild(li);
}

// Function to mark a task as complete
function completeTask(task) {
    task.classList.add('completed');
    const completeButton = task.querySelector('button');
    completeButton.textContent = 'Undo';
    completeButton.removeEventListener('click', completeTask);
    completeButton.addEventListener('click', function() {
        undoTask(task);
    });
    completedTasksList.appendChild(task);
}

// Function to undo a completed task
function undoTask(task) {
    task.classList.remove('completed');
    const completeButton = task.querySelector('button');
    completeButton.textContent = 'Complete';
    completeButton.removeEventListener('click', undoTask);
    completeButton.addEventListener('click', function() {
        completeTask(task);
    });
    pendingTasksList.appendChild(task);
}

// Function to delete a task
function deleteTask(task) {
    task.remove();
}
