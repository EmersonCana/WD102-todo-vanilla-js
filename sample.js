const inputForm = document.querySelector("#inputForm");
const taskList = document.querySelector("#taskList");
const getLSData = JSON.parse(localStorage.getItem("data"));
let data = getLSData ? getLSData : [];
if (getLSData) {
  getLSData.forEach((item) => {
    pushListItems(item, taskList);
  });
  activateDeleteButton();
}

// console.log(getLSData);

inputForm.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(e);
  const inputValue = e.target[0].value;
  addToList(inputValue, taskList);
  inputForm.reset();
  e.target[0].focus();
});

function pushListItems(inputValue, taskList) {
  // creating the element
  const newListItem = document.createElement("li");
  const buttonDiv = document.createElement("div");
  buttonDiv.classList.add("d-flex", "gap-2");
  newListItem.textContent = inputValue;
  newListItem.classList.add(
    "list-group-item",
    "d-flex",
    "justify-content-between"
  );
  newListItem.appendChild(buttonDiv);
  buttonDiv.appendChild(addButton("Done"));
  buttonDiv.appendChild(addButton("Delete"));
  //   adds the element to the DOM
  taskList.appendChild(newListItem);
}

function addToList(inputValue, taskList) {
  data.push(inputValue);
  pushListItems(inputValue, taskList);
  activateDeleteButton();
  let newArray = data.reduce((acc, curr) => (curr ? [...acc, curr] : acc), []);
  localStorage.setItem("data", JSON.stringify(newArray));
}

function activateDeleteButton() {
  const deleteButtons = document.querySelectorAll(".delete");
  console.log(deleteButtons);
  for (let i = 0; i < deleteButtons.length; i++) {
    deleteButtons[i].addEventListener("click", () => {
      deleteButtons[i].parentElement.parentElement.remove();
      delete data[i];
      let newArray = data.reduce(
        (acc, curr) => (curr ? [...acc, curr] : acc),
        []
      );
      localStorage.setItem("data", JSON.stringify(newArray));
    });
  }
}

function addButton(action) {
  const newButton = document.createElement("button");
  newButton.textContent = action;
  newButton.classList.add(action.toLowerCase());
  return newButton;
}
