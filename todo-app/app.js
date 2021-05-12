// selectors & variable
const todoInput = document.querySelector('.todo-input')
const todoButton = document.querySelector('.todo-button')
const todoList = document.querySelector('.todo-list')
const todoFilter = document.querySelector('.todo-filter')

// Event listeners
document.addEventListener('DOMContentLoaded', display_task)
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', markDone)
todoList.addEventListener('click', deleteItem)
todoFilter.addEventListener('change', filterTodo)

// Functions

// Add task to list
function addTodo(e) {
  e.preventDefault(); 
  // check if there is a valid task
  if (todoInput.value.length < 3) {
    alert("Task must contains at least 3 characters.")
    todoInput.value = ""
    return;
  } 
 
  // Check if it is duplicate
  if (localStorage.getItem('tasks') !== null) {
    tasks = JSON.parse(localStorage.getItem('tasks'))
    let duplicate;
    tasks.forEach(task=> {
      if (task.name == todoInput.value) {
        alert("This task is already exist. Please complete the existing task and remove it first before you add a same task.");
        duplicate = true
      }
    })
    if (duplicate == true) {
      return;
    }
  }
  
  // Create todo div
  const newTodo = document.createElement("div");
  newTodo.classList.add("todo-div")
  let done;
  newTodo.done = false
  // Create li
  const todoItem = document.createElement("li")
  todoItem.innerText = todoInput.value
  todoItem.classList.add("todo-item")
  newTodo.appendChild(todoItem)
  // Create checked button
  const checkedButton = document.createElement("button")
  checkedButton.innerHTML = '<i class="fas fa-check-circle"></i>'
  checkedButton.classList.add("checked-button")
  newTodo.appendChild(checkedButton)
  // Create delete button
  const deleteButton = document.createElement("button")
  deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>'
  deleteButton.classList.add("delete-button")
  newTodo.appendChild(deleteButton)
  todoList.appendChild(newTodo)
  // Save to local storage
  save_task({
    'name': todoInput.value,
    'status': newTodo.done
  });
  todoInput.value = "";
}


// Mark task as done
function markDone(e) {
  e.preventDefault()
  if (e.target.classList.contains("checked-button")) {
    todo = e.target.parentElement
    if (todo.done == false) {
      todo.classList.toggle("mark-done")
      todo.done = true
    } else {
      todo.classList.toggle("mark-done")
      todo.done = false
    }
    // save the changes to local storage
    tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.forEach(task=> {
      taskName = todo.firstChild.innerText
      if (task['name'] == taskName) {
        task['status'] = todo.done
      }
      taskJSON = JSON.stringify(tasks)
      localStorage.setItem('tasks', taskJSON)
    })
  }
}

// Delete Item
function deleteItem(e) {
  e.preventDefault();
  if(e.target.classList.contains('delete-button')) {
    todo = e.target.parentElement;
  
    tasks = JSON.parse(localStorage.getItem('tasks'))
    for (i = 0;  i < tasks.length; i++) {
      if (tasks[i]["name"] == todo.firstChild.innerText) {
        tasks.splice(tasks[i], 1);
        tasksJSON = JSON.stringify(tasks)
        localStorage.setItem('tasks', tasksJSON)
      }
    }
    todo.remove()
  }
}

// Filter todo list
function filterTodo() {
  status = todoFilter.value
  todos = todoList.childNodes;
  if (status == 'completed') {
    for (todo of todos) {
      if (todo.done == true) {
        todo.style.display = 'flex';
      }
      else if (todo.done == false) {
        todo.style.display = 'none'
      }
    }
  }
  else if (status == 'all') {
    for (todo of todos) {
      if (todo.done == true || todo.done == false) {
        todo.style.display = 'flex';
      }
    }
  }
  else if (status == 'uncompleted') {
    for (todo of todos) {
      if (todo.done == false) {
        todo.style.display = 'flex';
      }
      else if (todo.done == true) {
        todo.style.display = 'none'
      }
    }
  }
}

// save item in local strorage
function save_task(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = []
  } else {

    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);
  tasksJSON = JSON.stringify(tasks);
  localStorage.setItem('tasks', tasksJSON);
}

// Display all tasks while document loaded 
function display_task(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = []
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(task => {
    const newTodo = document.createElement("div");
    newTodo.classList.add("todo-div")
    // Create li
    const todoItem = document.createElement("li")
    todoItem.innerText = task['name']
    let done;
    newTodo.done = task['status']
    todoItem.classList.add("todo-item")
    newTodo.appendChild(todoItem)
    // Create checked button
    const checkedButton = document.createElement("button")
    checkedButton.innerHTML = '<i class="fas fa-check-circle"></i>'
    checkedButton.classList.add("checked-button")
    newTodo.appendChild(checkedButton)
    // Create delete button
    const deleteButton = document.createElement("button")
    deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>'
    deleteButton.classList.add("delete-button")
    newTodo.appendChild(deleteButton)
    todoList.appendChild(newTodo)

    // Display done or undone
    if (newTodo.done === true) {
      newTodo.classList.toggle("mark-done")
    }
  });
}



