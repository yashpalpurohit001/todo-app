// Select HTML elements
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const emptyState = document.getElementById('empty-state');

// Load saved tasks
let todos = JSON.parse(localStorage.getItem('todos')) || [];

// Save tasks to browser storage
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Display tasks
function render() {
    todoList.innerHTML = '';

    if (todos.length === 0) {
        emptyState.classList.remove('hidden');
    } else {
        emptyState.classList.add('hidden');
    }

    todos.forEach((todo) => {
        const li = document.createElement('li');

        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;

        const left = document.createElement('div');
        left.className = 'todo-content-left';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.completed;
        checkbox.setAttribute('aria-label', `Complete ${todo.text}`);

        checkbox.addEventListener('change', () => {
            toggleTodo(todo.id);
        });

        const span = document.createElement('span');
        span.className = 'todo-text';
        span.textContent = todo.text;

        left.append(checkbox, span);

        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-btn';
        deleteButton.textContent = 'Delete';

        deleteButton.addEventListener('click', () => {
            deleteTodo(todo.id);
        });

        li.append(left, deleteButton);
        todoList.appendChild(li);
    });
}

// Add a new task
function addTodo(text) {
    const newTodo = {
        id: Date.now(),
        text: text,
        completed: false
    };

    todos.push(newTodo);

    saveTodos();
    render();
}

// Mark a task completed or incomplete
function toggleTodo(id) {
    todos = todos.map((todo) => {
        if (todo.id === id) {
            return {
                ...todo,
                completed: !todo.completed
            };
        }

        return todo;
    });

    saveTodos();
    render();
}

// Delete a task
function deleteTodo(id) {
    todos = todos.filter((todo) => todo.id !== id);

    saveTodos();
    render();
}

// Handle form submission
todoForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const text = todoInput.value.trim();

    if (text !== '') {
        addTodo(text);
        todoInput.value = '';
        todoInput.focus();
    }
});

// Display saved tasks when the page opens
render();