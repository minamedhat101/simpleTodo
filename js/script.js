const form = document.querySelector('#task-form');
const taskList = document.querySelector('.list-group');
const clearBtn = document.querySelector('#clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

loadAllEventListeners();


function loadAllEventListeners() {
  form.addEventListener('submit', addTask);
  taskList.addEventListener('click', removeTask);
  clearBtn.addEventListener('click', clearTasks);
  filter.addEventListener('keyup', filterTasks);
  document.addEventListener('DOMContentLoaded', getTasks);
}

function addTask(e) {
  if (taskInput.value === '') {
    alert('add a task');
  } else {
    let li = document.createElement('li');
    li.className = 'list-group-item';
    li.innerHTML = '<i class="fa fa-times float-right"></i>';
    li.appendChild(document.createTextNode(taskInput.value));
    storeTaskInlocalStorage(taskInput.value);
    taskList.appendChild(li);
    taskInput.value = '';
    hover();

    e.preventDefault();
  }
}
function removeTask(e) {
  if (e.target.classList.contains('fa-times')) {
    if (confirm('Are You Want to Delete this Task?')) {
      e.target.parentElement.remove();
      removeTasksLocalStorage(e.target.parentElement)
    }
  }
}

function clearTasks(e) {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  removeAllLocalStorage();
}

function filterTasks(e) {
  const text = e.target.value.toLowerCase();
  const list = document.querySelectorAll('.list-group-item');
  for (const li of list) {
    const item = li.textContent.toLowerCase();
    if (item.indexOf(text) !== -1) {
      li.style.display = 'block';
    } else {
      li.style.display = 'none';
    }
  }
}

function hover() {
  for (const li of taskList.children) {
    li.addEventListener('mouseover', liOver);
    li.addEventListener('mouseleave', liLeave);
  }
}
function liOver(e) {
  e.target.classList.add('active');
}

function liLeave(e) {
  e.target.classList.remove('active');
}

function storeTaskInlocalStorage(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasks() {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  for (const task of tasks) {
      let li = document.createElement('li');
      li.className = 'list-group-item';
      li.innerHTML = '<i class="fa fa-times float-right"></i>';
      li.appendChild(document.createTextNode(task));
      taskList.appendChild(li);
      hover();
  }
}

function removeTasksLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  for (const task of tasks) {
    if (taskItem.textContent === task) {
      tasks.splice(task, 1);
    }
  }
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeAllLocalStorage(){
  localStorage.clear();
}