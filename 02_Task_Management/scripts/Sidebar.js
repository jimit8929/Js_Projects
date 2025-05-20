export{};

const sidebar    = document.querySelector('.sidebar');
const toggleBtn  = document.getElementById('sidebarToggle');
const toggleIcon = document.getElementById('toggleIcon');


const ICON_CLOSED = './assets/menus.png';
const ICON_OPEN   = './assets/rightarrow.png';

toggleBtn.addEventListener('click', () => {
  const isNowCollapsed = sidebar.classList.toggle('collapsed');


  if (isNowCollapsed) {
    toggleIcon.src = ICON_OPEN;
    toggleIcon.alt = 'Open Sidebar';
  } else {
    toggleIcon.src = ICON_CLOSED;
    toggleIcon.alt = 'Close Sidebar';
  }
});
