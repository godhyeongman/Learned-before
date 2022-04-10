const box = document.querySelector(".box");
const dragDrop = (event) => {
  const movingBox = document.createElement("div");
  movingBox.classList.add("box");
  movingBox.style.position = "absolute";
  document.querySelector(".zone").appendChild(movingBox);

  const { target, pageX, pageY, clientX, clientY } = event;
  let shiftX = clientX - target.getBoundingClientRect().left;
  let shiftY = clientY - target.getBoundingClientRect().top;

  moveAt(pageX, pageY);

  function moveAt(pageX, pageY) {
    movingBox.style.left = pageX - shiftX + "px";
    movingBox.style.top = pageY - shiftY + "px";
  }

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }

  document.addEventListener("mousemove", onMouseMove);

  movingBox.onmouseup = function () {
    document.removeEventListener("mousemove", onMouseMove);
    const movingBoxCoord = movingBox.style.left + movingBox.style.width / 2;

    if (movingBoxCoord > document.querySelectorAll(".zone")[2].style.left) {
      // 왜 right는 안되는걸까?
      document.querySelectorAll(".zone")[2].appendChild(movingBox);
      movingBox.style.position = "static";
      movingBox.style.left = "0px";
      movingBox.style.top = "0px";
      return;
    }

    if (movingBoxCoord > document.querySelectorAll(".zone")[1].style.left) {
      document.querySelectorAll(".zone")[1].appendChild(movingBox);
      movingBox.style.position = "static";
      movingBox.style.left = "0px";
      movingBox.style.top = "0px";
      return;
    }

    movingBox.remove();
  };
};
box.addEventListener("mousedown", dragDrop);
