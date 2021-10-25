inputToDo.placeholder = lang === 'ru' ? 'Введите задачу' : 'Enter the task';

let tasks = localStorage.tasks ? JSON.parse(localStorage.getItem('tasks')) : [];

const createTodo = todo =>
  `<li class="todo">
    <p class="todo-text">${todo}</p>
    <button class="btn-del-todo"></button>
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
    const delBtns = document.querySelectorAll('.btn-del-todo');
    const todos = document.querySelectorAll('.todo');
    for (let i = 0; i < delBtns.length; i++) {
      if (delBtns[i] === e.target) {
        todos[i].remove();
        tasks = tasks.filter((item, index) => index !== i);
      }
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
}
btnEn.addEventListener('click', _ => inputToDo.placeholder = 'Enter the task');

btnRu.addEventListener('click', _ => inputToDo.placeholder = 'Введите задачу');