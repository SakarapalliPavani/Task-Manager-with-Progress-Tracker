let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks() {
  const list = document.getElementById('task-list');
  list.innerHTML = '';
  tasks.forEach((task, idx) => {
    const li = document.createElement('li');
    li.className = task.completed ? 'completed' : '';
    li.innerHTML = `
      <span ondblclick="editTask(${idx})">${task.text}</span>
      <div>
        <button onclick="toggleTask(${idx})">${task.completed ? 'Undo' : 'Complete'}</button>
        <button onclick="deleteTask(${idx})">Delete</button>
      </div>
    `;
    list.appendChild(li);
  });
  updateProgress();
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask(e) {
  e.preventDefault();
  const input = document.getElementById('task-input');
  if (input.value.trim()) {
    tasks.push({ text: input.value.trim(), completed: false });
    input.value = '';
    renderTasks();
  }
}
document.getElementById('task-form').addEventListener('submit', addTask);

function toggleTask(idx) {
  tasks[idx].completed = !tasks[idx].completed;
  renderTasks();
}

function deleteTask(idx) {
  tasks.splice(idx, 1);
  renderTasks();
}

function editTask(idx) {
  const newText = prompt('Edit Task:', tasks[idx].text);
  if (newText !== null && newText.trim()) {
    tasks[idx].text = newText.trim();
    renderTasks();
  }
}

function updateProgress() {
  const done = tasks.filter(t => t.completed).length;
  const total = tasks.length;
  document.getElementById('progress').textContent =
    `Progress: ${done} / ${total} tasks completed`;

  const percent = total ? (done / total) * 100 : 0;
  document.getElementById('progress-fill').style.width = percent + '%';
}

// Initial render
renderTasks();
