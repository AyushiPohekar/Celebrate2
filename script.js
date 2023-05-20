const imageUpload = document.getElementById("imageUpload");
const customButton = document.getElementById("customButton");
const previewContainer = document.getElementById("previewContainer");
const btns=document.getElementById("btns");
const cropButton = document.getElementById("cropButton");

const rotateButton = document.getElementById("rotateButton");
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
          previewContainer.append(previewImage,btns);
          previewContainer.style.display="block"
  
          cropper = new Cropper(previewImage, {
            aspectRatio: 1,
            viewMode: 1,
            dragMode: "move",
            autoCropArea: 0.8,
            zoomable:false
          });




          
        });
      });
      reader.readAsDataURL(file);
    }
  });


  cropButton.addEventListener("click", function () {
    const croppedImageData = cropper.getCroppedCanvas().toDataURL("image/jpeg");
    const croppedImage = document.createElement("img");
    croppedImage.id = "croppedImage";
    croppedImage.src = croppedImageData;
  
    previewContainer.innerHTML = "";
    previewContainer.appendChild(croppedImage);
  
  
  });
  
  rotateButton.addEventListener("click", function () {
    cropper.rotate(90);
  });
  