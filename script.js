const imageUpload = document.getElementById("imageUpload");
const customButton = document.getElementById("customButton");
const previewContainer = document.getElementById("previewContainer");
const btns=document.getElementById("btns");
const cropButton = document.getElementById("cropButton");
const modalContent=document.getElementById("modal-content")
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
    //console.log(croppedImageData)
    openModal(croppedImageData);
  
  });
  
  rotateButton.addEventListener("click", function () {
    cropper.rotate(90);
  });

  function openModal(cropData) {
    var modal = document.getElementById('modal');
    var modalCanvas = document.getElementById('modal-canvas');
  
  
  
    
  
    const croppedImage2 = document.createElement("img");
    croppedImage2.id = "croppedImage2";
    croppedImage2.src = cropData;
    modalCanvas.innerHTML="";
    modalCanvas.appendChild(croppedImage2);
    modalContent.appendChild(modalCanvas)
    console.log(croppedImage2)
    modal.style.display = 'block';
    previewContainer.style.display="none"

  }
  
  function closeModal() {
    var modal = document.getElementById('modal');
    modal.style.display = 'none';
  }
  
