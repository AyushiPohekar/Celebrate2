const imageUpload = document.getElementById("imageUpload");
const customButton = document.getElementById("customButton");
const previewContainer = document.getElementById("previewContainer");
const btns = document.getElementById("btns");
const cropButton = document.getElementById("cropButton");
const modalContent = document.getElementById("modal-content");
const rotateButton = document.getElementById("rotateButton");
const circleimg = document.getElementById("circleimg");
const rectangleimg = document.getElementById("rectangleimg");
const heartimg = document.getElementById("heartimg");
const squareimg = document.getElementById("squareimg");
const modal = document.getElementById("modal");
const modalCanvas = document.getElementById("modal-canvas");
const originalbtn = document.getElementById("originalbtn");
const flipbtnX = document.getElementById("flipbtnX");
const flipbtnY = document.getElementById("flipbtnY");
const croppedImage = document.createElement("img");
let currentShape;
var toggleY = 1;
var toggleX = 1;

let cropper;

imageUpload.addEventListener("change", function () {
  const file = this.files[0];

  if (file) {
    const reader = new FileReader();

    reader.addEventListener("load", function () {
      const image = new Image();
      image.src = reader.result;

      image.addEventListener("load", function () {
        const previewImage = document.createElement("img");

        previewImage.id = "previewImage";
        previewImage.src = this.src;
        previewContainer.innerHTML = "";
        previewContainer.append(previewImage, btns);
        previewContainer.style.display = "block";

        cropper = new Cropper(previewImage, {
          aspectRatio: 1,
          viewMode: 1,
          dragMode: "move",
          autoCropArea: 0.8,
          minContainerHeight: 400,
          minContainerWidth: 300,
          minCanvasHeight: 400,
          minCanvasWidth: 400,
        });
      });
    });
    reader.readAsDataURL(file);
  }
});

cropButton.addEventListener("click", function () {
  const croppedImageData = cropper.getCroppedCanvas().toDataURL("image/jpeg");

  croppedImage.id = "croppedImage";
  croppedImage.src = croppedImageData;

  previewContainer.innerHTML = "";
  previewContainer.appendChild(croppedImage);
  //console.log(croppedImageData)
  openModal(croppedImageData);
});

rotateButton.addEventListener("click", function () {
  cropper.rotate(90);
});
flipbtnX.addEventListener("click", function () {
  toggleX = toggleX * -1;
  cropper.scaleX(toggleX);
});
flipbtnY.addEventListener("click", function () {
  toggleY = toggleY * -1;
  cropper.scaleY(toggleY);
  // cropper.translate(-toggleY*5)
});

function openModal(cropData) {
  const croppedImage2 = document.createElement("img");
  croppedImage2.id = "croppedImage2";
  croppedImage2.src = cropData;
  modalCanvas.innerHTML = "";
  modalCanvas.appendChild(croppedImage2);
  modalContent.appendChild(modalCanvas);
  console.log(croppedImage2);
  modal.style.display = "block";
  previewContainer.style.display = "none";
}

function closeModal() {
  var modal = document.getElementById("modal");
  modal.style.display = "none";
}

circleimg.addEventListener("click", function () {
  currentShape = circleimg.ariaValueText;

  applyShape(currentShape);
});
rectangleimg.addEventListener("click", function () {
  currentShape = rectangleimg.ariaValueText;
  applyShape(currentShape);
});
heartimg.addEventListener("click", function () {
  currentShape = heartimg.ariaValueText;
  applyShape(currentShape);
});
squareimg.addEventListener("click", function () {
  currentShape = squareimg.ariaValueText;
  applyShape(currentShape);
});
originalbtn.addEventListener("click", function () {
  currentShape = originalbtn.value;
  applyShape(currentShape);
});

function applyShape(shape) {
  const previewImage = modalCanvas.querySelector("img");

  console.log(previewImage);
  const maskImageUrl = `/asset/${shape}.png`;

  if (shape === "original") {
    previewImage.style.webkitMaskImage = "none";
    previewImage.style.maskImage = "none";
  } else {
    previewImage.style.webkitMaskImage = `url(${maskImageUrl})`;
    previewImage.style.maskImage = `url(${maskImageUrl})`;
  }
}
