let tasks = localStorage.tasks ? JSON.parse(localStorage.getItem('tasks')) : [];

const createTodo = todo =>
  `<li class="todo">
    <p class="todo-text">${todo}</p>
    <button class="btn-del-todo" id="delTodo"></button>
  </li>`;

for(let i of tasks) todoList.innerHTML += createTodo(i);

const addTodo = todo => {
  todoList.innerHTML += createTodo(todo);
  tasks.push(inputToDo.value);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  inputToDo.value = '';
}
inputToDo.onchange = _ => addTodo(inputToDo.value);

addTodo.onclick = _ => {
  if (inputToDo.value) addTodo(inputToDo.value);
}
todoList.onclick = e => {
  if (e.target.classList.contains('btn-del-todo')) {
    const currToDoText = e.target.previousElementSibling.textContent;
    const todos = document.querySelectorAll('.todo');
    for (let i = 0; i < todos.length; i++) {
      if (currToDoText === todos[i].textContent.trim()) todos[i].remove();
    }
    tasks = tasks.filter(i => i !== currToDoText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
}