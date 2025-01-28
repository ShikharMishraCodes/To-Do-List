// Retrieve todo from local storage or initialize an empty array
let todo = JSON.parse(localStorage.getItem("todo")) || [];
const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");
const todoCount = document.getElementById("todoCount");
const addButton = document.querySelector(".btn");
const deleteButton = document.getElementById("deleteButton");
const searchButton = document.getElementById('search-btn');

// Initialize
document.addEventListener("DOMContentLoaded", function () {
  addButton.addEventListener("click", addTask)


  todoInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault() // Prevents default Enter key behavior
      addTask()
    }
  })


  deleteButton.addEventListener("click", deleteAllTasks)


  displayTasks()
})


// Displaying todos ✅
function displayTasks() {
  todoList.innerHTML = ""

  todo.forEach((item, index) => {
    const p = document.createElement("p")


    p.innerHTML = 
    `    <div class='singleTodo'>
         <div class="todo-container">
           <input type="checkbox" class="todo-checkbox" id="input-${index}" ${item.disabled ? "checked" : ""}>
           <p id="todo-${index}" class="${item.disabled ? "disabled" : ""}">${item.text}</p>
         </div>
         <div class="actions">
           <button class="edit-btn" onclick="editTask(${index})">Edit</button>
           <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
         </div>
         </div>
    `
    p.querySelector(".todo-checkbox").addEventListener("change", () => toggleTask(index))

    todoList.appendChild(p)
  })


  todoCount.textContent = todo.length;
}


// Adding a todo ✅
function addTask() {
  const newTask = todoInput.value.trim()

  if (newTask !== "") {
    todo.push({ text: newTask, disabled: false })
    saveToLocalStorage()
    todoInput.value = ""
    displayTasks()
  }
}


// Deleting a Task ✅
function deleteTask(index) {
  todo.splice(index, 1)
  saveToLocalStorage()
  displayTasks()
}


// Updating a Task ✅
function editTask(index) {
  const todoItem = document.getElementById(`todo-${index}`)
  const existingText = todo[index].text
  const inputElement = document.createElement("input")

  inputElement.value = existingText
  todoItem.replaceWith(inputElement)
  inputElement.focus()

  inputElement.addEventListener("blur", function () {
    const updatedText = inputElement.value.trim()
    if (updatedText) {
      todo[index].text = updatedText
      saveToLocalStorage()
    }
    displayTasks()
  });
}


// Searching a Task ✅
searchButton.addEventListener("click", () => {
  const searchInput = document.getElementById("search-input").value.trim().toLowerCase(); // Get the search input
  
  const filteredTodos = todo.filter((item) =>
    item.text.toLowerCase().includes(searchInput) // Check if the task includes the search input
  );

  displayFilteredTasks(filteredTodos); // Display the filtered tasks
})


// Function to display filtered tasks ✅ 
function displayFilteredTasks(filteredTodos) {
  todoList.innerHTML = ""; // Clear the current list

  filteredTodos.forEach((item, index) => {
    const p = document.createElement("p");

    p.innerHTML = 
    `    <div class='singleTodo'>
         <div class="todo-container">
           <input type="checkbox" class="todo-checkbox" id="input-${index}" ${item.disabled ? "checked" : ""}>
           <p id="todo-${index}" class="${item.disabled ? "disabled" : ""}">${item.text}</p>
         </div>
         <div class="actions">
           <button class="edit-btn" onclick="editTask(${index})">Edit</button>
           <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
         </div>
         </div>
    `;

    todoList.appendChild(p);
  });

  todoCount.textContent = filteredTodos.length; // Update the count to show filtered task count
}


// Deleting all todos ✅
function deleteAllTasks() {
  todo = []
  saveToLocalStorage()
  displayTasks()
}


// Toggle ✅
function toggleTask(index) {
  todo[index].disabled = !todo[index].disabled
  saveToLocalStorage()
  displayTasks()
}


// Saving a todo into Local Storage ✅
function saveToLocalStorage() {
  localStorage.setItem("todo", JSON.stringify(todo));
}
