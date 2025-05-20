export{};

// ===== 1) CAPTURE INITIAL ORDER ON LOAD =====
const initialOrder = {};

window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.col3').forEach(col => {
    initialOrder[col.id] = Array.from(
      col.querySelectorAll('.task')
    ).map(task => task.id);
  });
});

// ===== 2) SORT MODAL ELEMENTS =====
const sortModal    = document.getElementById('sortModal');
const sortBtn      = document.getElementById('sortBtn');
const applySortBtn = document.getElementById('applySortBtn');
const clearSortBtn = document.getElementById('clearSortBtn');
const sortField    = document.getElementById('sortField');
const sortDir      = document.getElementById('sortDir');

// Open the sort dialog
sortBtn.addEventListener('click', () => {
  sortModal.classList.add('show');
});

// ===== 3) APPLY SORTING =====
applySortBtn.addEventListener('click', () => {
  const field = sortField.value;  // 'date','priority','status','title'
  const dir   = sortDir.value;    // 'asc' or 'desc'
  const PRIOR = { High:1, Medium:2, Low:3 };
  const STAT  = { 'On Track':1, 'At Risk':2, 'Off Track':3 };

  document.querySelectorAll('.col3').forEach(col => {
    const addBtn = col.querySelector('.add-task-btn');
    const tasks  = Array.from(col.querySelectorAll('.task'));

    tasks.sort((a, b) => {
      let cmp = 0;
      switch (field) {
        case 'date':
          cmp = new Date(a.querySelector('.date').dataset.created)
              - new Date(b.querySelector('.date').dataset.created);
          break;
        case 'priority':
          cmp = (PRIOR[a.querySelectorAll('.indicator')[0]?.textContent] || 99)
              - (PRIOR[b.querySelectorAll('.indicator')[0]?.textContent] || 99);
          break;
        case 'status':
          cmp = (STAT[a.querySelectorAll('.indicator')[1]?.textContent] || 99)
              - (STAT[b.querySelectorAll('.indicator')[1]?.textContent] || 99);
          break;
        case 'title':
          cmp = a.querySelector('.top-section p').textContent
                .localeCompare(b.querySelector('.top-section p').textContent);
          break;
      }
      return dir === 'asc' ? cmp : -cmp;
    });

    // reinsert sorted tasks above the Add button
    tasks.forEach(task => col.insertBefore(task, addBtn));
  });

  sortModal.classList.remove('show');
});

// ===== 4) CLEAR SORT & RESTORE ORIGINAL =====
clearSortBtn.addEventListener('click', () => {
  document.querySelectorAll('.col3').forEach(col => {
    const addBtn = col.querySelector('.add-task-btn');
    const tasks  = Array.from(col.querySelectorAll('.task'));

    // Sort by data-created (oldest → newest)
    tasks.sort((a, b) => {
      const da = new Date(a.querySelector('.date').dataset.created);
      const db = new Date(b.querySelector('.date').dataset.created);
      return da - db;
    });

    // Reinsert in that order, keeping “Add Task” at the bottom
    tasks.forEach(task => col.insertBefore(task, addBtn));
  });

  sortModal.classList.remove('show');
});
