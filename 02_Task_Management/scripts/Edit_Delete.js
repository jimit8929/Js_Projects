export{};

const STORAGE_KEY = 'kanbanTasks';
function loadTasks() { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); }
function saveTasks(ts) { localStorage.setItem(STORAGE_KEY, JSON.stringify(ts)); }

const optionsModal = document.getElementById('optionsModal');
const editModal    = document.getElementById('editModal');
const confirmModal = document.getElementById('confirmModal');
const optEditBtn   = document.getElementById('optEditBtn');
const optDeleteBtn = document.getElementById('optDeleteBtn');
const optCancelBtn = document.getElementById('optCancelBtn');
const editSaveBtn  = document.getElementById('editSaveBtn');
const editCancelBtn= document.getElementById('editCancelBtn');
const confirmYesBtn= document.getElementById('confirmYesBtn');
const confirmNoBtn = document.getElementById('confirmNoBtn');
const titleInput   = document.getElementById('modalTitle');
const prioritySel  = document.getElementById('modalPriority');
const statusSel    = document.getElementById('modalStatus');

let currentTask = null;
function show(m){ m.classList.add('show'); }
function hide(m){ m.classList.remove('show'); }

// open options
document.body.addEventListener('click', e => {
  if (e.target.closest('.delete-btn')) {
    e.stopPropagation();
    currentTask = e.target.closest('.task');
    show(optionsModal);
  }
});
optCancelBtn.addEventListener('click',()=>hide(optionsModal));

// edit
optEditBtn.addEventListener('click', () => {
  hide(optionsModal);
  titleInput.value = currentTask.querySelector('.top-section p').textContent;
  const tags = Array.from(currentTask.querySelectorAll('.indicator')).map(el=>el.textContent);
  prioritySel.value = tags[0] || 'Medium';
  statusSel.value   = tags[1] || 'On Track';
  show(editModal);
});
editCancelBtn.addEventListener('click', ()=>hide(editModal));

editSaveBtn.addEventListener('click', () => {
  // apply to DOM
  const id = currentTask.id;
  currentTask.querySelector('.top-section p').textContent = titleInput.value;
  const ms = currentTask.querySelector('.middle-section');
  ms.innerHTML = `
    <p class="indicator inline-block p-3 rounded-md font-bold ${
      prioritySel.value==='High'?'bg-violet-500':
      prioritySel.value==='Medium'?'bg-orange-400':'bg-cyan-300'
    }">${prioritySel.value}</p>
    <p class="indicator inline-block p-3 rounded-md font-bold ${
      statusSel.value==='On Track'?'bg-green-400':
      statusSel.value==='At Risk'?'bg-yellow-300':'bg-pink-300'
    }">${statusSel.value}</p>`;
  hide(editModal);

  // persist edit
  const tasks = loadTasks();
  const t = tasks.find(t=>t.id===id);
  if (t) {
    t.title    = titleInput.value;
    t.priority = prioritySel.value;
    t.status   = statusSel.value;
    saveTasks(tasks);
  }
});

// delete
optDeleteBtn.addEventListener('click', () => {
  hide(optionsModal);
  show(confirmModal);
});
confirmNoBtn.addEventListener('click', ()=>hide(confirmModal));
confirmYesBtn.addEventListener('click', () => {
  if (currentTask) {
    const id = currentTask.id;
    currentTask.remove();
    updateQuantities(); // from DragDrop_Cards.js

    // persist removal
    const tasks = loadTasks().filter(t=>t.id!==id);
    saveTasks(tasks);
  }
  hide(confirmModal);
});
