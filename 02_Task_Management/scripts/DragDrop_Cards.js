export{};

const STORAGE_KEY = 'kanbanTasks';
function loadTasks() { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); }
function saveTasks(ts) { localStorage.setItem(STORAGE_KEY, JSON.stringify(ts)); }

// existing functions…
function drop(e) {
  e.preventDefault();
  const taskId = e.dataTransfer.getData('text');
  const taskEl = document.getElementById(taskId);
  const zone   = e.currentTarget;

  if (!zone.contains(taskEl)) {
    // animate & move
    taskEl.style.animation = 'dropAnimation 0.3s ease';
    setTimeout(() => taskEl.style.animation = '', 300);
    const addBtn = zone.querySelector('.add-task-btn');
    zone.insertBefore(taskEl, addBtn);
    updateQuantities();

    // persist new column
    const tasks = loadTasks();
    const t = tasks.find(t=>t.id===taskId);
    if (t) {
      t.columnId = zone.id;
      saveTasks(tasks);
    }
  }
  zone.classList.remove('border-blue-400');
}

function allowdrop(e)      { e.preventDefault(); e.currentTarget.classList.add('border-blue-400'); }
function handleDragLeave(e){ e.currentTarget.classList.remove('border-blue-400'); }
function dragStart(e)      { e.dataTransfer.setData('text', e.target.id); e.target.classList.add('opacity-50','scale-95','cursor-grabbing'); }
function dragEnd(e)        { e.target.classList.remove('opacity-50','scale-95','cursor-grabbing'); document.querySelectorAll('.col3').forEach(c=>c.classList.remove('border-blue-400')); }
function updateQuantities(){
  /* your existing code unchanged */
}

// expose for inline & other modules
window.drop            = drop;
window.allowdrop       = allowdrop;
window.handleDragLeave = handleDragLeave;
window.dragStart       = dragStart;
window.dragEnd         = dragEnd;
window.updateQuantities= updateQuantities;

// init counts
updateQuantities();
