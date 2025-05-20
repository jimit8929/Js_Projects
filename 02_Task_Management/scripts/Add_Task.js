export {};

const STORAGE_KEY = 'kanbanTasks';

// ―― storage helpers ――
function loadTasks() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}
function saveTasks(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

// ―― DOM insertion helper ――
function insertTaskIntoDOM({ id, title, priority, status, created, columnId }) {
  const PRIORITY_COLORS = { Low:'bg-cyan-300', Medium:'bg-orange-400', High:'bg-violet-500' };
  const STATUS_COLORS   = { 'On Track':'bg-green-400', 'At Risk':'bg-yellow-300', 'Off Track':'bg-pink-300' };
  const display         = new Date(created).toLocaleString('en-GB');
  const colElem         = document.getElementById(columnId);
  const addBtn          = colElem.querySelector('.add-task-btn');

  const html = `
    <div class="task bg-stone-200 dark:bg-bg-card px-2 py-3 mb-2 rounded-md shadow-sm cursor-grab"
         id="${id}">
      <div class="top-section flex justify-between items-center">
        <div class="flex items-center flex-1">
          <img src="./assets/checklist.png" class="w-4 mr-2 invert dark:invert-0">
          <p class="font-bold text-sm dark:text-text-primary truncate">${title}</p>
        </div>
        <button class="delete-btn ml-2 hover:scale-110 transition-transform">
          <img src="./assets/options.png" class="w-4 invert dark:invert-0">
        </button>
      </div>
      <div class="middle-section my-5 flex gap-3 font-bold">
        <p class="indicator ${PRIORITY_COLORS[priority]} p-3 rounded-md">${priority}</p>
        <p class="indicator ${STATUS_COLORS[status]} p-3 rounded-md">${status}</p>
      </div>
      <div class="date text-xs" data-created="${created}">Created: ${display}</div>
    </div>`;

  colElem.insertBefore(htmlToElement(html), addBtn);

  // bind drag/drop
  const newTask = document.getElementById(id);
  if (newTask) {
    newTask.setAttribute('draggable', 'true');                     // make draggable
    newTask.addEventListener('dragstart', window.dragStart);       // drag start handler
    newTask.addEventListener('dragend',   window.dragEnd);         // drag end handler
  }
}

// helper to convert HTML string → Element
function htmlToElement(html) {
  const tpl = document.createElement('template');
  tpl.innerHTML = html.trim();
  return tpl.content.firstChild;
}

// expose insertTask for hydrate use
window.insertTaskIntoDOM = insertTaskIntoDOM;

// grab updateQuantities from global scope (DragDrop_Cards.js)
const updateQuantities = window.updateQuantities;

document.addEventListener('DOMContentLoaded', () => {
  let currentColumn = null;
  const taskModal   = document.getElementById('taskModal');
  const taskForm    = document.getElementById('taskForm');

  // hydrate existing tasks
  loadTasks().forEach(task => insertTaskIntoDOM(task));
  if (updateQuantities) updateQuantities();

  // open/close modal
  document.querySelectorAll('.add-task-btn').forEach(btn =>
    btn.addEventListener('click', e => {
      currentColumn = e.target.closest('.col3');
      taskModal.classList.remove('hidden');
    })
  );
  document.getElementById('closeTaskModal').addEventListener('click', () =>
    taskModal.classList.add('hidden')
  );
  document.getElementById('cancelTaskBtn').addEventListener('click', () =>
    taskModal.classList.add('hidden')
  );

  // handle form submission
  taskForm.addEventListener('submit', e => {
    e.preventDefault();
    const title    = document.getElementById('taskTitle').value;
    const priority = document.getElementById('taskPriority').value;
    const status   = document.getElementById('taskStatus').value;
    const created  = new Date().toISOString();
    const id       = `task-${Date.now()}`;

    // persist
    const tasks = loadTasks();
    tasks.push({ id, title, priority, status, created, columnId: currentColumn.id });
    saveTasks(tasks);

    // render
    insertTaskIntoDOM({ id, title, priority, status, created, columnId: currentColumn.id });
    if (updateQuantities) updateQuantities();

    // teardown
    taskForm.reset();
    taskModal.classList.add('hidden');
  });
});
