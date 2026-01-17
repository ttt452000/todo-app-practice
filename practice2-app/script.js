const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("taskList");
const hideDoneCheckbox = document.getElementById("hideDone");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function save() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function render() {
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    if (hideDoneCheckbox.checked && task.done) return;

    const li = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;
    checkbox.onchange = () => {
      task.done = !task.done;
      save();
      render();
    };

    const span = document.createElement("span");
    span.textContent = task.text;
    if (task.done) span.classList.add("done");

    const delBtn = document.createElement("button");
    delBtn.textContent = "削除";
    delBtn.className = "delete";
    delBtn.onclick = () => {
      tasks.splice(index, 1);
      save();
      render();
    };

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(delBtn);
    list.appendChild(li);
  });
}

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addBtn.click();
  }
});

addBtn.onclick = () => {
  if (input.value.trim() === "") return;

  tasks.push({
    text: input.value,
    done: false
  });

  input.value = "";
  save();
  render();
};

hideDoneCheckbox.onchange = render;

render();