export{};

//All task button logic
const allTasksBtn = document.getElementById("allTasksBtn");

allTasksBtn.addEventListener("click", () => {
  // Reset all filters
  filterColumn.value = "";
  filterPriority.value = "";
  filterStatus.value = "";
  filterDate.value = "";

  // Show all tasks
  document.querySelectorAll('.task').forEach(task => {
    task.style.display = "block";
  });

  // Close modal if open
  filterModal.classList.remove("flex");
});



//Filter button logic 
const filterModal = document.getElementById("filterModal");
const filterBtn = document.querySelector('.icon-btn img[alt="filter.png"]')?.parentElement || document.querySelectorAll('.icon-btn')[1]; // fallback

const filterColumn = document.getElementById("filterColumn");
const filterPriority = document.getElementById("filterPriority");
const filterStatus = document.getElementById("filterStatus");
const filterDate = document.getElementById("filterDate");

const applyFilterBtn = document.getElementById("applyFilterBtn");
const clearFilterBtn = document.getElementById("clearFilterBtn");

filterBtn.addEventListener("click", () => filterModal.classList.add("flex"));
clearFilterBtn.addEventListener("click", () => {
  filterColumn.value = "";
  filterPriority.value = "";
  filterStatus.value = "";
  filterDate.value = "";
  document.querySelectorAll('.task').forEach(task => task.style.display = 'block');
  filterModal.classList.remove("flex");
});

applyFilterBtn.addEventListener("click", () => {
  const columnVal = filterColumn.value;
  const priorityVal = filterPriority.value;
  const statusVal = filterStatus.value;
  const dateVal = filterDate.value;

  document.querySelectorAll('.task').forEach(task => {
    let visible = true;

    // Check parent column
    if (columnVal && !task.closest(`#${columnVal}`)) visible = false;

    // Check Priority and Status
    const tags = Array.from(task.querySelectorAll('.indicator')).map(el => el.textContent);
    if (priorityVal && !tags.includes(priorityVal)) visible = false;
    if (statusVal && !tags.includes(statusVal)) visible = false;

    // Check Date
    if (dateVal) {
      const createdText = task.querySelector('.date')?.textContent || "";
      const createdDate = createdText.replace("Created:", "").trim();
      if (createdDate !== dateVal.split("-").reverse().join("/")) visible = false;
    }

    task.style.display = visible ? "block" : "none";
  });

  filterModal.classList.remove("flex");
});


