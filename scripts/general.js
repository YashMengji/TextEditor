const canvas = document.querySelector(".div-canvas");
const undoStack = [];
const redoStack = [];

// ADD TEXT --------------------------------------
const addTextBtn = document.querySelector(".div-add-text-btn");
const btnText = document.querySelector(".div-add-text-btn-text");
const canvasRect = canvas.getBoundingClientRect();

const fontFamily = document.getElementById("font-family");
const fontSize = document.querySelector(".font-size-input");
const fontIncrement = document.querySelector(".div-font-size-increment");
const fontDecrement = document.querySelector(".div-font-size-decrement");
const bold = document.querySelector(".div-font-bold");
const italic = document.querySelector(".div-font-italic");
const center = document.querySelector(".div-font-center");
const underline = document.querySelector(".div-font-underline");

addTextBtn.addEventListener("click", (e) => {
  undoStack.push(canvas.innerHTML);

  if (btnText.textContent === "Remove Text") {
    const text = document.querySelector(".text-field");
    text.remove();
    btnText.textContent = "Add Text";
    return;
  }

  btnText.textContent = "Remove Text";
  const text = document.createElement("p");
  text.textContent = "This is a new text";
  text.style.position = "absolute";
  text.style.left = "50%";
  text.style.top = "50%";
  text.style.width = "fit-content";
  text.style.height = "fit-content";
  text.className = "text-field";
  text.style.userSelect = "none";
  text.style.cursor = "grab";
  text.style.fontFamily = "QuickSand";
  text.style.fontSize = "16px";
  fontSize.value = 16;
  fontFamily.value = "QuickSand";
  canvas.appendChild(text);

  text.addEventListener("mousedown", onTextDrag);
});

function onTextDrag(e) {
  e.preventDefault();
  const text = e.target;
  const textRect = text.getBoundingClientRect();
  const offsetX = e.clientX - textRect.left;
  const offsetY = e.clientY - textRect.top;

  text.style.cursor = "grabbing";

  const onMouseMove = (e) => {
    text.style.left = `${e.clientX - offsetX - canvasRect.left}px`;
    text.style.top = `${e.clientY - offsetY - canvasRect.top}px`;
  };

  const onMouseUp = () => {
    canvas.removeEventListener("mousemove", onMouseMove);
    canvas.removeEventListener("mouseup", onMouseUp);
    text.style.cursor = "grab";
  };

  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mouseup", onMouseUp);
}

// TEXT PROPERTIES --------------------------------------


fontFamily.addEventListener("change", function (e) {
  undoStack.push(canvas.innerHTML);
  const text = document.querySelector(".text-field");
  text.style.fontFamily = e.target.value === "null" ? "inherit" : e.target.value;
});

fontIncrement.addEventListener("click", function () {
  undoStack.push(canvas.innerHTML);
  fontSize.value = parseInt(fontSize.value) + 1;
  const text = document.querySelector(".text-field");
  text.style.fontSize = `${fontSize.value}px`;
});

fontDecrement.addEventListener("click", function () {
  undoStack.push(canvas.innerHTML);
  fontSize.value = parseInt(fontSize.value) - 1;
  const text = document.querySelector(".text-field");
  text.style.fontSize = `${fontSize.value}px`;
});

bold.addEventListener("click", function () {
  undoStack.push(canvas.innerHTML);
  const text = document.querySelector(".text-field");
  if (text.style.fontWeight === "bold") {
    text.style.fontWeight = "normal";
  } else {
    text.style.fontWeight = "bold";
  }
});

italic.addEventListener("click", function () {
  undoStack.push(canvas.innerHTML);
  const text = document.querySelector(".text-field");
  if (text.style.fontStyle === "italic") {
    text.style.fontStyle = "normal";
  } else {
    text.style.fontStyle = "italic";
  }
});

center.addEventListener("click", function () {
  undoStack.push(canvas.innerHTML);
  const text = document.querySelector(".text-field");
  text.style.left = "50%";
  text.style.top = "50%";
  text.style.transform = "translate(-50%, -50%)";
});

underline.addEventListener("click", function () {
  undoStack.push(canvas.innerHTML);
  const text = document.querySelector(".text-field");
  if (text.style.textDecoration === "underline") {
    text.style.textDecoration = "none";
  } else {
    text.style.textDecoration = "underline";
  }
});

// UNDO/REDO --------------------------------------
const undoBtn = document.querySelector(".div-undo-btn");
const redoBtn = document.querySelector(".div-redo-btn");

function toggleAddTextBtn(){
  if (btnText.textContent === "Remove Text") {
    btnText.textContent = "Add Text";
  }
  else {
    btnText.textContent = "Remove Text";
  }
}

function undo() {
  if (undoStack.length === 0) return;

  const currentState = canvas.innerHTML;
  redoStack.push(currentState);

  const lastState = undoStack.pop();
  if(!lastState.includes("<p") ^ !canvas.innerHTML.includes("<p")){
    toggleAddTextBtn();
  }

  canvas.innerHTML = lastState;
  if(lastState.includes("<p")){ 
    const text = document.querySelector(".text-field");
    fontFamily.value = text.style.fontFamily;
    fontSize.value = parseInt(text.style.fontSize);
    text.addEventListener("mousedown", onTextDrag);
  }
}

function redo() {
  if (redoStack.length === 0) return;

  const currentState = canvas.innerHTML;
  undoStack.push(currentState);

  const nextState = redoStack.pop();
  if(!nextState.includes("<p") ^ !canvas.innerHTML.includes("<p")){
    toggleAddTextBtn();
  }

  canvas.innerHTML = nextState;
  if(nextState.includes("<p")){ 
    const text = document.querySelector(".text-field");
    fontFamily.value = text.style.fontFamily;
    fontSize.value = parseInt(text.style.fontSize);
    text.addEventListener("mousedown", onTextDrag);
  }
}



undoBtn.addEventListener("click", undo);
redoBtn.addEventListener("click", redo);
