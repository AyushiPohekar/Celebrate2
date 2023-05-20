const imageUpload = document.getElementById("imageUpload");
const customButton = document.getElementById("customButton");
const previewContainer = document.getElementById("previewContainer");


imageUpload.addEventListener("change", function () {
    // const fileName = this.value.split(/\\|\//).pop(); // Get the selected file name
    // console.log(fileName)
    // customButton.setAttribute('data-text', fileName);
    // customButton.classList.add('input-selected');
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
          previewContainer.appendChild(previewImage);
  
        




          
        });
      });
      reader.readAsDataURL(file);
    }
  });