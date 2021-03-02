const uploadedImage = document.getElementById("new-file");
const urlLink = document.getElementById("img-url");
const file = document.getElementById("new-file");

async function urlHandler(e) {
  e.preventDefault();
  await fetch(`https://api.imgur.com/3/image`, {
    method: "POST",
    body: { image, type: "url" },
    headers: {
      Authorization: "Client-ID ebe2f73bc0d1a0d",
    },
  });
  await fetch(`/api/image`, {
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
  await fetch(`https://api.imgur.com/3/image`, {
    method: "POST",
    body: { image, type: "file" },
    headers: {
      Authorization: "Client-ID ebe2f73bc0d1a0d",
    },
  });
  await fetch(`/api/image`, {
    method: "POST",
    body: { img_url },
    headers: {
      "Content-Type": "application/json",
    },
  });
}

function imageChoice() {
  if (file) {
    fileHandler(file);
  }
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
  .addEventListener("submit", imageChoice);
