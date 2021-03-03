const uploadedImage = document.getElementById("new-file");
const urlLink = document.getElementById("img-url");
// const file = document.getElementById("new-file");
const dropDown = document.getElementById("drop-down");
const url = document.getElementById("url");

async function urlHandler(e) {
  e.preventDefault();
  console.log(url.value);
  // const imgurRes = await fetch(`https://api.imgur.com/3/image`, {
  //   method: "POST",
  //   body: JSON.stringify({ image: url.value }),
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: "Client-ID ebe2f73bc0d1a0d",
  //   },
  // });

  // const imgurJson = await imgurRes.json();
  console.log(JSON.stringify(url.value));
  await fetch("/api/posts/", {
    method: "POST",
    body: JSON.stringify({ img_url: url.value }),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

// async function fileHandler(e) {
//   e.preventDefault();
//   const files = e.target.files;
//   const formData = new FormData();
//   formData.append("myFile", files[0]);
//   console.log(files);
//   const imgur = await fetch(`https://api.imgur.com/3/image`, {
//     method: "POST",
//     body: { image: files[0] }, //if doesn't work, add type: "file"
//     headers: {
//       Authorization: "Client-ID ebe2f73bc0d1a0d",
//     },
//   });
//   console.log(await imgur.json());

//   await fetch(`/api/image`, {
//     method: "POST",
//     body: { img_url: imgur.data.link },
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
// }

function imageChoice(event) {
  event.preventDefault();
  console.log(dropDown.value);
  dropDown.value;
  if (dropDown.value === "file") {
    fileHandler();
  }
  if (dropDown.value === "url") {
    urlHandler(event);
  }
}
// fetch function to get the image
// async function getInfo() {
//   const newPost = await fetch(`/api/image`, {
//     method: "GET",

//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
// }

uploadedImage.addEventListener("change", (event) => {
  fileHandler(event);
});
document
  .querySelector(".new-post-form")
  .addEventListener("submit", imageChoice);
