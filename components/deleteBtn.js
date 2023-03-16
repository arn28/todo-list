const deleteBtn = () => {
  const i = document.createElement("i");
  i.classList.add("fas", "fa-trash-alt", "trashIcon", "icon");
  i.addEventListener("click", deleteTask);
  return i;
};

const deleteTask = (e) => {
  const task = e.target.parentElement;
  task.remove();
};

export default deleteBtn;
