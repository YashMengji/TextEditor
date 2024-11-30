const addTextBtn = document.querySelector(".div-add-text-btn");
const canvas = document.querySelector(".div-canvas");
const canvasRect = canvas.getBoundingClientRect();

addTextBtn.addEventListener("click", (e) => {
  const text = document.createElement("p");
  text.textContent = "This is a new text";
  text.style.position = "absolute";
  text.style.left = "50%"
  text.style.top =  "50%"
  text.style.width = "fit-content"; 
  text.style.height = "fit-content";
  text.className = 'paragraph-field';
  text.style.userSelect = "none";
  canvas.appendChild(text);

  text.addEventListener("mousedown", (e) => {
    e.preventDefault();
    const textRect = text.getBoundingClientRect();
    const offsetX = e.clientX - textRect.left;
    const offsetY = e.clientY - textRect.top;

    text.style.cursor = "grabbing";

    const onMouseMove = (e) => {
      text.style.left = (e.clientX - offsetX - canvasRect.left) + "px";
      text.style.top = (e.clientY - offsetY - canvasRect.top) + "px";
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      text.style.cursor = "grab";
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  });
});



