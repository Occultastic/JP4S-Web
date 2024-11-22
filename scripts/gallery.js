let galleryInspector = null;
let galleryInspectedImage = null;

document.addEventListener('DOMContentLoaded', async function () {
    galleryInspector = document.getElementById("gallery-inspector");
    galleryInspectedImage = document.getElementById("gallery-inspected-image");
    document.querySelectorAll("div.gallery-main img").forEach(image => {
        image.addEventListener("click", function (event) {
            console.debug("Image selected to be inspected: ", image);
            galleryInspectedImage.src = image.src;
            galleryInspector.style.display = "grid";
        })
    })
    document.getElementById("gallery-close").addEventListener("click", async function () {
        console.debug("Image closed");
        galleryInspectedImage.src = "";
        galleryInspector.style.display = "none";
    })
    document.getElementById("gallery-download").addEventListener("click", async function () {
        console.debug("Image downloaded");
        let xhr = new XMLHttpRequest();
        xhr.open("GET", galleryInspectedImage.src);
        xhr.responseType = "blob";
        xhr.onload = function () {
            let a = document.createElement("a");
            document.body.appendChild(a);
            a.style.display = "none";
            let url = window.URL.createObjectURL(this.response);
            a.href = this.response;
            a.download = "JP4S_image";
            a.click();
            window.URL.revokeObjectURL(this.response);
        };
        xhr.send();
    })
    document.getElementById("gallery-share").addEventListener("click", async function () {
        console.debug("Image shared");
        await navigator.clipboard.writeText(galleryInspectedImage.src);
        alert("Copied image link to clipboard! [" + galleryInspectedImage.src + "]");
    })
})