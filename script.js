let currentDraggedItem;

const tierInput = document.getElementById("tier");

const itemContainers = document.getElementsByClassName("item-container");

// const tierLists = document.querySelectorAll('.tier-list');

const submitBtn = document.getElementById("submit");

const imageForm = document.getElementById("image-form");

for (const itemContainer of itemContainers) {
  setUpItemContainerForDrag(itemContainer);
}

// tierLists.forEach(setUpDropZoneInTierList);

imageForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const imageItemInput = document.getElementById("image-item");
  if (imageItemInput.value === "") {
    alert("Please enter a valid image url");
    return;
  }
  const imageUrl = imageItemInput.value;
  createTierListItem(imageUrl);
  imageItemInput.value = "";
});

submitBtn.addEventListener("click", (event) => {
  event.preventDefault(); // stops the default behaviour of the event
  // To get access of the element on which this event was fired
  if (tierInput.value === "") {
    alert("Please enter a tier name");
    return;
  }
  createTierList(tierInput.value);
  tierInput.value = "";
});

function createTierList(tierListName) {
  const newTierList = document.createElement("div");

  newTierList.classList.add("tier-list");

  const colors = [
    "#be5683",
    "#6f4a8e",
    "#ffa5b0",
    "#bac964",
    "#fbcffc",
    "#848ccf",
    "#eb4d55",
    "#fe346e",
  ];

  // selecting random color
  const random_color = colors[Math.floor(Math.random() * colors.length)];

  const heading = document.createElement("div"); // Try to randomly assign color to this heading
  heading.classList.add("heading");
  heading.style.backgroundColor = random_color;

  heading.setAttribute("contenteditable", "true");

  const textContainer = document.createElement("div");
  textContainer.textContent = tierListName;

  heading.appendChild(textContainer);

  const newTierListItems = document.createElement("div");
  newTierListItems.classList.add("tier-list-items");

  newTierList.appendChild(heading);
  newTierList.appendChild(newTierListItems);

  const deleteBtn = document.createElement("img");
  deleteBtn.classList.add("deleteBtn");
  deleteBtn.src = "./download.png";

  newTierList.appendChild(deleteBtn);

  setUpDropZoneInTierListItem(newTierListItems);

  const tierSection = document.getElementById("tier-list-section");
  tierSection.appendChild(newTierList);
  deleteBtn.addEventListener("click", (event) => {
    const nonTierSection = document.getElementById("non-tier-section");

    while (newTierListItems.firstChild) {
      nonTierSection.appendChild(newTierListItems.firstChild);
      newTierList.remove();
    }
    newTierList.remove();
  });
}

function createTierListItem(imageUrl) {
  const imageDiv = document.createElement("div");
  imageDiv.setAttribute("draggable", "true");
  imageDiv.classList.add("item-container");

  setUpItemContainerForDrag(imageDiv);

  const img = document.createElement("img");
  img.src = imageUrl;

  imageDiv.appendChild(img);

  const nonTierSection = document.getElementById("non-tier-section");
  nonTierSection.appendChild(imageDiv);
}

function setUpItemContainerForDrag(itemContainer) {
  itemContainer.addEventListener("dragstart", (event) => {
    console.log(event);
    currentDraggedItem = event.target.parentNode;
  });

  itemContainer.addEventListener("dblclick", (event) => {
    const parentNode = event.target.parentNode;
    const nonTierSection = document.getElementById("non-tier-section");
    nonTierSection.appendChild(parentNode);
  });
}

function setUpDropZoneInTierListItem(tierListItem) {
  tierListItem.addEventListener("drop", (event) => {
    event.preventDefault(); // stops the default behaviour of the event which is to not allow drop
  });

  tierListItem.addEventListener("dragover", function (event) {
    // console.log(event.target);
    // event.target.appendChild(currentDraggedItem);
    console.log("event coming up", event);
    if (this !== currentDraggedItem.parentNode) {
      this.appendChild(currentDraggedItem);
    }
  });
}
