// const { fileUpload, urlUpload } = require("../../utils/imgur");
const uploadedImage = document.getElementById("new-file");

async function urlHandler(e) {
  e.preventDefault();
  const newPost = await fetch(`https://api.imgur.com/3/image`, {
    method: "POST",
    body: { image, type: "url" },
    headers: {
      Authorization: "Client-ID ebe2f73bc0d1a0d",
    },
  });
  const newPost = await fetch(`/api/image`, {
    method: "POST",
    body: { img_url },
    headers: {
      "Content-Type": "application/json",
    },
  });
}

async function fileHandler(e) {
  console.log(e);
  console.log(this.files);
  e.preventDefault();
  //THIS IS WORKING COPY TO OTHER
  const newPost = await fetch(`https://api.imgur.com/3/image`, {
    method: "POST",
    body: { image, type: "base64" },
    headers: {
      Authorization: "Client-ID ebe2f73bc0d1a0d",
    },
  });
  const newPost = await fetch(`/api/image`, {
    method: "POST",
    body: { img_url },
    headers: {
      "Content-Type": "application/json",
    },
  });
}

// fetch function to get the image
async function getInfo() {
  const newPost = await fetch(`/api/image`, {
    method: "GET",

    headers: {
      "Content-Type": "application/json",
    },
  });
}

uploadedImage.addEventListener("change");
document
  .querySelector(".new-post-form")
  .addEventListener("submit", fileHandler);
