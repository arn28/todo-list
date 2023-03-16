import checkComplete from "./checkComplete.js";
import deleteBtn from "./deleteBtn.js";

const createTask = (e) => {
  e.preventDefault();
  const input = document.querySelector("[data-form-input]");
  const value = input.value;
  if (value != "") {
    const list = document.querySelector("[data-list]");
    const task = document.createElement("li");
    task.classList.add("card");
    input.value = "";
    //backticks
    const taskContent = document.createElement("div");

    const titleTask = document.createElement("span");
    titleTask.classList.add("task");
    titleTask.innerText = value;
    taskContent.appendChild(checkComplete());
    taskContent.appendChild(titleTask);
    task.appendChild(taskContent);
    task.appendChild(deleteBtn());
    list.appendChild(task);
  }
};

export default createTask;
