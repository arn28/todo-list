const checkComplete = () => {
  const i = document.createElement("i");
  i.classList.add("far", "fa-check-square", "icon");
  i.addEventListener("click", completeTask);
  return i;
};

const completeTask = (e) => {
  e.target.classList.toggle("completeIcon");
  e.target.classList.toggle("far");
  e.target.classList.toggle("fas");
  let span = e.target.nextSibling;
  span.classList.toggle("done");
};

export default checkComplete;
