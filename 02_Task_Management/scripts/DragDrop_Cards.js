// export{};

// function drop(e) {
//     e.preventDefault();
//     const taskId      = e.dataTransfer.getData("text");
//     const dragElement = document.getElementById(taskId);
//     const dropZone    = e.currentTarget;

//     if (!dropZone.contains(dragElement)) {
//         // animate drop
//         dragElement.style.animation = "dropAnimation 0.3s ease";
//         setTimeout(() => dragElement.style.animation = "", 300);

//         // find the Add-Task button in this column
//         const addBtn = dropZone.querySelector('.add-task-btn');
//         // insert the card just before that button
//         dropZone.insertBefore(dragElement, addBtn);

//         updateQuantities();
//     }
//     dropZone.classList.remove('border-blue-400');
// }

// function allowdrop(e) {
//     e.preventDefault();
//     e.currentTarget.classList.add('border-blue-400');
// }

// function handleDragLeave(e) {
//     e.currentTarget.classList.remove('border-blue-400');
// }

// function dragStart(e) {
//     e.dataTransfer.setData("text", e.target.id);
//     e.target.classList.add('opacity-50', 'scale-95', 'cursor-grabbing');
// }

// function dragEnd(e) {
//     e.target.classList.remove('opacity-50', 'scale-95', 'cursor-grabbing');
//     document.querySelectorAll('.col3').forEach(zone => {
//         zone.classList.remove('border-blue-400');
//     });
// }

// function updateQuantities(){
//     const todoColumn       = document.getElementById("todo");
//     const inprogresscolumn = document.getElementById("in-progress");
//     const inQacolumn       = document.getElementById("in-qa");
//     const doneColumn       = document.getElementById("done");

//     const todoheader       = document.getElementById("todo-header");
//     const inprogressheader = document.getElementById("in-progress-header");
//     const inQaheader       = document.getElementById("in-qa-header");
//     const doneheader       = document.getElementById("done-header");

//     updateHeader(todoheader, todoColumn);
//     updateHeader(inprogressheader, inprogresscolumn);
//     updateHeader(inQaheader, inQacolumn);
//     updateHeader(doneheader, doneColumn);
// }

// function updateHeader(header, column) {
//     header.innerText = `${header.innerText.split(" ")[0]} (${column.children.length - 1})`;
// }

// window.dragStart      = dragStart;
// window.dragEnd        = dragEnd;
// window.drop           = drop;
// window.allowdrop      = allowdrop;
// window.handleDragLeave = handleDragLeave;
// window.updateQuantities = updateQuantities;

// updateQuantities();




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
